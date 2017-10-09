import time
import datetime
from smtplib import SMTP
from email.header import Header

def truncate_datetime(dt):
    return datetime.datetime(dt.year, dt.month, dt.day)


def datetime_to_timestamp(dt):
    return time.mktime(dt.timetuple())

def es_aggs_to_dict(result):
    dict_result = dict()
    for bucket in result['buckets']:
        dict_result[bucket['key']] = bucket
    return dict_result

def es_aggs_to_count_dict(result):
    dict_result = dict()
    for bucket in result['buckets']:
        dict_result[bucket['key']] = bucket['doc_count']
    return dict_result

def parse_int(s, base=10):
    try:
        return int(s, base=base)
    except Exception, e:
        return None

def send_email(from_addr, password, to_addrs, subject, msg, smtp_host="smtp.weibangong.com", smtp_port=465):
    email_client = SMTP(smtp_host, smtp_port)
    email_client.login(from_addr, password)
    msg['Subject'] = Header(subject, 'utf-8')
    msg['From'] =from_addr
    msg['To'] = str(to_addrs)
    email_client.sendmail(from_addr, to_addrs, msg.as_string())
    email_client.quit()
