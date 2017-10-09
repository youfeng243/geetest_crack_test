"5.7.0";
"use strict";
!function(root, factory) {
  root.Geetest = factory(root, root.jQuery || (root.Zepto || (root.ender || root.$)));
  if ("function" == typeof define && define.amd) {
    define("Geetest", ["jquery"], function(errorClass) {
      return factory(root, errorClass);
    });
  } else {
    if ("undefined" != typeof exports) {
      exports = factory(root);
    }
  }
}(this, function(target, makeIterator) {
  /**
   * @param {Object} data
   * @param {string} err
   * @return {?}
   */
  function that(data, err) {
    if (!(this instanceof that)) {
      return new that(data, err);
    }
    if ("string" != typeof data.gt) {
      throw new Error(result.gtError);
    }
    var options = this;
    return options.id = timestamp(), node.S(options.id), self.S(options.id, options), node.U("error", opts.onError, options.id), options.config = template(data, options), options.config.protocol = options.config.https ? "https://" : location.protocol + "//", "https://" === options.config.protocol && (options.config.https = true), err || data.offline ? (success(false, data, options), data.popupbtnid && options.bindOn("#" + data.popupbtnid)) : fn(options.config.apiserver + "get.php?" + validate(data), 
    success, options), buildSelection(options), options;
  }
  /**
   * @param {Object} eventData
   * @param {string} type
   * @return {?}
   */
  function event(eventData, type) {
    return eventData.type || (eventData.type = "slide"), new event[eventData.type](eventData, type);
  }
  var result = {
    gtError : "\u521d\u59cb\u5316gt\u4f20\u53c2\u9519\u8bef",
    challengeError : "\u521d\u59cb\u5316challenge\u4f20\u53c2\u9519\u8bef",
    domSelectorError : "\u53c2\u6570\u5fc5\u987b\u4e3aID\u9009\u62e9\u5668\u6216DOM\u5143\u7d20",
    callbackError : "\u56de\u8c03\u63a5\u53e3\u53c2\u6570\u5fc5\u987b\u4e3a\u51fd\u6570",
    getError : "initGeetest\u63a5\u53e3\u914d\u7f6e\u53c2\u6570\u9519\u8bef\uff0c\u8bf7\u68c0\u67e5gt\u4e0echallenge"
  };
  var user = {};
  /**
   * @param {Array} a
   * @param {Function} matcherFunction
   * @return {undefined}
   */
  user.serial = function(a, matcherFunction) {
    var l = a.length;
    /** @type {Array} */
    var passedValues = [false];
    /** @type {number} */
    var i = 1;
    /**
     * @param {?} o
     * @param {undefined} dataAndEvents
     * @return {?}
     */
    var clone = function(o, dataAndEvents) {
      return dataAndEvents ? (passedValues = [true], void matcherFunction.apply(null, passedValues)) : (passedValues[i] = o, i += 1, void(i > l ? matcherFunction.apply(null, passedValues) : a[i - 1](clone)));
    };
    a[0](clone);
  };
  /**
   * @param {Array} list
   * @param {Function} callback
   * @return {undefined}
   */
  user.parallel = function(list, callback) {
    var len = list.length;
    /** @type {Array} */
    var data = [false];
    /** @type {number} */
    var resolved = 0;
    /**
     * @param {number} i
     * @return {?}
     */
    var cb = function(i) {
      return function(element, dataAndEvents) {
        if (resolved !== -1) {
          if (dataAndEvents) {
            return data = [true], callback.apply(null, data), data = [], void(resolved = -1);
          }
          resolved += 1;
          data[i] = element;
          if (resolved === len) {
            callback.apply(null, data);
          }
        }
      };
    };
    /** @type {number} */
    var i = 1;
    for (;i <= len;i += 1) {
      list[i - 1](cb(i), i);
    }
  };
  var S = {};
  var timeMap = {};
  /**
   * @param {string} name
   * @return {?}
   */
  var createElement = function(name) {
    return timeMap[name] && timeMap[name].content;
  };
  /**
   * @param {Object} data
   * @param {string} name
   * @param {Function} callback
   * @return {undefined}
   */
  var error = function(data, name, callback) {
    if (name in timeMap) {
      if ("loaded" === timeMap[name].status) {
        if (callback) {
          callback(timeMap[name].content);
        }
      } else {
        if ("loading" === timeMap[name].status) {
          node.P(name + "Loaded", function() {
            if (callback) {
              callback(timeMap[name].content);
            }
          });
        } else {
          log("module " + name + " lost!");
        }
      }
    } else {
      timeMap[name] = {
        status : "loading"
      };
      load(data, "js/" + name.toLowerCase() + "." + data.config.version + ".js", function(dataAndEvents) {
        return dataAndEvents ? (log("module " + name + " can not loaded"), void node.q("error", data.id)) : void error(data, name, callback);
      });
    }
  };
  /**
   * @param {string} name
   * @param {Function} p
   * @param {Function} v
   * @return {?}
   */
  S.Q = function(name, p, v) {
    var result;
    if (isArray(p)) {
      /** @type {Array} */
      var args = [];
      /** @type {number} */
      var i = 0;
      for (;i < p.length;i++) {
        args[i] = createElement(p[i]);
      }
      result = v.apply(null, args);
    } else {
      result = p();
    }
    return timeMap[name] = {}, timeMap[name].status = "loaded", timeMap[name].content = result, node.R(name + "Loaded"), result;
  };
  var node = {};
  node.z = {};
  node.z.global = {};
  /**
   * @param {?} d
   * @return {undefined}
   */
  node.S = function(d) {
    node.z[d] = {};
  };
  /**
   * @param {?} d
   * @return {undefined}
   */
  node.T = function(d) {
    node.z[d] = void 0;
  };
  /**
   * @param {string} type
   * @param {Function} callback
   * @param {?} prop
   * @return {?}
   */
  node.U = function(type, callback, prop) {
    return prop ? (node.z[prop][type] || (node.z[prop][type] = []), void node.z[prop][type].push({
      once : false,
      callback : callback
    })) : (node.z.global[type] || (node.z.global[type] = []), void node.z.global[type].push({
      once : false,
      callback : callback
    }));
  };
  /**
   * @param {string} name
   * @param {Function} options
   * @param {?} x
   * @return {undefined}
   */
  node.P = function(name, options, x) {
    if (x) {
      if (!node.z[x][name]) {
        /** @type {Array} */
        node.z[x][name] = [];
      }
      node.z[x][name].push({
        once : true,
        /** @type {Function} */
        callback : options
      });
    } else {
      if (!node.z.global[name]) {
        /** @type {Array} */
        node.z.global[name] = [];
      }
      node.z.global[name].push({
        once : true,
        /** @type {Function} */
        callback : options
      });
    }
  };
  /**
   * @param {string} d
   * @param {?} fn
   * @param {?} s
   * @return {undefined}
   */
  node.V = function(d, fn, s) {
    var test;
    test = s ? node.z[s][d] : node.z.global[d];
    test.splice(inArray(fn, test), 1);
  };
  /**
   * @param {?} d
   * @param {?} context
   * @return {undefined}
   */
  node.W = function(d, context) {
    jQuery(node.z, context);
  };
  /**
   * @param {string} event
   * @param {?} prop
   * @return {undefined}
   */
  node.q = function(event, prop) {
    var listener;
    var codeSegments = node.z[prop][event];
    if (codeSegments) {
      /** @type {number} */
      var i = 0;
      for (;i < codeSegments.length;i++) {
        listener = codeSegments[i];
        if (listener) {
          listener.callback.call(self.f("self", prop));
          if (listener.once) {
            node.V(event, listener, prop);
            i -= 1;
          }
        }
      }
    }
  };
  /**
   * @param {string} data
   * @return {undefined}
   */
  node.R = function(data) {
    var listener;
    var codeSegments = node.z.global[data];
    if (codeSegments) {
      /** @type {number} */
      var i = 0;
      for (;i < codeSegments.length;i++) {
        listener = codeSegments[i];
        if (listener) {
          listener.callback();
          if (listener.once) {
            node.V(data, listener);
            i -= 1;
          }
        }
      }
    }
  };
  /**
   * @param {Object} s
   * @param {Object} destination
   * @return {?}
   */
  var extend = function(s, destination) {
    var d = destination || {};
    var p;
    for (p in s) {
      if (s.hasOwnProperty(p)) {
        d[p] = s[p];
      }
    }
    return d;
  };
  /**
   * @param {Object} query
   * @return {?}
   */
  var validate = function(query) {
    /** @type {Array} */
    var tagNameArr = [];
    var part;
    for (part in query) {
      if (query.hasOwnProperty(part)) {
        /** @type {string} */
        var type = typeof query[part];
        if (!("number" !== type && ("string" !== type && "boolean" !== type))) {
          tagNameArr.push(part + "=" + query[part]);
        }
      }
    }
    return tagNameArr.join("&");
  };
  /**
   * @param {?} arg
   * @return {?}
   */
  var isFunction = function(arg) {
    return "function" == typeof arg;
  };
  /**
   * @return {?}
   */
  var timestamp = function() {
    return parseInt(1E4 * Math.random()) + (new Date).valueOf();
  };
  /**
   * @param {?} elem
   * @param {Array} arr
   * @param {number} i
   * @return {?}
   */
  var inArray = function(elem, arr, i) {
    var length;
    /** @type {function (this:(Array.<T>|string|{length: number}), T, number=): number} */
    var core_indexOf = Array.prototype.indexOf;
    if (arr) {
      if (core_indexOf) {
        return core_indexOf.call(arr, elem, i);
      }
      length = arr.length;
      i = i ? i < 0 ? Math.max(0, length + i) : i : 0;
      for (;i < length;i++) {
        if (i in arr && arr[i] === elem) {
          return i;
        }
      }
    }
    return-1;
  };
  /**
   * @param {Object} a
   * @param {?} selector
   * @return {undefined}
   */
  var jQuery = function(a, selector) {
    a[selector] = void 0;
    try {
      delete a[selector];
    } catch (c) {
    }
  };
  /**
   * @param {Element} el
   * @param {string} txt
   * @return {undefined}
   */
  var setText = function(el, txt) {
    try {
      /** @type {string} */
      el.innerHTML = txt;
    } catch (c) {
      /** @type {string} */
      el.innerText = txt;
    }
  };
  /**
   * @param {number} offset
   * @param {number} a
   * @return {?}
   */
  var slice = function(offset, a) {
    return Array.prototype.slice.call(offset, a);
  };
  /**
   * @param {?} x
   * @param {?} y
   * @return {?}
   */
  var checkAllowableRegions = function(x, y) {
    if (x === y) {
      return true;
    }
    if (null == x || null == y) {
      return false;
    }
    if (x.length != y.length) {
      return false;
    }
    /** @type {number} */
    var i = 0;
    for (;i < x.length;++i) {
      if (x[i] !== y[i]) {
        return false;
      }
    }
    return true;
  };
  /**
   * @param {Array} a
   * @param {Array} b
   * @return {?}
   */
  var diff = function(a, b) {
    /** @type {Array} */
    var result = [];
    /** @type {number} */
    var i = 0;
    for (;i < a.length;i++) {
      result.push(a[i] - b[i]);
    }
    return result;
  };
  /**
   * @param {Function} o
   * @return {?}
   */
  var isArray = function(o) {
    return Array.isArray ? Array.isArray(o) : "[object Array]" === Object.prototype.toString.call(o);
  };
  /**
   * @param {string} fmt
   * @return {undefined}
   */
  var log = function(fmt) {
    try {
      if (console) {
        console.log(fmt);
      }
    } catch (b) {
    }
  };
  var from = function() {
    /**
     * @param {Object} values
     * @param {Function} callback
     * @return {?}
     */
    var map = function(values, callback) {
      var result;
      if (isArray(values)) {
        /** @type {Array} */
        result = [];
        /** @type {number} */
        var i = 0;
        var valuesLen = values.length;
        for (;i < valuesLen;i += 1) {
          result[i] = callback(i, values[i]);
        }
      } else {
        result = {};
        var value;
        for (value in values) {
          if (values.hasOwnProperty(value)) {
            result[value] = callback(value, values[value]);
          }
        }
      }
      return result;
    };
    /**
     * @param {?} attributes
     * @return {?}
     */
    var setAttributes = function(attributes) {
      /** @type {number} */
      var _len = 0;
      if (isArray(attributes)) {
        _len = attributes.length;
      } else {
        var key;
        for (key in attributes) {
          if (attributes.hasOwnProperty(key)) {
            _len += 1;
          }
        }
      }
      return _len;
    };
    return{
      /** @type {function (Object, Function): ?} */
      d : map,
      /** @type {function (?): ?} */
      X : setAttributes
    };
  }();
  var e = {
    challenge : "",
    type : "slide",
    fullbg : "",
    bg : "",
    slice : "",
    xpos : 0,
    ypos : 0,
    height : 116,
    link : "javascript:;",
    https : false,
    logo : true,
    product : "float",
    id : "",
    version : "5.7.0",
    theme : "golden",
    theme_version : "3.0.23",
    show_delay : 250,
    hide_delay : 800,
    lang : "zh-cn",
    clean : false,
    protocol : "http://",
    apiserver : "api.geetest.com/",
    staticservers : ["static.geetest.com/", "dn-staticdown.qbox.me/"],
    retry : 0,
    debugConfig : {}
  };
  var message = {
    loaded_theme : {},
    loaded_skin : {},
    loaded_sprite : {},
    mobileSkins : {},
    mobileSprites : {},
    feedback : "http://www.geetest.com/contact/#report",
    homepage : "http://www.geetest.com/first_page"
  };
  /**
   * @param {Object} messages
   * @param {Object} params
   * @return {undefined}
   */
  var callback = function(messages, params) {
    var key;
    for (key in messages) {
      if (messages.hasOwnProperty(key)) {
        if ("undefined" != typeof params[key]) {
          messages[key] = params[key];
        }
      }
    }
  };
  /**
   * @param {Object} data
   * @param {Object} options
   * @return {?}
   */
  var template = function(data, options) {
    return callback(message, data), options.config ? extend(data, extend(options.config)) : extend(data, extend(e));
  };
  /**
   * @param {string} path
   * @param {Function} cb
   * @return {undefined}
   */
  var loadImage = function(path, cb) {
    /** @type {Element} */
    var img = document.createElement("img");
    /** @type {string} */
    img.crossOrigin = "Anonymous";
    /**
     * @return {undefined}
     */
    img.onerror = function() {
      cb(true, img);
      /** @type {null} */
      img.onerror = null;
    };
    /** @type {function (): undefined} */
    img.onload = img.onreadystatechange = function() {
      if (!(img.readyState && ("loaded" !== img.readyState && "complete" !== img.readyState))) {
        cb(false, img);
        /** @type {null} */
        img.onload = img.onreadystatechange = null;
      }
    };
    /** @type {string} */
    img.src = path;
  };
  /**
   * @param {Object} d
   * @param {?} path
   * @param {Function} complete
   * @return {undefined}
   */
  var includeFile = function(d, path, complete) {
    /** @type {Element} */
    var link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", path);
    /**
     * @return {undefined}
     */
    link.onerror = function() {
      complete(true);
      /** @type {null} */
      link.onload = link.onerror = null;
    };
    /**
     * @return {undefined}
     */
    link.onload = function() {
      complete(!check(d));
      /** @type {null} */
      link.onload = link.onerror = null;
    };
    document.getElementsByTagName("head")[0].appendChild(link);
  };
  /**
   * @param {string} src
   * @param {Function} onLoad
   * @return {undefined}
   */
  var loadScript = function(src, onLoad) {
    /** @type {Element} */
    var s = document.createElement("script");
    /** @type {string} */
    s.charset = "UTF-8";
    /** @type {boolean} */
    s.async = false;
    /**
     * @return {undefined}
     */
    s.onerror = function() {
      onLoad(true);
      /** @type {null} */
      s.onerror = null;
    };
    /** @type {function (): undefined} */
    s.onload = s.onreadystatechange = function() {
      if (!(s.readyState && ("loaded" !== s.readyState && "complete" !== s.readyState))) {
        onLoad(false, null);
        /** @type {null} */
        s.onload = s.onreadystatechange = null;
      }
    };
    /** @type {string} */
    s.src = src;
    document.getElementsByTagName("head")[0].appendChild(s);
  };
  /**
   * @param {Object} data
   * @param {string} err
   * @param {Function} fail
   * @return {undefined}
   */
  var load = function(data, err, fail) {
    var resolveValues = data.config.staticservers;
    var label = data.config.protocol;
    var length = resolveValues.length;
    /** @type {number} */
    var requestId = 0;
    /**
     * @param {number} requestId
     * @param {string} err
     * @return {?}
     */
    var ready = function(requestId, err) {
      return err.indexOf("pictures/") > -1 ? label + resolveValues[requestId] + err : label + resolveValues[requestId] + "static/" + err;
    };
    if ("function" != typeof fail) {
      /**
       * @return {undefined}
       */
      fail = function() {
      };
    }
    /**
     * @param {undefined} loadingLang
     * @param {?} e
     * @return {?}
     */
    var load = function(loadingLang, e) {
      return loadingLang ? (requestId += 1, void onload(e)) : void fail(false, e);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    var onload = function(e) {
      return requestId >= length ? (err.indexOf("pictures") === -1 && node.q("error", data.id), void fail(true, e)) : void(err.indexOf(".js") > -1 ? loadScript(ready(requestId, err), load) : err.indexOf(".png") > -1 || (err.indexOf(".jpg") > -1 || (err.indexOf(".webp") > -1 || err.indexOf(".svg") > -1)) ? loadImage(ready(requestId, err), load) : err.indexOf(".css") > -1 ? includeFile(data, ready(requestId, err), load) : (err && log("no such resource: " + err), fail(true, e)));
    };
    onload(null);
  };
  /**
   * @param {string} child
   * @param {Function} f
   * @param {Object} o
   * @return {undefined}
   */
  var fn = function(child, f, o) {
    child = o.config.protocol + child.replace(/http:\/\/|https:\/\//, "");
    /** @type {string} */
    var parent = "geetest_" + timestamp();
    /**
     * @param {Object} suite
     * @return {undefined}
     */
    window[parent] = function(suite) {
      if (suite.error) {
        log(suite.error);
        node.q("error", o.id);
        node.q("statusChange", o.id);
        jQuery(window, parent);
      }
      f.call(o, false, suite, o);
    };
    loadScript(child + "&callback=" + parent, function(dataAndEvents) {
      if (dataAndEvents) {
        log("GeeTest Error: request " + child + " can not access");
        node.q("error", o.id);
        node.q("statusChange", o.id);
        jQuery(window, parent);
      }
    });
  };
  /** @type {Element} */
  var img = document.createElement("img");
  /** @type {function (): undefined} */
  img.onload = img.onerror = function() {
    /** @type {string} */
    var level = ".jpg";
    if (2 === img.height) {
      /** @type {string} */
      level = ".webp";
    }
    /** @type {string} */
    message.webp = level;
    node.R("WebPLoaded");
  };
  /** @type {string} */
  img.src = "data:image/webp;base64,UklGRi4AAABXRUJQVlA4TCEAAAAvAUAAEB8wAiMwAgSSNtse/cXjxyCCmrYNWPwmHRH9jwMA";
  /** @type {boolean} */
  var perm = /msie 6/i.test(navigator.userAgent);
  /** @type {number} */
  var kind = -1;
  /** @type {boolean} */
  var K = /msie|trident\/|edge/i.test(navigator.userAgent);
  /**
   * @return {?}
   */
  var cleanup = function() {
    return kind = "transition" in document.body.style || ("webkitTransition" in document.body.style || ("mozTransition" in document.body.style || "msTransition" in document.body.style));
  };
  if (document) {
    if (document.body) {
      cleanup();
    }
  }
  if (perm) {
    /** @type {string} */
    message.webp = ".jpg";
  }
  /**
   * @param {Object} el
   * @param {string} property
   * @return {?}
   */
  var _getStyle = function(el, property) {
    var defaultValue;
    return el.currentStyle ? defaultValue = el.currentStyle[property] : window.getComputedStyle && (defaultValue = window.getComputedStyle(el, null).getPropertyValue(property)), defaultValue;
  };
  /**
   * @param {Object} item
   * @return {?}
   */
  var check = function(item) {
    if (!K) {
      return true;
    }
    /** @type {string} */
    var object = "178273px";
    var obj = self.f("styleDetectEle", item.id);
    return!(!obj || _getStyle(obj, "width") !== object) && (obj.parentNode.removeChild(obj), self.p("styleDetectEle", false, item.id), true);
  };
  /**
   * @param {Element} filter
   * @return {undefined}
   */
  var buildSelection = function(filter) {
    if (K) {
      /** @type {Element} */
      var header = document.createElement("div");
      /** @type {string} */
      header.id = "geetest_style_detect_178273px";
      self.p("styleDetectEle", header, filter.id);
      document.getElementsByTagName("body")[0].appendChild(header);
    }
  };
  /** @type {string} */
  that.type = "slide";
  /**
   * @param {boolean} textStatus
   * @param {Object} options
   * @param {Object} data
   * @return {?}
   */
  var success = function(textStatus, options, data) {
    return!(textStatus || !options) && (data.config.debugConfig && (options = extend(data.config.debugConfig, options), data.config = template(options, data)), kind == -1 && cleanup(), void user.parallel([function(done) {
      if (options.offline) {
        error(data, "Offline", function(err) {
          done(err);
        });
      } else {
        done(null);
      }
    }, function(done) {
      if (options.fullpage) {
        error(data, "Fullpage", function(err) {
          done(err);
        });
      } else {
        done(null);
      }
    }, function(done) {
      if (options.benchmark) {
        error(data, "Benchmark", function(err) {
          done(err);
        });
      } else {
        done(null);
      }
    }], function(dataAndEvents, actual, hsb, deepDataAndEvents) {
      if (hsb) {
        hsb.h();
      }
      if (options.offline) {
        data.config = template(actual.h(data), data);
      } else {
        data.config = template(options, data);
      }
      node.U("success", opts.onSuccess, data.id);
      node.U("refresh", opts.onRefresh, data.id);
      node.U("fail", opts.onFail, data.id);
      node.U("forbidden", opts.onForbidden, data.id);
      node.U("abuse", opts.onAbuse, data.id);
      node.P("DOMReady", function() {
        if (data.config.benchmark) {
          createElement("Benchmark").h(data);
        }
        if ("popup" === data.config.product) {
          s.h(data);
        }
      }, data.id);
      node.P("DOMReady", opts.onReady, data.id);
      user.serial([function($sanitize) {
        if (data.config.mobile) {
          error(data, "SVG", function(value) {
            $sanitize(value);
          });
        } else {
          if ("curtain" === data.config.type) {
            error(data, "Curtain", function(value) {
              $sanitize(value);
            });
          } else {
            $sanitize(null);
          }
        }
      }], function() {
        if (message.loaded_theme[data.config.theme]) {
          if (data.config.mobile && !message.mobileSkins[data.config.theme]) {
            node.P(data.config.theme + "Loaded", function() {
              self.p("loaded", true, data.id);
              node.q("loaded", data.id);
            });
          } else {
            self.p("loaded", true, data.id);
            node.q("loaded", data.id);
          }
        } else {
          if (message.loaded_theme[data.config.theme] = true, data.config.mobile) {
            if (window.GeeTestSkins && window.GeeTestSkins[data.config.theme]) {
              return message.mobileSkins[data.config.theme] = window.GeeTestSkins[data.config.theme], self.p("loaded", true, data.id), void node.q("loaded", data.id);
            }
            load(data, data.config.theme + "/skin." + data.config.theme_version + ".js", function(dataAndEvents) {
              return dataAndEvents ? (log("svg " + data.config.theme + " skin.js can not loaded"), void node.q("error", data.id)) : (message.mobileSkins[data.config.theme] = window.GeeTestSkins[data.config.theme], node.R(data.config.theme + "Loaded"), self.p("loaded", true, data.id), void node.q("loaded", data.id));
            });
          } else {
            user.parallel([function($sanitize) {
              load(data, data.config.theme + "/style" + (data.config.https ? "_https" : "") + "." + data.config.theme_version + ".css", function(dataAndEvents) {
                if (dataAndEvents) {
                  node.q("error", data.id);
                }
                $sanitize(null, true);
              });
            }, function($sanitize) {
              setTimeout(function() {
                $sanitize(null, true);
              }, 600);
            }], function() {
              self.p("loaded", true, data.id);
              node.q("loaded", data.id);
            });
          }
        }
      });
    }));
  };
  var self = {};
  self.z = {};
  /**
   * @param {?} timeoutKey
   * @param {?} args
   * @return {undefined}
   */
  self.S = function(timeoutKey, args) {
    self.z[timeoutKey] = {};
    self.z[timeoutKey].self = args;
  };
  /**
   * @param {string} value
   * @param {Object} val
   * @param {?} i
   * @return {?}
   */
  self.p = function(value, val, i) {
    return self.z[i][value] = val, val;
  };
  /**
   * @param {string} value
   * @param {?} key
   * @return {?}
   */
  self.f = function(value, key) {
    return self.z[key][value];
  };
  /**
   * @param {?} timeoutKey
   * @return {undefined}
   */
  self.T = function(timeoutKey) {
    self.z[timeoutKey] = void 0;
  };
  /**
   * @param {string} v
   * @return {?}
   */
  var init = function(v) {
    var map = {
      "zh-cn" : {
        popup_ready : "\u8bf7\u5148\u5b8c\u6210\u4e0b\u65b9\u9a8c\u8bc1",
        popup_finish : "\u9875\u9762\u5c06\u57282\u79d2\u540e\u8df3\u8f6c",
        loading : "\u52a0\u8f7d\u4e2d...",
        slide : "\u6309\u4f4f\u5de6\u8fb9\u6ed1\u5757\uff0c\u62d6\u52a8\u5b8c\u6210\u4e0a\u65b9\u62fc\u56fe",
        refresh : "\u5237\u65b0\u9a8c\u8bc1",
        help : "\u5e2e\u52a9\u53cd\u9988",
        feedback : "\u53cd\u9988",
        fail : ["\u9a8c\u8bc1\u5931\u8d25:", "\u62d6\u52a8\u6ed1\u5757\u5c06\u60ac\u6d6e\u56fe\u50cf\u6b63\u786e\u62fc\u5408"],
        success : ["\u9a8c\u8bc1\u901a\u8fc7:", "sec \u79d2\u7684\u901f\u5ea6\u8d85\u8fc7 score% \u7684\u7528\u6237"],
        abuse : ["\u5c1d\u8bd5\u8fc7\u591a:", "\u7cfb\u7edf\u6b63\u5728\u81ea\u52a8\u5237\u65b0\u56fe\u7247"],
        forbidden : ["\u518d\u6765\u4e00\u6b21:", "\u54c7\u54e6\uff5e\u602a\u7269\u5403\u4e86\u62fc\u56fe count \u79d2\u540e\u91cd\u8bd5"],
        error : ["\u51fa\u73b0\u9519\u8bef:", "\u8bf7\u5173\u95ed\u9a8c\u8bc1\u91cd\u8bd5"],
        curtain : "\u70b9\u51fb\u4e0a\u56fe\u6309\u94ae\u5e76\u6cbf\u9053\u8def\u62d6\u52a8\u5230\u7ec8\u70b9\u5904",
        curtain_knob : "\u79fb\u52a8\u5230\u6b64\u5f00\u59cb\u9a8c\u8bc1"
      },
      "zh-tw" : {
        popup_ready : "\u8acb\u5148\u5b8c\u6210\u4e0b\u65b9\u9a57\u8b49",
        popup_finish : "\u9801\u9762\u5c07\u57282\u79d2\u5f8c\u8df3\u8f49",
        loading : "\u8f09\u5165\u4e2d...",
        slide : "\u6309\u4f4f\u5de6\u908a\u6ed1\u584a\uff0c\u62d6\u52d5\u5b8c\u6210\u4e0a\u65b9\u62fc\u5716",
        refresh : "\u66f4\u65b0\u9a57\u8b49\u5716",
        help : "\u5e6b\u52a9",
        feedback : "\u56de\u5831\u554f\u984c",
        fail : ["\u9a57\u8b49\u5931\u6557:", "\u8acb\u5c07\u61f8\u6d6e\u5716\u7247\u62fc\u5408"],
        success : ["\u9a57\u8b49\u901a\u904e:", "sec \u79d2\u7684\u901f\u5ea6\u8d85\u904e score% \u7684\u7528\u6236"],
        abuse : ["\u5617\u8a66\u904e\u591a\u6b21:", "\u7cfb\u7d71\u6b63\u5728\u66f4\u65b0\u5716\u7247"],
        forbidden : ["\u518d\u4f86\u4e00\u6b21:", "\u5c0f\u602a\u7269\u5403\u6389\u4e86\u62fc\u5716 count \u79d2\u5f8c\u91cd\u8a66"],
        error : ["\u51fa\u73fe\u932f\u8aa4:", "\u8acb\u95dc\u9589\u9a57\u8b49\u5f8c\u91cd\u8a66"],
        curtain : "\u9ede\u64ca\u4e0a\u5716\u4e26\u6cbf\u8def\u7dda\u6ed1\u81f3\u7d42\u9ede",
        curtain_knob : "\u6ed1\u52d5\u81f3\u6b64\u5b8c\u6210\u9a57\u8b49"
      },
      ja : {
        popup_ready : "\u30ed\u30b0\u30a4\u30f3\u8a8d\u8a3c\u3092\u884c\u3063\u3066\u304f\u3060\u3055\u3044",
        popup_finish : "2\u79d2\u5f8c\u3067\u30ea\u30c0\u30a4\u30ec\u30af\u30c8\u3057\u307e\u3059",
        loading : "\u8aad\u307f\u8fbc\u307f\u4e2d\u2026",
        slide : "\u30b9\u30e9\u30a4\u30c9\u3057\u3066\u8a8d\u8a3c\u3092\u5b8c\u6210\u3055\u305b\u3066\u304f\u3060\u3055\u3044",
        refresh : "\u753b\u50cf\u66f4\u65b0",
        help : "\u30d8\u30eb\u30d7",
        feedback : "\u30b3\u30e1\u30f3\u30c8",
        fail : ["\u8a8d\u8a3c\u5931\u6557:", "\u30d1\u30ba\u30eb\u3092\u5408\u308f\u305b\u3066\u304f\u3060\u3055\u3044"],
        success : ["\u8a8d\u8a3c\u5b8c\u4e86:", "\u8a8d\u8a3c\u304c\u5b8c\u4e86\u3057\u307e\u3057\u305f"],
        abuse : ["", "\u753b\u50cf\u304c\u66f4\u65b0\u3055\u308c\u3066\u3044\u307e\u3059"],
        forbidden : ["\u3082\u3046\u4e00\u5ea6:", "count\u79d2\u5f8c\u3082\u3046\u4e00\u5ea6\u3084\u308a\u76f4\u3057\u3066\u304f\u3060\u3055\u3044"],
        error : ["\u30a8\u30e9\u30fc\u3067\u3059:", "\u3082\u3046\u4e00\u5ea6\u3084\u308a\u76f4\u3057\u3066\u304f\u3060\u3055\u3044"],
        curtain : "\u30dc\u30bf\u30f3\u3092\u7d42\u70b9\u307e\u3067\u30c9\u30e9\u30c3\u30af\u3057\u3066\u304f\u3060\u3055\u3044",
        curtain_knob : "\u3053\u3053\u304b\u3089\u8a8d\u8a3c\u3092\u59cb\u3081\u307e\u3059"
      },
      ko : {
        popup_ready : "\ub2e4\uc74c \uc778\uc99d\uc744 \uc644\uc131\ud558\uc138\uc694",
        popup_finish : "\ubd88\ub7ec\uc624\ub294 \uc911",
        loading : "\ubd88\ub7ec\uc624\ub294 \uc911...",
        slide : "\ubc84\ud2bc \ub4dc\ub9ac\uadf8\ud558\uc5ec \uc778\uc99d\ud558\uc138\uc694",
        refresh : "\uac31\uc2e0",
        help : "\ubb38\uc758",
        feedback : "\ubb38\uc758",
        fail : ["\uc778\uc99d\uc2e4\ud328", ""],
        success : ["\uc778\uc99d\uc131\uacf5", ""],
        abuse : ["\uc790\ub3d9\uc7ac\ud589 \uc911", ""],
        forbidden : ["\ub2e4\uc2dc \uc2dc\ub3c4\ud558\uc138\uc694", ""],
        error : ["\ub2e4\uc2dc \uc2dc\ub3c4\ud558\uc138\uc694", ""],
        curtain : "\uae38\uc744 \ub530\ub77c \ubc84\ud2bc\uc744 \ub4dc\ub798\uadf8",
        curtain_knob : "\ud655\uc778\ud558\uae30 \uc704\ud574 \uc5ec\uae30\ub85c \uc774\ub3d9"
      },
      en : {
        popup_ready : "Complete verification below",
        popup_finish : "You will be redirected in 2 seconds",
        loading : "loading...",
        slide : "Drag the left slider to verify",
        refresh : "Refresh",
        help : "Support",
        feedback : "Feedback",
        fail : ["Unsuccessful:", "Complete the puzzles"],
        success : ["Success:", "Take secs and defeat score% users"],
        abuse : ["Excessive:", "Server is refreshing the image"],
        forbidden : ["Try Again:", "Wow~ Monster eats the image"],
        error : ["Server Error:", "Please try again later"],
        curtain : "Drag the button along the road",
        curtain_knob : "Move here to verify"
      },
      th : {
        popup_ready : "\u0e01\u0e23\u0e38\u0e13\u0e32\u0e14\u0e33\u0e40\u0e19\u0e34\u0e19\u0e01\u0e32\u0e23\u0e15\u0e23\u0e27\u0e08\u0e2a\u0e2d\u0e1a\u0e14\u0e49\u0e32\u0e19\u0e25\u0e48\u0e32\u0e07",
        popup_finish : "\u0e01\u0e23\u0e38\u0e13\u0e32\u0e23\u0e2d\u0e2a\u0e31\u0e01\u0e04\u0e23\u0e39\u0e48",
        loading : "\u0e01\u0e33\u0e25\u0e31\u0e07\u0e14\u0e32\u0e27\u0e19\u0e4c\u0e42\u0e2b\u0e25\u0e14...",
        slide : "\u0e01\u0e14\u0e04\u0e49\u0e32\u0e07\u0e41\u0e25\u0e30\u0e25\u0e32\u0e01\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e15\u0e48\u0e2d\u0e20\u0e32\u0e1e\u0e43\u0e2b\u0e49\u0e2a\u0e21\u0e1a\u0e39\u0e23\u0e13\u0e4c",
        refresh : "\u0e23\u0e35\u0e40\u0e1f\u0e23\u0e0a",
        help : "\u0e0a\u0e48\u0e27\u0e22\u0e40\u0e2b\u0e25\u0e37\u0e2d",
        feedback : "\u0e0a\u0e48\u0e27\u0e22\u0e40\u0e2b\u0e25\u0e37\u0e2d",
        fail : ["\u0e25\u0e49\u0e21\u0e40\u0e2b\u0e25\u0e27:", "\u0e01\u0e14\u0e41\u0e25\u0e30\u0e25\u0e32\u0e01\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e1b\u0e23\u0e30\u0e01\u0e2d\u0e1a\u0e20\u0e32\u0e1e"],
        success : ["", "\u0e2a\u0e33\u0e40\u0e23\u0e47\u0e08 \u0e04\u0e27\u0e32\u0e21\u0e40\u0e23\u0e47\u0e27 sec \u0e27\u0e34\u0e19\u0e32\u0e17\u0e35 \u0e40\u0e23\u0e47\u0e27\u0e21\u0e32\u0e01\u0e46"],
        abuse : ["", "\u0e23\u0e30\u0e1a\u0e1a\u0e01\u0e33\u0e25\u0e31\u0e07\u0e14\u0e33\u0e40\u0e19\u0e34\u0e19\u0e01\u0e32\u0e23\u0e40\u0e1b\u0e25\u0e35\u0e48\u0e22\u0e19\u0e20\u0e32\u0e1e\u0e43\u0e2b\u0e21\u0e48"],
        forbidden : ["", "\u0e2d\u0e38\u0e4a\u0e22! \u0e15\u0e48\u0e2d\u0e20\u0e32\u0e1e\u0e44\u0e21\u0e48\u0e16\u0e39\u0e01\u0e15\u0e49\u0e2d\u0e07\u0e01\u0e23\u0e38\u0e13\u0e32\u0e25\u0e2d\u0e07\u0e43\u0e2b\u0e21\u0e48"],
        error : ["", "\u0e01\u0e23\u0e38\u0e13\u0e32\u0e1b\u0e34\u0e14\u0e41\u0e25\u0e30\u0e40\u0e1b\u0e34\u0e14\u0e43\u0e2b\u0e21\u0e48\u0e2d\u0e35\u0e01\u0e04\u0e23\u0e31\u0e49\u0e07"],
        curtain : "Drag the button along the road",
        curtain_knob : "Move here to verify"
      }
    };
    if ("string" != typeof v) {
      return map["zh-CN"];
    }
    /** @type {string} */
    v = v.toLowerCase();
    /** @type {number} */
    var p = v.indexOf("-");
    /** @type {string} */
    var objUid = p > -1 ? v.slice(0, p) : v;
    return "zh" === objUid && (objUid += v.indexOf("tw") > -1 || v.indexOf("hk") > -1 ? "-tw" : "-cn"), map[objUid] || map["zh-cn"];
  };
  var options = {};
  /**
   * @param {Object} css
   * @param {Object} parent
   * @param {?} fn
   * @return {?}
   */
  options.v = function render(css, parent, fn) {
    var selector;
    /** @type {Element} */
    var div = document.createElement("div");
    if (parent = parent || div.cloneNode(), "string" == typeof css) {
      return void parent.appendChild(document.createTextNode(css));
    }
    for (selector in css) {
      if (css.hasOwnProperty(selector)) {
        var elem;
        /** @type {Array.<string>} */
        var arr = selector.split(".");
        /** @type {string} */
        var tagName = "" === arr[0] ? "div" : arr[0];
        /** @type {string} */
        var val = arr[1];
        if ("input" === tagName) {
          /** @type {Element} */
          elem = document.createElement(tagName);
          /** @type {string} */
          elem.className = val;
          /** @type {string} */
          elem.type = "hidden";
          /** @type {string} */
          elem.name = val;
        } else {
          /** @type {Element} */
          elem = document.createElement(tagName);
          /** @type {string} */
          elem.className = val;
        }
        parent.appendChild(elem);
        fn(elem, "." + val.split(" ")[0]);
        render(css[selector], elem, fn);
      }
    }
    return parent.childNodes ? parent : null;
  };
  /**
   * @param {string} input
   * @return {?}
   */
  options.Y = function(input) {
    var that = init(input);
    return{
      ".gt_widget" : {
        ".gt_holder_top" : {},
        ".gt_box_holder" : {
          ".gt_box" : {
            ".gt_loading" : {
              ".gt_loading_icon" : {},
              ".gt_loading_text" : that.loading
            },
            "a.gt_bg" : {
              ".gt_cut_bg" : {},
              ".gt_slice" : {}
            },
            "a.gt_fullbg" : {
              ".gt_cut_fullbg" : {},
              ".gt_flash" : {},
              ".gt_ie_success" : {}
            },
            "a.gt_curtain" : {
              ".gt_curtain_bg_wrap" : {
                ".gt_curtain_bg" : {
                  ".gt_cut_curtain" : {}
                }
              },
              ".gt_curtain_button" : {}
            },
            "a.gt_box_tips" : {}
          },
          ".gt_info" : {
            ".gt_info_tip" : {
              ".gt_info_icon" : {},
              ".gt_info_text" : {}
            }
          }
        },
        ".gt_bottom" : {
          "a.gt_refresh_button" : {
            ".gt_refresh_tips" : that.refresh
          },
          "a.gt_help_button" : {
            ".gt_help_tips" : that.help
          },
          "a.gt_logo_button" : {}
        }
      },
      ".gt_input" : {
        "input.geetest_challenge" : {},
        "input.geetest_validate" : {},
        "input.geetest_seccode" : {}
      },
      ".gt_slider" : {
        ".gt_guide_tip" : that.slide,
        ".gt_slider_knob" : {},
        ".gt_curtain_tip" : that.curtain,
        ".gt_curtain_knob" : that.curtain_knob,
        ".gt_ajax_tip" : {}
      }
    };
  };
  /**
   * @param {Node} m
   * @param {Element} node
   * @return {?}
   */
  options.Z = function(m, node) {
    return m.parentNode.insertBefore(node, m.nextSibling), node;
  };
  /**
   * @param {string} el
   * @param {string} id
   * @return {?}
   */
  options._ = function(el, id) {
    if ("string" == typeof el) {
      if (0 == el.indexOf("#")) {
        /** @type {(HTMLElement|null)} */
        el = document.getElementById(el.replace("#", ""));
      } else {
        if ("querySelector" in document) {
          /** @type {(Element|null)} */
          el = document.querySelector(el);
        } else {
          if (isFunction(window.jQuery)) {
            el = window.jQuery(el)[0];
          }
        }
      }
    } else {
      if (el.length) {
        el = el[0];
      }
    }
    var type;
    try {
      /** @type {number} */
      type = Node.ELEMENT_NODE;
    } catch (d) {
      /** @type {number} */
      type = 1;
    }
    try {
      if (el.nodeType === type) {
        return el;
      }
    } catch (d) {
      throw new Error("\u63a5\u53e3" + id + "\u4f20\u53c2\u9519\u8bef:" + result.domSelectorError);
    }
  };
  /**
   * @param {HTMLElement} e
   * @return {undefined}
   */
  options.aa = function(e) {
    try {
      /** @type {HTMLElement} */
      var a = e;
      for (;e.parentNode != document.body && a.offsetTop - e.parentNode.offsetTop < 160;) {
        e = e.parentNode;
        if ("hidden" == _getStyle(e, "overflow")) {
          /** @type {string} */
          e.style.overflow = "visible";
        }
      }
    } catch (c) {
    }
  };
  /**
   * @param {Element} obj
   * @return {?}
   */
  options.ba = function(obj) {
    var curleft = obj.offsetLeft;
    var e = obj.offsetParent;
    for (;null !== e;) {
      curleft += e.offsetLeft;
      e = e.offsetParent;
    }
    return curleft;
  };
  /**
   * @param {Element} obj
   * @return {?}
   */
  options.ca = function(obj) {
    var top = obj.offsetTop;
    var op = obj.offsetParent;
    for (;null !== op;) {
      top += op.offsetTop;
      op = op.offsetParent;
    }
    return top;
  };
  /**
   * @param {Element} el
   * @param {Element} walkers
   * @return {undefined}
   */
  options.da = function(el, walkers) {
    /** @type {string} */
    el.style.top = options.ca(walkers) - 160 + "px";
    /** @type {string} */
    el.style.left = options.ba(walkers) + "px";
  };
  /**
   * @param {Object} msg
   * @param {?} d
   * @return {undefined}
   */
  options.ea = function(msg, d) {
    var target = this;
    msg = options._(msg, "appendTo");
    options.fa(target);
    var $ = target.$;
    if ("gyroscope" === target.config.type) {
      createElement("Gyro").h(target).g(target).w(target);
    } else {
      if (target.config.mobile) {
        var e = createElement("SVG");
        e.h(target);
        e.g(target);
        e.w(target);
      } else {
        if ("popup" !== target.config.product) {
          target.dom = options.v(options.Y(target.config.lang), false, $);
        } else {
          var o = createElement("Popup");
          target.dom = options.v(o.Y(target.config.lang), false, $);
        }
        if (options.ga(target, true), options.ha(target), options.ia(target), options.ka(target, true), h.la(target), "curtain" === target.config.type) {
          var form = createElement("Curtain");
          form.la(target);
        }
        /** @type {string} */
        $(".gt_flash").style.height = target.config.height - 22 + "px";
      }
    }
    if (target.dom.style["touch-action"] = "none", target.dom.style["ms-touch-action"] = "none", create(target), target.dom.id = "geetest_" + target.id, target.config.mobile ? target.dom.className = "gt_mobile_holder " + target.config.product : target.dom.className = "gt_holder " + target.config.product, "float" != target.config.product || (target.config.mobile || move(target)), "popup" != target.config.product || target.config.mobile) {
      if (d) {
        options.Z(msg, target.dom);
      } else {
        msg.appendChild(target.dom);
      }
    } else {
      document.body.appendChild(target.dom);
      var cell = $(".gt_input");
      if (d) {
        options.Z(msg, cell);
      } else {
        msg.appendChild(cell);
      }
    }
    if ("gyroscope" === target.config.type && self.p("scale", target.dom.clientWidth / 260, target.id), "float" === target.config.product && !target.config.mobile) {
      if (target.config.sandbox) {
        var label = $(".gt_widget");
        target.dom.removeChild(label);
        /** @type {Element} */
        var clone = document.createElement("div");
        /** @type {string} */
        clone.className = target.dom.className + " gt_clone";
        clone.appendChild(label);
        document.getElementsByTagName("body")[0].appendChild(clone);
        options.da(clone, target.dom);
        /** @type {Element} */
        target.cloneDom = clone;
      } else {
        setTimeout(function() {
          options.aa(target.dom);
        }, 2E3);
      }
    }
    self.p("DOMReady", true, target.id);
    node.q("DOMReady", target.id);
  };
  /**
   * @param {Object} c
   * @param {number} attributes
   * @return {undefined}
   */
  options.ga = function(c, attributes) {
    var cl = c.$;
    if (d.o(cl(".gt_curtain")), d.o(cl(".gt_curtain_button")), d.o(cl(".gt_curtain_tip")), d.o(cl(".gt_curtain_knob")), "slide" == c.config.type) {
      h.ma(c, attributes);
    } else {
      var o = createElement("Curtain");
      h.o(c, attributes);
      o.ma(c, attributes);
    }
  };
  /**
   * @param {Object} parent
   * @return {undefined}
   */
  options.ia = function(parent) {
    var $ = parent.$;
    var link = $(".gt_logo_button");
    if (parent.config.logo) {
      /** @type {string} */
      link.href = message.homepage;
      /** @type {string} */
      link.target = "_blank";
    } else {
      options.na(link, "no_logo");
    }
    if (parent.config.clean) {
      options.na($(".gt_widget"), "clean");
    }
    var self = $(".gt_help_button");
    /** @type {string} */
    self.href = message.feedback;
    /** @type {string} */
    self.target = "_blank";
  };
  /**
   * @param {Object} d
   * @return {undefined}
   */
  options.ha = function(d) {
    var link = d.$(".gt_fullbg");
    var a = d.$(".gt_box_tips");
    if (d.config.link) {
      link.href = a.href = d.config.link;
      /** @type {string} */
      link.target = a.target = "_blank";
    } else {
      /** @type {string} */
      a.style.display = "none";
      link.removeAttribute("href");
      /** @type {string} */
      link.style.cursor = "default";
    }
  };
  /**
   * @param {Element} elem
   * @param {string} bind
   * @return {undefined}
   */
  options.na = function(elem, bind) {
    if (elem) {
      var values = bind.split(" ");
      var columns = elem.className.split(" ");
      /** @type {number} */
      var i = 0;
      var valuesLen = values.length;
      for (;i < valuesLen;i++) {
        if (inArray(values[i], columns) == -1) {
          columns.push(values[i]);
        }
      }
      elem.className = columns.join(" ");
    }
  };
  /**
   * @param {Element} callback
   * @param {string} property
   * @return {undefined}
   */
  options.oa = function(callback, property) {
    if (callback) {
      if ("string" == typeof callback) {
        callback = makeIterator(callback);
      }
      var index;
      var codeSegments = property.split(" ");
      var list = callback.className.split(" ");
      /** @type {number} */
      var i = 0;
      var valuesLen = codeSegments.length;
      for (;i < valuesLen;i++) {
        index = inArray(codeSegments[i], list);
        if (index != -1) {
          list.splice(index, 1);
        }
      }
      callback.className = list.join(" ");
    }
  };
  /**
   * @param {Element} o
   * @param {string} obj
   * @return {?}
   */
  options.pa = function(o, obj) {
    var reversed = o.className.split(" ");
    return inArray(obj, reversed) != -1;
  };
  /**
   * @param {Object} data
   * @param {Object} opt_attributes
   * @param {Function} fn
   * @return {undefined}
   */
  options.x = function(data, opt_attributes, fn) {
    /**
     * @return {undefined}
     */
    var remove = function() {
      /** @type {Date} */
      var defaultCenturyStart = new Date;
      var gl = from.X(opt_attributes);
      var locals = {};
      /** @type {boolean} */
      var g = false;
      /** @type {number} */
      var i = 0;
      /**
       * @return {undefined}
       */
      var init = function() {
        if (!(i < gl)) {
          if (g) {
            data.config.retry += 1;
            self.p("status", "auto", data.id);
            data.refresh();
          } else {
            /** @type {number} */
            data.config.retry = 0;
            /** @type {number} */
            var type = perm ? -2 : (new Date).getTime() - defaultCenturyStart.getTime();
            fn(locals, type);
          }
        }
      };
      from.d(opt_attributes, function(key, entity) {
        load(data, entity.replace(".jpg", message.webp), function(dataAndEvents, value) {
          i += 1;
          if (!g) {
            if (dataAndEvents) {
              if ("fullbg" !== key) {
                /** @type {boolean} */
                g = true;
              } else {
                /** @type {boolean} */
                locals[key] = false;
              }
            } else {
              if (!perm && (value.src && (value.src.indexOf(".webp") > -1 && (!value.width || value.width < 10)))) {
                /** @type {string} */
                message.webp = ".jpg";
                /** @type {boolean} */
                g = true;
              } else {
                /** @type {Image} */
                locals[key] = value;
              }
            }
          }
          init();
        });
      });
    };
    if (message.webp) {
      remove();
    } else {
      node.P("WebPLoaded", remove);
    }
  };
  /**
   * @param {Object} item
   * @param {boolean} isSorted
   * @return {undefined}
   */
  options.ka = function(item, isSorted) {
    var $ = item.$;
    var oldHeight = item.config.height;
    /** @type {string} */
    $(".gt_box_holder").style.height = oldHeight + "px";
    if (perm) {
      /** @type {string} */
      $(".gt_cut_fullbg").style.height = oldHeight + "px";
      /** @type {string} */
      $(".gt_cut_bg").style.height = oldHeight + "px";
      /** @type {string} */
      $(".gt_curtain_bg_wrap").style.height = oldHeight + "px";
      /** @type {string} */
      $(".gt_curtain_bg").style.height = oldHeight + "px";
      /** @type {string} */
      $(".gt_cut_curtain").style.height = oldHeight + "px";
    }
    var type = item.config.type;
    if ("slide" == type) {
      options.x(item, {
        fullbg : item.config.fullbg,
        bg : item.config.bg,
        slice : item.config.slice
      }, function(data, y) {
        store.qa(data.fullbg.src, data.bg.src, item, isSorted);
        self.p("imgload", y, item.id);
        var el = $(".gt_slice");
        if (perm) {
          /** @type {string} */
          el.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + data.slice.src + '")';
        } else {
          /** @type {string} */
          el.style.backgroundImage = "url(" + data.slice.src + ")";
          /** @type {string} */
          el.style.width = (data.slice.width || 60) + "px";
          /** @type {string} */
          el.style.height = (data.slice.height || 60) + "px";
        }
        /** @type {string} */
        el.style.left = item.config.xpos + "px";
        /** @type {string} */
        el.style.top = item.config.ypos + "px";
        setTimeout(function() {
          self.p("status", "ready", item.id);
          assert.ma("ready", item);
          node.q("statusChange", item.id);
        }, 400);
      });
    } else {
      /** @type {number} */
      var backoff = 900;
      if (isSorted) {
        /** @type {number} */
        backoff = 0;
      }
      options.x(item, {
        fullbg : item.config.fullbg,
        bg : item.config.bg
      }, function(data, y) {
        var ui = $(".gt_curtain_button");
        self.p("imgload", y, item.id);
        /** @type {string} */
        ui.style.top = item.config.ypos + "px";
        /** @type {string} */
        ui.style.left = item.config.xpos + "px";
        store.qa(data.fullbg.src, data.bg.src, item, isSorted);
        setTimeout(function() {
          self.p("status", "ready", item.id);
          assert.ma("ready", item);
          node.q("statusChange", item.id);
        }, backoff);
      });
    }
  };
  /**
   * @param {?} mapper
   * @param {?} animated
   * @return {?}
   */
  that.prototype.appendTo = function(mapper, animated) {
    return self.f("loaded", this.id) ? options.ea.call(this, mapper, animated) : node.P("loaded", function() {
      options.ea.call(this, mapper, animated);
    }, this.id), this;
  };
  /**
   * @param {Object} a
   * @return {undefined}
   */
  options.fa = function(a) {
    var item = {};
    /**
     * @param {string} state
     * @param {Object} id
     * @return {?}
     */
    a.$ = function(state, id) {
      return state && id ? void(item[id] = state) : item[state];
    };
  };
  var d = function() {
    /** @type {function (Element, string): undefined} */
    var each = options.na;
    /** @type {function (Element, string): undefined} */
    var fn = options.oa;
    /**
     * @param {?} obj
     * @param {number} opt_attributes
     * @param {number} type
     * @return {?}
     */
    var queue = function(obj, opt_attributes, type) {
      /**
       * @return {undefined}
       */
      var run = function() {
        if (kind && opt_attributes) {
          each(obj, "gt_animate");
          setTimeout(function() {
            each(obj, "gt_hide");
          });
          setTimeout(function() {
            fn(obj, "gt_show");
          }, 20);
          setTimeout(function() {
            fn(obj, "gt_animate");
          }, opt_attributes);
        } else {
          fn(obj, "gt_show");
          each(obj, "gt_hide");
        }
      };
      return type ? setTimeout(run, type) : void run();
    };
    /**
     * @param {string} type
     * @param {number} opt_attributes
     * @param {number} t
     * @return {?}
     */
    var scroll = function(type, opt_attributes, t) {
      /**
       * @return {undefined}
       */
      var animate = function() {
        if (kind && opt_attributes) {
          each(type, "gt_animate");
          setTimeout(function() {
            fn(type, "gt_hide");
          });
          setTimeout(function() {
            each(type, "gt_show");
          }, 20);
          setTimeout(function() {
            fn(type, "gt_animate");
          }, opt_attributes + 20);
        } else {
          fn(type, "gt_hide");
          each(type, "gt_show");
        }
      };
      return t ? setTimeout(animate, t) : void animate();
    };
    /**
     * @param {number} obj
     * @param {boolean} type
     * @param {boolean} threshold
     * @param {boolean} fn
     * @param {Function} handler
     * @return {?}
     */
    var promise = function(obj, type, threshold, fn, handler) {
      /**
       * @return {undefined}
       */
      var resolve = function() {
        if (kind && type) {
          each(obj, "gt_animate");
          if ("function" == typeof fn) {
            fn();
          }
          if ("function" == typeof handler) {
            setTimeout(handler, 0);
          }
          setTimeout(function() {
            fn(obj, "gt_animate");
          }, type);
        } else {
          if ("function" == typeof handler) {
            handler();
          }
        }
      };
      return threshold ? setTimeout(resolve, threshold) : void resolve();
    };
    return{
      /** @type {function (?, number, number): ?} */
      o : queue,
      /** @type {function (string, number, number): ?} */
      ma : scroll,
      /** @type {function (number, boolean, boolean, boolean, Function): ?} */
      l : promise
    };
  }();
  var store = function() {
    /**
     * @return {?}
     */
    var format = function() {
      var copies;
      /** @type {Array.<string>} */
      var segments = "6_11_7_10_4_12_3_1_0_5_2_9_8".split("_");
      /** @type {Array} */
      var out = [];
      /** @type {number} */
      var i = 0;
      /** @type {number} */
      var padLength = 52;
      for (;i < padLength;i++) {
        /** @type {number} */
        copies = 2 * parseInt(segments[parseInt(i % 26 / 2)]) + i % 2;
        if (!(parseInt(i / 2) % 2)) {
          copies += i % 2 ? -1 : 1;
        }
        copies += i < 26 ? 26 : 0;
        out.push(copies);
      }
      return out;
    };
    /**
     * @param {Object} fn
     * @return {undefined}
     */
    var run = function(fn) {
      var suiteView = fn(".gt_fullbg");
      var html = fn(".gt_cut_fullbg");
      var obj = fn(".gt_bg");
      var DOT_CALL_NO_PARENS = fn(".gt_cut_bg");
      var content = fn(".gt_slice");
      var elements = fn(".gt_curtain");
      /** @type {string} */
      suiteView.style.backgroundImage = "none";
      /** @type {string} */
      obj.style.backgroundImage = "none";
      /** @type {string} */
      elements.style.backgroundImage = "none";
      /** @type {string} */
      content.style.backgroundImage = "none";
      d.o(suiteView);
      d.o(obj);
      d.o(elements);
      d.o(content);
      d.o(html);
      d.o(DOT_CALL_NO_PARENS);
    };
    /**
     * @param {Object} scope
     * @param {boolean} col
     * @return {undefined}
     */
    var update = function(scope, col) {
      /** @type {number} */
      var a = 300;
      /** @type {number} */
      var attributes = 600;
      if (col) {
        /** @type {number} */
        a = attributes = 0;
      }
      var doc = scope.$;
      d.ma(doc(".gt_fullbg"), a);
      if ("slide" == scope.config.type) {
        d.ma(doc(".gt_bg"), 0, a);
        d.ma(doc(".gt_slice"), 0, a);
      } else {
        d.ma(doc(".gt_curtain"), attributes);
        d.ma(doc(".gt_curtain_button"), attributes);
      }
    };
    /**
     * @param {string} name
     * @param {string} options
     * @param {?} element
     * @param {Element} id
     * @param {Object} scope
     * @return {?}
     */
    var setup = function(name, options, element, id, scope) {
      var segs = options.split("/pictures/gt/")[1].split("/");
      /** @type {boolean} */
      var h = 8 !== segs[0].length;
      if (!h) {
        return void(element.style.backgroundImage = "url(" + options + ")");
      }
      var _i;
      var _len;
      var position;
      /** @type {Array} */
      var list = [];
      if (self.f(name + "Arr", scope.id)) {
        list = self.f(name + "Arr", scope.id);
        /** @type {number} */
        _i = 0;
        _len = list.length;
        for (;_i < _len;_i++) {
          /** @type {string} */
          list[_i].style.backgroundImage = "url(" + options + ")";
        }
      } else {
        self.p(name + "Arr", list, scope.id);
        var el;
        var xs = format();
        /** @type {Element} */
        var elem = document.createElement("div");
        /** @type {string} */
        elem.className = "gt_cut_" + name + "_slice";
        /** @type {number} */
        _i = 0;
        _len = xs.length;
        for (;_i < _len;_i++) {
          /** @type {string} */
          position = "-" + (xs[_i] % 26 * 12 + 1) + "px " + (xs[_i] > 25 ? -scope.config.height / 2 : 0) + "px";
          /** @type {Element} */
          el = elem.cloneNode();
          /** @type {string} */
          el.style.backgroundImage = "url(" + options + ")";
          list.push(el);
          id.appendChild(el);
          /** @type {string} */
          el.style.backgroundPosition = position;
        }
      }
      d.ma(scope.$(".gt_cut_" + name));
    };
    /**
     * @param {?} options
     * @param {string} type
     * @param {Object} scope
     * @param {boolean} obj
     * @return {undefined}
     */
    var init = function(options, type, scope, obj) {
      var url = scope.$;
      run(url);
      if (options) {
        setup("fullbg", options, url(".gt_fullbg"), url(".gt_cut_fullbg"), scope);
      }
      if ("slide" == scope.config.type) {
        setup("bg", type, url(".gt_bg"), url(".gt_cut_bg"), scope);
      } else {
        setup("curtain", type, url(".gt_curtain_bg"), url(".gt_cut_curtain"), scope);
      }
      setTimeout(function() {
        update(scope, obj);
      }, 100);
    };
    /**
     * @param {number} config
     * @return {?}
     */
    var Plugin = function(config) {
      var c;
      var y;
      var ret = {
        h : null,
        w : 11
      };
      /** @type {Array} */
      var _coords = [];
      var codeSegments = format();
      /** @type {number} */
      var cy = 0;
      /** @type {number} */
      var x = config / 2;
      /** @type {number} */
      ret.h = x + 1;
      /** @type {number} */
      var i = 0;
      var valuesLen = codeSegments.length;
      for (;i < valuesLen;i++) {
        /** @type {number} */
        c = codeSegments[i] % 26 * 12 + 1;
        /** @type {number} */
        y = codeSegments[i] > 25 ? x : 0;
        if (i > 25) {
          /** @type {number} */
          cy = x;
        }
        _coords[i] = {};
        /** @type {number} */
        _coords[i].cx = i % 26 * 10;
        /** @type {number} */
        _coords[i].cy = cy;
        _coords[i].ix = -c + _coords[i].cx;
        /** @type {number} */
        _coords[i].iy = -y + cy;
      }
      return ret.all = _coords, ret;
    };
    /**
     * @param {?} img
     * @param {HTMLCanvasElement} canvas
     * @param {(number|string)} height
     * @param {(number|string)} w
     * @return {undefined}
     */
    var draw = function(img, canvas, height, w) {
      /** @type {Element} */
      var cvs = document.createElement("canvas");
      cvs.width = img.width;
      /** @type {(number|string)} */
      cvs.height = height;
      var ctx = cvs.getContext("2d");
      ctx.drawImage(img, 0, 0);
      var a = canvas.getContext("2d");
      /** @type {(number|string)} */
      canvas.height = height;
      /** @type {(number|string)} */
      canvas.width = w;
      /** @type {number} */
      var th = height / 2;
      /** @type {number} */
      var width = 10;
      var codeSegments = format();
      /** @type {number} */
      var i = 0;
      var valuesLen = codeSegments.length;
      for (;i < valuesLen;i += 1) {
        /** @type {number} */
        var minx = codeSegments[i] % 26 * 12 + 1;
        /** @type {number} */
        var miny = codeSegments[i] > 25 ? th : 0;
        var id2 = ctx.getImageData(minx, miny, width, th);
        a.putImageData(id2, i % 26 * 10, i > 25 ? th : 0);
      }
    };
    return{
      /** @type {function (?, string, Object, boolean): undefined} */
      qa : init,
      /** @type {function (Object): undefined} */
      ra : run,
      /** @type {function (number): ?} */
      sa : Plugin,
      /** @type {function (?, HTMLCanvasElement, (number|string), (number|string)): undefined} */
      e : draw
    };
  }();
  /** @type {string} */
  var rvar = "move";
  /** @type {string} */
  var modId = "down";
  /** @type {string} */
  var ol = "up";
  /** @type {string} */
  var SCROLL = "scroll";
  /** @type {string} */
  var BLUR = "blur";
  /** @type {string} */
  var focusEvent = "focus";
  /** @type {string} */
  var UNLOAD = "unload";
  var doc = {};
  doc.evts = {
    down : ["mousedown", "touchstart", "pointerdown", "MSPointerDown"],
    move : ["mousemove", "touchmove", "pointermove", "MSPointerMove"],
    up : ["mouseup", "touchend", "pointerup", "MSPointerUp"],
    cancel : ["touchcancel"],
    scroll : [SCROLL],
    gyroscope : ["deviceorientation"],
    click : ["click"],
    blur : [BLUR],
    focus : [focusEvent],
    unload : [UNLOAD]
  };
  /** @type {Array} */
  doc.z = [];
  /**
   * @param {string} value
   * @param {?} name
   * @return {?}
   */
  doc.f = function(value, name) {
    var e;
    /** @type {number} */
    var i = 0;
    /** @type {number} */
    var valuesLen = doc.z.length;
    for (;i < valuesLen;i++) {
      if (e = doc.z[i], e.dom == value && e.event == name) {
        return e;
      }
    }
    return e = {
      dom : value,
      event : name,
      handlerList : [],
      /**
       * @return {undefined}
       */
      ta : function() {
      }
    }, doc.z.push(e), e;
  };
  /**
   * @param {Object} node
   * @param {string} name
   * @param {Function} func
   * @return {undefined}
   */
  doc.u = function(node, name, func) {
    var wrapHandler;
    var names = doc.evts[name];
    var descriptor = doc.f(node, name);
    /** @type {number} */
    var t = 0;
    var len = names.length;
    for (;t < len;t++) {
      if (descriptor.handlerList.length) {
        wrapHandler = descriptor.ta;
        if (window.addEventListener) {
          node.removeEventListener(names[t], wrapHandler, false);
        } else {
          if (window.attachEvent) {
            node.detachEvent("on" + names[t], wrapHandler);
          }
        }
      }
      if (window.addEventListener) {
        descriptor.handlerList.push(func);
        /**
         * @param {?} el
         * @return {undefined}
         */
        descriptor.ta = function(el) {
          /** @type {number} */
          var i = 0;
          var valuesLen = descriptor.handlerList.length;
          for (;i < valuesLen;i++) {
            descriptor.handlerList[i](el).call(node);
          }
        };
        node.addEventListener(names[t], func, false);
      } else {
        if (window.attachEvent) {
          node.attachEvent("on" + names[t], func);
        }
      }
    }
  };
  /**
   * @param {Object} el
   * @param {string} name
   * @param {?} f
   * @return {undefined}
   */
  doc.ua = function(el, name, f) {
    var events = doc.evts[name];
    var win = doc.f(el, name);
    /** @type {Array} */
    win.handlerList = [];
    /** @type {number} */
    var i = 0;
    var l = events.length;
    for (;i < l;i++) {
      if (window.removeEventListener) {
        el.removeEventListener(events[i], f, false);
      } else {
        if (window.detachEvent) {
          el.detachEvent("on" + events[i], f);
        }
      }
    }
  };
  var h = {};
  /**
   * @param {Object} type
   * @return {undefined}
   */
  h.ma = function(type) {
    var selectElement = type.$;
    h.l(0, type, true);
    d.ma(selectElement(".gt_guide_tip"), 500);
    d.ma(selectElement(".gt_slider_knob"), 500);
  };
  /**
   * @param {Object} obj
   * @return {undefined}
   */
  h.o = function(obj) {
    var doc = obj.$;
    d.o(doc(".gt_bg"), 500);
    d.o(doc(".gt_slider_knob"), 500);
    d.o(doc(".gt_guide_tip"), 500);
    setTimeout(function() {
      h.l(0, obj, 0);
    }, 500);
  };
  /**
   * @param {boolean} dataAndEvents
   * @param {Object} options
   * @return {?}
   */
  h.ta = function(dataAndEvents, options) {
    var p = this;
    var jQuery = p.$;
    var o = jQuery(".gt_slice");
    var elements = jQuery(".gt_slider_knob");
    if (options && options.type) {
      return console.ma("fail", p, 3E3), assert.ma("lock", p), d.ma(jQuery(".gt_fullbg"), 300), void setTimeout(function() {
        done(options, p);
      }, 500);
    }
    if (dataAndEvents || "error" === options.message) {
      console.ma("error", p);
      assert.ma("error", p);
      self.p("status", "error", p.id);
      node.q("error", p.id);
    } else {
      if (options.success) {
        var deferred = jQuery(".gt_flash");
        self.p("score", options.score, p.id);
        console.ma("success", p);
        assert.ma("success", p);
        if (!kind) {
          d.ma(jQuery(".gt_ie_success"));
        }
        d.ma(deferred, 1500);
        d.o(deferred, 0, 1600);
        d.ma(jQuery(".gt_fullbg"), 1500);
        $.va(options.validate, p);
        node.q("success", p.id);
        setTimeout(function() {
          self.p("status", "success", p.id);
          node.q("statusChange", p.id);
        }, 400);
      } else {
        if ("fail" == options.message) {
          console.ma("fail", p);
          assert.ma("fail", p);
          d.o(o, 100);
          d.ma(o, 100, 100);
          d.o(o, 100, 200);
          d.ma(o, 100, 300);
          d.l(o, 400, 500, false, function() {
            h.l(0, p, true);
          });
          d.l(elements, 400, 500);
          node.q("fail", p.id);
          setTimeout(function() {
            self.p("status", "ready", p.id);
            assert.ma("ready", p);
            node.q("statusChange", p.id);
            d.ma(jQuery(".gt_guide_tip"), 500);
          }, 1E3);
        } else {
          if ("forbidden" == options.message) {
            console.ma("forbidden", p);
            assert.ma("forbidden", p);
            node.q("forbidden", p.id);
            setTimeout(function() {
              self.p("status", "auto", p.id);
              p.refresh();
            }, 4E3);
          } else {
            if ("abuse" == options.message) {
              console.ma("abuse", p);
              assert.ma("fail", p);
              node.q("abuse", p.id);
              setTimeout(function() {
                self.p("status", "auto", p.id);
                p.refresh();
              }, 1500);
            }
          }
        }
      }
    }
  };
  /**
   * @param {number} a
   * @param {Object} s
   * @param {(boolean|number|string)} expectedNumberOfNonCommentArgs
   * @return {undefined}
   */
  h.l = function(a, s, expectedNumberOfNonCommentArgs) {
    var fn = s.$;
    var properties = fn(".gt_slider_knob");
    var r = fn(".gt_slice");
    a = a < 2 ? 2 : a > 198 ? 198 : a;
    if (expectedNumberOfNonCommentArgs) {
      /** @type {number} */
      a = 0;
    }
    /** @type {string} */
    properties.style.left = a + "px";
    /** @type {string} */
    r.style.left = s.config.xpos + a + "px";
  };
  /**
   * @param {Object} item
   * @return {?}
   */
  h.wa = function(item) {
    var attr = item.$;
    return function(e) {
      var field = self.f("status", item.id);
      if ("ready" == field && ("slide" == item.config.type && 2 != e.button)) {
        if (item.config.fullpage) {
          var o = createElement("Fullpage");
          o.C(item);
          o.F();
        }
        if (!("pointerdown" !== e.type)) {
          if (!self.f("pointerdown", item.id)) {
            self.p("pointerdown", true, item.id);
          }
        }
        self.p("startTime", new Date, item.id);
        self.p("status", "moving", item.id);
        node.q("statusChange", item.id);
        if (e.preventDefault) {
          e.preventDefault();
        } else {
          /** @type {boolean} */
          e.returnValue = false;
        }
        var target = attr(".gt_slider_knob");
        options.na(attr(".gt_slice"), "moving");
        options.na(target, "moving");
        var x = e.clientX || e.changedTouches && e.changedTouches[0].clientX;
        var y = e.clientY || e.changedTouches && e.changedTouches[0].clientY;
        var box = target.getBoundingClientRect();
        self.p("startX", x, item.id);
        self.p("startY", y, item.id);
        t.h([Math.round(box.left - x), Math.round(box.top - y), 0], item.id);
        t.r([0, 0, 0], item.id);
        d.o(attr(".gt_fullbg"), 300);
        d.o(attr(".gt_guide_tip"), 500);
      }
    };
  };
  /**
   * @param {Object} item
   * @return {?}
   */
  h.xa = function(item) {
    return function(e) {
      var field = self.f("status", item.id);
      if ("moving" == field && ("slide" == item.config.type && (!self.f("pointerdown", item.id) || "pointermove" === e.type))) {
        if (e.preventDefault) {
          e.preventDefault();
        } else {
          /** @type {boolean} */
          e.returnValue = false;
        }
        var x2 = self.f("startX", item.id);
        var y2 = self.f("startY", item.id);
        /** @type {number} */
        var b = (e.changedTouches && e.changedTouches[0].clientX || e.clientX) - x2;
        /** @type {number} */
        var dy = y2 - (e.changedTouches && e.changedTouches[0].clientY || e.clientY);
        /** @type {number} */
        var out = parseInt(b);
        h.l(out, item);
        t.r([Math.round(b), Math.round(dy), (new Date).getTime() - self.f("startTime", item.id)], item.id);
        if (item.config.benchmark) {
          createElement("Benchmark").B(item);
        }
      }
    };
  };
  /**
   * @param {Object} data
   * @return {?}
   */
  h.ya = function(data) {
    var doc = data.$;
    return function(e) {
      var cornerFallback = self.f("status", data.id);
      if ("moving" == cornerFallback && ("slide" == data.config.type && (!self.f("pointerdown", data.id) || "pointerup" === e.type))) {
        if (data.config.fullpage) {
          var p = createElement("Fullpage");
          p.G();
        }
        cornerFallback = self.p("status", "lock", data.id);
        assert.ma("lock", data);
        options.oa(doc(".gt_slice"), "moving");
        options.oa(doc(".gt_slider_knob"), "moving");
        var topLevelPrimitive = self.f("startX", data.id);
        var y2 = self.f("startY", data.id);
        /** @type {number} */
        var i = (e.changedTouches && e.changedTouches[0].clientX || e.clientX) - topLevelPrimitive;
        /** @type {number} */
        var dy = y2 - (e.changedTouches && e.changedTouches[0].clientY || e.clientY);
        /** @type {Date} */
        var now = new Date;
        self.p("endTime", now, data.id);
        t.r([Math.round(i), Math.round(dy), now.getTime() - self.f("startTime", data.id)], data.id);
        /** @type {number} */
        var key = parseInt(i);
        var actual = t.s(data.id);
        if (data.config.offline) {
          var jQuery = createElement("Offline");
          return void h.ta.call(data, false, jQuery.ajax(key, self.f("endTime", data.id).getTime() - self.f("startTime", data.id), data));
        }
        var o = {
          gt : data.config.gt,
          challenge : data.config.challenge,
          userresponse : h.t(key, data.config.challenge),
          passtime : self.f("endTime", data.id).getTime() - self.f("startTime", data.id),
          imgload : self.f("imgload", data.id),
          a : actual
        };
        if (data.config.benchmark) {
          var res = createElement("Benchmark").k(data);
          o.b1 = res.b1;
          o.b2 = res.b2;
        }
        fn(data.config.apiserver + "ajax.php?" + validate(o), h.ta, data);
      }
    };
  };
  /**
   * @param {Object} p
   * @return {undefined}
   */
  h.la = function(p) {
    var pl = p.$;
    var el = pl(".gt_slider_knob");
    var f = h.xa(p);
    var o = h.ya(p);
    self.p("moveHandler", f, p.id);
    self.p("upHandler", o, p.id);
    doc.u(el, modId, h.wa(p));
    doc.u(document, rvar, f);
    doc.u(document, ol, o);
  };
  /**
   * @param {number} b
   * @param {string} input
   * @return {?}
   */
  h.t = function(b, input) {
    var value = input.slice(32);
    /** @type {Array} */
    var oSpace = [];
    /** @type {number} */
    var n = 0;
    for (;n < value.length;n++) {
      var h = value.charCodeAt(n);
      /** @type {number} */
      oSpace[n] = h > 57 ? h - 87 : h - 48;
    }
    value = 36 * oSpace[0] + oSpace[1];
    var tval = Math.round(b) + value;
    input = input.slice(0, 32);
    var sel;
    /** @type {Array} */
    var rows = [[], [], [], [], []];
    var matches = {};
    /** @type {number} */
    var method = 0;
    /** @type {number} */
    n = 0;
    var il = input.length;
    for (;n < il;n++) {
      sel = input.charAt(n);
      if (!matches[sel]) {
        /** @type {number} */
        matches[sel] = 1;
        rows[method].push(sel);
        method++;
        /** @type {number} */
        method = 5 == method ? 0 : method;
      }
    }
    var j;
    var y = tval;
    /** @type {number} */
    var i = 4;
    /** @type {string} */
    var str = "";
    /** @type {Array} */
    var c = [1, 2, 5, 10, 50];
    for (;y > 0;) {
      if (y - c[i] >= 0) {
        /** @type {number} */
        j = parseInt(Math.random() * rows[i].length, 10);
        str += rows[i][j];
        y -= c[i];
      } else {
        rows.splice(i, 1);
        c.splice(i, 1);
        i -= 1;
      }
    }
    return str;
  };
  /**
   * @param {Object} d
   * @return {?}
   */
  var scroll = function(d) {
    return function() {
      run(d);
    };
  };
  /**
   * @param {Object} item
   * @return {undefined}
   */
  var run = function(item) {
    var a = item.config.show_delay;
    var args = item.config.hide_delay;
    var message = self.f("status", item.id);
    /** @type {boolean} */
    var _tryInitOnFocus = "ready" == message || ("success" == message || "error" == message);
    var _isFocused = self.f("in", item.id);
    var html = item.$(".gt_widget");
    var results = self.f("hideDelay", item.id) || [];
    /** @type {number} */
    var i = 0;
    var l = results.length;
    for (;i < l;i++) {
      clearTimeout(results[i]);
    }
    /** @type {Array} */
    results = [];
    var res;
    if (_tryInitOnFocus && !_isFocused) {
      if (options.pa(html, "gt_hide")) {
        return;
      }
      if ("curtain" == item.config.type) {
        var callback = createElement("Curtain");
        res = callback.setFloat(false, item, args);
        /** @type {Array} */
        results = results.concat(res);
      }
      results.push(d.o(html, 400, args));
      self.p("hideDelay", results, item.id);
    } else {
      if (options.pa(html, "gt_show")) {
        return;
      }
      if (a = _tryInitOnFocus ? a : 0, "curtain" == item.config.type) {
        callback = createElement("Curtain");
        res = callback.setFloat(true, item, a);
        /** @type {Array} */
        results = results.concat(res);
      }
      results.push(d.ma(html, 400, a));
      self.p("hideDelay", results, item.id);
    }
  };
  /**
   * @param {Object} element
   * @param {Object} a
   * @return {?}
   */
  var f = function(element, a) {
    if (!element || (null == element || "undefined" == typeof element)) {
      return false;
    }
    if (a.compareDocumentPosition) {
      var right = a.compareDocumentPosition(element);
      return!(20 !== right && 0 !== right);
    }
    if (a.contains) {
      return a.contains(element);
    }
    for (;element != a && element;) {
      element = element.parentNode;
    }
    return!!element;
  };
  /**
   * @param {Object} res
   * @return {?}
   */
  var handler = function(res) {
    return function(e) {
      next(e, res);
    };
  };
  /**
   * @param {Event} event
   * @param {Object} item
   * @return {undefined}
   */
  var next = function(event, item) {
    var field = event.target || event.srcElement;
    var val = self.f("in", item.id);
    var value = f(field, item.dom);
    if (item.config.sandbox) {
      if (!value) {
        value = f(field, item.cloneDom);
      }
    }
    if (val != value) {
      if (item.config.sandbox) {
        options.da(item.cloneDom, item.dom);
      }
      self.p("in", value, item.id);
      node.q("hoverChange", item.id);
    }
  };
  /**
   * @param {Object} e
   * @return {undefined}
   */
  var move = function(e) {
    var attr = e.$;
    self.p("in", false, e.id);
    d.o(attr(".gt_widget"));
    doc.u(document, "move", handler(e));
    doc.u(document, "up", handler(e));
    node.U("statusChange", scroll(e), e.id);
    node.U("hoverChange", scroll(e), e.id);
  };
  var s = {};
  /**
   * @param {string} input
   * @param {Date} d
   * @return {?}
   */
  s.Y = function(input, d) {
    input = input || message.lang;
    var inp = init(input);
    return{
      ".gt_mask" : {},
      ".gt_popup_wrap" : {
        ".gt_popup_header" : {
          ".gt_popup_ready" : inp.popup_ready,
          ".gt_popup_finish" : inp.popup_finish,
          ".gt_popup_cross" : {}
        },
        ".gt_popup_box" : d ? d.Y(input) : options.Y(input)
      }
    };
  };
  /**
   * @param {Object} obj
   * @return {undefined}
   */
  s.ma = function(obj) {
    var c = obj.$;
    d.ma(obj.dom, 400);
    if ("success" == self.f("status", obj.id)) {
      obj.refresh();
    }
    d.o(c(".gt_popup_finish"));
    d.ma(c(".gt_popup_ready"));
  };
  /**
   * @param {?} obj
   * @return {undefined}
   */
  s.o = function(obj) {
    d.o(obj.dom, 400);
  };
  /**
   * @param {Object} e
   * @return {?}
   */
  s.h = function(e) {
    if (e.config.mobile) {
      return e;
    }
    var enablePopup = self.f("enablePopup", e.id);
    if (void 0 == enablePopup) {
      self.p("enablePopup", true, e.id);
    }
    node.U("success", function() {
      var c = e.$;
      d.ma(c(".gt_popup_finish"));
      d.o(c(".gt_popup_ready"));
      setTimeout(function() {
        s.o(e);
        var $button = self.f("popup_btn", e.id);
        if ($button) {
          $button.click();
        }
      }, 1E3);
    }, e.id);
    var m = e.$;
    doc.u(m(".gt_mask"), "click", function() {
      s.o(e);
    });
    doc.u(m(".gt_popup_cross"), "click", function() {
      s.o(e);
    });
  };
  /**
   * @param {string} msg
   * @return {?}
   */
  s.za = function(msg) {
    var o = this;
    o.$;
    if (o.config.mobile) {
      return o;
    }
    if (!self.f("DOMReady", o.id)) {
      return void node.P("DOMReady", function() {
        s.za.call(o, msg);
      }, o.id);
    }
    if ("popup" === o.config.product) {
      var b = options._(msg, "bindOn");
      if (!b) {
        return void setTimeout(function() {
          s.za.call(o, msg);
        }, 100);
      }
      self.p("popup_btn", b, o.id);
      /** @type {Element} */
      var d = document.createElement("div");
      d.innerHTML = b.outerHTML;
      d = d.childNodes[0];
      /** @type {string} */
      b.style.display = "none";
      /** @type {string} */
      b.id = "origin_" + b.id;
      options.Z(b, d);
      try {
        /** @type {string} */
        d.href = "javascript:;";
      } catch (e) {
      }
      self.p("popup_copy_btn", d, o.id);
      doc.u(d, "click", function(ev) {
        if (ev.preventDefault) {
          ev.preventDefault();
        } else {
          /** @type {boolean} */
          ev.returnValue = false;
        }
        var enablePopup = self.f("enablePopup", o.id);
        if (enablePopup) {
          s.ma(o);
        }
      });
    }
  };
  /**
   * @param {string} mapper
   * @return {?}
   */
  that.prototype.bindOn = function(mapper) {
    return self.f("loaded", this.id) ? s.za.call(this, mapper) : node.P("loaded", function() {
      s.za.call(this, mapper);
    }, this.id), this;
  };
  /**
   * @return {undefined}
   */
  that.prototype.enable = function() {
    self.p("enablePopup", true, this.id);
  };
  /**
   * @return {undefined}
   */
  that.prototype.disable = function() {
    self.p("enablePopup", false, this.id);
  };
  /**
   * @return {?}
   */
  that.prototype.show = function() {
    var o = this;
    var from = self.f("enablePopup", o.id);
    return from && s.ma(o), o;
  };
  /**
   * @return {?}
   */
  that.prototype.hide = function() {
    var suiteView = this;
    return s.o(suiteView), suiteView;
  };
  /**
   * @param {Object} a
   * @return {?}
   */
  var cb = function(a) {
    return function() {
      complete(a);
    };
  };
  /**
   * @param {Object} that
   * @return {?}
   */
  var complete = function(that) {
    if (that.config.retry > 3) {
      return log("can not loaded imgs"), void node.q("error", that.id);
    }
    var status = self.f("status", that.id);
    if ("ready" === status || ("success" === status || "auto" === status)) {
      if (node.q("statusChange", that.id), self.p("status", "lock", that.id), $.ra(that), that.config.mobile) {
        var e = createElement("SVG");
        e.g(that, true);
      } else {
        if ("gyroscope" === that.config.type) {
          var _ = createElement("Gyro");
          _.g(that);
        } else {
          var table = that.$;
          store.ra(that.$);
          d.o(table(".gt_ie_success"));
          assert.ma("lock", that);
        }
      }
      if (that.config.offline) {
        var target = createElement("Offline");
        return void done(target.h(that), that);
      }
      fn(that.config.apiserver + "refresh.php?" + validate({
        challenge : that.config.challenge,
        gt : that.config.gt
      }), function(dataAndEvents, count) {
        return dataAndEvents ? (log("refresh error"), void node.q("error", that.id)) : void done(count, that);
      }, that);
    }
  };
  /**
   * @param {Object} params
   * @param {Object} data
   * @return {undefined}
   */
  var done = function(params, data) {
    if (node.q("refresh", data.id), data.config.debugConfig && (params = extend(data.config.debugConfig, params)), callback(data.config, params), data.config.mobile) {
      var e = createElement("SVG");
      e.w(data);
    } else {
      if ("gyroscope" === data.config.type) {
        createElement("Gyro").w(data);
      } else {
        options.ga(data);
        options.ha(data);
        options.ka(data);
      }
    }
    clearTimeout(self.f("autoRefresh", data.id));
    self.p("autoRefresh", setTimeout(function() {
      data.refresh();
    }, 54E4), data.id);
  };
  /**
   * @return {undefined}
   */
  that.prototype.refresh = function() {
    complete(this);
  };
  /**
   * @param {Object} e
   * @return {undefined}
   */
  var create = function(e) {
    if (e.config.mobile) {
      var that = self.f("eles", e.id);
      doc.u(that.refresh, "click", cb(e));
    } else {
      doc.u(e.$(".gt_refresh_button"), "click", cb(e));
    }
    self.p("autoRefresh", setTimeout(function() {
      e.refresh();
    }, 54E4), e.id);
    node.U("success", function() {
      clearTimeout(self.f("autoRefresh", e.id));
    }, e.id);
  };
  var t = function() {
    /**
     * @param {Object} id
     * @param {?} className
     * @return {undefined}
     */
    var getElementById = function(id, className) {
      self.p("arr", [id], className);
    };
    /**
     * @param {Array} begin
     * @param {?} length
     * @return {undefined}
     */
    var slice = function(begin, length) {
      self.f("arr", length).push(begin);
    };
    /**
     * @param {Array} spec
     * @return {?}
     */
    var run = function(spec) {
      var field;
      var value;
      var ext;
      /** @type {Array} */
      var sort = [];
      /** @type {number} */
      var name = 0;
      /** @type {Array} */
      var arr = [];
      /** @type {number} */
      var i = 0;
      /** @type {number} */
      var padLength = spec.length - 1;
      for (;i < padLength;i++) {
        /** @type {number} */
        field = Math.round(spec[i + 1][0] - spec[i][0]);
        /** @type {number} */
        value = Math.round(spec[i + 1][1] - spec[i][1]);
        /** @type {number} */
        ext = Math.round(spec[i + 1][2] - spec[i][2]);
        arr.push([field, value, ext]);
        if (!(0 == field && (0 == value && 0 == ext))) {
          if (0 == field && 0 == value) {
            name += ext;
          } else {
            sort.push([field, value, ext + name]);
            /** @type {number} */
            name = 0;
          }
        }
      }
      return 0 !== name && sort.push([field, value, name]), sort;
    };
    /**
     * @param {(boolean|number)} input
     * @return {?}
     */
    var normalize = function(input) {
      /** @type {string} */
      var number = "()*,-./0123456789:?@ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqr";
      /** @type {number} */
      var n = number.length;
      /** @type {string} */
      var u = "";
      /** @type {number} */
      var idx = Math.abs(input);
      /** @type {number} */
      var i = parseInt(idx / n);
      if (i >= n) {
        /** @type {number} */
        i = n - 1;
      }
      if (i) {
        /** @type {string} */
        u = number.charAt(i);
      }
      idx %= n;
      /** @type {string} */
      var a = "";
      return input < 0 && (a += "!"), u && (a += "$"), a + u + number.charAt(idx);
    };
    /**
     * @param {Array} arr
     * @return {?}
     */
    var every = function(arr) {
      /** @type {Array} */
      var codeSegments = [[1, 0], [2, 0], [1, -1], [1, 1], [0, 1], [0, -1], [3, 0], [2, -1], [2, 1]];
      /** @type {string} */
      var prevSources = "stuvwxyz~";
      /** @type {number} */
      var i = 0;
      /** @type {number} */
      var valuesLen = codeSegments.length;
      for (;i < valuesLen;i++) {
        if (arr[0] == codeSegments[i][0] && arr[1] == codeSegments[i][1]) {
          return prevSources[i];
        }
      }
      return 0;
    };
    /**
     * @param {?} length
     * @return {?}
     */
    var ready = function(length) {
      var copies;
      var tokens = run(self.f("arr", length));
      /** @type {Array} */
      var tagNameArr = [];
      /** @type {Array} */
      var out = [];
      /** @type {Array} */
      var UNICODE_SPACES = [];
      /** @type {number} */
      var ti = 0;
      var nTokens = tokens.length;
      for (;ti < nTokens;ti++) {
        copies = every(tokens[ti]);
        if (copies) {
          out.push(copies);
        } else {
          tagNameArr.push(normalize(tokens[ti][0]));
          out.push(normalize(tokens[ti][1]));
        }
        UNICODE_SPACES.push(normalize(tokens[ti][2]));
      }
      return tagNameArr.join("") + "!!" + out.join("") + "!!" + UNICODE_SPACES.join("");
    };
    return{
      /** @type {function (?): ?} */
      s : ready,
      /** @type {function (Array, ?): undefined} */
      r : slice,
      /** @type {function (Object, ?): undefined} */
      h : getElementById
    };
  }();
  var console = {};
  /**
   * @param {Element} result
   * @param {string} flag
   * @param {string} cb
   * @param {Object} obj
   * @return {undefined}
   */
  console.qa = function(result, flag, cb, obj) {
    var props = extend(init(cb)[flag]);
    if (obj) {
      var prop;
      for (prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          props[1] = props[1].replace(prop, obj[prop]);
        }
      }
    }
    /** @type {Element} */
    var e = document.createElement("span");
    /** @type {string} */
    e.className = "gt_info_type";
    setText(e, props[0]);
    /** @type {Element} */
    var cell = document.createElement("span");
    /** @type {string} */
    cell.className = "gt_info_content";
    setText(cell, props[1]);
    setText(result, "");
    result.appendChild(e);
    result.appendChild(cell);
  };
  /**
   * @param {string} type
   * @param {number} opt_attributes
   * @param {number} thisObj
   * @return {undefined}
   */
  console.ma = function(type, opt_attributes, thisObj) {
    var $ = opt_attributes.$;
    if ("undefined" == typeof thisObj) {
      /** @type {number} */
      thisObj = 2E3;
    }
    var html = $(".gt_info");
    var div = $(".gt_info_tip");
    /** @type {string} */
    div.className = "gt_info_tip " + type;
    var to = self.f("infoHide", opt_attributes.id);
    if (to) {
      clearTimeout(to);
    }
    var interval;
    /** @type {number} */
    var countInfo = 3;
    /**
     * @return {undefined}
     */
    var run = function() {
      console.qa(slide, type, opt_attributes.config.lang, {
        count : countInfo
      });
      countInfo--;
      if (countInfo == -1) {
        clearInterval(interval);
      }
    };
    var slide = $(".gt_info_text");
    var suiteView = {};
    if ("success" == type) {
      /** @type {number} */
      var sec = (self.f("endTime", opt_attributes.id).getTime() - self.f("startTime", opt_attributes.id)) / 1E3;
      /** @type {string} */
      suiteView.sec = sec.toFixed(1);
      /** @type {number} */
      suiteView.score = 100 - self.f("score", opt_attributes.id);
    } else {
      if ("forbidden" == type) {
        run();
        /** @type {number} */
        interval = setInterval(run, 1E3);
        /** @type {number} */
        thisObj = 4E3;
      }
    }
    if ("forbidden" != type) {
      console.qa(slide, type, opt_attributes.config.lang, suiteView);
    }
    d.ma(html, 200);
    if (thisObj) {
      self.p("infoHide", d.o(html, 300, thisObj), opt_attributes.id);
    }
  };
  var assert = {};
  /**
   * @param {string} type
   * @param {number} opt_attributes
   * @return {undefined}
   */
  assert.ma = function(type, opt_attributes) {
    var $ = opt_attributes.$;
    /** @type {string} */
    $(".gt_ajax_tip").className = "gt_ajax_tip " + type;
  };
  var $ = {};
  /**
   * @param {string} out
   * @param {Object} p
   * @return {undefined}
   */
  $.Aa = function(out, p) {
    var pl = p.$;
    var value = out ? p.config.challenge : "";
    var filter = out ? out.split("|")[0] : "";
    var domain = out ? out.split("|")[0] + "|jordan" : "";
    self.p("geetest_challenge", value, p.id);
    self.p("geetest_validate", filter, p.id);
    self.p("geetest_seccode", domain, p.id);
    pl(".geetest_challenge").value = value;
    pl(".geetest_validate").value = filter;
    pl(".geetest_seccode").value = domain;
  };
  /**
   * @param {string} next
   * @param {Object} prop
   * @return {undefined}
   */
  $.va = function(next, prop) {
    $.Aa(next, prop);
  };
  /**
   * @param {Object} fn
   * @return {undefined}
   */
  $.ra = function(fn) {
    $.Aa(false, fn);
  };
  /**
   * @return {?}
   */
  that.prototype.getValidate = function() {
    var geetest_seccode = {
      geetest_challenge : self.f("geetest_challenge", this.id),
      geetest_validate : self.f("geetest_validate", this.id),
      geetest_seccode : self.f("geetest_seccode", this.id)
    };
    return!!geetest_seccode.geetest_challenge && geetest_seccode;
  };
  var opts = {};
  /**
   * @param {string} message
   * @param {Object} that
   * @return {undefined}
   */
  opts.onStatusChange = function(message, that) {
    var fn = self.f("onStatusChange", that.id);
    if ("function" == typeof fn) {
      fn.call(that, message);
    }
    /** @type {number} */
    var marginDiv = "Success" == message ? 1 : 0;
    if ("function" == typeof window.gt_custom_ajax) {
      if (that.config.mobile) {
        window.gt_custom_ajax(marginDiv, that.dom.id, message);
      } else {
        window.gt_custom_ajax(marginDiv, that.$, message);
      }
    }
  };
  /**
   * @return {undefined}
   */
  opts.onSuccess = function() {
    var that = this;
    var fn = self.f("onSuccess", that.id);
    if ("function" == typeof fn) {
      fn.call(that);
    }
    opts.onStatusChange("Success", that);
  };
  /**
   * @return {undefined}
   */
  opts.onRefresh = function() {
    var that = this;
    var fn = self.f("onRefresh", that.id);
    if ("function" == typeof fn) {
      fn.call(that);
    }
    if ("function" == typeof window.gt_custom_refresh) {
      window.gt_custom_refresh(that.$);
    }
  };
  /**
   * @return {undefined}
   */
  opts.onFail = function() {
    var fn = self.f("onFail", this.id);
    if ("function" == typeof fn) {
      fn.call(this);
    }
    opts.onStatusChange("Fail", this);
  };
  /**
   * @return {undefined}
   */
  opts.onForbidden = function() {
    opts.onStatusChange("Forbidden", this);
  };
  /**
   * @return {undefined}
   */
  opts.onAbuse = function() {
    opts.onStatusChange("Abuse", this);
  };
  /**
   * @param {?} cause
   * @return {undefined}
   */
  opts.onError = function(cause) {
    var e = this;
    var handler = self.f("onError", e.id);
    if ("function" == typeof handler) {
      handler.call(e);
    }
    if ("function" == typeof window.gt_custom_error) {
      window.gt_custom_error(e, e.$);
    }
    if (!cause) {
      if (e.config.mobile) {
        node.q("SvgError", e.id);
      } else {
        self.p("status", "error", e.id);
        assert.ma("error", e);
        console.ma("error", e, false);
      }
      clearTimeout(self.f("autoRefresh", e.id));
    }
  };
  /**
   * @return {undefined}
   */
  opts.onReady = function() {
    var fn = self.f("onReady", this.id);
    if ("function" == typeof fn) {
      fn.call(this);
    }
    if ("function" == typeof window.onGeetestLoaded) {
      window.onGeetestLoaded(this);
    }
  };
  /**
   * @param {Object} value
   * @return {?}
   */
  that.prototype.onSuccess = function(value) {
    if ("function" == typeof value) {
      return self.p("onSuccess", value, this.id), this;
    }
    throw new Error(result.callbackError);
  };
  /**
   * @param {Object} name
   * @return {?}
   */
  that.prototype.onFail = function(name) {
    if ("function" == typeof name) {
      return self.p("onFail", name, this.id), this;
    }
    throw new Error(result.callbackError);
  };
  /**
   * @param {Object} name
   * @return {?}
   */
  that.prototype.onRefresh = function(name) {
    if ("function" == typeof name) {
      return self.p("onRefresh", name, this.id), this;
    }
    throw new Error(result.callbackError);
  };
  /**
   * @param {Object} name
   * @return {?}
   */
  that.prototype.onError = function(name) {
    if ("function" == typeof name) {
      return self.p("onError", name, this.id), this;
    }
    throw new Error(result.callbackError);
  };
  /**
   * @param {string} message
   * @return {?}
   */
  that.prototype.onStatusChange = function(message) {
    if ("function" == typeof message) {
      return self.p("onStatusChange", message, this.id), this;
    }
    throw new Error(result.callbackError);
  };
  /**
   * @param {Object} fn
   * @return {?}
   */
  that.prototype.onReady = function(fn) {
    if ("function" == typeof fn) {
      return self.p("onReady", fn, this.id), this;
    }
    throw new Error(result.callbackError);
  };
  /**
   * @return {?}
   */
  that.prototype.getPasstime = function() {
    return self.f("endTime", this.id) - self.f("startTime", this.id);
  };
  /**
   * @return {?}
   */
  that.prototype.hideRefresh = function() {
    var that = this;
    if (!self.f("DOMReady", that.id)) {
      return node.P("DOMReady", function() {
        that.hideRefresh();
      }, that.id), this;
    }
    if (that.config.mobile) {
      var event = self.f("eles", that.id);
      event.refresh.parentNode.removeChild(event.refresh);
      event.refresh = {
        style : {}
      };
    } else {
      var marginDiv = this.$ && this.$(".gt_refresh_button");
      if (!marginDiv) {
        return;
      }
      /** @type {string} */
      marginDiv.style.width = "0";
      try {
        marginDiv.style.setProperty("margin-left", "0", "important");
      } catch (d) {
      }
    }
  };
  /**
   * @param {Object} item
   * @param {number} val
   * @return {undefined}
   */
  var update = function(item, val) {
    self.p("scale", val / 260, item.id);
    var options = self.f("eles", item.id);
    /** @type {string} */
    item.dom.style.width = val + "px";
    /** @type {string} */
    options.svg.style.width = val + "px";
    /** @type {string} */
    options.svg.style.height = Math.ceil(val * (item.config.height + self.f("panelHeight", item.id)) / 260) + "px";
  };
  /**
   * @param {(number|string)} z
   * @return {?}
   */
  that.prototype.zoom = function(z) {
    var e = this;
    if (!self.f("DOMReady", e.id)) {
      return node.P("DOMReady", function() {
        e.zoom(z);
      }, e.id), this;
    }
    if (!e.config.mobile && "gyroscope" !== e.config.type) {
      return this;
    }
    if ("string" == typeof z && z.indexOf("%") > -1) {
      var cDigit = getComputedStyle ? getComputedStyle(e.dom.parentNode).width : e.dom.parentNode.currentStyle.width;
      /** @type {number} */
      z = parseInt(z) * parseInt(cDigit) / 100;
    }
    return update(e, parseInt(z)), this;
  };
  /**
   * @return {?}
   */
  that.prototype.destroy = function() {
    var item = this;
    if (!self.f("DOMReady", item.id)) {
      return node.P("DOMReady", function() {
        item.destroy();
      }, item.id), this;
    }
    if (item.dom && (item.dom.parentNode && item.dom.parentNode.removeChild(item.dom)), "popup" === item.config.product) {
      var li = self.f("popup_btn", item.id);
      var tabPage = self.f("popup_copy_btn", item.id);
      if (tabPage) {
        if (tabPage.parentNode) {
          tabPage.parentNode.removeChild(tabPage);
        }
      }
      if (li) {
        /** @type {string} */
        li.style.display = "inline-block";
        li.id = li.id.replace("origin_", "");
      }
      var script2 = item.$(".gt_input");
      if (script2) {
        if (script2.parentNode) {
          script2.parentNode.removeChild(script2);
        }
      }
    }
    doc.ua(document, "move", self.f("moveHandler", item.id));
    doc.ua(document, "up", self.f("upHandler", item.id));
    self.T(item.id);
    node.T(item.id);
  };
  S.Q("Event", function() {
    return node;
  });
  S.Q("Animate", function() {
    return d;
  });
  S.Q("Browser", function() {
    return{
      /** @type {function (): ?} */
      getCSS3 : cleanup
    };
  });
  S.Q("Request", function() {
    return fn;
  });
  S.Q("Data", function() {
    return self;
  });
  S.Q("Decoder", function() {
    return store;
  });
  S.Q("Dom", function() {
    return options;
  });
  S.Q("DomEvent", function() {
    return doc;
  });
  S.Q("Info", function() {
    return console;
  });
  S.Q("Input", function() {
    return $;
  });
  S.Q("getLang", function() {
    return init;
  });
  S.Q("Popup", function() {
    return s;
  });
  S.Q("Slide", function() {
    return h;
  });
  S.Q("Tip", function() {
    return assert;
  });
  S.Q("Tool", function() {
    return{
      /** @type {function (Object, Object): ?} */
      copy : extend,
      /** @type {function (Object): ?} */
      toParam : validate,
      /** @type {function (?): ?} */
      isFunction : isFunction,
      /** @type {function (): ?} */
      random : timestamp,
      /** @type {function (?, Array, number): ?} */
      inArray : inArray,
      /** @type {function (Object, ?): undefined} */
      removeProperty : jQuery,
      /** @type {function (Element, string): undefined} */
      setText : setText,
      /** @type {function (number, number): ?} */
      slice : slice,
      /** @type {function (?, ?): ?} */
      arrayEqual : checkAllowableRegions,
      /** @type {function (Array, Array): ?} */
      diff : diff,
      /** @type {function (Function): ?} */
      isArray : isArray,
      /** @type {function (Object, string, Function): undefined} */
      getResource : load,
      /** @type {function (string): undefined} */
      log : log
    };
  });
  S.Q("Analyse", function() {
    return t;
  });
  S.Q("Global", function() {
    return message;
  });
  S.Q("Flow", function() {
    return user;
  });
  S.Q("Modules", function() {
    return timeMap;
  });
  S.Q("Flow", function() {
    return user;
  });
  S.Q("getModule", function() {
    return createElement;
  });
  S.Q("Utility", function() {
    return from;
  });
  /** @type {string} */
  event.type = "shell";
  target = target || window;
  return target.Geetest ? (target.Geetest.type = target.Geetest.type || void 0, target.Geetest.type !== event.type ? ("slide" === that.type ? event.slide = that : (event.slide = target.Geetest, event[that.type] = that), target.Geetest = event) : target.Geetest[that.type] || (target.Geetest[that.type] = that)) : (event[that.type] = that, target.Geetest = event), target.Geetest.define || (target.Geetest.define = function(moduleName, v, px) {
    S.Q(moduleName, v, px);
  }), target.Geetest;
});
