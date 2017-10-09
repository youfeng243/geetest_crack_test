# -*- coding: utf-8 -*-

import config
import utils
import datetime
import elasticsearch
from jinja2 import Template


def get_site_status_status(es_servers, es_index, from_dt = None, to_dt = None):
    now = datetime.datetime.now()
    if from_dt is None: 
        from_dt = utils.truncate_datetime(now - datetime.timedelta(days=2))
    if to_dt is None:
        to_dt = utils.truncate_datetime(now) - datetime.timedelta(seconds=1)
        
    es_client = elasticsearch.Elasticsearch(
        hosts = es_servers
    )

    es_search_options = {
        "size": 0,
        "query": {
            "bool": {
                "filter": {
                    "range": {
                        "hdyzm_start": {
                            "gte" : long(utils.datetime_to_timestamp(from_dt)*1000),
                            "lte" :  long(utils.datetime_to_timestamp(to_dt)*1000)
                        }
                    }
                }
            }
        },
        "aggs": {
            "status_table": {
                "terms": {
                    "field": "hdyzm_status",
                    "size": 100
                }
            },
            "site_status_table": {
                "terms": {
                    "field": "hdyzm_urlhost.keyword",
                    "size": 1000
                },
                "aggs": {
                    "status": {
                        "terms": {
                            "field": "hdyzm_status",
                            "size": 100
                        }
                    }
                }
            },
            "instance_status_table": {
                "terms": {
                    "field": "beat.hostname.keyword",
                    "size": 1000
                },
                "aggs": {
                    "status": {
                        "terms": {
                            "field": "hdyzm_status",
                            "size": 100
                        }
                    }
                }
            },

            "timeCostSucc": {
                "filter": {
                    "term": {
                        "hdyzm_status": 0
                    }
                },
                "aggs": {
                    "timeCost": {
                        "histogram": {
                            "field": "hdyzm_timeCost",
                            "interval": 5000
                        },
                        "aggs": {
                            "avg": {
                                "avg": {
                                    "field": "hdyzm_timeCost"
                                }
                            },
                            "fiftieth": {
                                "percentiles": {
                                    "field": "hdyzm_timeCost",
                                    "percents": [50]
                                }
                            }
                        }
                    },
                    "avg": {
                        "avg": {
                            "field": "hdyzm_timeCost"
                        }
                    },
                    "percentile": {
                        "percentiles": {
                            "field": "hdyzm_timeCost",
                            "percents": [
                                1,
                                5,
                                10,
                                20,
                                30,
                                50,
                                70,
                                80,
                                90,
                                95,
                                99
                            ]
                        }
                    }
                }
            }
        }
    }

    es_result = es_client.search(
        index=es_index,
        body=es_search_options,
        size=0,
        request_timeout=30
    )
    return es_result

if __name__ == '__main__':
    import pprint
    result = get_site_status_status(config.ES_SERVERS, config.ES_INDEX)
    pprint.pprint(result)

    result_dict = utils.es_aggs_to_dict(result['aggregations']['site_status_table'])
    for key, item in result_dict.viewitems():
        item['status'] = utils.es_aggs_to_dict(item['status'])
    pprint.pprint(result_dict)
