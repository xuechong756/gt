window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  BlockScript: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ad15byzqWtK/rx/RBHHdLmw", "BlockScript");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        audio: {
          default: null,
          type: cc.AudioClip
        }
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  DateFormat: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c3205xeAgtCHJmSkqa8rzGn", "DateFormat");
    "use strict";
    var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    window.DateFormat = function() {
      var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|'[^']*'|'[^']*'/g;
      var timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
      var timezoneClip = /[^-+\dA-Z]/g;
      var masks = {
        default: "ddd mmm dd yyyy HH:MM:ss",
        shortDate: "m/d/yy",
        mediumDate: "mmm d, yyyy",
        longDate: "mmmm d, yyyy",
        fullDate: "dddd, mmmm d, yyyy",
        shortTime: "h:MM TT",
        mediumTime: "h:MM:ss TT",
        longTime: "h:MM:ss TT Z",
        isoDate: "yyyy-mm-dd",
        isoTime: "HH:MM:ss",
        isoDateTime: "yyyy-mm-dd'T'HH:MM:sso",
        isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",
        expiresHeaderFormat: "ddd, dd mmm yyyy HH:MM:ss Z"
      };
      var i18n = {
        dayNames: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
        monthNames: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
      };
      var pad = function pad(val, len) {
        val = String(val);
        len = len || 2;
        while (val.length < len) val = "0" + val;
        return val;
      };
      var getWeek = function getWeek(date) {
        var targetThursday = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        targetThursday.setDate(targetThursday.getDate() - (targetThursday.getDay() + 6) % 7 + 3);
        var firstThursday = new Date(targetThursday.getFullYear(), 0, 4);
        firstThursday.setDate(firstThursday.getDate() - (firstThursday.getDay() + 6) % 7 + 3);
        var ds = targetThursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
        targetThursday.setHours(targetThursday.getHours() - ds);
        var weekDiff = (targetThursday - firstThursday) / 6048e5;
        return 1 + Math.floor(weekDiff);
      };
      var getDayOfWeek = function getDayOfWeek(date) {
        var dow = date.getDay();
        0 === dow && (dow = 7);
        return dow;
      };
      var kindOf = function kindOf(val) {
        if (null === val) return "null";
        if (void 0 === val) return "undefined";
        if ("object" !== ("undefined" === typeof val ? "undefined" : _typeof(val))) return "undefined" === typeof val ? "undefined" : _typeof(val);
        if (Array.isArray(val)) return "array";
        return {}.toString.call(val).slice(8, -1).toLowerCase();
      };
      return function(mask, utc, gmt) {
        var date = this;
        if (1 === arguments.length && "string" === kindOf(date) && !/\d/.test(date)) {
          mask = date;
          date = void 0;
        }
        date = date || new Date();
        date instanceof Date || (date = new Date(date));
        if (isNaN(date)) throw TypeError("Invalid date");
        mask = String(masks[mask] || mask || masks["default"]);
        var maskSlice = mask.slice(0, 4);
        if ("UTC:" === maskSlice || "GMT:" === maskSlice) {
          mask = mask.slice(4);
          utc = true;
          "GMT:" === maskSlice && (gmt = true);
        }
        var _ = utc ? "getUTC" : "get";
        var d = date[_ + "Date"]();
        var D = date[_ + "Day"]();
        var m = date[_ + "Month"]();
        var y = date[_ + "FullYear"]();
        var H = date[_ + "Hours"]();
        var M = date[_ + "Minutes"]();
        var s = date[_ + "Seconds"]();
        var L = date[_ + "Milliseconds"]();
        var o = utc ? 0 : date.getTimezoneOffset();
        var W = getWeek(date);
        var N = getDayOfWeek(date);
        var flags = {
          d: d,
          dd: pad(d),
          ddd: i18n.dayNames[D],
          dddd: i18n.dayNames[D + 7],
          m: m + 1,
          mm: pad(m + 1),
          mmm: i18n.monthNames[m],
          mmmm: i18n.monthNames[m + 12],
          yy: String(y).slice(2),
          yyyy: y,
          h: H % 12 || 12,
          hh: pad(H % 12 || 12),
          H: H,
          HH: pad(H),
          M: M,
          MM: pad(M),
          s: s,
          ss: pad(s),
          l: pad(L, 3),
          L: pad(Math.round(L / 10)),
          t: H < 12 ? "a" : "p",
          tt: H < 12 ? "am" : "pm",
          T: H < 12 ? "A" : "P",
          TT: H < 12 ? "AM" : "PM",
          Z: gmt ? "GMT" : utc ? "UTC" : (String(date).match(timezone) || [ "" ]).pop().replace(timezoneClip, ""),
          o: (o > 0 ? "-" : "+") + pad(100 * Math.floor(Math.abs(o) / 60) + Math.abs(o) % 60, 4),
          S: [ "th", "st", "nd", "rd" ][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10],
          W: W,
          N: N
        };
        return mask.replace(token, function(match) {
          if (match in flags) return flags[match];
          return match.slice(1, match.length - 1);
        });
      };
    }();
    cc._RF.pop();
  }, {} ],
  LanguageData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "61de062n4dJ7ZM9/Xdumozn", "LanguageData");
    "use strict";
    var Polyglot = require("polyglot.min");
    var polyInst = null;
    window.i18n || (window.i18n = {
      languages: {},
      curLang: ""
    });
    false;
    function loadLanguageData(language) {
      return window.i18n.languages[language];
    }
    function initPolyglot(data) {
      data && (polyInst ? polyInst.replace(data) : polyInst = new Polyglot({
        phrases: data,
        allowMissing: true
      }));
    }
    module.exports = {
      init: function init(language) {
        if (language === window.i18n.curLang) return;
        var data = loadLanguageData(language) || {};
        window.i18n.curLang = language;
        initPolyglot(data);
        this.inst = polyInst;
      },
      t: function t(key, opt) {
        if (polyInst) return polyInst.t(key, opt);
      },
      inst: polyInst,
      updateSceneRenderers: function updateSceneRenderers() {
        var rootNodes = cc.director.getScene().children;
        var allLocalizedLabels = [];
        for (var i = 0; i < rootNodes.length; ++i) {
          var labels = rootNodes[i].getComponentsInChildren("LocalizedLabel");
          Array.prototype.push.apply(allLocalizedLabels, labels);
        }
        for (var _i = 0; _i < allLocalizedLabels.length; ++_i) {
          var label = allLocalizedLabels[_i];
          if (!label.node.active) continue;
          label.updateLabel();
        }
        var allLocalizedSprites = [];
        for (var _i2 = 0; _i2 < rootNodes.length; ++_i2) {
          var sprites = rootNodes[_i2].getComponentsInChildren("LocalizedSprite");
          Array.prototype.push.apply(allLocalizedSprites, sprites);
        }
        for (var _i3 = 0; _i3 < allLocalizedSprites.length; ++_i3) {
          var sprite = allLocalizedSprites[_i3];
          if (!sprite.node.active) continue;
          sprite.updateSprite(window.i18n.curLang);
        }
      }
    };
    cc._RF.pop();
  }, {
    "polyglot.min": "polyglot.min"
  } ],
  LocalizedLabel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "744dcs4DCdNprNhG0xwq6FK", "LocalizedLabel");
    "use strict";
    var i18n = require("LanguageData");
    function debounce(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function later() {
          timeout = null;
          immediate || func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        callNow && func.apply(context, args);
      };
    }
    cc.Class({
      extends: cc.Component,
      editor: {
        executeInEditMode: true,
        menu: "i18n/LocalizedLabel"
      },
      properties: {
        dataID: {
          get: function get() {
            return this._dataID;
          },
          set: function set(val) {
            if (this._dataID !== val) {
              this._dataID = val;
              false;
              this.updateLabel();
            }
          }
        },
        _dataID: ""
      },
      onLoad: function onLoad() {
        false;
        i18n.inst || i18n.init();
        this.fetchRender();
      },
      fetchRender: function fetchRender() {
        var label = this.getComponent(cc.Label);
        if (label) {
          this.label = label;
          this.updateLabel();
          return;
        }
      },
      updateLabel: function updateLabel() {
        if (!this.label) {
          cc.error("Failed to update localized label, label component is invalid!");
          return;
        }
        var localizedString = i18n.t(this.dataID);
        localizedString && (this.label.string = i18n.t(this.dataID));
      }
    });
    cc._RF.pop();
  }, {
    LanguageData: "LanguageData"
  } ],
  LocalizedSprite: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f34ac2GGiVOBbG6XlfvgYP4", "LocalizedSprite");
    "use strict";
    var SpriteFrameSet = require("SpriteFrameSet");
    cc.Class({
      extends: cc.Component,
      editor: {
        executeInEditMode: true,
        inspector: "packages://i18n/inspector/localized-sprite.js",
        menu: "i18n/LocalizedSprite"
      },
      properties: {
        spriteFrameSet: {
          default: [],
          type: SpriteFrameSet
        }
      },
      onLoad: function onLoad() {
        this.fetchRender();
      },
      fetchRender: function fetchRender() {
        var sprite = this.getComponent(cc.Sprite);
        if (sprite) {
          this.sprite = sprite;
          this.updateSprite(window.i18n.curLang);
          return;
        }
      },
      getSpriteFrameByLang: function getSpriteFrameByLang(lang) {
        for (var i = 0; i < this.spriteFrameSet.length; ++i) if (this.spriteFrameSet[i].language === lang) return this.spriteFrameSet[i].spriteFrame;
      },
      updateSprite: function updateSprite(language) {
        if (!this.sprite) {
          cc.error("Failed to update localized sprite, sprite component is invalid!");
          return;
        }
        var spriteFrame = this.getSpriteFrameByLang(language);
        !spriteFrame && this.spriteFrameSet[0] && (spriteFrame = this.spriteFrameSet[0].spriteFrame);
        this.sprite.spriteFrame = spriteFrame;
      }
    });
    cc._RF.pop();
  }, {
    SpriteFrameSet: "SpriteFrameSet"
  } ],
  SceneManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7dcdd2Cxu5ERKb9Kxwr3uIe", "SceneManager");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        sceneParent: cc.Node,
        mask: cc.Node,
        root: cc.Node,
        firstScenePfb: cc.Prefab
      },
      onLoad: function onLoad() {
		this.autoAdapteScreen();
        window.sceneManager = this;
        this.CurrentModule = null;
        this.current = null;
        this.next = null;
        this.stack = [];
        this.actualShow(cc.instantiate(this.firstScenePfb), [ true ]);
        this.mask.active = false;
        if (cc.winSize.height / cc.winSize.width > 2) {
          cc.log(cc.winSize.height / cc.winSize.width);
          this.root.width = cc.winSize.width;
          this.root.height = cc.winSize.height;
        }
      },
	  autoAdapteScreen:function(){
			// 适配解决方案
			let _canvas = cc.Canvas.instance;
		// 设计分辨率比
			let _rateR = _canvas.designResolution.height/_canvas.designResolution.width;
		// 显示分辨率比
			let _rateV = cc.winSize.height/cc.winSize.width;
			console.log("winSize: rateR: "+_rateR+" rateV: "+_rateV);
			if (_rateV > _rateR)
			{
				_canvas.fitHeight = false;
				_canvas.fitWidth = true;
				console.log("winSize: fitWidth");
			}
			else
			{
				_canvas.fitHeight = true;
				_canvas.fitWidth = false;
				console.log("winSize: fitHeight");
			}
	  },
      asyncLoad: function asyncLoad(key, cb) {
        var _this = this;
        var progressCB = function progressCB(done, total, item) {
          _this.current && _this.current.onprogress && _this.current.onprogress(done, total, item);
        };
        var pfbName = key;
        var url = "prefabs/sc_" + pfbName;
        this.mask.active = true;
        cc.loader.loadRes(url, progressCB, function(err, prefab) {
          _this.current && _this.current.ondone && _this.current.ondone();
          _this.mask.active = false;
          if (err) return cc.log(err);
          if (cb) {
            var it = cc.instantiate(prefab);
            it.pfbURL = url;
            it.name = key;
            it.autoCollect = true;
            cb(it);
          }
        });
      },
      pop: function pop() {
        this.actualShow(this.stack.pop(), null, true);
      },
      push: function push(name) {
        var _this2 = this;
        var args = Array.prototype.slice.call(arguments);
        var key = args.shift();
        cc.log("SceneManager show", key);
        if (this.current && key == this.current.name) return;
        this.stack.push(this.current);
        this.asyncLoad(key, function(next) {
          _this2.actualShow(next, args);
        });
      },
      forceShow: function forceShow(name) {
        var _this3 = this;
        var args = Array.prototype.slice.call(arguments);
        var key = args.shift();
        cc.log("SceneManager show", key);
        this.asyncLoad(key, function(next) {
          _this3.actualShow(next, args);
        });
      },
      show: function show(name) {
        var _this4 = this;
        var args = Array.prototype.slice.call(arguments);
        var key = args.shift();
        cc.log("SceneManager show", key);
        if (this.current && key == this.current.name) return;
        this.asyncLoad(key, function(next) {
          _this4.actualShow(next, args);
        });
      },
      reEnter: function reEnter() {
        this.actualShow(this.current);
      },
      actualShow: function actualShow(next, args, ispop) {
        UIMgr.clear();
        this.next = next;
        this.next.parent = this.sceneParent;
        this.next.zIndex = 0;
        this.current && (this.current.zIndex = 1);
        if (!ispop) {
          cc.log("args", args);
          next.onenter && next.onenter.apply(null, args);
        }
        this.ready(ispop);
      },
      ready: function ready() {
        if (!this.next) return;
        var prev = this.current;
        if (prev) {
          prev.onleave && prev.onleave();
          prev != this.next && (prev.parent = null);
        }
        this.current = this.next;
        this.next = null;
        this.sceneParent.children.length > 2 && cc.error("children count of scene parent is more than 1.", this.sceneParent.children.length);
      }
    });
    cc._RF.pop();
  }, {} ],
  SpriteFrameSet: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "97019Q80jpE2Yfz4zbuCZBq", "SpriteFrameSet");
    "use strict";
    var SpriteFrameSet = cc.Class({
      name: "SpriteFrameSet",
      properties: {
        language: "",
        spriteFrame: cc.SpriteFrame
      }
    });
    module.exports = SpriteFrameSet;
    cc._RF.pop();
  }, {} ],
  UIManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a948bFoTGxMWbr3oqqvsg7I", "UIManager");
    "use strict";
    var Effects = {
      NoEffect: {
        show: function show(layer) {},
        hide: function hide(layer, finish) {
          finish();
        }
      },
      MoveFromLeft: {
        show: function show(layer) {
          layer.node.setPosition(cc.p(1.5 * -cc.winSize.width, 0));
          layer.node.runAction(cc.moveTo(.2, cc.p(0, 0)));
        },
        hide: function hide(layer, finish) {
          layer.node.runAction(cc.sequence(cc.moveTo(.2, cc.p(1.5 * -cc.winSize.width, 0)), cc.callFunc(finish)));
        }
      },
      MoveFromRight: {
        show: function show(layer) {
          layer.node.setPosition(cc.p(1.5 * cc.winSize.width, 0));
          layer.node.runAction(cc.moveTo(.2, cc.p(0, 0)));
        },
        hide: function hide(layer, finish) {
          layer.node.runAction(cc.sequence(cc.moveTo(.2, cc.p(1.5 * cc.winSize.width, 0)), cc.callFunc(finish)));
        }
      },
      MoveFromTop: {
        show: function show(layer) {
          layer.node.setPosition(cc.p(0, 1.5 * cc.winSize.height));
          layer.node.runAction(cc.moveTo(.2, cc.p(0, 0)));
        },
        hide: function hide(layer, finish) {
          layer.node.runAction(cc.sequence(cc.moveTo(.2, cc.p(0, 1.5 * cc.winSize.height)), cc.callFunc(finish)));
        }
      },
      MoveFromBottom: {
        show: function show(layer) {
          layer.node.setPosition(cc.p(0, 1.5 * -cc.winSize.height));
          layer.node.runAction(cc.moveTo(.2, cc.p(0, 0)));
        },
        hide: function hide(layer, finish) {
          layer.node.runAction(cc.sequence(cc.moveTo(.2, cc.p(0, 1.5 * -cc.winSize.height)), cc.callFunc(finish)));
        }
      }
    };
    cc.Class({
      extends: cc.Component,
      properties: {
        uiParent: cc.Node,
        mask: cc.Node,
        tipTempNode: cc.Node,
        model: {
          visible: false,
          get: function get() {
            return this._model;
          }
        }
      },
      onLoad: function onLoad() {
        window.UIMgr = this;
        this._model = {
          prefabs: {},
          cache: {},
          stack: [],
          lockCount: 0,
          closeEvents: {}
        };
        this.waiting && (this.waiting.active = false);
      },
      checkIsLoaded: function checkIsLoaded(key) {
        return !!this.model.prefabs[key];
      },
      syncLoad: function syncLoad(key, cb) {
        var _this = this;
        cb = cb || function() {};
        this.model.prefabs[key] ? cb() : cc.loader.loadRes("prefabs/ui_" + key, function(err, prefab) {
          if (err) return cc.log(err);
          _this.model.prefabs[key] = prefab;
          cb();
        });
      },
      show: function show(name) {
        var _this2 = this;
        if (!name) return;
        var args = Array.prototype.slice.call(arguments);
        var params = {};
        args.splice(0, 1);
        if ("string" != typeof name) {
          params = name || {};
          name = params.name;
          if (!name) return;
        }
        this.syncLoad(name, function() {
          cc.log("show ", name);
          var setupLayer = function setupLayer(layer) {
            var count = _this2.model.stack.push(layer);
            layer.node.zIndex = 2 * count + 2;
            layer.node.parent = _this2.uiParent;
            layer.effect = params["effect"] ? Effects[params["effect"]] : Effects["NoEffect"];
            layer.effect.show(layer);
            layer.node.onenter && layer.node.onenter.apply(null, args);
          };
          if (params.multi || null == _this2.model.cache[name]) {
            var layer = {
              name: name,
              node: cc.instantiate(_this2.model.prefabs[name])
            };
            _this2.model.cache[name] = layer;
            setupLayer(layer);
          } else {
            var _layer = _this2.bringToTop(name);
            if (_layer) _layer.node.onenter && _layer.node.onenter.apply(null, args); else {
              _layer = _this2.model.cache[name];
              setupLayer(_layer);
            }
          }
          _this2.resetMask();
        });
      },
      bringToTop: function bringToTop(name) {
        for (var i = 0; i < this.model.stack.length; i++) {
          var layer = this.model.stack[i];
          if (layer.name == name) {
            this.model.stack.splice(i, 1);
            this.model.stack.push(layer);
            return layer;
          }
        }
        return null;
      },
      topName: function topName() {
        return 0 == this.model.stack.length ? "" : this.model.stack[this.model.stack.length - 1].name;
      },
      topNode: function topNode() {
        return 0 == this.model.stack.length ? "" : this.model.stack[this.model.stack.length - 1].node;
      },
      pop: function pop() {
        this.model.stack.length > 0 && this.close(this.model.stack[this.model.stack.length - 1].node);
      },
      addCloseEvents: function addCloseEvents(name, cb) {
        this.model.closeEvents[name] ? this.model.closeEvents[name].push(cb) : this.model.closeEvents[name] = [ cb ];
      },
      close: function close(node, effect) {
        var _this3 = this;
        if (node instanceof cc.Component) node = node.node; else if ("string" == typeof node) {
          if (!this.model.cache[node]) return;
          node = this.model.cache[node].node;
        }
        var found = null;
        for (var i = 0; i < this.model.stack.length; i++) {
          var layer = this.model.stack[i];
          if (layer.node == node) {
            this.model.stack.splice(i, 1)[0];
            found = layer;
            break;
          }
        }
        if (!found) return;
        var ff = Effects[effect] || found.effect;
        ff.hide(found, function() {
          found.node.parent = null;
          _this3.resetMask();
          var cbs = _this3.model.closeEvents[found.name] || [];
          _this3.model.closeEvents[found.name] = null;
          cbs.forEach(function(cb) {
            cb();
          });
        });
      },
      clear: function clear() {
        this.model.stack.forEach(function(layer) {
          layer.node.parent = null;
        });
        this.model.stack.length = 0;
        this.model.cache = {};
        this.model.closeEvents = {};
        this.resetMask();
      },
      resetMask: function resetMask() {
        var count = this.model.stack.length;
        this.mask.active = 0 != count;
        this.mask.zIndex = 2 * count + 1;
        window.wxRank && wxRank.showBanner(0 != count);
      },
      showTip: function showTip(text) {
        var node = cc.instantiate(this.tipTempNode);
        node.active = true;
        node.parent = this.tipTempNode.parent;
        node.getChildByName("label").getComponent(cc.Label).string = text;
        node.runAction(cc.sequence(cc.moveBy(.5, cc.v2(0, -100)), cc.delayTime(2), cc.moveBy(.5, cc.v2(0, 100)), cc.callFunc(function() {
          node.parent = null;
        })));
      },
      showLoading: function showLoading(data) {
        this.show("Loading", data);
      },
      dismissLoading: function dismissLoading() {
        this.close("Loading");
      },
      delayDismissLoading: function delayDismissLoading() {
        "Loading" == this.topName() && this.topNode().getComponent("Loading").delayClose();
      }
    });
    cc._RF.pop();
  }, {} ],
  data: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e556cwdNu1EfbHRLrDZX2/2", "data");
    "use strict";
    window.level_data = [ null, {
      init: "0000000020000000000000000090A00000000000000000100000000",
      tip: "0000000000000000000000000010100000000000000000000000000"
    }, {
      init: "00000200000000000000A0A00000000000000A0A000000000100000",
      tip: "0000000000000000000020200000000000000202000000000000000"
    }, {
      init: "00000000200000000000000000A09000000090A0000000000000010",
      tip: "0000000000000000000000000010100000002020000000000000000"
    }, {
      init: "000200000000000090A00A090A00999000AA0009000000000010000",
      tip: "0000000000000000101002020100102000210001000000000000000"
    }, {
      init: "00002000000090900000A0900000009000A000009090A0000000100",
      tip: "0000000000001010000010100000002000200000001010000000000"
    }, {
      init: "0000200000000000000000000000A000A009900B000000000001000",
      tip: "0000000000000000000000000000000000001001000000000000000"
    }, {
      init: "0200000000BC09A000000C0B0000000B0C000000A90CB0000000001",
      tip: "0000000000020200000001010000000202000000000220000000000"
    }, {
      init: "00200000000AAA00000090B0A0C0C0A0B09000000A0900000000100",
      tip: "0000000000012200000010100020102020000000000000000000000"
    }, {
      init: "00200000000CB0000CB00A9CB09ABC00BC00BC00000000000001000",
      tip: "0000000000011000000002200002200011001100000000000000000"
    }, {
      init: "0000000000000000C0B0CB0CBBC0BCA90A900000000000000020001",
      tip: "0000000000000000000000000010201102200000000000000000000"
    }, {
      init: "000020000000000000009000A000003000900000000000000010000",
      tip: "0000000000000000000010001000003000000000000000000000000"
    }, {
      init: "0000200000000009000006565040030043000009000000000001000",
      tip: "0000000000000000000000004010030000000000000000000000000"
    }, {
      init: "000200000000000040C0000000C04000000090A0000000000001000",
      tip: "0000000000000000101000000020200000001010000000000000000"
    }, {
      init: "002000000000000A0C0C0040900000B0B00A030A000000000000100",
      tip: "0000000000000001020000402000002010000101000000000000000"
    }, {
      init: "0002000000000300003000AC003C3003A3003000030000000001000",
      tip: "0000000000000300003000110011000300003000030000000000000"
    }, {
      init: "0020000000D030C000003000A00000A000A00000000000000000001",
      tip: "0000000000004020000040001000002000200000000000000000000"
    }, {
      init: "0020000000D0BB00C0B0C90ABB040C090A00040D000000000000100",
      tip: "0000000000002200101011000202000000000400000000000000000"
    }, {
      init: "0000000000090A09A09A0000000203300000A090L90AK0000000001",
      tip: "0000000000010201102200000000034000001020010200000000000"
    }, {
      init: "9020A00000A0M0900000D40CD430BC0000000000B0J030000000001",
      tip: "0000200000000010000001020130220000000000200030000000000"
    }, {
      init: "002000000000000B0A0A0000090E0B00000A0C09000000000000100",
      tip: "0000000000000000020200000100020000020201000000000000000"
    }, {
      init: "020000000034000A40D00000000BC0LEB3E00000M00340000000010",
      tip: "0000000000030001300000000001200013000000000400000000000"
    }, {
      init: "2003B00000DD04AEE000000003B0C90E0004A0BA000000000010000",
      tip: "0002200000000110000000000110100000041000000000000000000"
    }, {
      init: "0020000000090A4BCA4EE000IE0B0BE000EF000IB000BD000000100",
      tip: "0000000000000120023000000002010000000000000000000000000"
    }, {
      init: "02000M000K0E00000CB0E0430EE0D00000039000430A9000BC10000",
      tip: "0000000000000000000000000000000000041000400210000000000"
    }, {
      init: "020000000003006M000E00000CB09000000900C900000A0E0J01000",
      tip: "0000000000040020000000000010200000010021000002000000000"
    }, {
      init: "2000000000000007000D00000000009000900000000000000000001",
      tip: "0000000000000000000000000000002000200000000000000000000"
    }, {
      init: "002000000000000007090000090C0C0000090B0A000000000000100",
      tip: "0000000000000000000200000101010000020201000000000000000"
    }, {
      init: "200000000000B0C00B0A0000070900000009030A000000000000001",
      tip: "0000000000001020010100000001000000020202000000000000000"
    }, {
      init: "20000000007009070090ABAD0000004AB0D00000004A00000000100",
      tip: "0000000000000200001022000000000220000000003000000000000"
    }, {
      init: "0000200000E000000000C90A8LC09JAM0J99A09A000000000E10000",
      tip: "0000000000000000000012010010100000011000000000000000000"
    }, {
      init: "2000000000A000A7000E00000CB0A000000A00B9A00EE0000001000",
      tip: "0000000000200020000000000010200000010021200000000000000"
    }, {
      init: "0000200000000000000800008G00080000090009000000000010000",
      tip: "0000000000000000000000000000000000010001000000000000000"
    }, {
      init: "00200DE0HD0070090400009000F00G0B00000B03000I0A090000001",
      tip: "0000000000000001040000100000000000000203000002010000000"
    }, {
      init: "00200H000000A0AC000BE0M0000009C000A0B089G0000A00A001000",
      tip: "0000000000002021000100000000002000201001000002001000000"
    }, {
      init: "00200000009A08303000700CB04000700AB0400070EF004C0010000",
      tip: "0000000000010000100000010020000002002000000000410000000"
    }, {
      init: "0002000000A03C03700300E0000000A070C0E0E0A0A0J0000000100",
      tip: "0000000000101104000200000000001000100000202000000000000"
    }, {
      init: "0020000000907090F00000000C777C40003A777A00000000I000001",
      tip: "0000000000100000000000000100014000320002000000000000000"
    }, {
      init: "00200A90A9E3A4E9000CC0E0B00000E070E000009040CD000D00100",
      tip: "0000000012002301000210002000000000000000203010000000000"
    }, {
      init: "20D0K0000070009000I07000E00G0000BC97039C000009000C00100",
      tip: "0000000000000020000000000000000012000322000002000100000"
    }, {
      init: "200000000KA70A0000E0A00C000A0A70C0AA000A0060A0E0E000100",
      tip: "0000000000200200000010010000000020220001003000000000000"
    }, {
      init: "00020M000K9C00A0B0CI000I000E000F000F0000A4039L000J00010",
      tip: "0000000000000000102000000000000000000000040300000000000"
    }, {
      init: "02000M0C803B0099000CF0000000000B0A00000A3B0099G00A00010",
      tip: "0000000000020021000100000000000102000000420022000100000"
    }, {
      init: "02000000000700900D00E7CCEEC7CDE3CCH00D00000000000000010",
      tip: "0000000000000020000000120010100422000000000000000000000"
    }, {
      init: "00020000000C480G000H9080A07070A0809H000H0C0900000000100",
      tip: "0000000000011000000010000000002000000000020100000000000"
    }, {
      init: "000009020A00000C070B00000EB0CEBC0BC00000A0A0D0000000100",
      tip: "0000010000000002000200000010201102100000202000000000000"
    }, {
      init: "0000200000EB0E70CBA03BC0000900GE0A004CBE00BC900A0001000",
      tip: "0000000000010000111001100000000000004220002100000000000"
    }, {
      init: "000020000000MK0MMCB8009A0L900C00000AB3B300000EHHE000001",
      tip: "0000000000000000022000120010020000002413000000000000000"
    }, {
      init: "02000000007800D70A40700AB3B0BA00000900BA00000F000I01000",
      tip: "0000000000000000020000020410200000020022000000000000000"
    }, {
      init: "200000000077B39A0090900A48EE930007B0CB00D00D000I0I01000",
      tip: "0000000000002202001000000000000000001100000000000000000"
    }, {
      init: "00002M000090404E708E080700A0BC040349C00AEE009C900J00010",
      tip: "0000000000104030000000000000000102022002000010000000000"
    }, {
      init: "000000020000000N09000000000000000000090N000000010000000",
      tip: "0000000000000000010000000000000000000100000000000000000"
    }, {
      init: "00002000000000090A000000090N0000000N000B000000000010000",
      tip: "0000000000000001020000000200000000000001000000000000000"
    }, {
      init: "00002000008000300000N000N0000000B0C00000A000B0000000100",
      tip: "0000000000000030000000000000000010200000200010000000000"
    }, {
      init: "2000000E000000070B0A00000N000000000A0B0N000000000000001",
      tip: "0000000000000000020200000000000000020100000000000000000"
    }, {
      init: "00020EE00000000A70ND000D0C0300070ND0000000AB00000001000",
      tip: "0000000000000001000000000202000000000000002100000000000"
    }, {
      init: "002000000000N0NA0A0070C0E00000C0C0E00000A000B0000E00100",
      tip: "0000000000000000000000000000001010000000200010000000000"
    }, {
      init: "2000000000A000900000C030E0000080N0300000A0N0A0000000100",
      tip: "0000000000200020000010200000000000300000200010000000000"
    }, {
      init: "0002000000700EK090B000000HNDNG000000A4C0800EJ0000000100",
      tip: "0000000000000000102000000000000000002310000000000000000"
    }, {
      init: "200000000007AE0300E0000040NAN0BC0004E30A090A00000010000",
      tip: "0000000000002003000000000001001100040300020100000000000"
    }, {
      init: "20000E0H0E40003A000800000E0N0E000003090490C0N0000000100",
      tip: "0000000000400032000000000000000000010103201000000000000"
    }, {
      init: "00200C000E00000A0N0400000A0A0A00000B0N0C00000C090000001",
      tip: "0000000000000001000200000202010000010002000002010000000"
    }, {
      init: "00020M000K0AAB0BBN09CC00A0ACB000BC09BN090C003L04A000001",
      tip: "0000000000001201100222001002100012011002020030041000000"
    }, {
      init: "00200CB0CBB0A0CC0N0BBC0BC00000CB0CBB040CC0N0BBC0BC00100",
      tip: "0000012012202011000221021000001201220301100022102100000"
    }, {
      init: "2000000000C0E0N00000A080CA0308N0A0A00000C03030000000100",
      tip: "0000000000200000000010000202000020200000004030000000000"
    }, {
      init: "20000000007000090B00N0300M000G0B900A0C0A00000A0N0J01000",
      tip: "0000000000000002010000400000000120010201000002000000000"
    }, {
      init: "200000E000300B09A0ND000000000000000C70ND00000A007901000",
      tip: "0000000000400200100000000000000000010000000002000000000"
    }, {
      init: "00200M000I000000E0NA4CB0009C9A0ABC009E00LC0NE0000001000",
      tip: "0000000000000000000212100022110022000000020000000000000"
    }, {
      init: "0020000000D336D0E000AA0NA00000BB0BB000007N0990099010000",
      tip: "0000000000003000000001002000001202100000000210021000000"
    }, {
      init: "00020M000K0008000909G0N000000000N09B050H000009004000100",
      tip: "0000000000000000010200000000000000120300000002003000000"
    }, {
      init: "00200MA09KM0ENK3B000F00004C0000038B0E000004N90A90J10000",
      tip: "0000000000000004200000000420000040200000004010210000000"
    }, {
      init: "0020000000408B990BB400000FGEGI7N0N800000337330000000100",
      tip: "0000000000000200011000000000000000000000420330000000000"
    }, {
      init: "00020000008B08K00000M0K00F0000006NB0A900N00400000000010",
      tip: "0000000000010000000000000000000010002100000300000000000"
    }, {
      init: "0200090C007000000N000300G7B0A0B00C9A0NEJ033000000001000",
      tip: "0000010200000000000003000010201002120000043000000000000"
    }, {
      init: "00000F0E0IM3B39A009090NA48N093A000B07BC0L0EE00000001002",
      tip: "0000000000022002002010010000202000200110000000000000000"
    }, {
      init: "000000C00CA000N0CC00C3E300E2E003E3000000NCC0ACCCC000001",
      tip: "0000000000100000120024000000000000000000022020210000000"
    } ];
    cc._RF.pop();
  }, {} ],
  gamesettings: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3dc06HleHZDRZ1nagIjJUny", "gamesettings");
    "use strict";
    var _createClass = function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          "value" in descriptor && (descriptor.writable = true);
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        protoProps && defineProperties(Constructor.prototype, protoProps);
        staticProps && defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    var Block = {
      Origin: 0,
      Destination: 1,
      Blue: 2,
      Red: 3,
      Green: 4,
      Gear: 5,
      Box: 6,
      BoxTemp: 7,
      BoxUp: 8,
      BoxDown: 9,
      BoxLeft: 10,
      BoxRight: 11,
      Triangle: 12,
      Hole: 13
    };
    var RotationOffsetMap = [];
    RotationOffsetMap[Block.Triangle] = 180;
    RotationOffsetMap[Block.Blue] = 45;
    RotationOffsetMap[Block.Red] = 45;
    RotationOffsetMap[Block.Green] = 45;
    RotationOffsetMap[Block.Gear] = 45;
    var ID2BlockMap = [];
    ID2BlockMap[1] = {
      t: Block.Origin,
      r: 1
    };
    ID2BlockMap[2] = {
      t: Block.Destination
    };
    ID2BlockMap[3] = {
      t: Block.Green,
      r: 1
    };
    ID2BlockMap[4] = {
      t: Block.Green,
      r: 2
    };
    ID2BlockMap[5] = {
      t: Block.Green,
      r: 4
    };
    ID2BlockMap[6] = {
      t: Block.Green,
      r: 3
    };
    ID2BlockMap[7] = {
      t: Block.Gear,
      r: 1
    };
    ID2BlockMap[8] = {
      t: Block.Gear,
      r: 2
    };
    ID2BlockMap[9] = {
      t: Block.Blue,
      r: 2
    };
    ID2BlockMap[10] = {
      t: Block.Blue,
      r: 1
    };
    ID2BlockMap[11] = {
      t: Block.Red,
      r: 2
    };
    ID2BlockMap[12] = {
      t: Block.Red,
      r: 1
    };
    ID2BlockMap[13] = {
      t: Block.Box
    };
    ID2BlockMap[14] = {
      t: Block.BoxTemp
    };
    ID2BlockMap[15] = {
      t: Block.BoxRight
    };
    ID2BlockMap[16] = {
      t: Block.BoxUp
    };
    ID2BlockMap[17] = {
      t: Block.BoxDown
    };
    ID2BlockMap[18] = {
      t: Block.BoxLeft
    };
    ID2BlockMap[19] = {
      t: Block.Triangle,
      r: 1
    };
    ID2BlockMap[20] = {
      t: Block.Triangle,
      r: 4
    };
    ID2BlockMap[21] = {
      t: Block.Triangle,
      r: 2
    };
    ID2BlockMap[22] = {
      t: Block.Triangle,
      r: 3
    };
    ID2BlockMap[23] = {
      t: Block.Hole
    };
    ID2BlockMap[24] = {
      t: Block.Origin,
      r: 2
    };
    ID2BlockMap[25] = {
      t: Block.Origin,
      r: 3
    };
    ID2BlockMap[26] = {
      t: Block.Origin,
      r: 4
    };
    var _GS = function() {
      function _GS() {
        _classCallCheck(this, _GS);
      }
      _createClass(_GS, [ {
        key: "share",
        value: function share(msg, query) {
          wx.shareAppMessage({
            title: msg,
            query: query
          });
        }
      }, {
        key: "levelToString",
        value: function levelToString(arr) {
          var s = "";
          for (var i = 0; i < arr.length; i++) {
            var v = arr[i];
            s += v < 10 ? v : String.fromCharCode(65 + v - 10);
          }
          return s;
        }
      }, {
        key: "levelFromString",
        value: function levelFromString(s) {
          var arr = [];
          for (var i = 0; i < s.length; i++) {
            arr[i] = s.charCodeAt(i);
            arr[i] >= 65 ? arr[i] = arr[i] - 65 + 10 : arr[i] >= 48 && (arr[i] -= 48);
          }
          return arr;
        }
      }, {
        key: "showMsg",
        value: function showMsg(msg, cb) {
          UIMgr.show("Msg", msg, cb);
        }
      }, {
        key: "loading",
        value: function loading(show) {
          show ? UIMgr.show("Loading") : UIMgr.close("Loading");
        }
      }, {
        key: "gotoCustomLevel",
        value: function gotoCustomLevel(lv_data) {
          sceneManager.push("Game", lv_data, "custom");
        }
      }, {
        key: "gotoLevel",
        value: function gotoLevel(lv) {
          if (lv <= gs.currentLevel()) {
            window.currentEnterLevel = lv;
            var data = {
              init: level_data[lv].init,
              tip: level_data[lv].tip,
              maxLevel: level_data.length - 1,
              enterLevel: lv
            };
            sceneManager.forceShow("Game", data, "level");
          }
        }
      }, {
        key: "setCurrentLevelPass",
        value: function setCurrentLevelPass(lv) {
          lv == gs.currentLevel() && cc.sys.localStorage.setItem("level", lv + 1);
        }
      }, {
        key: "currentLevel",
        value: function currentLevel() {
          var level = cc.sys.localStorage.getItem("level");
          if (!level) {
            level = 1;
            cc.sys.localStorage.setItem("level", level);
          }
          return level;
        }
      }, {
        key: "getTipCount",
        value: function getTipCount() {
          var level = cc.sys.localStorage.getItem("tip");
          if (!level) {
            level = 1;
            cc.sys.localStorage.setItem("tip", level);
          }
          return level;
        }
      }, {
        key: "useOneTip",
        value: function useOneTip() {
          if (this.getTipCount() > 0) {
            cc.sys.localStorage.setItem("tip", this.getTipCount() - 1);
            return true;
          }
          return false;
        }
      }, {
        key: "playMp3",
        value: function playMp3(file) {
          file && gs.isSoundOpen() && cc.audioEngine.play(file, false, 1);
        }
      }, {
        key: "playBgMp3",
        value: function playBgMp3(file) {
          if (gs.isMusicOpen()) {
            if (this._curBGM && this._curBGM == file && this.__bgID) return;
            if (null != this.__bgID) {
              cc.audioEngine.stop(this.__bgID);
              this.__bgID = null;
            }
            this._curBGM = file;
            this.__bgID = cc.audioEngine.play(file, true, 1);
          } else this._curBGM = file;
        }
      }, {
        key: "isFirstPlay",
        value: function isFirstPlay() {
          var s = cc.sys.localStorage.getItem("isFirstPlay");
          if (null === s || "" === s) {
            cc.sys.localStorage.setItem("isFirstPlay", "false");
            return true;
          }
          return false;
        }
      }, {
        key: "isMusicOpen",
        value: function isMusicOpen() {
          var s = cc.sys.localStorage.getItem("is_bg_on");
          return null === s || "true" === s || true === s || "" === s;
        }
      }, {
        key: "isSoundOpen",
        value: function isSoundOpen() {
          var s = cc.sys.localStorage.getItem("is_sound_on");
          return null === s || "true" === s || true === s || "" === s;
        }
      }, {
        key: "setMusicOpen",
        value: function setMusicOpen(open) {
          cc.sys.localStorage.setItem("is_bg_on", open);
          if (open) this.playBgMp3(this._curBGM); else if (null != this.__bgID) {
            cc.audioEngine.stop(this.__bgID);
            this.__bgID = null;
          }
        }
      }, {
        key: "setSoundOpen",
        value: function setSoundOpen(open) {
          cc.sys.localStorage.setItem("is_sound_on", open);
        }
      } ]);
      return _GS;
    }();
    window.gs = new _GS();
    window.gs.Block = Block;
    window.gs.RotationOffsetMap = RotationOffsetMap;
    window.gs.ID2BlockMap = ID2BlockMap;
    cc._RF.pop();
  }, {} ],
  "polyglot.min": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e26fd9yy65A4q3/JkpVnFYg", "polyglot.min");
    "use strict";
    var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    (function(e, t) {
      "function" == typeof define && define.amd ? define([], function() {
        return t(e);
      }) : "object" == ("undefined" === typeof exports ? "undefined" : _typeof(exports)) ? module.exports = t(e) : e.Polyglot = t(e);
    })(void 0, function(e) {
      function t(e) {
        e = e || {}, this.phrases = {}, this.extend(e.phrases || {}), this.currentLocale = e.locale || "en", 
        this.allowMissing = !!e.allowMissing, this.warn = e.warn || c;
      }
      function s(e) {
        var t, n, r, i = {};
        for (t in e) if (e.hasOwnProperty(t)) {
          n = e[t];
          for (r in n) i[n[r]] = t;
        }
        return i;
      }
      function o(e) {
        var t = /^\s+|\s+$/g;
        return e.replace(t, "");
      }
      function u(e, t, r) {
        var i, s, u;
        return null != r && e ? (s = e.split(n), u = s[f(t, r)] || s[0], i = o(u)) : i = e, 
        i;
      }
      function a(e) {
        var t = s(i);
        return t[e] || t.en;
      }
      function f(e, t) {
        return r[a(e)](t);
      }
      function l(e, t) {
        for (var n in t) "_" !== n && t.hasOwnProperty(n) && (e = e.replace(new RegExp("%\\{" + n + "\\}", "g"), t[n]));
        return e;
      }
      function c(t) {
        e.console && e.console.warn && e.console.warn("WARNING: " + t);
      }
      function h(e) {
        var t = {};
        for (var n in e) t[n] = e[n];
        return t;
      }
      t.VERSION = "0.4.3", t.prototype.locale = function(e) {
        return e && (this.currentLocale = e), this.currentLocale;
      }, t.prototype.extend = function(e, t) {
        var n;
        for (var r in e) e.hasOwnProperty(r) && (n = e[r], t && (r = t + "." + r), "object" == ("undefined" === typeof n ? "undefined" : _typeof(n)) ? this.extend(n, r) : this.phrases[r] = n);
      }, t.prototype.clear = function() {
        this.phrases = {};
      }, t.prototype.replace = function(e) {
        this.clear(), this.extend(e);
      }, t.prototype.t = function(e, t) {
        var n, r;
        return t = null == t ? {} : t, "number" == typeof t && (t = {
          smart_count: t
        }), "string" == typeof this.phrases[e] ? n = this.phrases[e] : "string" == typeof t._ ? n = t._ : this.allowMissing ? n = e : (this.warn('Missing translation for key: "' + e + '"'), 
        r = e), "string" == typeof n && (t = h(t), r = u(n, this.currentLocale, t.smart_count), 
        r = l(r, t)), r;
      }, t.prototype.has = function(e) {
        return e in this.phrases;
      };
      var n = "||||", r = {
        chinese: function chinese(e) {
          return 0;
        },
        german: function german(e) {
          return 1 !== e ? 1 : 0;
        },
        french: function french(e) {
          return e > 1 ? 1 : 0;
        },
        russian: function russian(e) {
          return e % 10 === 1 && e % 100 !== 11 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2;
        },
        czech: function czech(e) {
          return 1 === e ? 0 : e >= 2 && e <= 4 ? 1 : 2;
        },
        polish: function polish(e) {
          return 1 === e ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2;
        },
        icelandic: function icelandic(e) {
          return e % 10 !== 1 || e % 100 === 11 ? 1 : 0;
        }
      }, i = {
        chinese: [ "fa", "id", "ja", "ko", "lo", "ms", "th", "tr", "zh" ],
        german: [ "da", "de", "en", "es", "fi", "el", "he", "hu", "it", "nl", "no", "pt", "sv" ],
        french: [ "fr", "tl", "pt-br" ],
        russian: [ "hr", "ru" ],
        czech: [ "cs" ],
        polish: [ "pl" ],
        icelandic: [ "is" ]
      };
      return t;
    });
    cc._RF.pop();
  }, {} ],
  sc_Editor: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "98eb6D47ytF8pqj6pamoSPF", "sc_Editor");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        graphics: cc.Graphics,
        bottom: cc.Node,
        content: cc.Node,
        trash: cc.Node
      },
      onLoad: function onLoad() {
        this.node.onenter = this.onenter.bind(this);
        this.makeGrid();
        this.block_temp = [];
        var child = this.content.children;
        for (var i = 0; i < child.length; i++) {
          var c = child[i].getChildByName("temp");
          c.blockType = gs.Block[c.parent.name];
          this.block_temp[c.blockType] = c;
        }
      },
      onenter: function onenter(lv_data) {
        window.clubBtn && window.clubBtn.hide();
        this.blocks = [];
        this.trash.active = false;
        this.isOK = false;
        this.lv_data = null;
        if (lv_data) {
          this.lv_data = lv_data;
          this.build();
        }
      },
      build: function build() {
        var data = gs.levelFromString(this.lv_data.init);
        var w = this.mapWidth;
        var h = this.mapHeight;
        for (var x = 0; x < w; x++) for (var y = 0; y < h; y++) {
          var index = x + y * w;
          var id = data[index];
          if (id) {
            var cfg = gs.ID2BlockMap[id];
            var temp = cc.instantiate(this.block_temp[cfg.t]);
            temp.active = true;
            temp.parent = this.graphics.node;
            temp.blockType = cfg.t;
            this.setBlockRotation(temp, cfg.r, true);
            this.placeAt(temp, cc.v2(x, y), true);
          }
        }
      },
      onClickOptions: function onClickOptions() {
        sceneManager.show("Menu");
      },
      onClickPlay: function onClickPlay() {
        var _this = this;
        var arr = this.toArray();
        if (this.checkMap(arr)) {
          var data = {
            init: arr,
            ok: function ok(tipArr) {
              _this.isOK = true;
              _this.tip = gs.levelToString(tipArr);
              UIMgr.show("Msg", "\u6d4b\u8bd5\u6210\u529f\uff0c\u662f\u5426\u7acb\u5373\u53d1\u5e03", function(ok) {
                ok && _this.onClickSave();
              });
            }
          };
          sceneManager.push("Game", data, "editor");
        }
      },
      onClickSave: function onClickSave() {
        var _this2 = this;
        if (!this.isOK) {
          UIMgr.show("Msg", "\u60a8\u5fc5\u987b\u5148\u6d4b\u8bd5\u6210\u529f\uff0c\u786e\u4fdd\u60a8\u521b\u4f5c\u7684\u5173\u5361\u80fd\u901a\u5173\u624d\u80fd\u53d1\u5e03\u3002", null, "ok");
          return;
        }
        var str = gs.levelToString(this.toArray());
        cc.log(str);
        cc.log(this.tip);
        var arg = {
          tip: this.tip,
          init: str
        };
        this.lv_data && (arg.level = this.lv_data._id);
        wxRank.ad_publish && wxRank.ad_publish.ok ? UIMgr.show("Msg", "\u89c2\u770b\u4e00\u4e2a\u89c6\u9891\uff0c\u624d\u80fd\u53d1\u5e03\u5173\u5361\u3002", function(confirm) {
          if (!confirm) return;
          wxRank.ad_publish.show(function(isEnd) {
            if (!isEnd) {
              UIMgr.show("Msg", "\u89c6\u9891\u89c2\u770b\u672a\u5b8c\u6210\uff0c\u4e0d\u80fd\u53d1\u5e03\u5173\u5361");
              return;
            }
            _this2.doPublish(arg);
          });
        }) : this.doPublish(arg);
      },
      doPublish: function doPublish(arg) {
        wxRank.call("level_publish", arg, function(ok, data) {
          if (!ok) {
            UIMgr.show("Msg", "\u7f51\u7edc\u4e0d\u7ed9\u529b\uff0c\u8bf7\u91cd\u8bd5", null, "ok");
            return;
          }
          if (1 == data.status) {
            UIMgr.show("Msg", data.msg);
            return;
          }
          cc.log(data.msg);
          UIMgr.show("Msg", "\u53d1\u5e03\u6210\u529f\uff0c\u662f\u5426\u7acb\u5373\u5206\u4eab\u7ed9\u670b\u53cb\uff1f", function(isShare) {
            isShare && gs.share("\u6211\u521b\u4f5c\u4e86\u4e00\u4e2a\u6e38\u620f\u5173\u5361\uff0c\u5feb\u6765\u73a9\u73a9\u9e2d\u3002", "sharetype=mylevel&id=" + data.id);
            sceneManager.show("Level");
          });
        });
      },
      blockToID: function blockToID(block) {
        var r = block.blockRotation;
        block.blockType != gs.Block.Gear && block.blockType != gs.Block.Red && block.blockType != gs.Block.Blue || r > 2 && (r -= 2);
        for (var i = 1; i < gs.ID2BlockMap.length; i++) {
          var v = gs.ID2BlockMap[i];
          if (v.t == block.blockType) {
            if (!v.r) return i;
            if (v.r == r) return i;
          }
        }
        return null;
      },
      checkMap: function checkMap(arr) {
        var typeCnt = [];
        for (var i = 0; i < 15; i++) typeCnt[i] = 0;
        for (var _i = 0; _i < arr.length; _i++) 0 != arr[_i] && typeCnt[gs.ID2BlockMap[arr[_i]].t]++;
        var msg = "";
        if (0 == typeCnt[gs.Block.Destination]) msg = "\u7f3a\u5c11\u7ec8\u70b9"; else if (0 == typeCnt[gs.Block.Origin]) msg = "\u7f3a\u5c11\u8d77\u70b9"; else {
          if (2 == typeCnt[gs.Block.Hole] || 0 == typeCnt[gs.Block.Hole]) return true;
          msg = "\u9ed1\u6d1e\u4e2a\u6570\u4e0d\u80fd\u4e3a" + typeCnt[gs.Block.Hole] + "\u4e2a";
        }
        UIMgr.show("Msg", msg, null, "ok");
      },
      toArray: function toArray() {
        var map = [];
        for (var i = 0; i < this.mapHeight * this.mapWidth; i++) map[i] = 0;
        for (var _i2 = 0; _i2 < this.blocks.length; _i2++) {
          var block = this.blocks[_i2];
          map[block.index] = this.blockToID(block);
        }
        return map;
      },
      makeGrid: function makeGrid() {
        this.mapWidth = 5;
        this.mapHeight = 11;
        this.blockSize = cc.size(80, 80);
        var h = this.mapHeight * this.blockSize.height;
        var w = this.mapWidth * this.blockSize.width;
        var cx = 0;
        var cy = 200;
        var sx = cx - w / 2;
        var sy = cy + h / 2;
        this.startX = sx;
        this.startY = sy;
        for (var x = 0; x <= this.mapWidth; x++) {
          this.graphics.moveTo(sx + x * this.blockSize.width, sy);
          this.graphics.lineTo(sx + x * this.blockSize.width, sy - h);
        }
        for (var y = 0; y <= this.mapHeight; y++) {
          this.graphics.moveTo(sx, sy - y * this.blockSize.height);
          this.graphics.lineTo(sx + w, sy - y * this.blockSize.height);
        }
        this.graphics.stroke();
        this.graphics.node.on(cc.Node.EventType.TOUCH_START, this.onTouch, this);
        this.graphics.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouch, this);
        this.graphics.node.on(cc.Node.EventType.TOUCH_END, this.onTouch, this);
      },
      onTouch: function onTouch(ev) {
        var wpos = ev.getLocation();
        var pos = this.graphics.node.convertToNodeSpaceAR(wpos);
        this.isOK = false;
        if (ev.type == cc.Node.EventType.TOUCH_START) {
          var ok = false;
          var pos1 = this.content.convertToNodeSpaceAR(wpos);
          var child = this.content.children;
          for (var i = 0; i < child.length; i++) {
            var c = child[i];
            if (pos1.fuzzyEquals(c.position, 60)) {
              var select = c.getChildByName("temp");
              var one = cc.instantiate(select);
              one.blockType = select.blockType;
              one.parent = this.graphics.node;
              one.blockRotation = 1;
              one.position = pos;
              this.dragBlock = one;
              ok = true;
              break;
            }
          }
          this.touchStartPos = pos;
          this.isMoved = false;
          if (!ok) {
            var grid = this.toGrid(pos.x, pos.y);
            this.dragBlock = this.getAtGrid(grid);
          }
        } else if (ev.type == cc.Node.EventType.TOUCH_MOVE) {
          this.isMoved = true;
          this.trash.active = true;
          this.dragBlock && (this.dragBlock.position = this.dragBlock.position.add(pos.sub(this.lastPos)));
        } else if (ev.type == cc.Node.EventType.TOUCH_END) {
          this.trash.active = false;
          if (this.isMoved) {
            if (this.dragBlock) {
              if (this.posInMap(pos) && pos.fuzzyEquals(this.touchStartPos, 2)) {
                var _block = this.getAtGrid(this.toGrid(pos));
                this.rotateBlock(_block);
                return;
              }
              if (this.posInMap(pos)) {
                var _grid = this.toGrid(pos.x, pos.y);
                this.placeAt(this.dragBlock, _grid, false);
              } else if (this.dragBlock.gx || this.dragBlock.gy) pos.fuzzyEquals(this.trash.position, 50) ? this.removeBlock(this.dragBlock) : this.dragBlock.position = this.toPos(this.dragBlock.gx, this.dragBlock.gy); else {
                this.dragBlock.removeFromParent();
                this.dragBlock = null;
              }
            }
          } else {
            if (this.dragBlock && !this.dragBlock.gx && !this.dragBlock.gy) {
              this.dragBlock.removeFromParent();
              this.dragBlock = null;
              return;
            }
            if (this.posInMap(pos) && pos.fuzzyEquals(this.touchStartPos, 2)) {
              var block = this.getAtGrid(this.toGrid(pos));
              this.rotateBlock(block);
            }
          }
        }
        this.lastPos = pos;
      },
      rotateBlock: function rotateBlock(block) {
        if (!(block.blockType == gs.Block.Green || block.blockType == gs.Block.Gear || block.blockType == gs.Block.Red || block.blockType == gs.Block.Blue || block.blockType == gs.Block.Triangle || block.blockType == gs.Block.Origin)) return;
        this.nextBlockRotation(block);
      },
      removeBlock: function removeBlock(block) {
        var i = this.blocks.indexOf(block);
        this.blocks.splice(i, 1);
        block.removeFromParent();
      },
      nextBlockRotation: function nextBlockRotation(block) {
        block.blockRotation + 1 == 5 ? this.setBlockRotation(block, 1) : this.setBlockRotation(block, block.blockRotation + 1);
      },
      setBlockRotation: function setBlockRotation(block, rotation, now) {
        block.blockRotation = rotation || 1;
        var dest = (gs.RotationOffsetMap[block.blockType] || 0) + 90 * (rotation - 1);
        now ? block.rotation = dest : block.runAction(cc.rotateTo(.3, dest));
      },
      posInMap: function posInMap(pos) {
        return pos.x >= this.startX && pos.x <= this.startX + this.blockSize.width * this.mapWidth && pos.y <= this.startY && pos.y >= this.startY - this.blockSize.height * this.mapHeight;
      },
      placeAt: function placeAt(block, grid, remove) {
        var old = this.getAtGrid(grid);
        if (old == block) {
          block.position = this.toPos(grid);
          return;
        }
        if (old) if (remove) this.removeBlock(old); else if (block.gx && block.gy) {
          old.gx = block.gx;
          old.gy = block.gy;
          old.index = block.index;
          old.position = this.toPos(old.gx, old.gy);
        } else this.removeBlock(old);
        block.gx || block.gy || this.blocks.push(block);
        block.gx = grid.x;
        block.gy = grid.y;
        block.index = grid.x + grid.y * this.mapWidth;
        block.position = this.toPos(grid);
      },
      getAtGrid: function getAtGrid(grid) {
        for (var i = 0; i < this.blocks.length; i++) {
          var b = this.blocks[i];
          if (b.gx == grid.x && b.gy == grid.y) return b;
        }
        return null;
      },
      toGrid: function toGrid(x, y) {
        if (void 0 == y || null == y) {
          y = x.y;
          x = x.x;
        }
        var gx = Math.floor((x - this.startX) / this.blockSize.width);
        var gy = Math.floor((-y + this.startY) / this.blockSize.height);
        return cc.v2(gx, gy);
      },
      toPos: function toPos(x, y) {
        if (void 0 == y || null == y) {
          y = x.y;
          x = x.x;
        }
        return cc.v2(this.startX + x * this.blockSize.width + this.blockSize.width / 2, this.startY - y * this.blockSize.height - this.blockSize.height / 2);
      },
      onToggle: function onToggle(e) {
        this.selectBlock = e.node.getChildByName("temp");
        cc.log(this.selectBlock.blockType);
      }
    });
    cc._RF.pop();
  }, {} ],
  sc_Game: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c73e9MweJpLSaqgDV4djzfo", "sc_Game");
    "use strict";
    var Block = {
      Origin: 0,
      Destination: 1,
      Blue: 2,
      Red: 3,
      Green: 4,
      Gear: 5,
      Box: 6,
      BoxTemp: 7,
      BoxUp: 8,
      BoxDown: 9,
      BoxLeft: 10,
      BoxRight: 11,
      Triangle: 12,
      Hole: 13
    };
    var T = 0;
    var D = 2;
    var L = 3;
    var R = 1;
    var DirMap = [];
    DirMap[Block.Blue] = [];
    DirMap[Block.Blue][1] = [ [ D, R ], [ R, D ], [ T, L ], [ L, T ] ];
    DirMap[Block.Blue][2] = [ [ D, L ], [ R, T ], [ T, R ], [ L, D ] ];
    DirMap[Block.Blue][3] = DirMap[Block.Blue][1];
    DirMap[Block.Blue][4] = DirMap[Block.Blue][2];
    DirMap[Block.Green] = [];
    DirMap[Block.Green][1] = [ [ D, R ], [ R, D ], [ T, D ], [ L, R ] ];
    DirMap[Block.Green][2] = [ [ D, L ], [ R, L ], [ T, D ], [ L, D ] ];
    DirMap[Block.Green][3] = [ [ D, T ], [ R, L ], [ T, L ], [ L, T ] ];
    DirMap[Block.Green][4] = [ [ D, T ], [ R, T ], [ T, R ], [ L, R ] ];
    DirMap[Block.Triangle] = [];
    DirMap[Block.Triangle][1] = [ [ D, D ], [ R, R ], [ L, T ], [ T, L ] ];
    DirMap[Block.Triangle][2] = [ [ D, D ], [ R, T ], [ L, L ], [ T, R ] ];
    DirMap[Block.Triangle][3] = [ [ D, R ], [ R, D ], [ L, L ], [ T, T ] ];
    DirMap[Block.Triangle][4] = [ [ D, L ], [ R, R ], [ L, D ], [ T, T ] ];
    DirMap[Block.Box] = [];
    DirMap[Block.Box][1] = [ [ T, T ], [ L, L ], [ R, R ], [ D, D ] ];
    DirMap[Block.Box][2] = DirMap[Block.Box][1];
    DirMap[Block.Box][3] = DirMap[Block.Box][1];
    DirMap[Block.Box][4] = DirMap[Block.Box][1];
    DirMap[Block.Red] = DirMap[Block.Blue];
    DirMap[Block.Gear] = DirMap[Block.Blue];
    DirMap[Block.BoxTemp] = DirMap[Block.Box];
    DirMap[Block.BoxUp] = DirMap[Block.Box];
    DirMap[Block.BoxDown] = DirMap[Block.Box];
    DirMap[Block.BoxLeft] = DirMap[Block.Box];
    DirMap[Block.BoxRight] = DirMap[Block.Box];
    var EventMap = [];
    EventMap[Block.Origin] = {
      touch: "fire"
    };
    EventMap[Block.Destination] = {
      collision: "win"
    };
    EventMap[Block.Blue] = {
      touch: "rotate"
    };
    EventMap[Block.Red] = {
      touch: "rotate",
      collision: "killself"
    };
    EventMap[Block.Green] = {
      touch: "rotate"
    };
    EventMap[Block.Gear] = {
      collision: "rotate"
    };
    EventMap[Block.Box] = {};
    EventMap[Block.BoxTemp] = {
      collision: "killself"
    };
    EventMap[Block.BoxUp] = {
      collision: "moveup"
    };
    EventMap[Block.BoxDown] = {
      collision: "movedown"
    };
    EventMap[Block.BoxLeft] = {
      collision: "moveleft"
    };
    EventMap[Block.BoxRight] = {
      collision: "moveright"
    };
    EventMap[Block.Triangle] = {};
    EventMap[Block.Hole] = {};
    cc.Class({
      extends: cc.Component,
      properties: {
        blocks: [ cc.Node ],
        ball: cc.Node,
        dot: cc.Node,
        lb_level: cc.Node,
        snd_failed: {
          default: null,
          type: cc.AudioClip
        },
        btn_options: cc.Node,
        btn_back: cc.Node,
        btn_tip: cc.Node
      },
      onLoad: function onLoad() {
        this.node.onenter = this.onenter.bind(this);
        this.mapWidth = 5;
        this.mapHeight = 11;
        this.blockSize = cc.size(100, 100);
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouch, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouch, this);
		
		var tipBtn = cc.find("tip", this.node);
		
		this.TimeCheckAd = setInterval(function(){
			//埋点 激励用完隐藏
			window.h5api && window.h5api.canPlayAd(function(data){
					tipBtn.active = data.canPlayAd;
			}.bind(this));
		}, 500);
//		console.log(this.node);
      },
	  onDestroy:function(){
		  clearInterval(this.TimeCheckAd);
	  },
      saveMap: function saveMap() {
        this.saved_map = [];
        this.collisioned_items = [];
        for (var i = 0; i < this.items.length; i++) {
          var item = this.items[i];
          EventMap[item.type].touch && (this.saved_map[item.index] = item.rotation);
        }
        for (var _i = 0; _i < this.mapWidth * this.mapHeight; _i++) if (this.saved_map[_i]) {
          var cfg = gs.ID2BlockMap[this.data.init[_i]];
          var r = cfg.r || 1;
          cfg.t != Block.Blue && cfg.t != Block.Red || this.saved_map[_i] > 2 && (this.saved_map[_i] -= 2);
        } else this.saved_map[_i] = 0;
      },
      filterTips: function filterTips(item) {
        this.collisioned_items && (this.collisioned_items[item.index] = 1);
      },
      buildTipsArray: function buildTipsArray() {
        var s = [];
        for (var i = 0; i < this.saved_map.length; i++) this.collisioned_items[i] || (this.saved_map[i] = 0);
        return this.saved_map;
      },
      buildMapTips: function buildMapTips() {
        var s = "";
        for (var i = 0; i < this.saved_map.length; i++) {
          this.collisioned_items[i] || (this.saved_map[i] = 0);
          s += this.saved_map[i] + "_";
        }
        return s;
      },
      reStart: function reStart() {
        var tryCount = this.tryCount;
        var startTime = this.startTime;
        this.onenter(this.data, this.enterMode);
        this.tryCount = tryCount;
        this.startTime = startTime;
      },
      onenter: function onenter(data, enterMode) {
        window.clubBtn && window.clubBtn.hide();
        this.startTime = new Date().getTime();
        this.tryCount = 0;
        this.trigger_mark = [];
        for (var i = 0; i < this.mapWidth * this.mapHeight; i++) this.trigger_mark[i] = 0;
        this.is_start = false;
        this.touch_enable = true;
        this.ball.active = false;
        gs.isFirstPlay() && UIMgr.show("Help");
        this.enterMode = enterMode;
        if ("level" == enterMode) {
          this.lb_level.active = true;
          this.lb_level.getComponent(cc.Label).string = "\u7b2c" + data.enterLevel + "\u5173";
          this.btn_options.active = true;
          this.btn_tip.active = true;
          this.btn_back.active = false;
          data.converted || (data = {
            init: gs.levelFromString(data.init),
            tip: gs.levelFromString(data.tip),
            converted: true,
            _id: data._id,
            enterLevel: data.enterLevel,
            maxLevel: data.maxLevel
          });
        } else if ("editor" == enterMode) {
          this.lb_level.active = true;
          this.lb_level.getComponent(cc.Label).string = "\u7f16\u8f91\u6d4b\u8bd5";
          this.btn_options.active = false;
          this.btn_tip.active = false;
          this.btn_back.active = true;
        } else if ("custom" == enterMode) {
          this.lb_level.active = true;
          this.lb_level.getComponent(cc.Label).string = "\u5173\u5361ID:" + data.myid;
          this.btn_options.active = true;
          this.btn_tip.active = true;
          this.btn_back.active = false;
          data.converted || (data = {
            init: gs.levelFromString(data.init),
            tip: gs.levelFromString(data.tip),
            converted: true,
            _id: data._id,
            myid: data.myid
          });
        } else this.lb_level.active = false;
        this.data = data;
        this.buildMap();
      },
      onClickOptions: function onClickOptions() {
        var _this = this;
        UIMgr.show("Options", false, this.enterMode, function() {
          _this.reStart();
        });
      },
      onClickBack: function onClickBack() {
        sceneManager.pop();
      },
      clearTips: function clearTips() {
        if (this.tips_map) {
          for (var i = 0; i < this.tips_map.length; i++) null != this.tips_map[i] && (this.tips_map[i].node.parent = null);
          this.tips_map = null;
        }
      },
      doTip: function doTip() {
        var tip = this.data.tip;
        this.clearTips();
        this.tips_map = [];
        for (var i = 0; i < tip.length; i++) if (0 != tip[i] && this.items_map[i].rotation != tip[i]) {
          this.tips_map[i] = cc.instantiate(this.items_map[i].node).getComponent("BlockScript");
          this.tips_map[i].node.opacity = 100;
          this.tips_map[i].node.parent = this.items_map[i].node.parent;
          this.tips_map[i].node.zIndex = 1;
          this.tips_map[i].type = this.items_map[i].type;
          this.setBlockRotation(this.tips_map[i], tip[i], true);
        }
      },
      onClickTip: function onClickTip(event) {
        var _this2 = this;
        if (!this.touch_enable) return;
		
		UIMgr.show("Msg", "         是否使用激励获得提示?", function(d){
			//埋点 激励回调下面
			d && window.h5api && window.h5api.playAd(function(obj){
				console.log('代码:' + obj.code + ',消息:' + obj.message);
				if (obj.code === 10000) {
					console.log('开始播放');
				} else if (obj.code === 10001) {
					_this2.doTip();
				} else {
					console.log('广告异常');
				}
			}.bind(this));
		},null, "ok");
		
		
       /* window.wxRank && window.wxRank.ad_tip && window.wxRank.ad_tip.ok ? UIMgr.show("Msg", "观看广告视频，获得一次提示机会", function(confirm) {
          confirm && window.wxRank.ad_tip.show(function(ok) {
            ok ? UIMgr.show("Msg", "观看视频完成，您获得了提示机会", function() {
              _this2.doTip();
            }, "ok") : UIMgr.show("Msg", "您取消了播放，没有获得奖励", null, "ok");
          });
        }) : UIMgr.show("Msg", "分享游戏给朋友，获得一次提示机会", function(ok) {
          if (ok) {
            _this2.doTip();
            cc.sys.browserType == cc.sys.BROWSER_TYPE_WECHAT_GAME && wx.shareAppMessage({
              title: "这一关过不去了求大神帮助"
            });
          }
        });*/
      },
      testInTouch: function testInTouch(cell, pos) {
        return Math.abs(cell.x - pos.x) < this.blockSize.width / 2 && Math.abs(cell.y - pos.y) < this.blockSize.height / 2;
      },
      getTouchCell: function getTouchCell(pos) {
        for (var i = 0; i < this.items.length; i++) {
          var it = this.items[i].node;
          if (it && this.testInTouch(it, pos)) return this.items[i];
        }
        return null;
      },
      onTouch: function onTouch(ev) {
        if (!this.touch_enable) return;
        if (ev.type == cc.Node.EventType.TOUCH_START) {
          var wpos = ev.getLocation();
          var pos = this.node.convertToNodeSpaceAR(wpos);
          var item = this.getTouchCell(pos);
          if (null != item) {
            this.emitBlockEvent(item, "touch");
            if (this.tips_map && this.tips_map[item.index]) {
              var r = item.rotation;
              item.type != Block.Blue && item.type != Block.Red || r > 2 && (r -= 2);
              if (r == this.tips_map[item.index].rotation) {
                this.tips_map[item.index].node.parent = null;
                this.tips_map[item.index] = null;
              }
            }
          }
        }
      },
      emitBlockEvent: function emitBlockEvent(item, evt) {
        var eventMap = EventMap[item.type];
        var eventType = eventMap[evt];
        if (null == eventType) return;
        switch (eventType) {
         case "fire":
          this.onFire(item);
          break;

         case "win":
          this.onGameWin(item);
          break;

         case "rotate":
          this.nextBlockRotation(item);
          break;

         case "killself":
          this.onKillBlock(item);
          break;

         case "moveup":
          this.onMoveBlock(item, 0, 1);
          break;

         case "movedown":
          this.onMoveBlock(item, 0, -1);
          break;

         case "moveleft":
          this.onMoveBlock(item, -1, 0);
          break;

         case "moveright":
          this.onMoveBlock(item, 1, 0);
        }
      },
      onMoveBlock: function onMoveBlock(item, dx, dy) {
        item.gx += dx;
        item.gy += dy;
        item.node.runAction(cc.moveTo(.4, this.toPos(cc.v2(item.gx, item.gy))));
      },
      onKillBlock: function onKillBlock(item) {
        var index = this.items.indexOf(item);
        cc.log(index);
        this.items.splice(index, 1);
        this.items_map[item.index] = null;
        item.node.runAction(cc.sequence(cc.delayTime(.5), cc.removeSelf()));
      },
      onGameLose: function onGameLose() {
        var _this3 = this;
        cc.log("lose");
        this.is_start = false;
        this.ball.active = false;
        gs.playMp3(this.snd_failed);
        this.node.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function() {
          _this3.reStart();
        })));
      },
      onGameWinCB: function onGameWinCB() {
        var _this4 = this;
        var now = new Date().getTime();
        if ("level" == this.enterMode) this.data.enterLevel + 1 >= this.data.maxLevel ? sceneManager.show("Menu") : UIMgr.show("Complete", now - this.startTime, this.tryCount, this.enterMode); else if ("editor" == this.enterMode) {
          var ok = this.data.ok;
          var tip = this.buildTipsArray();
          sceneManager.pop();
          ok(tip);
        } else "custom" == this.enterMode && window.wxRank.call("level_mark", {
          key: "passed",
          level: this.data._id
        }, function(ok, data) {
          UIMgr.show("Complete", now - _this4.startTime, _this4.tryCount, _this4.enterMode, function() {
            _this4.reStart();
          });
        });
      },
      onGameWin: function onGameWin(item) {
        this.is_start = false;
        this.ball.active = false;
        if ("level" == this.enterMode) {
          gs.setCurrentLevelPass(this.data.enterLevel);
          //window.wxRank && window.wxRank.submit(gs.currentLevel() - 1);
		  var thisObj = this;
		  //埋点 分数上报
		 // console.log("score:" + thisObj.data.enterLevel);
		  if (window.h5api && window.h5api.isLogin()) {
				window.h5api.submitRanking(thisObj.data.enterLevel, function (data) { });
		  }
        }
        var ani = item.node.getComponent(cc.Animation);
        ani.on("finished", this.onGameWinCB, this);
      },
      nextBlockRotation: function nextBlockRotation(item) {
        item.rotation + 1 == 5 ? this.setBlockRotation(item, 1) : this.setBlockRotation(item, item.rotation + 1);
      },
      setBlockRotation: function setBlockRotation(item, rotation, now) {
        item.rotation = rotation || 1;
        var dest = (gs.RotationOffsetMap[item.type] || 0) + 90 * (rotation - 1);
        now ? item.node.rotation = dest : item.node.runAction(cc.rotateTo(.3, dest));
      },
      clearMap: function clearMap() {
        this.clearTips();
        if (null == this.items) return;
        for (var i = 0; i < this.items.length; i++) this.items[i].node.parent = null;
      },
      buildMap: function buildMap() {
        this.clearMap();
        var w = this.mapWidth;
        var h = this.mapHeight;
        this.items = [];
        this.items_map = [];
        for (var x = 0; x < w; x++) for (var y = 0; y < h; y++) {
          var index = x + (h - y - 1) * w;
          var id = this.data.init[index];
          if (id) {
            var cfg = gs.ID2BlockMap[id];
            var temp = cc.instantiate(this.blocks[cfg.t]);
            temp.active = true;
            temp.parent = this.node;
            var pos = this.toPos(x, y);
            temp.setPosition(pos);
            temp.zIndex = 2;
            var bs = temp.getComponent("BlockScript");
            bs.type = cfg.t;
            bs.index = index;
            this.setBlockRotation(bs, cfg.r, true);
            bs.gx = x;
            bs.gy = y;
            this.items.push(bs);
            this.items_map[index] = bs;
          }
        }
      },
      onFire: function onFire(item) {
        this.saveMap();
        this.ball.active = true;
        this.ball.x = item.node.x;
        this.ball.y = item.node.y;
        this.touch_enable = false;
        this.is_start = true;
        this.timer = 0;
        this.inteval = .2;
        this.dotTimer = 0;
        this.dotInteval = this.inteval / 3;
        this.curPos = cc.v2(item.node.x, item.node.y);
        this.curGird = cc.v2(item.gx, item.gy);
        1 == item.rotation ? this.curDir = cc.v2(0, 1) : 2 == item.rotation ? this.curDir = cc.v2(1, 0) : 3 == item.rotation ? this.curDir = cc.v2(0, -1) : 4 == item.rotation && (this.curDir = cc.v2(-1, 0));
        this.nextGird = this.curGird.add(this.curDir);
        this.nextPos = this.toPos(this.nextGird);
        this.tryCount++;
      },
      toPos: function toPos(x, y) {
        if (void 0 == y || null == y) {
          y = x.y;
          x = x.x;
        }
        return cc.v2(-(this.mapWidth - 1) * this.blockSize.width / 2 + x * this.blockSize.width, -(this.mapHeight - 1) * this.blockSize.height / 2 + y * this.blockSize.height);
      },
      isOutScreen: function isOutScreen(ball) {
        var bottom = -cc.winSize.height / 2;
        var top = bottom + cc.winSize.height;
        var left = -cc.winSize.width / 2;
        var right = left + cc.winSize.width;
        return ball.x < left - 50 || ball.y < bottom - 50 || ball.x > right + 50 || ball.y > top + 50;
      },
      makeDot: function makeDot() {
        var dot = cc.instantiate(this.dot);
        dot.position = this.ball.position;
        dot.parent = this.node;
        dot.active = true;
        dot.runAction(cc.sequence(cc.fadeOut(.8), cc.removeSelf()));
      },
      update: function update(dt) {
        if (!this.is_start) return;
        this.timer += dt;
        this.dotTimer += dt;
        var ratio = Math.min(this.timer / this.inteval, 1);
        ratio > 1 && (ratio = 1);
        if (this.dotTimer >= this.dotInteval) {
          this.dotTimer = 0;
          this.makeDot();
        }
        this.ball.position = this.curPos.lerp(this.nextPos, ratio);
        if (this.isOutScreen(this.ball)) {
          this.onGameLose();
          return;
        }
        if (1 == ratio) {
          this.timer = 0;
          var item = this.getTouchCell(this.ball.position);
          this.curPos = this.ball.position;
          this.curGird = this.nextGird;
          if (item) {
            this.filterTips(item);
            item.audio && gs.playMp3(item.audio);
            this.curDir = this.onCrossBlock(item);
            this.emitBlockEvent(item, "collision");
          }
          if (this.curDir) {
            this.nextGird = this.nextGird.add(this.curDir);
            this.nextPos = this.toPos(this.nextGird);
          }
        }
      },
      onCrossBlock: function onCrossBlock(item) {
        if (item.type == Block.Hole) for (var i = 0; i < this.items.length; i++) {
          var item1 = this.items[i];
          if (item1.type == item.type && item1 != item) {
            this.nextGird = cc.v2(item1.gx, item1.gy);
            this.curPos = this.toPos(item1.gx, item1.gy);
            this.ball.position = this.curPos;
            return this.curDir;
          }
        } else {
          var ani = item.node.getComponent(cc.Animation);
          ani && ani.play();
        }
        var blockDirCvt = DirMap[item.type];
        if (!blockDirCvt) return this.curDir;
        var dirCvt = blockDirCvt[item.rotation];
        var d = null;
        0 == this.curDir.x ? 1 == this.curDir.y ? d = D : -1 == this.curDir.y && (d = T) : 0 == this.curDir.y && (1 == this.curDir.x ? d = L : -1 == this.curDir.x && (d = R));
        for (var _i2 = 0; _i2 < dirCvt.length; _i2++) if (dirCvt[_i2][0] == d) {
          d = dirCvt[_i2][1];
          break;
        }
        if (d == T) return cc.v2(0, 1);
        if (d == D) return cc.v2(0, -1);
        if (d == R) return cc.v2(1, 0);
        if (d == L) return cc.v2(-1, 0);
      }
    });
    cc._RF.pop();
  }, {} ],
  sc_Level: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bcfd7j1NH9JAYscLelnPGB2", "sc_Level");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        temp: cc.Node,
        per: cc.Node,
        pages: [ cc.Node ],
        left: cc.Node,
        right: cc.Node,
        pageView: cc.Node
      },
      onLoad: function onLoad() {
        this.node.onenter = this.onenter.bind(this);
        this.temp.active = false;
        this.levels = [];
        for (var x = 0; x < this.pages.length; x++) {
          var parent = this.pages[x];
          for (var i = 1; i <= 25; i++) if (25 * x + i < level_data.length) {
            var lv = cc.instantiate(this.temp);
            lv.active = true;
            lv.parent = parent;
            lv.name = "" + (i + 25 * x);
            lv.getChildByName("value").getComponent(cc.Label).string = i + 25 * x;
            this.levels.push(lv);
          }
          var layout = parent.getComponent(cc.Layout);
          layout && layout.updateLayout();
        }
      },
      onenter: function onenter() {
        window.wxRank && wxRank.showBanner(false);
        window.clubBtn && window.clubBtn.hide();
        this.per.getComponent(cc.Label).string = gs.currentLevel() + "/" + (level_data.length - 1);
        for (var i = 1; i <= this.levels.length; i++) {
          var lv = this.levels[i - 1];
          if (i <= gs.currentLevel()) {
            lv.getChildByName("dot").active = false;
            lv.getChildByName("value").active = true;
            lv.getChildByName("value").getComponent(cc.Label).string = i;
          } else {
            lv.getChildByName("dot").active = true;
            lv.getChildByName("value").active = false;
          }
        }
        this.onPage();
      },
      onPage: function onPage() {
        var pageview = this.pageView.getComponent(cc.PageView);
        var idx = pageview.getCurrentPageIndex();
        this.left.active = 0 != idx;
        this.right.active = idx != pageview.getPages().length - 1;
      },
      onNext: function onNext() {
        var pageview = this.pageView.getComponent(cc.PageView);
        pageview.setCurrentPageIndex(pageview.getCurrentPageIndex() + 1);
      },
      onPrev: function onPrev() {
        var pageview = this.pageView.getComponent(cc.PageView);
        pageview.setCurrentPageIndex(pageview.getCurrentPageIndex() - 1);
      },
      onClickBack: function onClickBack() {
        sceneManager.show("Menu");
      },
      onClickLevel: function onClickLevel(ev) {
        var clicked = parseInt(ev.target.name);
        gs.gotoLevel(clicked);
      },
      on_hot: function on_hot() {
        sceneManager.show("Select", "mostPlay");
      },
      on_rect: function on_rect() {
        sceneManager.show("Select", "recently");
      },
      on_my: function on_my() {
        sceneManager.show("Select", "my");
      },
      on_editor: function on_editor() {
        sceneManager.show("Editor");
      }
    });
    cc._RF.pop();
  }, {} ],
  sc_Menu: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "74a36N8GDtB5ZY/KQf91Gwm", "sc_Menu");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        bgm: {
          default: null,
          type: cc.AudioClip
        },
        popnode: cc.Node
      },
      onLoad: function onLoad() {
		this.autoAdapteScreen();
        this.node.onenter = this.onenter.bind(this);
		
		//修改
		var moreGameBtn = this.node.children[2].children[1].children[0];
		moreGameBtn.y += 10;
		moreGameBtn = moreGameBtn.getComponent(cc.Label);
		moreGameBtn.string = "更多好玩";
		//console.log(this.node);
      },
	  autoAdapteScreen:function(){
			// 适配解决方案
			let _canvas = cc.Canvas.instance;
		// 设计分辨率比
			let _rateR = _canvas.designResolution.height/_canvas.designResolution.width;
		// 显示分辨率比
			let _rateV = cc.winSize.height/cc.winSize.width;
			console.log("winSize: rateR: "+_rateR+" rateV: "+_rateV);
			if (_rateV > _rateR)
			{
				_canvas.fitHeight = false;
				_canvas.fitWidth = true;
				console.log("winSize: fitWidth");
			}
			else
			{
				_canvas.fitHeight = true;
				_canvas.fitWidth = false;
				console.log("winSize: fitHeight");
			}
		},
      onenter: function onenter(first) {
        gs.playBgMp3(this.bgm);
        window.clubBtn && window.clubBtn.show();
        window.wxRank && first && window.wxRank.auth();
      },
      scsj: function scsj() {
		  //埋点 更多好玩。 由 自定关卡改
		  //console.log("more game");
		  window.h5api && window.h5api.showRecommend();
		  
      /*  var lev = cc.sys.localStorage.getItem("level");
        if ("" != lev || null != lev || void 0 != lev) {
          var le = parseInt(lev);
          le >= 5 ? sceneManager.show("Editor") : this.popnode.runAction(cc.sequence(cc.fadeIn(.5), cc.fadeOut(.2)));
        } else this.popnode.runAction(cc.sequence(cc.fadeIn(.5), cc.fadeOut(.2)));*/
      },
      onClick1: function onClick1() {
        sceneManager.show("Level");
      },
      onClickOpt: function onClickOpt() {
        UIMgr.show("Options", true);
      },
	  dialogConfirm(infor, enterFun, cancelFun, viewNode){
			var markNode = new cc.Node();
			var graphics = markNode.addComponent(cc.Graphics);
			let _canvas = cc.Canvas.instance;
			let _rateR = _canvas.designResolution.height/_canvas.designResolution.width;
			var winWidth = cc.Canvas.instance.node.height/_rateR;
			var winHeight = cc.Canvas.instance.node.height;
			markNode.width = winWidth;
			markNode.height = winHeight;
			graphics.rect(-winWidth/2, -winHeight/2,winWidth, winHeight);
			graphics.fillColor = new cc.Color(0, 0, 0, 125);
			graphics.fill();
			var dialogNode = new cc.Node();
			var dialoagGrap = dialogNode.addComponent(cc.Graphics);
			var x = winWidth/3;
			
			var dialongWinWith = winWidth - x;
			var dialongWinHeight = dialongWinWith * 0.618;
			var y = - (dialongWinHeight/2);
			dialoagGrap.rect(-x, y , dialongWinWith, dialongWinHeight);
			dialoagGrap.fillColor = new cc.Color(255, 255, 255, 255);
			dialoagGrap.fill();
			
			//title
			var titleNode = new cc.Node();
			titleNode.color = new cc.Color(0, 0, 0, 255);
			var titleLabel = titleNode.addComponent(cc.Label);
			titleLabel.fontSize = 40;
			titleLabel.lineHeight = titleLabel.fontSize;
			titleNode.y = dialongWinHeight/2 - titleLabel.lineHeight;
			titleLabel.string = "提示";
			dialogNode.addChild(titleNode);
			
			//infor
			var inforNode = new cc.Node();
			inforNode.color = new cc.Color(0, 0, 0, 255);
			var inforLabel = inforNode.addComponent(cc.Label);
			inforLabel.fontSize = 30;
			inforLabel.lineHeight = inforLabel.fontSize;
			inforNode.y += inforLabel.lineHeight;
			inforLabel.string = infor;
			dialogNode.addChild(inforNode);
			
			//button left
			var btnLeftNode = new cc.Node();
			btnLeftNode.color = new cc.Color(0, 0, 0, 255);
			
			var btnLeft = btnLeftNode.addComponent(cc.Label);
			btnLeft.string = "关闭";
			btnLeft.fontSize = 30;
			btnLeft.lineHeight = btnLeft.fontSize;
			btnLeftNode.x = -dialongWinWith/4 ;
			btnLeftNode.y = -dialongWinHeight/4 ;
			dialogNode.addChild(btnLeftNode);
			
			function cancelCallback(e){
				console.log("cancel");
				markNode.destroy();
				if(cancelFun){
					cancelFun();
				}
			}
			btnLeftNode.on(cc.Node.EventType.TOUCH_END, cancelCallback, this);
			
			//button right 
			var btnRightNode = new cc.Node();
			btnRightNode.color = new cc.Color(0, 0, 0, 255);
			var btnRight = btnRightNode.addComponent(cc.Label);
			btnRight.string = "登录";
			btnRight.fontSize = btnLeft.fontSize + 10;
			btnRight.lineHeight = btnRight.fontSize;
			btnRightNode.x = dialongWinWith/4 ;
			btnRightNode.y = -dialongWinHeight/4;
			dialogNode.addChild(btnRightNode);
			function enterCallback(e){
				console.log("enter");
				markNode.destroy();
				if(enterFun){
					enterFun();
				}
			}
			btnRightNode.on(cc.Node.EventType.TOUCH_END, enterCallback, this);
			
			
			markNode.addComponent(cc.BlockInputEvents);
			markNode.addChild(dialogNode);
			markNode.zIndex = cc.macro.MAX_ZINDEX;
			if(viewNode){
				viewNode.addChild(markNode);
			}else{
				var can = cc.director.getScene().getChildByName("Canvas");
				
				can.addChild(markNode);
			}
		},	
      onClickRank: function onClickRank() {
		//  UIMgr.show("Rank");
		//埋点 排行榜
		//console.log("show ranking");
		if (window.h5api && window.h5api.isLogin()) {
			 window.h5api.showRanking();
		} else{
			this.dialogConfirm("登录后才能看到好友哦~", function(){
				window.h5api && window.h5api.login(function (obj) { });
			}, function(){});
		}
      }
    });
    cc._RF.pop();
  }, {} ],
  sc_Select: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f47832iOzdHIJ6qoHkUTgNs", "sc_Select");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        lb_page: cc.Node,
        items: [ cc.Node ],
        page_next: cc.Node,
        page_prev: cc.Node,
        editbox: cc.Node,
        lb_nothing: cc.Node,
        content: cc.Node,
        temps: cc.Node
      },
      onLoad: function onLoad() {
        this.node.onenter = this.onenter.bind(this);
        this.temps.active = false;
        this.block_temp = [];
        var child = this.temps.children;
        for (var i = 0; i < child.length; i++) {
          var c = child[i];
          c.blockType = gs.Block[c.name];
          this.block_temp[c.blockType] = c;
        }
        this.mapHeight = 11;
        this.mapWidth = 5;
        this.blockSize = cc.size(40, 40);
      },
      onenter: function onenter(type) {
        window.clubBtn && window.clubBtn.hide();
        this.showType = type;
        this.page = 1;
        if (!window.wxRank) return;
        this.lb_nothing.active = false;
        this.content.active = false;
        this.page_prev.active = false;
        this.page_next.active = false;
        this.lb_page.active = false;
        this.doShow();
      },
      toPos: function toPos(x, y) {
        if (void 0 == y || null == y) {
          y = x.y;
          x = x.x;
        }
        return cc.v2(-(this.mapWidth - 1) * this.blockSize.width / 2 + x * this.blockSize.width, -(this.mapHeight - 1) * this.blockSize.height / 2 + y * this.blockSize.height);
      },
      setBlockRotation: function setBlockRotation(item, rotation) {
        rotation = rotation || 1;
        var dest = (gs.RotationOffsetMap[item.blockType] || 0) + 90 * (rotation - 1);
        item.rotation = dest;
      },
      buildTo: function buildTo(content, level) {
        var data = gs.levelFromString(level.init);
        content.removeAllChildren();
        var w = this.mapWidth;
        var h = this.mapHeight;
        for (var x = 0; x < w; x++) for (var y = 0; y < h; y++) {
          var index = x + (h - y - 1) * w;
          var id = data[index];
          if (id) {
            var cfg = gs.ID2BlockMap[id];
            var temp = cc.instantiate(this.block_temp[cfg.t]);
            temp.active = true;
            temp.parent = content;
            temp.blockType = cfg.t;
            var pos = this.toPos(x, y);
            temp.setPosition(pos);
            temp.setScale(.4 * temp.getScale());
            this.setBlockRotation(temp, cfg.r, true);
          }
        }
      },
      doShow: function doShow() {
        var _this = this;
        window.wxRank.call("level_list", {
          key: this.showType,
          count: 4,
          page: this.page,
          myid: this.myid
        }, function(ok, data) {
          cc.log(data);
          if (!data.data || 0 == data.data.length) {
            _this.lb_nothing.active = true;
            _this.content.active = false;
            return;
          }
          _this.maxPage = data.maxPage;
          _this.lb_nothing.active = false;
          _this.content.active = true;
          _this.showWithData(data.data);
        });
      },
      showWithData: function showWithData(data) {
        var _this2 = this;
        this.lb_page.active = true;
        this.lb_page.getComponent(cc.Label).string = this.page + " / " + this.maxPage;
        this.page_prev.active = 1 != this.page;
        this.page_next.active = this.page != this.maxPage;
        this.data = data;
        for (var i = 0; i < 4; i++) {
          var item = this.items[i];
          i < data.length ? function() {
            item.active = true;
            var d = data[i];
            var bar = item.getChildByName("bar");
            bar.getChildByName("count").getComponent(cc.Label).string = "\u901a\u5173\u4eba\u6570\uff1a" + d.passed + "/" + d.played;
            bar.getChildByName("time").getComponent(cc.Label).string = DateFormat("yyyy/mm/dd");
            _this2.buildTo(item.getChildByName("content"), d);
            item.getChildByName("remove").active = "my" == _this2.showType;
            item.getChildByName("modify").active = "my" == _this2.showType;
            window.wxRank.call("getUserInfo", {
              target: d.openid
            }, function(ok, data) {
              _this2.showUser(bar, data);
              cc.log(data);
            });
          }() : item.active = false;
        }
      },
      showUser: function showUser(bar, profile) {
        if (null == profile) return;
        bar.getChildByName("name").getComponent(cc.Label).string = profile.nickName;
        var image = wx.createImage();
        image.onload = function() {
          var texture = new cc.Texture2D();
          texture.initWithElement(image);
          texture.handleLoadedTexture();
          bar.getChildByName("mask").getChildByName("icon").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
        };
        image.src = profile.avatarUrl;
      },
      on_Search: function on_Search() {
        this.showType = "search";
        this.page = 1;
        this.myid = parseInt(this.editbox.getComponent(cc.EditBox).string);
        this.doShow();
      },
      on_Back: function on_Back() {
        sceneManager.show("Level");
      },
      on_Level: function on_Level(e) {
        var index = parseInt(e.target.name) - 1;
        var lv_data = this.data[index];
        window.wxRank.call("level_mark", {
          key: "played",
          level: lv_data._id
        }, function(ok, data) {
          if (!ok) {
            UIMgr.show("Msg", "\u7f51\u7edc\u4e0d\u7ed9\u529b\uff0c\u8bf7\u91cd\u8bd5");
            return;
          }
          gs.gotoCustomLevel(lv_data);
        });
      },
      on_Remove: function on_Remove(e) {
        var _this3 = this;
        var index = parseInt(e.target.parent.name) - 1;
        var lv_data = this.data[index];
        UIMgr.show("Msg", "\u4f60\u786e\u5b9a\u5220\u9664\u8fd9\u4e2a\u5173\u5361\u5417\uff1f", function(confirm) {
          confirm && window.wxRank.call("level_remove", {
            level: lv_data._id
          }, function(ok, data) {
            if (!ok) {
              UIMgr.show("Msg", "\u7f51\u7edc\u4e0d\u7ed9\u529b\uff0c\u8bf7\u91cd\u8bd5");
              return;
            }
            UIMgr.show("Msg", data.msg, function() {
              _this3.doShow();
            });
          });
        });
      },
      on_Modify: function on_Modify(e) {
        var index = parseInt(e.target.parent.name) - 1;
        var lv_data = this.data[index];
        sceneManager.show("Editor", lv_data);
      },
      on_Next: function on_Next() {
        this.page++;
        this.page >= this.maxPage && (this.page = this.maxPage);
        this.doShow();
      },
      on_Prev: function on_Prev() {
        this.page--;
        this.page <= 1 && (this.page = 1);
        this.doShow();
      }
    });
    cc._RF.pop();
  }, {} ],
  ui_Complete: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2dff7u5CYZDJpH7upRJIutp", "ui_Complete");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        lb_time: cc.Node,
        lb_try: cc.Node
      },
      onLoad: function onLoad() {
        this.node.onenter = this.onenter.bind(this);
      },
      onenter: function onenter(time, tryCount, enterMode, restart_func) {
        this.restart_func = restart_func;
        this.enterMode = enterMode;
        this.lb_try.getComponent(cc.Label).string = tryCount;
        time = Math.floor(time / 1e3);
        if (time > 3600) {
          var min = time / 3600;
          var sec = time % 3600;
          this.lb_time.getComponent(cc.Label).string = min + "\u5206" + sec + "\u79d2";
        } else this.lb_time.getComponent(cc.Label).string = time + "\u79d2";
      },
      on_Menu: function on_Menu() {
        sceneManager.show("Menu");
        UIMgr.close(this);
      },
      on_Replay: function on_Replay() {
        "custom" == this.enterMode ? this.restart_func() : gs.gotoLevel(window.currentEnterLevel);
        UIMgr.close(this);
      },
      on_Next: function on_Next() {
        "custom" == this.enterMode ? sceneManager.pop() : gs.gotoLevel(window.currentEnterLevel + 1);
        UIMgr.close(this);
      }
    });
    cc._RF.pop();
  }, {} ],
  ui_Help: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5321aPeFP5FyJ7YorXnqh1C", "ui_Help");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        pageview: cc.Node
      },
      start: function start() {
        this.cur = 0;
      },
      btn_next: function btn_next() {
        this.cur++;
        this.pageview.getComponent(cc.PageView).scrollToPage(this.cur);
        3 == this.cur && UIMgr.close(this);
      }
    });
    cc._RF.pop();
  }, {} ],
  ui_Msg: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "91078G4lmhNPol1LacUdKG8", "ui_Msg");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        lb_content: cc.Label,
        btn_ok: cc.Node,
        btn_cancel: cc.Node
      },
      onLoad: function onLoad() {
        this.node.onenter = this.onenter.bind(this);
      },
      onenter: function onenter(msg, cb, type) {
        this.cb = cb;
        this.lb_content.string = msg;
        if (type) {
          var arr = type.split("|");
          this.btn_ok.active = false;
          this.btn_cancel.active = false;
          for (var i = 0; i < arr.length; i++) "ok" == arr[i] ? this.btn_ok.active = true : "cancel" == arr[i] && (this.btn_cancel = true);
        } else {
          this.btn_ok.active = true;
          this.btn_cancel.active = true;
        }
      },
      onClickOK: function onClickOK() {
        var cb = this.cb;
        UIMgr.close(this);
        cb && cb(true);
      },
      onClickClose: function onClickClose() {
        var cb = this.cb;
        UIMgr.close(this);
        cb && cb(false);
      }
    });
    cc._RF.pop();
  }, {} ],
  ui_Options: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a1f67/GVPVCTp/b7K3TPmHn", "ui_Options");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        btn_menu: cc.Node,
        btn_music: cc.Node,
        btn_sound: cc.Node
      },
      onLoad: function onLoad() {
        this.node.onenter = this.onenter.bind(this);
      },
      onenter: function onenter(is_menu, enterMode, func) {
        this.enterMode = enterMode;
        this.btn_menu.active = !is_menu;
        this.restart_func = func;
        this.updateDisplay();
      },
      updateDisplay: function updateDisplay() {
        this.btn_music.getChildByName("on").active = gs.isMusicOpen();
        this.btn_music.getChildByName("off").active = !gs.isMusicOpen();
        this.btn_sound.getChildByName("on").active = gs.isSoundOpen();
        this.btn_sound.getChildByName("off").active = !gs.isSoundOpen();
      },
      onClose: function onClose() {
        UIMgr.close(this);
      },
      onShare: function onShare() {
        cc.log("share");
        wx.shareAppMessage({
          title: "\u53f2\u4e0a\u6700\u70e7\u8111\u7684\u6e38\u620f"
        });
      },
      onMusic: function onMusic(e) {
        gs.setMusicOpen(!gs.isMusicOpen());
        this.updateDisplay();
      },
      onSound: function onSound() {
        gs.setSoundOpen(!gs.isSoundOpen());
        this.updateDisplay();
      },
      onMenu: function onMenu() {
        "custom" == this.enterMode ? sceneManager.pop() : sceneManager.show("Menu");
        UIMgr.close(this);
      },
      onRestart: function onRestart() {
        this.restart_func();
        UIMgr.close(this);
      },
      onContinue: function onContinue() {
        UIMgr.close(this);
      }
    });
    cc._RF.pop();
  }, {} ],
  ui_Rank: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3dea4cdv5lOiq8MjVRrBlvk", "ui_Rank");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        scroll: cc.ScrollView,
        temp: cc.Node,
        content: cc.Node,
        sprites: [ cc.SpriteFrame ]
      },
      onLoad: function onLoad() {
        this.node.onenter = this.onenter.bind(this);
      },
      onenter: function onenter() {
        this.updateRank();
      },
      updateRank: function updateRank() {
        var _this = this;
        if (window.wxRank) {
          gs.loading(true);
          window.wxRank.rankList(function(ok, list) {
            gs.loading(false);
            if (ok) {
              _this.content.removeAllChildren();
              for (var i = 0; i < list.length; i++) _this.addOne(i, list[i].profile, list[i].score);
            } else UIMgr.show("Msg", "\u7f51\u7edc\u4e0d\u7ed9\u529b\uff0c\u8bf7\u91cd\u8bd5", function(isOk) {
              isOk ? _this.updateRank() : _this.onClickClose();
            }, "ok");
          });
        }
      },
      onClickClose: function onClickClose() {
        UIMgr.close(this);
      },
      addOne: function addOne(index, profile, sc) {
        var node = cc.instantiate(this.temp);
        node.parent = this.content;
        node.active = true;
        node.getChildByName("lv").getComponent(cc.Label).string = "\u7b2c" + sc + "\u5173";
        if (index < this.sprites.length) {
          node.getChildByName("index_lb").active = false;
          node.getChildByName("index_sp").active = true;
          node.getChildByName("index_sp").getComponent(cc.Sprite).spriteFrame = this.sprites[index];
        } else {
          node.getChildByName("index_sp").active = false;
          node.getChildByName("index_lb").active = true;
          node.getChildByName("index_lb").getComponent(cc.Label).string = index + 1;
        }
        if (profile) {
          node.getChildByName("name").getComponent(cc.Label).string = profile.nickName;
          var image = wx.createImage();
          image.onload = function() {
            var texture = new cc.Texture2D();
            texture.initWithElement(image);
            texture.handleLoadedTexture();
            node.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
          };
          image.src = profile.avatarUrl;
        } else node.getChildByName("name").getComponent(cc.Label).string = "\u672a\u6388\u6743\u73a9\u5bb6";
      }
    });
    cc._RF.pop();
  }, {} ]
}, {}, [ "LanguageData", "LocalizedLabel", "LocalizedSprite", "SpriteFrameSet", "polyglot.min", "BlockScript", "DateFormat", "SceneManager", "UIManager", "data", "gamesettings", "sc_Editor", "sc_Game", "sc_Level", "sc_Menu", "sc_Select", "ui_Complete", "ui_Help", "ui_Msg", "ui_Options", "ui_Rank" ]);