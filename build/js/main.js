"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
(function (_sessionStorage$getIt, _document$querySelect5, _document$querySelect6, _document$querySelect7) {
  var apiURL = 'https://allwin-prom.pp.ua/api_sports_tennis_challenge';
  var isVerifiedUser = false;
  var periodAmount = 2; // кількість періодів в акції, треба для кешування інфи з табли
  var tableData = [];
  var activeWeek = null;
  var isPromoOver = false;
  var mainPage = document.querySelector(".tennisChallenge"),
    choseBlock = document.querySelector(".levels"),
    resultBlock = document.querySelector(".progress"),
    unauthMsgs = document.querySelectorAll('.unauth-msg'),
    participateBtns = document.querySelectorAll('.part-btn'),
    redirectBtns = document.querySelectorAll('.btn-join'),
    choseCards = document.querySelectorAll(".levels__card"),
    loader = document.querySelector(".spinner-overlay");

  // document.body.style.overflow = "hidden"

  var ukLeng = document.querySelector('#ukLeng');
  var enLeng = document.querySelector('#enLeng');
  var difficults = ["_light", "_pro", "_extreme"];
  var modeMap = {
    "novice": "_light",
    "experienced": "_pro",
    "insane": "_extreme",
    "_light": "novice",
    "_pro": "experienced",
    "_extreme": "insane"
  };
  var DEFAULT_UPDATED_AT = '21.01 16:30';

  // let locale = "uk"
  var locale = (_sessionStorage$getIt = sessionStorage.getItem("locale")) !== null && _sessionStorage$getIt !== void 0 ? _sessionStorage$getIt : "uk";
  if (ukLeng) locale = 'uk';
  if (enLeng) locale = 'en';
  var debug = false;
  var inited = false;
  var i18nData = {};
  var translateState = true;

  // let userId = null
  var userId = sessionStorage.getItem('userId') || null;
  // userId = 403197114

  function participate(mode) {
    if (!userId || !mode) {
      return;
    }
    var params = {
      userid: userId,
      mode: mode
    };
    request('/user', {
      method: 'POST',
      body: JSON.stringify(params)
    }).then(function (res) {
      participateBtns.forEach(function (item) {
        return item.classList.add('hide');
      });
      redirectBtns.forEach(function (item) {
        return item.classList.remove('hide');
      });
      var css = modeMap[mode];
      toggleBlocks(choseBlock, "choseHide", resultBlock, "resultShow", css, true);
    });
  }
  function translate() {
    var elems = document.querySelectorAll('[data-translate]');
    if (elems && elems.length) {
      if (translateState) {
        elems.forEach(function (elem) {
          var key = elem.getAttribute('data-translate');
          elem.innerHTML = i18nData[key] || '*----NEED TO BE TRANSLATED----*   key:  ' + key;
          elem.removeAttribute('data-translate');
        });
      } else {
        console.log("translation works!");
      }
    }
    if (locale === 'en') {
      mainPage.classList.add('en');
    }
    refreshLocalizedClass();
  }
  function translateKey(key, defaultVal) {
    if (!key) {
      return;
    }
    return i18nData[key] || defaultVal || '*----NEED TO BE TRANSLATED----*   key:  ' + key;
  }
  function displayUserInfo(userInfo) {
    var bets = userInfo.bets;
    // let bets = [{betDate: new Date(), status: 'undefined'}]

    displayBetsHistory(bets);
    refreshLastUpdatedDate(userInfo);
    bets = userInfo.bets.sort(function (a, b) {
      return new Date(b.betDate) - new Date(a.betDate);
    }).slice(0, 10).reverse();
    refreshBets(bets);
  }
  function refreshLastUpdatedDate(userInfo) {
    var dateContainer = document.querySelector('.progress__right-updated');
    if (!dateContainer) {
      return;
    }

    // Використовуємо єдиний span: або по id, або перший .upd у контейнері (щоб не дублювати)
    var span = dateContainer.querySelector('#lastUpd') || dateContainer.querySelector('.upd');
    if (!span) {
      span = document.createElement('span');
      span.id = 'lastUpd';
      span.className = 'upd';
      dateContainer.appendChild(document.createTextNode(' '));
      dateContainer.appendChild(span);
    } else {
      span.id = 'lastUpd';
    }
    // Видалити дублікати span.upd у цьому контейнері
    dateContainer.querySelectorAll('.upd').forEach(function (el) {
      if (el !== span) el.remove();
    });
    var updateDate = (userInfo === null || userInfo === void 0 ? void 0 : userInfo.lastUpdate) || (userInfo === null || userInfo === void 0 ? void 0 : userInfo.lastUpd) || (userInfo === null || userInfo === void 0 ? void 0 : userInfo.updatedAt) || null;
    if (updateDate) {
      span.innerHTML = formatDate(updateDate);
    } else {
      span.innerHTML = DEFAULT_UPDATED_AT;
    }
    var mobileSpan = document.querySelector('.progress__updated-mob .upd');
    if (mobileSpan) {
      mobileSpan.innerHTML = updateDate ? formatDate(updateDate) : DEFAULT_UPDATED_AT;
    }
    // Keep visible for authorized user flow; fallback to template date when API has no timestamp yet.
    if (userInfo !== null && userInfo !== void 0 && userInfo.userid) {
      dateContainer.classList.remove('hide');
      return;
    }
    dateContainer.classList.add('hide');
  }
  function formatDate(date) {
    var localDate = new Date(date);
    var day = String(localDate.getDate()).padStart(2, '0');
    var month = String(localDate.getMonth() + 1).padStart(2, '0');
    var hours = String(localDate.getHours()).padStart(2, '0');
    var minutes = String(localDate.getMinutes()).padStart(2, '0');
    return "".concat(day, ".").concat(month, " ").concat(hours, ":").concat(minutes);
  }
  function refreshBets(bets) {
    var divs = document.querySelectorAll('.progress__bets-item');
    for (var i = 0; i < bets.length; i++) {
      var element = divs[i];
      var bet = bets[i];
      element.classList.remove('you');
      element.classList.remove('_done');
      element.classList.remove('_fail');
      var status = '_fail';
      if (bet.status === 'win') {
        status = '_done';
      } else if (!bet.status || bet.status === 'undefined') {
        status = 'you';
      }
      element.classList.add(status);
    }
  }
  function displayBetsHistory(bets) {
    // return;
    var spinItem = document.querySelector('.spins-row');
    var noSpinItem = document.querySelector('.no-spins');
    if (!Array.isArray(bets) || bets.length === 0) {
      if (!debug) {
        spinItem.classList.add('hide');
        noSpinItem.classList.remove('hide');
      }
      return;
    }
    bets = bets.sort(function (a, b) {
      return new Date(b.betDate) - new Date(a.betDate);
    });
    if (debug) {
      bets = mockBets;
    }
    spinItem.innerHTML = "\n       <div class=\"spins-row-head\">\n            <div class=\"content-date\" data-translate=\"myBetDate\"></div>\n            <div class=\"content-prize\" data-translate=\"myBetPrize\"></div>\n            <div class=\"content-status\" data-translate=\"myBetStatus\"></div>\n        </div>\n        ";
    spinItem.classList.remove('hide');
    noSpinItem.classList.add('hide');
    var upd = 0;
    bets.forEach(function (spin) {
      var spinDate = new Date(spin.betDate);
      var formattedDate = spinDate.toLocaleDateString('uk-UA').slice(0, 5);
      var status = resolveStatusTranslation(spin.status);
      if (status) {
        var spinElement = document.createElement('div');
        spinElement.classList.add('spins-row-item');
        var isWin = spin.status === "win";
        var statusClass = isWin ? '_done' : '';
        spinElement.innerHTML = "\n                    <span class=\"content-date\">".concat(formattedDate, "</span>\n                    <span class=\"content-prize\">ID:").concat(spin.betId, "</span>\n                    <span class=\"content-status ").concat(statusClass, "\"></span>\n                ");
        spinItem.appendChild(spinElement);
        upd++;
      }
    });
    if (upd === 0) {
      spinItem.classList.add('hide');
      noSpinItem.classList.remove('hide');
    }
  }
  function resolveStatusTranslation(status) {
    if (!status || status === 'undefined') {
      return translateKey('betUndefined');
    }
    if (status === 'win') {
      return translateKey('winBet');
    }
    if (status === 'lose') {
      return translateKey('loseBet');
    }
  }
  function refreshLocalizedClass(element, baseCssClass) {
    if (!element) {
      return;
    }
    for (var _i = 0, _arr = ['uk', 'en']; _i < _arr.length; _i++) {
      var lang = _arr[_i];
      element.classList.remove(baseCssClass + lang);
    }
    element.classList.add(baseCssClass + locale);
  }
  function reportError(err) {
    var reportData = {
      origin: window.location.href,
      userid: userId,
      errorText: (err === null || err === void 0 ? void 0 : err.error) || (err === null || err === void 0 ? void 0 : err.text) || (err === null || err === void 0 ? void 0 : err.message) || 'Unknown error',
      type: (err === null || err === void 0 ? void 0 : err.name) || 'UnknownError',
      stack: (err === null || err === void 0 ? void 0 : err.stack) || ''
    };
    fetch('', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reportData)
    })["catch"](console.warn);
  }
  var request = function request(link, extraOptions) {
    return fetch(apiURL + link, _objectSpread({
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }, extraOptions || {})).then(function (res) {
      if (!res.ok) throw new Error('API error');
      return res.json();
    })["catch"](function (err) {
      console.error('API request failed:', err);
      reportError(err);
      return Promise.reject(err);
    });
  };
  function checkUserAuth() {
    if (userId) {
      var levelInfoBtns = document.querySelectorAll(".levels__card-infoBtn");
      var progressInfoBtns = document.querySelectorAll(".progress__left-infoBtn");
      levelInfoBtns.forEach(function (el) {
        el.classList.remove("hide");
      });
      progressInfoBtns.forEach(function (el) {
        el.classList.add("hide");
      });
      var _iterator = _createForOfIteratorHelper(unauthMsgs),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var unauthMes = _step.value;
          unauthMes.classList.add('hide');
        }
        // for (const info of choseCardsInfo) {
        //     info.classList.remove('hide');
        // }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return request("/promouser/".concat(userId, "?nocache=1")).then(function (res) {
        if (res.userid) {
          participateBtns.forEach(function (item) {
            return item.classList.add('hide');
          });
          redirectBtns.forEach(function (item) {
            return item.classList.remove('hide');
          });
          progressInfoBtns.forEach(function (el) {
            el.classList.add("hide");
          });
          var css = modeMap[res.mode];
          toggleBlocks(choseBlock, "choseHide", resultBlock, "resultShow", css, false);
          displayUserInfo(res);
        } else {
          initChooseCards(choseCards);
          participateBtns.forEach(function (item) {
            return item.classList.remove('hide');
          });
          redirectBtns.forEach(function (item) {
            return item.classList.add('hide');
          });
        }
        loader.classList.add("hide");
        document.body.style.overflow = "auto";
        mainPage.classList.remove("loading");
      });
    } else {
      document.querySelectorAll(".levels__card-infoBtn, .progress__left-infoBtn").forEach(function (el) {
        el.classList.add("hide");
      });
      var _iterator2 = _createForOfIteratorHelper(participateBtns),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var participateBtn = _step2.value;
          participateBtn.classList.add('hide');
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      var _iterator3 = _createForOfIteratorHelper(unauthMsgs),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _unauthMes = _step3.value;
          _unauthMes.classList.remove('hide');
        }
        // document.querySelectorAll(".chose__card-info").forEach(el => {
        //     el.classList.add("hide")
        // })
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      loader.classList.add("hide");
      document.body.style.overflow = "auto";
      mainPage.classList.remove("loading");
      return Promise.resolve(false);
    }
  }
  function renderUsers() {
    if (debug) {
      populateUsersTable(mockUsers, userId);
      return;
    }
    request("/users/").then(function (data) {
      var user = data.find(function (user) {
        return user.userid === userId;
      });
      var mode = user ? user.mode : null;
      var users = data.filter(function (user) {
        return user.mode === mode;
      });
      populateUsersTable(users, userId);
    });
  }
  function populateUsersTable(users, currentUserId) {
    var _users;
    var youRow = document.querySelector('#tableOther');
    var tableBody = document.querySelector('#table');
    if (!((_users = users) !== null && _users !== void 0 && _users.length) || currentUserId === undefined) return;
    youRow.innerHTML = '';
    tableBody.innerHTML = '';
    users = users.sort(function (a, b) {
      return b.winCount - a.winCount;
    });
    users.forEach(function (user, index) {
      var isCurrentUser = user.userid === currentUserId;
      var isTopUser = false;
      if (index <= 5 && isCurrentUser) {
        isTopUser = true;
      }
      if (index >= 10 && !isCurrentUser) return;
      displayUser(user, isCurrentUser, index + 1, isCurrentUser && !isTopUser ? youRow : tableBody);
    });
  }
  function displayUser(user, isCurrentUser, place, target) {
    var userIdDisplay = isCurrentUser ? user.userid : maskUserId(user.userid);
    var row = document.createElement('div');
    row.classList.add('table__row');
    if (isCurrentUser) {
      // Створення елементу 'you' та вставка його після елементу з місцем
      var youText = document.createElement('div');
      youText.classList.add('table__row-item', '_you-text');
      youText.setAttribute('data-translate', 'you');
      row.innerHTML = "\n            <div class=\"table__row-item\">".concat(place, "</div>\n        ");

      // Додаємо "you" текст після місця
      row.appendChild(youText);

      // Потім додаємо userId та ставку
      var userIdDiv = document.createElement('div');
      userIdDiv.classList.add('table__row-item');
      userIdDiv.textContent = userIdDisplay;
      var betDiv = document.createElement('div');
      betDiv.classList.add('table__row-item');
      betDiv.textContent = user.winCount;
      row.appendChild(userIdDiv);
      row.appendChild(betDiv);
      row.classList.add('_you');
    } else {
      row.innerHTML = "\n            <div class=\"table__row-item\">".concat(place, "</div>\n            <div class=\"table__row-item\">").concat(userIdDisplay, "</div>\n            <div class=\"table__row-item\">").concat(user.winCount, "</div>\n        ");
    }
    target.appendChild(row);
  }
  function maskUserId(userId) {
    return "****" + userId.toString().slice(4);
  }
  function initChooseCards(cards) {
    if (inited) {
      return;
    }
    cards.forEach(function (card) {
      card.addEventListener("click", function (e) {
        if (e.target.classList.contains("info-icon")) {
          return;
        }
        for (var i = 0; i < difficults.length; i++) {
          var item = difficults[i];
          if (card.classList.contains(item)) {
            var mode = modeMap[item];
            participate(mode);
            setTimeout(function () {
              checkUserAuth();
              renderUsers();
            }, 200);
            break;
          }
        }
      });
    });
    inited = true;
  }
  function monitorVisibility(element, animationClass, delay) {
    if (!element) {
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setTimeout(function () {
            element.classList.add(animationClass);
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    });
    observer.observe(element);
  }
  function toggleBlocks(hideBlock, hideClass, showBlock, showClass, state, animate) {
    mainPage.classList.add(state, locale);
    hideBlock.classList.add(hideClass);
    var drops = showBlock.querySelectorAll(".drop");
    var progressLeftBlocks = showBlock.querySelectorAll(".progress__left");
    var levelDrops = showBlock.querySelectorAll(".drop._light, .drop._pro, .drop._extreme");
    progressLeftBlocks.forEach(function (leftBlock) {
      if (leftBlock.classList.contains(state)) {
        leftBlock.classList.remove("hide");
      } else {
        leftBlock.classList.add("hide");
      }
    });
    var progressBets = showBlock.querySelector(".progress__bets");
    if (progressBets) {
      progressBets.classList.remove("_light", "_pro", "_extreme");
      progressBets.classList.add(state);
    }
    levelDrops.forEach(function (dropBlock) {
      if (dropBlock.classList.contains(state)) {
        dropBlock.classList.remove("hide");
      } else {
        dropBlock.classList.add("hide");
      }
    });
    drops.forEach(function (item) {
      difficults.forEach(function (state) {
        item.classList.remove(state);
      });
    });
    drops[0].classList.add(state);
    var revealShowBlock = function revealShowBlock() {
      var _document$querySelect;
      showBlock.classList.remove("hide");
      showBlock.style.display = "flex";
      showBlock.style.height = hideBlock.clientHeight;
      hideBlock.classList.add("hide");
      showResultBlock(showBlock, showClass);
      (_document$querySelect = document.querySelector(".results.cont")) === null || _document$querySelect === void 0 || _document$querySelect.classList.remove("hide");
    };
    if (animate) {
      var isRevealed = false;
      var revealOnce = function revealOnce() {
        if (isRevealed) return;
        isRevealed = true;
        revealShowBlock();
      };

      // Legacy flow expected animationend, but current styles use transitions/no animation.
      hideBlock.addEventListener("animationend", revealOnce, {
        once: true
      });
      hideBlock.addEventListener("transitionend", revealOnce, {
        once: true
      });
      setTimeout(revealOnce, 1050);
    } else {
      revealShowBlock();
    }
  }
  function showResultBlock(showBlock, showClass) {
    showBlock.classList.add(showClass);
    showBlock.style.height = "auto";
  }
  function animateProgressBetsItems(betsWrap) {
    if (!betsWrap) return;
    betsWrap.classList.remove("progress__bets--animate");
    void betsWrap.offsetWidth;
    betsWrap.classList.add("progress__bets--animate");
  }
  function init() {
    return _init.apply(this, arguments);
  }
  function _init() {
    _init = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var attempts, maxAttempts, attemptInterval, tryDetectUserId, quickCheckAndRender, waitForUserId;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            quickCheckAndRender = function _quickCheckAndRender() {
              checkUserAuth();
              renderUsers();
              document.querySelectorAll(".toChose").forEach(function (btn) {
                btn.addEventListener('click', function (e) {
                  e.stopPropagation();
                  var targetElement = document.getElementById("chose");
                  var targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 2;
                  window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                  });
                });
              });
              var cardLight = document.querySelector(".levels__card._light");
              var cardPro = document.querySelector(".levels__card._pro");
              var cardExtreme = document.querySelector(".levels__card._extreme");
              monitorVisibility(cardLight, "showCard", 400);
              monitorVisibility(cardPro, "showCard", 800);
              monitorVisibility(cardExtreme, "showCard", 1200);
            };
            tryDetectUserId = function _tryDetectUserId() {
              if (window.store) {
                var state = window.store.getState();
                userId = state.auth.isAuthorized && state.auth.id || '';
              } else if (window.g_user_id) {
                userId = window.g_user_id;
              }
              if (debug) userId = sessionStorage.getItem("userId") || null;
            };
            attempts = 0;
            maxAttempts = 20;
            attemptInterval = 50;
            waitForUserId = new Promise(function (resolve) {
              var interval = setInterval(function () {
                tryDetectUserId();
                if (userId || attempts >= maxAttempts) {
                  quickCheckAndRender();
                  clearInterval(interval);
                  resolve();
                }
                attempts++;
              }, attemptInterval);
            });
            _context.next = 8;
            return waitForUserId;
          case 8:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return _init.apply(this, arguments);
  }
  function loadTranslations() {
    return request("/translates/".concat(locale)).then(function (json) {
      i18nData = json;
      translate();
      var mutationObserver = new MutationObserver(function (mutations) {
        translate();
      });
      mutationObserver.observe(document.getElementById("tennis-challenge"), {
        childList: true,
        subtree: true
      });
    });
  }

  // Popups: всі в одному блоці .popups, відкриття по data-popup, закриття по .popups__item-close
  (function () {
    var popupWrap = document.querySelector('.popups');
    if (!popupWrap) return;
    function openPopupByAttr(popupAttr, popupClass) {
      document.body.style.overflow = 'hidden';
      var targetPopup = document.querySelector('.popup[data-popup="' + popupAttr + '"]');
      if (targetPopup) {
        targetPopup.classList.add('active');
        popupWrap.classList.remove('_opacity');
        popupWrap.classList.add(popupClass);
      }
    }
    function closeAllPopups() {
      var popupsClass = ['_levelLight', '_levelPro', '_levelExtreme', '_reminderInfo'];
      popupWrap.classList.add('_opacity');
      popupsClass.forEach(function (cls) {
        popupWrap.classList.remove(cls);
      });
      document.querySelectorAll('.popup').forEach(function (p) {
        p.classList.remove('active');
      });
      document.body.style.overflow = 'auto';
    }
    popupWrap.addEventListener('click', function (e) {
      if (e.target.closest('.popups__item-close')) {
        closeAllPopups();
      }
      if (e.target === popupWrap) {
        closeAllPopups();
      }
    });
    document.addEventListener('click', function (e) {
      var opener = e.target.closest('[data-popup]');
      if (!opener) return;
      if (opener.classList.contains('popup')) return;
      e.preventDefault();
      e.stopPropagation();
      var attr = opener.dataset.popup;
      if (!attr) return;
      var popupClass = '_' + attr;
      openPopupByAttr(attr, popupClass);
    });
  })();

  // ========== Levels decor animations: fly-out from center, then levitation ==========
  (function () {
    var DECOR_FLY_OUT_NAMES = ['decorFlyOutBallLeft', 'decorFlyOutBallRight', 'decorFlyOutShutterLeft', 'decorFlyOutShutterRight'];
    var decor = document.querySelector('.levels .decor');
    if (!decor) return;
    var finishedFlyOut = new Set();
    function onFlyOutEnd(e) {
      if (!DECOR_FLY_OUT_NAMES.includes(e.animationName)) return;
      finishedFlyOut.add(e.animationName);
      if (finishedFlyOut.size === DECOR_FLY_OUT_NAMES.length) {
        decor.classList.add('decor-levitate');
      }
    }
    decor.addEventListener('animationend', onFlyOutEnd);
  })();

  // ========== Progress bets: run item animation only when .progress loses .hide ==========
  (function () {
    var progress = document.querySelector('.progress');
    if (!progress) return;
    var wasHidden = progress.classList.contains('hide');
    function runBetsAnimation() {
      var isHidden = progress.classList.contains('hide');
      if (wasHidden && !isHidden) {
        var betsWrap = progress.querySelector('.progress__bets');
        animateProgressBetsItems(betsWrap);
      }
      wasHidden = isHidden;
    }
    if (!wasHidden) {
      var betsWrap = progress.querySelector('.progress__bets');
      animateProgressBetsItems(betsWrap);
    }
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        if (m.attributeName === 'class') {
          runBetsAnimation();
        }
      });
    });
    observer.observe(progress, {
      attributes: true
    });
  })();

  //test

  document.querySelector(".menu-btn").addEventListener("click", function () {
    document.querySelector(".menu-test").classList.toggle("hide");
  });
  var LEVEL_CLASS_MAP = {
    easy: "_light",
    medium: "_pro",
    extreme: "_extreme"
  };
  function setNoSpinsTestState() {
    var noSpins = document.querySelector('.no-spins');
    var spinsRow = document.querySelector('.spins-row');
    noSpins === null || noSpins === void 0 || noSpins.classList.remove('hide');
    spinsRow === null || spinsRow === void 0 || spinsRow.classList.add('hide');
  }
  function applyLevelSelection(levelType) {
    var _document$querySelect2, _document$querySelect3, _document$querySelect4;
    var selectedLevelClass = LEVEL_CLASS_MAP[levelType];
    if (!selectedLevelClass) return;
    (_document$querySelect2 = document.querySelector(".levels.cont")) === null || _document$querySelect2 === void 0 || _document$querySelect2.classList.add("hide");
    (_document$querySelect3 = document.querySelector(".progress")) === null || _document$querySelect3 === void 0 || _document$querySelect3.classList.remove("hide");
    document.querySelectorAll(".progress__left").forEach(function (leftBlock) {
      if (leftBlock.classList.contains(selectedLevelClass)) {
        leftBlock.classList.remove("hide");
      } else {
        leftBlock.classList.add("hide");
      }
    });
    var progressBets = document.querySelector(".progress__bets");
    if (progressBets) {
      progressBets.classList.remove("_light", "_pro", "_extreme");
      progressBets.classList.add(selectedLevelClass);
    }
    document.querySelectorAll(".progress .drop._light, .progress .drop._pro, .progress .drop._extreme").forEach(function (dropBlock) {
      if (dropBlock.classList.contains(selectedLevelClass)) {
        dropBlock.classList.remove("hide");
      } else {
        dropBlock.classList.add("hide");
      }
    });
    (_document$querySelect4 = document.querySelector(".results.cont")) === null || _document$querySelect4 === void 0 || _document$querySelect4.classList.remove("hide");
    setNoSpinsTestState();
  }
  function runLegacyLevelUI(levelClass) {
    if (typeof difficults !== "undefined" && Array.isArray(difficults) && typeof mainPage !== "undefined" && mainPage) {
      difficults.forEach(function (css) {
        mainPage.classList.remove(css);
      });
    }
    if (typeof toggleBlocks === "function" && typeof choseBlock !== "undefined" && typeof resultBlock !== "undefined") {
      toggleBlocks(choseBlock, "choseHide", resultBlock, "resultShow", levelClass, true);
    }
    if (typeof loader !== "undefined" && loader) {
      loader.classList.add("hide");
    }
    document.body.style.overflow = "auto";
    if (typeof mainPage !== "undefined" && mainPage) {
      mainPage.classList.remove("loading");
    }
  }
  document.querySelector(".extreme-btn").addEventListener("click", function () {
    applyLevelSelection("extreme");
    runLegacyLevelUI("_extreme");
    document.querySelectorAll('.unauth-msg, .part-btn').forEach(function (el) {
      el.classList.add('hide');
    });
    document.querySelectorAll('.btn-join').forEach(function (el) {
      el.classList.remove('hide');
    });
  });
  document.querySelector(".easy-btn").addEventListener("click", function () {
    applyLevelSelection("easy");
    runLegacyLevelUI("_light");
    document.querySelectorAll('.unauth-msg, .part-btn').forEach(function (el) {
      el.classList.add('hide');
    });
    document.querySelectorAll('.btn-join').forEach(function (el) {
      el.classList.remove('hide');
    });
  });
  document.querySelector(".medium-btn").addEventListener("click", function () {
    applyLevelSelection("medium");
    runLegacyLevelUI("_pro");
    document.querySelectorAll('.unauth-msg, .part-btn').forEach(function (el) {
      el.classList.add('hide');
    });
    document.querySelectorAll('.btn-join').forEach(function (el) {
      el.classList.remove('hide');
    });
  });
  document.querySelector(".lng-btn").addEventListener("click", function () {
    var currentLocale = sessionStorage.getItem("locale");
    if (currentLocale === "en") {
      sessionStorage.removeItem("locale");
    } else {
      sessionStorage.setItem("locale", "en");
    }
    location.reload();
  });

  // document.querySelectorAll('.rate-btn').forEach(btn => {
  //     btn.addEventListener('click', function () {
  //         const targetItem = document.querySelector('.progress__bets-item:nth-child(1)');
  //         if (targetItem) {
  //             targetItem.classList.add('_fail');
  //         }
  //         const targetItem2 = document.querySelector('.progress__bets-item:nth-child(2)');
  //         if (targetItem2) {
  //             targetItem2.classList.add('_done');
  //         }
  //         const targetItem3 = document.querySelector('.progress__bets-item:nth-child(3)');
  //         if (targetItem3) {
  //             targetItem3.classList.add('you');
  //         }
  //     });
  // });

  var defaultSpinsRowMarkup = ((_document$querySelect5 = document.querySelector('.spins-row')) === null || _document$querySelect5 === void 0 ? void 0 : _document$querySelect5.innerHTML) || '';
  (_document$querySelect6 = document.querySelector('.with-spins-btn')) === null || _document$querySelect6 === void 0 || _document$querySelect6.addEventListener('click', function () {
    var noSpins = document.querySelector('.no-spins');
    var spinsRow = document.querySelector('.spins-row');
    if (!spinsRow) return;
    if (defaultSpinsRowMarkup) {
      spinsRow.innerHTML = defaultSpinsRowMarkup;
    }
    spinsRow.classList.remove('hide');
    noSpins === null || noSpins === void 0 || noSpins.classList.add('hide');
  });
  (_document$querySelect7 = document.querySelector('.auth-btn')) === null || _document$querySelect7 === void 0 || _document$querySelect7.addEventListener('click', function () {
    if (userId) {
      sessionStorage.removeItem("userId");
    } else {
      sessionStorage.setItem("userId", "7");
    }
    window.location.reload();
  });
  window.addEventListener('DOMContentLoaded', function () {
    var hasId = sessionStorage.getItem('userId');
    var hideFlag = sessionStorage.getItem('hidePartBtn');
    if (hasId && hideFlag === 'true') {
      document.querySelectorAll('.part-btn').forEach(function (el) {
        el.classList.add('hide');
      });
    }
  });
  function ensureUpdatedPlaceholder(containerSelector) {
    var container = document.querySelector(containerSelector);
    if (!container) return;
    var updSpan = container.querySelector('.upd');
    if (!updSpan) {
      updSpan = document.createElement('span');
      updSpan.className = 'upd';
      if (containerSelector === '.progress__right-updated') {
        updSpan.id = 'lastUpd';
      }
      container.appendChild(document.createTextNode(' '));
      container.appendChild(updSpan);
    }
    if (!updSpan.textContent || !updSpan.textContent.trim() || updSpan.textContent.trim() === '-') {
      updSpan.textContent = DEFAULT_UPDATED_AT;
    }
  }
  function applyUpdatedPlaceholders() {
    ensureUpdatedPlaceholder('.progress__right-updated');
    ensureUpdatedPlaceholder('.progress__updated-mob');
  }
  loadTranslations().then(function () {
    applyUpdatedPlaceholders();
    return init();
  });
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiX3JlZ2VuZXJhdG9yUnVudGltZSIsImUiLCJ0IiwiciIsIk9iamVjdCIsInByb3RvdHlwZSIsIm4iLCJoYXNPd25Qcm9wZXJ0eSIsIm8iLCJkZWZpbmVQcm9wZXJ0eSIsInZhbHVlIiwiaSIsIlN5bWJvbCIsImEiLCJpdGVyYXRvciIsImMiLCJhc3luY0l0ZXJhdG9yIiwidSIsInRvU3RyaW5nVGFnIiwiZGVmaW5lIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwid3JhcCIsIkdlbmVyYXRvciIsImNyZWF0ZSIsIkNvbnRleHQiLCJtYWtlSW52b2tlTWV0aG9kIiwidHJ5Q2F0Y2giLCJ0eXBlIiwiYXJnIiwiY2FsbCIsImgiLCJsIiwiZiIsInMiLCJ5IiwiR2VuZXJhdG9yRnVuY3Rpb24iLCJHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSIsInAiLCJkIiwiZ2V0UHJvdG90eXBlT2YiLCJ2IiwidmFsdWVzIiwiZyIsImRlZmluZUl0ZXJhdG9yTWV0aG9kcyIsImZvckVhY2giLCJfaW52b2tlIiwiQXN5bmNJdGVyYXRvciIsImludm9rZSIsIl90eXBlb2YiLCJyZXNvbHZlIiwiX19hd2FpdCIsInRoZW4iLCJjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyIsIkVycm9yIiwiZG9uZSIsIm1ldGhvZCIsImRlbGVnYXRlIiwibWF5YmVJbnZva2VEZWxlZ2F0ZSIsInNlbnQiLCJfc2VudCIsImRpc3BhdGNoRXhjZXB0aW9uIiwiYWJydXB0IiwiVHlwZUVycm9yIiwicmVzdWx0TmFtZSIsIm5leHQiLCJuZXh0TG9jIiwicHVzaFRyeUVudHJ5IiwidHJ5TG9jIiwiY2F0Y2hMb2MiLCJmaW5hbGx5TG9jIiwiYWZ0ZXJMb2MiLCJ0cnlFbnRyaWVzIiwicHVzaCIsInJlc2V0VHJ5RW50cnkiLCJjb21wbGV0aW9uIiwicmVzZXQiLCJpc05hTiIsImxlbmd0aCIsImRpc3BsYXlOYW1lIiwiaXNHZW5lcmF0b3JGdW5jdGlvbiIsImNvbnN0cnVjdG9yIiwibmFtZSIsIm1hcmsiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsImF3cmFwIiwiYXN5bmMiLCJQcm9taXNlIiwia2V5cyIsInJldmVyc2UiLCJwb3AiLCJwcmV2IiwiY2hhckF0Iiwic2xpY2UiLCJzdG9wIiwicnZhbCIsImhhbmRsZSIsImNvbXBsZXRlIiwiZmluaXNoIiwiX2NhdGNoIiwiZGVsZWdhdGVZaWVsZCIsImFzeW5jR2VuZXJhdG9yU3RlcCIsIl9hc3luY1RvR2VuZXJhdG9yIiwiYXJndW1lbnRzIiwiYXBwbHkiLCJfbmV4dCIsIl90aHJvdyIsIl9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyIiwiQXJyYXkiLCJpc0FycmF5IiwiX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IiwiX24iLCJGIiwiX2FycmF5TGlrZVRvQXJyYXkiLCJ0b1N0cmluZyIsImZyb20iLCJ0ZXN0Iiwib3duS2V5cyIsImdldE93blByb3BlcnR5U3ltYm9scyIsImZpbHRlciIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsIl9vYmplY3RTcHJlYWQiLCJfZGVmaW5lUHJvcGVydHkiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIiwiZGVmaW5lUHJvcGVydGllcyIsIl90b1Byb3BlcnR5S2V5IiwiX3RvUHJpbWl0aXZlIiwidG9QcmltaXRpdmUiLCJTdHJpbmciLCJOdW1iZXIiLCJfc2Vzc2lvblN0b3JhZ2UkZ2V0SXQiLCJfZG9jdW1lbnQkcXVlcnlTZWxlY3Q1IiwiX2RvY3VtZW50JHF1ZXJ5U2VsZWN0NiIsIl9kb2N1bWVudCRxdWVyeVNlbGVjdDciLCJhcGlVUkwiLCJpc1ZlcmlmaWVkVXNlciIsInBlcmlvZEFtb3VudCIsInRhYmxlRGF0YSIsImFjdGl2ZVdlZWsiLCJpc1Byb21vT3ZlciIsIm1haW5QYWdlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY2hvc2VCbG9jayIsInJlc3VsdEJsb2NrIiwidW5hdXRoTXNncyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJwYXJ0aWNpcGF0ZUJ0bnMiLCJyZWRpcmVjdEJ0bnMiLCJjaG9zZUNhcmRzIiwibG9hZGVyIiwidWtMZW5nIiwiZW5MZW5nIiwiZGlmZmljdWx0cyIsIm1vZGVNYXAiLCJERUZBVUxUX1VQREFURURfQVQiLCJsb2NhbGUiLCJzZXNzaW9uU3RvcmFnZSIsImdldEl0ZW0iLCJkZWJ1ZyIsImluaXRlZCIsImkxOG5EYXRhIiwidHJhbnNsYXRlU3RhdGUiLCJ1c2VySWQiLCJwYXJ0aWNpcGF0ZSIsIm1vZGUiLCJwYXJhbXMiLCJ1c2VyaWQiLCJyZXF1ZXN0IiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZXMiLCJpdGVtIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwiY3NzIiwidG9nZ2xlQmxvY2tzIiwidHJhbnNsYXRlIiwiZWxlbXMiLCJlbGVtIiwia2V5IiwiZ2V0QXR0cmlidXRlIiwiaW5uZXJIVE1MIiwicmVtb3ZlQXR0cmlidXRlIiwiY29uc29sZSIsImxvZyIsInJlZnJlc2hMb2NhbGl6ZWRDbGFzcyIsInRyYW5zbGF0ZUtleSIsImRlZmF1bHRWYWwiLCJkaXNwbGF5VXNlckluZm8iLCJ1c2VySW5mbyIsImJldHMiLCJkaXNwbGF5QmV0c0hpc3RvcnkiLCJyZWZyZXNoTGFzdFVwZGF0ZWREYXRlIiwic29ydCIsImIiLCJEYXRlIiwiYmV0RGF0ZSIsInJlZnJlc2hCZXRzIiwiZGF0ZUNvbnRhaW5lciIsInNwYW4iLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJjbGFzc05hbWUiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZVRleHROb2RlIiwiZWwiLCJ1cGRhdGVEYXRlIiwibGFzdFVwZGF0ZSIsImxhc3RVcGQiLCJ1cGRhdGVkQXQiLCJmb3JtYXREYXRlIiwibW9iaWxlU3BhbiIsImRhdGUiLCJsb2NhbERhdGUiLCJkYXkiLCJnZXREYXRlIiwicGFkU3RhcnQiLCJtb250aCIsImdldE1vbnRoIiwiaG91cnMiLCJnZXRIb3VycyIsIm1pbnV0ZXMiLCJnZXRNaW51dGVzIiwiY29uY2F0IiwiZGl2cyIsImVsZW1lbnQiLCJiZXQiLCJzdGF0dXMiLCJzcGluSXRlbSIsIm5vU3Bpbkl0ZW0iLCJtb2NrQmV0cyIsInVwZCIsInNwaW4iLCJzcGluRGF0ZSIsImZvcm1hdHRlZERhdGUiLCJ0b0xvY2FsZURhdGVTdHJpbmciLCJyZXNvbHZlU3RhdHVzVHJhbnNsYXRpb24iLCJzcGluRWxlbWVudCIsImlzV2luIiwic3RhdHVzQ2xhc3MiLCJiZXRJZCIsImJhc2VDc3NDbGFzcyIsIl9pIiwiX2FyciIsImxhbmciLCJyZXBvcnRFcnJvciIsImVyciIsInJlcG9ydERhdGEiLCJvcmlnaW4iLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJlcnJvclRleHQiLCJlcnJvciIsInRleHQiLCJtZXNzYWdlIiwic3RhY2siLCJmZXRjaCIsImhlYWRlcnMiLCJ3YXJuIiwibGluayIsImV4dHJhT3B0aW9ucyIsIm9rIiwianNvbiIsInJlamVjdCIsImNoZWNrVXNlckF1dGgiLCJsZXZlbEluZm9CdG5zIiwicHJvZ3Jlc3NJbmZvQnRucyIsIl9pdGVyYXRvciIsIl9zdGVwIiwidW5hdXRoTWVzIiwiaW5pdENob29zZUNhcmRzIiwic3R5bGUiLCJvdmVyZmxvdyIsIl9pdGVyYXRvcjIiLCJfc3RlcDIiLCJwYXJ0aWNpcGF0ZUJ0biIsIl9pdGVyYXRvcjMiLCJfc3RlcDMiLCJyZW5kZXJVc2VycyIsInBvcHVsYXRlVXNlcnNUYWJsZSIsIm1vY2tVc2VycyIsImRhdGEiLCJ1c2VyIiwiZmluZCIsInVzZXJzIiwiY3VycmVudFVzZXJJZCIsIl91c2VycyIsInlvdVJvdyIsInRhYmxlQm9keSIsInVuZGVmaW5lZCIsIndpbkNvdW50IiwiaW5kZXgiLCJpc0N1cnJlbnRVc2VyIiwiaXNUb3BVc2VyIiwiZGlzcGxheVVzZXIiLCJwbGFjZSIsInRhcmdldCIsInVzZXJJZERpc3BsYXkiLCJtYXNrVXNlcklkIiwicm93IiwieW91VGV4dCIsInNldEF0dHJpYnV0ZSIsInVzZXJJZERpdiIsInRleHRDb250ZW50IiwiYmV0RGl2IiwiY2FyZHMiLCJjYXJkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbnRhaW5zIiwic2V0VGltZW91dCIsIm1vbml0b3JWaXNpYmlsaXR5IiwiYW5pbWF0aW9uQ2xhc3MiLCJkZWxheSIsIm9ic2VydmVyIiwiSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJlbnRyaWVzIiwiZW50cnkiLCJpc0ludGVyc2VjdGluZyIsInVub2JzZXJ2ZSIsIm9ic2VydmUiLCJoaWRlQmxvY2siLCJoaWRlQ2xhc3MiLCJzaG93QmxvY2siLCJzaG93Q2xhc3MiLCJzdGF0ZSIsImFuaW1hdGUiLCJkcm9wcyIsInByb2dyZXNzTGVmdEJsb2NrcyIsImxldmVsRHJvcHMiLCJsZWZ0QmxvY2siLCJwcm9ncmVzc0JldHMiLCJkcm9wQmxvY2siLCJyZXZlYWxTaG93QmxvY2siLCJfZG9jdW1lbnQkcXVlcnlTZWxlY3QiLCJkaXNwbGF5IiwiaGVpZ2h0IiwiY2xpZW50SGVpZ2h0Iiwic2hvd1Jlc3VsdEJsb2NrIiwiaXNSZXZlYWxlZCIsInJldmVhbE9uY2UiLCJvbmNlIiwiYW5pbWF0ZVByb2dyZXNzQmV0c0l0ZW1zIiwiYmV0c1dyYXAiLCJvZmZzZXRXaWR0aCIsImluaXQiLCJfaW5pdCIsIl9jYWxsZWUiLCJhdHRlbXB0cyIsIm1heEF0dGVtcHRzIiwiYXR0ZW1wdEludGVydmFsIiwidHJ5RGV0ZWN0VXNlcklkIiwicXVpY2tDaGVja0FuZFJlbmRlciIsIndhaXRGb3JVc2VySWQiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwiX3F1aWNrQ2hlY2tBbmRSZW5kZXIiLCJidG4iLCJzdG9wUHJvcGFnYXRpb24iLCJ0YXJnZXRFbGVtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJ0YXJnZXRQb3NpdGlvbiIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInRvcCIsInBhZ2VZT2Zmc2V0Iiwic2Nyb2xsVG8iLCJiZWhhdmlvciIsImNhcmRMaWdodCIsImNhcmRQcm8iLCJjYXJkRXh0cmVtZSIsIl90cnlEZXRlY3RVc2VySWQiLCJzdG9yZSIsImdldFN0YXRlIiwiYXV0aCIsImlzQXV0aG9yaXplZCIsImdfdXNlcl9pZCIsImludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwibG9hZFRyYW5zbGF0aW9ucyIsIm11dGF0aW9uT2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwibXV0YXRpb25zIiwiY2hpbGRMaXN0Iiwic3VidHJlZSIsInBvcHVwV3JhcCIsIm9wZW5Qb3B1cEJ5QXR0ciIsInBvcHVwQXR0ciIsInBvcHVwQ2xhc3MiLCJ0YXJnZXRQb3B1cCIsImNsb3NlQWxsUG9wdXBzIiwicG9wdXBzQ2xhc3MiLCJjbHMiLCJjbG9zZXN0Iiwib3BlbmVyIiwicHJldmVudERlZmF1bHQiLCJhdHRyIiwiZGF0YXNldCIsInBvcHVwIiwiREVDT1JfRkxZX09VVF9OQU1FUyIsImRlY29yIiwiZmluaXNoZWRGbHlPdXQiLCJTZXQiLCJvbkZseU91dEVuZCIsImluY2x1ZGVzIiwiYW5pbWF0aW9uTmFtZSIsInNpemUiLCJwcm9ncmVzcyIsIndhc0hpZGRlbiIsInJ1bkJldHNBbmltYXRpb24iLCJpc0hpZGRlbiIsIm0iLCJhdHRyaWJ1dGVOYW1lIiwiYXR0cmlidXRlcyIsInRvZ2dsZSIsIkxFVkVMX0NMQVNTX01BUCIsImVhc3kiLCJtZWRpdW0iLCJleHRyZW1lIiwic2V0Tm9TcGluc1Rlc3RTdGF0ZSIsIm5vU3BpbnMiLCJzcGluc1JvdyIsImFwcGx5TGV2ZWxTZWxlY3Rpb24iLCJsZXZlbFR5cGUiLCJfZG9jdW1lbnQkcXVlcnlTZWxlY3QyIiwiX2RvY3VtZW50JHF1ZXJ5U2VsZWN0MyIsIl9kb2N1bWVudCRxdWVyeVNlbGVjdDQiLCJzZWxlY3RlZExldmVsQ2xhc3MiLCJydW5MZWdhY3lMZXZlbFVJIiwibGV2ZWxDbGFzcyIsImN1cnJlbnRMb2NhbGUiLCJyZW1vdmVJdGVtIiwic2V0SXRlbSIsInJlbG9hZCIsImRlZmF1bHRTcGluc1Jvd01hcmt1cCIsImhhc0lkIiwiaGlkZUZsYWciLCJlbnN1cmVVcGRhdGVkUGxhY2Vob2xkZXIiLCJjb250YWluZXJTZWxlY3RvciIsImNvbnRhaW5lciIsInVwZFNwYW4iLCJ0cmltIiwiYXBwbHlVcGRhdGVkUGxhY2Vob2xkZXJzIl0sIm1hcHBpbmdzIjoiOzs7K0NBQ0EscUpBQUFBLG1CQUFBLFlBQUFBLG9CQUFBLFdBQUFDLENBQUEsU0FBQUMsQ0FBQSxFQUFBRCxDQUFBLE9BQUFFLENBQUEsR0FBQUMsTUFBQSxDQUFBQyxTQUFBLEVBQUFDLENBQUEsR0FBQUgsQ0FBQSxDQUFBSSxjQUFBLEVBQUFDLENBQUEsR0FBQUosTUFBQSxDQUFBSyxjQUFBLGNBQUFQLENBQUEsRUFBQUQsQ0FBQSxFQUFBRSxDQUFBLElBQUFELENBQUEsQ0FBQUQsQ0FBQSxJQUFBRSxDQUFBLENBQUFPLEtBQUEsS0FBQUMsQ0FBQSx3QkFBQUMsTUFBQSxHQUFBQSxNQUFBLE9BQUFDLENBQUEsR0FBQUYsQ0FBQSxDQUFBRyxRQUFBLGtCQUFBQyxDQUFBLEdBQUFKLENBQUEsQ0FBQUssYUFBQSx1QkFBQUMsQ0FBQSxHQUFBTixDQUFBLENBQUFPLFdBQUEsOEJBQUFDLE9BQUFqQixDQUFBLEVBQUFELENBQUEsRUFBQUUsQ0FBQSxXQUFBQyxNQUFBLENBQUFLLGNBQUEsQ0FBQVAsQ0FBQSxFQUFBRCxDQUFBLElBQUFTLEtBQUEsRUFBQVAsQ0FBQSxFQUFBaUIsVUFBQSxNQUFBQyxZQUFBLE1BQUFDLFFBQUEsU0FBQXBCLENBQUEsQ0FBQUQsQ0FBQSxXQUFBa0IsTUFBQSxtQkFBQWpCLENBQUEsSUFBQWlCLE1BQUEsWUFBQUEsT0FBQWpCLENBQUEsRUFBQUQsQ0FBQSxFQUFBRSxDQUFBLFdBQUFELENBQUEsQ0FBQUQsQ0FBQSxJQUFBRSxDQUFBLGdCQUFBb0IsS0FBQXJCLENBQUEsRUFBQUQsQ0FBQSxFQUFBRSxDQUFBLEVBQUFHLENBQUEsUUFBQUssQ0FBQSxHQUFBVixDQUFBLElBQUFBLENBQUEsQ0FBQUksU0FBQSxZQUFBbUIsU0FBQSxHQUFBdkIsQ0FBQSxHQUFBdUIsU0FBQSxFQUFBWCxDQUFBLEdBQUFULE1BQUEs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OVMsUUFBUSxDQUFDOEQsYUFBYSxDQUFDLE1BQU0sQ0FBQztNQUN4Q2dQLE9BQU8sQ0FBQzlPLFNBQVMsR0FBRyxLQUFLO01BQ3pCLElBQUk0TyxpQkFBaUIsS0FBSywwQkFBMEIsRUFBRTtRQUNsREUsT0FBTyxDQUFDL08sRUFBRSxHQUFHLFNBQVM7TUFDMUI7TUFDQThPLFNBQVMsQ0FBQzVPLFdBQVcsQ0FBQ2pFLFFBQVEsQ0FBQ2tFLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztNQUNuRDJPLFNBQVMsQ0FBQzVPLFdBQVcsQ0FBQzZPLE9BQU8sQ0FBQztJQUNsQztJQUVBLElBQUksQ0FBQ0EsT0FBTyxDQUFDeEksV0FBVyxJQUFJLENBQUN3SSxPQUFPLENBQUN4SSxXQUFXLENBQUN5SSxJQUFJLENBQUMsQ0FBQyxJQUFJRCxPQUFPLENBQUN4SSxXQUFXLENBQUN5SSxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtNQUMzRkQsT0FBTyxDQUFDeEksV0FBVyxHQUFHeEosa0JBQWtCO0lBQzVDO0VBQ0o7RUFFQSxTQUFTa1Msd0JBQXdCQSxDQUFBLEVBQUc7SUFDaENMLHdCQUF3QixDQUFDLDBCQUEwQixDQUFDO0lBQ3BEQSx3QkFBd0IsQ0FBQyx3QkFBd0IsQ0FBQztFQUN0RDtFQUdBMUQsZ0JBQWdCLENBQUMsQ0FBQyxDQUNiM1UsSUFBSSxDQUFDLFlBQU07SUFDUjBZLHdCQUF3QixDQUFDLENBQUM7SUFDMUIsT0FBT2pHLElBQUksQ0FBQyxDQUFDO0VBQ2pCLENBQUMsQ0FBQztBQU1WLENBQUMsRUFBRSxDQUFDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xuXG4gICAgY29uc3QgYXBpVVJMID0gJ2h0dHBzOi8vYWxsd2luLXByb20ucHAudWEvYXBpX3Nwb3J0c190ZW5uaXNfY2hhbGxlbmdlJ1xuXG4gICAgbGV0IGlzVmVyaWZpZWRVc2VyID0gZmFsc2U7XG4gICAgbGV0IHBlcmlvZEFtb3VudCA9IDIgLy8g0LrRltC70YzQutGW0YHRgtGMINC/0LXRgNGW0L7QtNGW0LIg0LIg0LDQutGG0ZbRlywg0YLRgNC10LHQsCDQtNC70Y8g0LrQtdGI0YPQstCw0L3QvdGPINGW0L3RhNC4INC3INGC0LDQsdC70LhcbiAgICBsZXQgdGFibGVEYXRhID0gW107XG4gICAgbGV0IGFjdGl2ZVdlZWsgPSBudWxsO1xuICAgIGxldCBpc1Byb21vT3ZlciA9IGZhbHNlO1xuXG4gICAgY29uc3QgbWFpblBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRlbm5pc0NoYWxsZW5nZVwiKSxcbiAgICAgICAgY2hvc2VCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGV2ZWxzXCIpLFxuICAgICAgICByZXN1bHRCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZ3Jlc3NcIiksXG4gICAgICAgIHVuYXV0aE1zZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudW5hdXRoLW1zZycpLFxuICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGFydC1idG4nKSxcbiAgICAgICAgcmVkaXJlY3RCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJ0bi1qb2luJyksXG4gICAgICAgIGNob3NlQ2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmxldmVsc19fY2FyZFwiKSxcbiAgICAgICAgbG9hZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zcGlubmVyLW92ZXJsYXlcIilcblxuICAgIC8vIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiXG5cbiAgICBjb25zdCB1a0xlbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdWtMZW5nJyk7XG4gICAgY29uc3QgZW5MZW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VuTGVuZycpO1xuXG4gICAgY29uc3QgZGlmZmljdWx0cyA9IFtcIl9saWdodFwiLCBcIl9wcm9cIiwgXCJfZXh0cmVtZVwiXTtcbiAgICBjb25zdCBtb2RlTWFwID0ge1wibm92aWNlXCI6IFwiX2xpZ2h0XCIsIFwiZXhwZXJpZW5jZWRcIjogXCJfcHJvXCIsIFwiaW5zYW5lXCI6IFwiX2V4dHJlbWVcIiwgXCJfbGlnaHRcIjogXCJub3ZpY2VcIiwgXCJfcHJvXCI6IFwiZXhwZXJpZW5jZWRcIiwgXCJfZXh0cmVtZVwiOiBcImluc2FuZVwifTtcbiAgICBjb25zdCBERUZBVUxUX1VQREFURURfQVQgPSAnMjEuMDEgMTY6MzAnO1xuXG4gICAgLy8gbGV0IGxvY2FsZSA9IFwidWtcIlxuICAgIGxldCBsb2NhbGUgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwibG9jYWxlXCIpID8/IFwidWtcIlxuXG4gICAgaWYgKHVrTGVuZykgbG9jYWxlID0gJ3VrJztcbiAgICBpZiAoZW5MZW5nKSBsb2NhbGUgPSAnZW4nO1xuXG4gICAgbGV0IGRlYnVnID0gZmFsc2VcbiAgICBsZXQgaW5pdGVkID0gZmFsc2U7XG5cbiAgICBsZXQgaTE4bkRhdGEgPSB7fTtcbiAgICBjb25zdCB0cmFuc2xhdGVTdGF0ZSA9IHRydWU7XG5cbiAgICAvLyBsZXQgdXNlcklkID0gbnVsbFxuICAgIGxldCB1c2VySWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1c2VySWQnKSB8fCBudWxsO1xuICAgIC8vIHVzZXJJZCA9IDQwMzE5NzExNFxuXG4gICAgZnVuY3Rpb24gcGFydGljaXBhdGUobW9kZSkge1xuICAgICAgICBpZiAoIXVzZXJJZCB8fCAhbW9kZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGFyYW1zID0ge3VzZXJpZDogdXNlcklkLCBtb2RlfTtcbiAgICAgICAgcmVxdWVzdCgnL3VzZXInLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBhcmFtcylcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgcGFydGljaXBhdGVCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKSk7XG4gICAgICAgICAgICByZWRpcmVjdEJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpKTtcbiAgICAgICAgICAgIGNvbnN0IGNzcyA9IG1vZGVNYXBbbW9kZV07XG4gICAgICAgICAgICB0b2dnbGVCbG9ja3MoY2hvc2VCbG9jaywgXCJjaG9zZUhpZGVcIiwgcmVzdWx0QmxvY2ssIFwicmVzdWx0U2hvd1wiLCBjc3MsIHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGUoKSB7XG4gICAgICAgIGNvbnN0IGVsZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdHJhbnNsYXRlXScpXG4gICAgICAgIGlmIChlbGVtcyAmJiBlbGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmKHRyYW5zbGF0ZVN0YXRlKXtcbiAgICAgICAgICAgICAgICBlbGVtcy5mb3JFYWNoKGVsZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBlbGVtLmdldEF0dHJpYnV0ZSgnZGF0YS10cmFuc2xhdGUnKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5pbm5lckhUTUwgPSBpMThuRGF0YVtrZXldIHx8ICcqLS0tLU5FRUQgVE8gQkUgVFJBTlNMQVRFRC0tLS0qICAga2V5OiAgJyArIGtleTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdHJhbnNsYXRlJyk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidHJhbnNsYXRpb24gd29ya3MhXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxvY2FsZSA9PT0gJ2VuJykge1xuICAgICAgICAgICAgbWFpblBhZ2UuY2xhc3NMaXN0LmFkZCgnZW4nKTtcbiAgICAgICAgfVxuICAgICAgICByZWZyZXNoTG9jYWxpemVkQ2xhc3MoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVLZXkoa2V5LCBkZWZhdWx0VmFsKSB7XG4gICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGkxOG5EYXRhW2tleV0gfHwgZGVmYXVsdFZhbCB8fCAnKi0tLS1ORUVEIFRPIEJFIFRSQU5TTEFURUQtLS0tKiAgIGtleTogICcgKyBrZXk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGlzcGxheVVzZXJJbmZvKHVzZXJJbmZvKSB7XG4gICAgICAgIGxldCBiZXRzID0gdXNlckluZm8uYmV0c1xuICAgICAgICAvLyBsZXQgYmV0cyA9IFt7YmV0RGF0ZTogbmV3IERhdGUoKSwgc3RhdHVzOiAndW5kZWZpbmVkJ31dXG5cbiAgICAgICAgZGlzcGxheUJldHNIaXN0b3J5KGJldHMpO1xuICAgICAgICByZWZyZXNoTGFzdFVwZGF0ZWREYXRlKHVzZXJJbmZvKTtcbiAgICAgICAgYmV0cyA9IHVzZXJJbmZvLmJldHNcbiAgICAgICAgICAgIC5zb3J0KChhLCBiKSA9PiBuZXcgRGF0ZShiLmJldERhdGUpIC0gbmV3IERhdGUoYS5iZXREYXRlKSlcbiAgICAgICAgICAgIC5zbGljZSgwLCAxMClcbiAgICAgICAgICAgIC5yZXZlcnNlKCk7XG4gICAgICAgIHJlZnJlc2hCZXRzKGJldHMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hMYXN0VXBkYXRlZERhdGUodXNlckluZm8pIHtcbiAgICAgICAgY29uc3QgZGF0ZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9ncmVzc19fcmlnaHQtdXBkYXRlZCcpO1xuICAgICAgICBpZiAoIWRhdGVDb250YWluZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vINCS0LjQutC+0YDQuNGB0YLQvtCy0YPRlNC80L4g0ZTQtNC40L3QuNC5IHNwYW46INCw0LHQviDQv9C+IGlkLCDQsNCx0L4g0L/QtdGA0YjQuNC5IC51cGQg0YMg0LrQvtC90YLQtdC50L3QtdGA0ZYgKNGJ0L7QsSDQvdC1INC00YPQsdC70Y7QstCw0YLQuClcbiAgICAgICAgbGV0IHNwYW4gPSBkYXRlQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJyNsYXN0VXBkJykgfHwgZGF0ZUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcudXBkJyk7XG4gICAgICAgIGlmICghc3Bhbikge1xuICAgICAgICAgICAgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIHNwYW4uaWQgPSAnbGFzdFVwZCc7XG4gICAgICAgICAgICBzcGFuLmNsYXNzTmFtZSA9ICd1cGQnO1xuICAgICAgICAgICAgZGF0ZUNvbnRhaW5lci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnICcpKTtcbiAgICAgICAgICAgIGRhdGVDb250YWluZXIuYXBwZW5kQ2hpbGQoc3Bhbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzcGFuLmlkID0gJ2xhc3RVcGQnO1xuICAgICAgICB9XG4gICAgICAgIC8vINCS0LjQtNCw0LvQuNGC0Lgg0LTRg9Cx0LvRltC60LDRgtC4IHNwYW4udXBkINGDINGG0YzQvtC80YMg0LrQvtC90YLQtdC50L3QtdGA0ZZcbiAgICAgICAgZGF0ZUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcudXBkJykuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgIGlmIChlbCAhPT0gc3BhbikgZWwucmVtb3ZlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHVwZGF0ZURhdGUgPSB1c2VySW5mbz8ubGFzdFVwZGF0ZSB8fCB1c2VySW5mbz8ubGFzdFVwZCB8fCB1c2VySW5mbz8udXBkYXRlZEF0IHx8IG51bGw7XG4gICAgICAgIGlmICh1cGRhdGVEYXRlKSB7XG4gICAgICAgICAgICBzcGFuLmlubmVySFRNTCA9IGZvcm1hdERhdGUodXBkYXRlRGF0ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzcGFuLmlubmVySFRNTCA9IERFRkFVTFRfVVBEQVRFRF9BVDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1vYmlsZVNwYW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZ3Jlc3NfX3VwZGF0ZWQtbW9iIC51cGQnKTtcbiAgICAgICAgaWYgKG1vYmlsZVNwYW4pIHtcbiAgICAgICAgICAgIG1vYmlsZVNwYW4uaW5uZXJIVE1MID0gdXBkYXRlRGF0ZSA/IGZvcm1hdERhdGUodXBkYXRlRGF0ZSkgOiBERUZBVUxUX1VQREFURURfQVQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gS2VlcCB2aXNpYmxlIGZvciBhdXRob3JpemVkIHVzZXIgZmxvdzsgZmFsbGJhY2sgdG8gdGVtcGxhdGUgZGF0ZSB3aGVuIEFQSSBoYXMgbm8gdGltZXN0YW1wIHlldC5cbiAgICAgICAgaWYgKHVzZXJJbmZvPy51c2VyaWQpIHtcbiAgICAgICAgICAgIGRhdGVDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGRhdGVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdERhdGUoZGF0ZSkge1xuICAgICAgICBjb25zdCBsb2NhbERhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgY29uc3QgZGF5ID0gU3RyaW5nKGxvY2FsRGF0ZS5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsICcwJyk7XG4gICAgICAgIGNvbnN0IG1vbnRoID0gU3RyaW5nKGxvY2FsRGF0ZS5nZXRNb250aCgpICsgMSkucGFkU3RhcnQoMiwgJzAnKTtcbiAgICAgICAgY29uc3QgaG91cnMgPSBTdHJpbmcobG9jYWxEYXRlLmdldEhvdXJzKCkpLnBhZFN0YXJ0KDIsICcwJyk7XG4gICAgICAgIGNvbnN0IG1pbnV0ZXMgPSBTdHJpbmcobG9jYWxEYXRlLmdldE1pbnV0ZXMoKSkucGFkU3RhcnQoMiwgJzAnKTtcbiAgICAgICAgcmV0dXJuIGAke2RheX0uJHttb250aH0gJHtob3Vyc306JHttaW51dGVzfWA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaEJldHMoYmV0cykge1xuICAgICAgICBjb25zdCBkaXZzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2dyZXNzX19iZXRzLWl0ZW0nKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZGl2c1tpXTtcbiAgICAgICAgICAgIGNvbnN0IGJldCA9IGJldHNbaV07XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3lvdScpO1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdfZG9uZScpO1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdfZmFpbCcpO1xuICAgICAgICAgICAgbGV0IHN0YXR1cyA9ICdfZmFpbCc7XG4gICAgICAgICAgICBpZiAoYmV0LnN0YXR1cyA9PT0gJ3dpbicpIHtcbiAgICAgICAgICAgICAgICBzdGF0dXMgPSAnX2RvbmUnO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghYmV0LnN0YXR1cyB8fCBiZXQuc3RhdHVzID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHN0YXR1cyA9ICd5b3UnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKHN0YXR1cyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gZGlzcGxheUJldHNIaXN0b3J5KGJldHMpIHtcbiAgICAgICAgLy8gcmV0dXJuO1xuICAgICAgICBjb25zdCBzcGluSXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zcGlucy1yb3cnKTtcbiAgICAgICAgY29uc3Qgbm9TcGluSXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uby1zcGlucycpO1xuXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShiZXRzKSB8fCBiZXRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgaWYgKCFkZWJ1Zykge1xuICAgICAgICAgICAgICAgIHNwaW5JdGVtLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgICAgICBub1NwaW5JdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGJldHMgPSBiZXRzLnNvcnQoKGEsIGIpID0+IG5ldyBEYXRlKGIuYmV0RGF0ZSkgLSBuZXcgRGF0ZShhLmJldERhdGUpKTtcblxuICAgICAgICBpZihkZWJ1Zyl7XG4gICAgICAgICAgICBiZXRzID0gbW9ja0JldHNcbiAgICAgICAgfVxuXG5cbiAgICAgICAgc3Bpbkl0ZW0uaW5uZXJIVE1MID1cbiAgICAgICAgICAgIGBcbiAgICAgICA8ZGl2IGNsYXNzPVwic3BpbnMtcm93LWhlYWRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250ZW50LWRhdGVcIiBkYXRhLXRyYW5zbGF0ZT1cIm15QmV0RGF0ZVwiPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnQtcHJpemVcIiBkYXRhLXRyYW5zbGF0ZT1cIm15QmV0UHJpemVcIj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250ZW50LXN0YXR1c1wiIGRhdGEtdHJhbnNsYXRlPVwibXlCZXRTdGF0dXNcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIGA7XG4gICAgICAgIHNwaW5JdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgbm9TcGluSXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG5cbiAgICAgICAgbGV0IHVwZCA9IDA7XG4gICAgICAgIGJldHMuZm9yRWFjaChzcGluID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNwaW5EYXRlID0gbmV3IERhdGUoc3Bpbi5iZXREYXRlKTtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlZERhdGUgPSBzcGluRGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoJ3VrLVVBJykuc2xpY2UoMCwgNSk7XG4gICAgICAgICAgICBjb25zdCBzdGF0dXMgPSByZXNvbHZlU3RhdHVzVHJhbnNsYXRpb24oc3Bpbi5zdGF0dXMpO1xuXG4gICAgICAgICAgICBpZiAoc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3BpbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBzcGluRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzcGlucy1yb3ctaXRlbScpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgaXNXaW4gPSBzcGluLnN0YXR1cyA9PT0gXCJ3aW5cIjtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGF0dXNDbGFzcyA9IGlzV2luID8gJ19kb25lJyA6ICcnO1xuXG4gICAgICAgICAgICAgICAgc3BpbkVsZW1lbnQuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNvbnRlbnQtZGF0ZVwiPiR7Zm9ybWF0dGVkRGF0ZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY29udGVudC1wcml6ZVwiPklEOiR7c3Bpbi5iZXRJZH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY29udGVudC1zdGF0dXMgJHtzdGF0dXNDbGFzc31cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgYDtcbiAgICAgICAgICAgICAgICBzcGluSXRlbS5hcHBlbmRDaGlsZChzcGluRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgdXBkKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh1cGQgPT09IDApIHtcbiAgICAgICAgICAgIHNwaW5JdGVtLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIG5vU3Bpbkl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzb2x2ZVN0YXR1c1RyYW5zbGF0aW9uKHN0YXR1cykge1xuICAgICAgICBpZiAoIXN0YXR1cyB8fCBzdGF0dXMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJhbnNsYXRlS2V5KCdiZXRVbmRlZmluZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhdHVzID09PSAnd2luJykge1xuICAgICAgICAgICAgcmV0dXJuIHRyYW5zbGF0ZUtleSgnd2luQmV0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2xvc2UnKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJhbnNsYXRlS2V5KCdsb3NlQmV0Jyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWZyZXNoTG9jYWxpemVkQ2xhc3MoZWxlbWVudCwgYmFzZUNzc0NsYXNzKSB7XG4gICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgbGFuZyBvZiBbJ3VrJywgJ2VuJ10pIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShiYXNlQ3NzQ2xhc3MgKyBsYW5nKTtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoYmFzZUNzc0NsYXNzICsgbG9jYWxlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXBvcnRFcnJvcihlcnIpIHtcbiAgICAgICAgY29uc3QgcmVwb3J0RGF0YSA9IHtcbiAgICAgICAgICAgIG9yaWdpbjogd2luZG93LmxvY2F0aW9uLmhyZWYsXG4gICAgICAgICAgICB1c2VyaWQ6IHVzZXJJZCxcbiAgICAgICAgICAgIGVycm9yVGV4dDogZXJyPy5lcnJvciB8fCBlcnI/LnRleHQgfHwgZXJyPy5tZXNzYWdlIHx8ICdVbmtub3duIGVycm9yJyxcbiAgICAgICAgICAgIHR5cGU6IGVycj8ubmFtZSB8fCAnVW5rbm93bkVycm9yJyxcbiAgICAgICAgICAgIHN0YWNrOiBlcnI/LnN0YWNrIHx8ICcnXG4gICAgICAgIH07XG5cbiAgICAgICAgZmV0Y2goJycsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShyZXBvcnREYXRhKVxuICAgICAgICB9KS5jYXRjaChjb25zb2xlLndhcm4pO1xuICAgIH1cblxuICAgIGNvbnN0IHJlcXVlc3QgPSBmdW5jdGlvbiAobGluaywgZXh0cmFPcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChhcGlVUkwgKyBsaW5rLCB7XG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLi4uKGV4dHJhT3B0aW9ucyB8fCB7fSlcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXMub2spIHRocm93IG5ldyBFcnJvcignQVBJIGVycm9yJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignQVBJIHJlcXVlc3QgZmFpbGVkOicsIGVycik7XG5cbiAgICAgICAgICAgICAgICByZXBvcnRFcnJvcihlcnIpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrVXNlckF1dGgoKSB7XG4gICAgICAgIGlmICh1c2VySWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGxldmVsSW5mb0J0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmxldmVsc19fY2FyZC1pbmZvQnRuXCIpO1xuICAgICAgICAgICAgY29uc3QgcHJvZ3Jlc3NJbmZvQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvZ3Jlc3NfX2xlZnQtaW5mb0J0blwiKTtcblxuICAgICAgICAgICAgbGV2ZWxJbmZvQnRucy5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBwcm9ncmVzc0luZm9CdG5zLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHVuYXV0aE1lcyBvZiB1bmF1dGhNc2dzKSB7XG4gICAgICAgICAgICAgICAgdW5hdXRoTWVzLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGZvciAoY29uc3QgaW5mbyBvZiBjaG9zZUNhcmRzSW5mbykge1xuICAgICAgICAgICAgLy8gICAgIGluZm8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3QoYC9wcm9tb3VzZXIvJHt1c2VySWR9P25vY2FjaGU9MWApXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy51c2VyaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRlJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY3RCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc0luZm9CdG5zLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjc3MgPSBtb2RlTWFwW3Jlcy5tb2RlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZUJsb2NrcyhjaG9zZUJsb2NrLCBcImNob3NlSGlkZVwiLCByZXN1bHRCbG9jaywgXCJyZXN1bHRTaG93XCIsIGNzcywgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheVVzZXJJbmZvKHJlcyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0Q2hvb3NlQ2FyZHMoY2hvc2VDYXJkcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWN0QnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRlJykpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxvYWRlci5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKVxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gXCJhdXRvXCJcbiAgICAgICAgICAgICAgICAgICAgbWFpblBhZ2UuY2xhc3NMaXN0LnJlbW92ZShcImxvYWRpbmdcIilcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmxldmVsc19fY2FyZC1pbmZvQnRuLCAucHJvZ3Jlc3NfX2xlZnQtaW5mb0J0blwiKS5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZm9yIChsZXQgcGFydGljaXBhdGVCdG4gb2YgcGFydGljaXBhdGVCdG5zKSB7XG4gICAgICAgICAgICAgICAgcGFydGljaXBhdGVCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCB1bmF1dGhNZXMgb2YgdW5hdXRoTXNncykge1xuICAgICAgICAgICAgICAgIHVuYXV0aE1lcy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNob3NlX19jYXJkLWluZm9cIikuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgICAgICAvLyAgICAgZWwuY2xhc3NMaXN0LmFkZChcImhpZGVcIilcbiAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgICBsb2FkZXIuY2xhc3NMaXN0LmFkZChcImhpZGVcIilcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSBcImF1dG9cIlxuICAgICAgICAgICAgbWFpblBhZ2UuY2xhc3NMaXN0LnJlbW92ZShcImxvYWRpbmdcIilcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyVXNlcnMoKSB7XG4gICAgICAgIGlmIChkZWJ1Zykge1xuICAgICAgICAgICAgcG9wdWxhdGVVc2Vyc1RhYmxlKG1vY2tVc2VycywgdXNlcklkKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcXVlc3QoYC91c2Vycy9gKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgY29uc3QgdXNlciA9IGRhdGEuZmluZCh1c2VyID0+IHVzZXIudXNlcmlkID09PSB1c2VySWQpO1xuICAgICAgICAgICAgY29uc3QgbW9kZSA9IHVzZXIgPyB1c2VyLm1vZGUgOiBudWxsO1xuICAgICAgICAgICAgY29uc3QgdXNlcnMgPSBkYXRhLmZpbHRlcih1c2VyID0+IHVzZXIubW9kZSA9PT0gbW9kZSlcbiAgICAgICAgICAgIHBvcHVsYXRlVXNlcnNUYWJsZSh1c2VycywgdXNlcklkKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcG9wdWxhdGVVc2Vyc1RhYmxlKHVzZXJzLCBjdXJyZW50VXNlcklkKSB7XG4gICAgICAgIGNvbnN0IHlvdVJvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YWJsZU90aGVyJyk7XG4gICAgICAgIGNvbnN0IHRhYmxlQm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YWJsZScpO1xuXG4gICAgICAgIGlmICghdXNlcnM/Lmxlbmd0aCB8fCBjdXJyZW50VXNlcklkID09PSB1bmRlZmluZWQpIHJldHVybjtcblxuICAgICAgICB5b3VSb3cuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHRhYmxlQm9keS5pbm5lckhUTUwgPSAnJztcblxuICAgICAgICB1c2VycyA9IHVzZXJzLnNvcnQoKGEsIGIpID0+IGIud2luQ291bnQgLSBhLndpbkNvdW50KTtcblxuXG4gICAgICAgIHVzZXJzLmZvckVhY2goKHVzZXIsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpc0N1cnJlbnRVc2VyID0gdXNlci51c2VyaWQgPT09IGN1cnJlbnRVc2VySWQ7XG4gICAgICAgICAgICBsZXQgaXNUb3BVc2VyID0gZmFsc2VcblxuICAgICAgICAgICAgaWYoaW5kZXggPD0gNSAmJiBpc0N1cnJlbnRVc2VyKXtcbiAgICAgICAgICAgICAgICBpc1RvcFVzZXIgPSB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihpbmRleCA+PSAxMCAmJiAhaXNDdXJyZW50VXNlcikgcmV0dXJuXG5cbiAgICAgICAgICAgIGRpc3BsYXlVc2VyKHVzZXIsIGlzQ3VycmVudFVzZXIsIGluZGV4ICsgMSwgaXNDdXJyZW50VXNlciAmJiAhaXNUb3BVc2VyID8geW91Um93IDogdGFibGVCb2R5KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGlzcGxheVVzZXIodXNlciwgaXNDdXJyZW50VXNlciwgcGxhY2UsIHRhcmdldCkge1xuICAgICAgICBjb25zdCB1c2VySWREaXNwbGF5ID0gaXNDdXJyZW50VXNlciA/IHVzZXIudXNlcmlkIDogbWFza1VzZXJJZCh1c2VyLnVzZXJpZCk7XG4gICAgICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICByb3cuY2xhc3NMaXN0LmFkZCgndGFibGVfX3JvdycpO1xuXG5cbiAgICAgICAgaWYgKGlzQ3VycmVudFVzZXIpIHtcbiAgICAgICAgICAgIC8vINCh0YLQstC+0YDQtdC90L3RjyDQtdC70LXQvNC10L3RgtGDICd5b3UnINGC0LAg0LLRgdGC0LDQstC60LAg0LnQvtCz0L4g0L/RltGB0LvRjyDQtdC70LXQvNC10L3RgtGDINC3INC80ZbRgdGG0LXQvFxuICAgICAgICAgICAgY29uc3QgeW91VGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgeW91VGV4dC5jbGFzc0xpc3QuYWRkKCd0YWJsZV9fcm93LWl0ZW0nLCAnX3lvdS10ZXh0Jyk7XG4gICAgICAgICAgICB5b3VUZXh0LnNldEF0dHJpYnV0ZSgnZGF0YS10cmFuc2xhdGUnLCAneW91Jyk7XG5cblxuICAgICAgICAgICAgcm93LmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZV9fcm93LWl0ZW1cIj4ke3BsYWNlfTwvZGl2PlxuICAgICAgICBgO1xuXG4gICAgICAgICAgICAvLyDQlNC+0LTQsNGU0LzQviBcInlvdVwiINGC0LXQutGB0YIg0L/RltGB0LvRjyDQvNGW0YHRhtGPXG4gICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQoeW91VGV4dCk7XG5cbiAgICAgICAgICAgIC8vINCf0L7RgtGW0Lwg0LTQvtC00LDRlNC80L4gdXNlcklkINGC0LAg0YHRgtCw0LLQutGDXG4gICAgICAgICAgICBjb25zdCB1c2VySWREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHVzZXJJZERpdi5jbGFzc0xpc3QuYWRkKCd0YWJsZV9fcm93LWl0ZW0nKTtcbiAgICAgICAgICAgIHVzZXJJZERpdi50ZXh0Q29udGVudCA9IHVzZXJJZERpc3BsYXk7XG5cbiAgICAgICAgICAgIGNvbnN0IGJldERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgYmV0RGl2LmNsYXNzTGlzdC5hZGQoJ3RhYmxlX19yb3ctaXRlbScpO1xuICAgICAgICAgICAgYmV0RGl2LnRleHRDb250ZW50ID0gdXNlci53aW5Db3VudDtcblxuICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKHVzZXJJZERpdik7XG4gICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQoYmV0RGl2KTtcblxuICAgICAgICAgICAgcm93LmNsYXNzTGlzdC5hZGQoJ195b3UnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJvdy5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVfX3Jvdy1pdGVtXCI+JHtwbGFjZX08L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZV9fcm93LWl0ZW1cIj4ke3VzZXJJZERpc3BsYXl9PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVfX3Jvdy1pdGVtXCI+JHt1c2VyLndpbkNvdW50fTwvZGl2PlxuICAgICAgICBgO1xuXG5cbiAgICAgICAgfVxuICAgICAgICB0YXJnZXQuYXBwZW5kQ2hpbGQocm93KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXNrVXNlcklkKHVzZXJJZCkge1xuICAgICAgICByZXR1cm4gXCIqKioqXCIgKyB1c2VySWQudG9TdHJpbmcoKS5zbGljZSg0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0Q2hvb3NlQ2FyZHMoY2FyZHMpe1xuICAgICAgICBpZiAoaW5pdGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjYXJkcy5mb3JFYWNoKGNhcmQgPT57XG4gICAgICAgICAgICBjYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT57XG4gICAgICAgICAgICAgICAgaWYoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaW5mby1pY29uXCIpKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGlmZmljdWx0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gZGlmZmljdWx0c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhcmQuY2xhc3NMaXN0LmNvbnRhaW5zKGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtb2RlID0gbW9kZU1hcFtpdGVtXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYXRlKG1vZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja1VzZXJBdXRoKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJVc2VycygpXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAyMDApXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgICAgICBpbml0ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vbml0b3JWaXNpYmlsaXR5KGVsZW1lbnQsIGFuaW1hdGlvbkNsYXNzLCBkZWxheSkge1xuICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzKSA9PiB7XG4gICAgICAgICAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoYW5pbWF0aW9uQ2xhc3MpXG4gICAgICAgICAgICAgICAgICAgIH0sIGRlbGF5KTtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIudW5vYnNlcnZlKGVudHJ5LnRhcmdldClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShlbGVtZW50KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b2dnbGVCbG9ja3MoaGlkZUJsb2NrLCBoaWRlQ2xhc3MsIHNob3dCbG9jaywgc2hvd0NsYXNzLCBzdGF0ZSwgYW5pbWF0ZSl7XG4gICAgICAgIG1haW5QYWdlLmNsYXNzTGlzdC5hZGQoc3RhdGUsIGxvY2FsZSlcbiAgICAgICAgaGlkZUJsb2NrLmNsYXNzTGlzdC5hZGQoaGlkZUNsYXNzKVxuICAgICAgICBsZXQgZHJvcHMgPSBzaG93QmxvY2sucXVlcnlTZWxlY3RvckFsbChcIi5kcm9wXCIpXG4gICAgICAgIGNvbnN0IHByb2dyZXNzTGVmdEJsb2NrcyA9IHNob3dCbG9jay5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2dyZXNzX19sZWZ0XCIpO1xuICAgICAgICBjb25zdCBsZXZlbERyb3BzID0gc2hvd0Jsb2NrLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZHJvcC5fbGlnaHQsIC5kcm9wLl9wcm8sIC5kcm9wLl9leHRyZW1lXCIpO1xuXG4gICAgICAgIHByb2dyZXNzTGVmdEJsb2Nrcy5mb3JFYWNoKChsZWZ0QmxvY2spID0+IHtcbiAgICAgICAgICAgIGlmIChsZWZ0QmxvY2suY2xhc3NMaXN0LmNvbnRhaW5zKHN0YXRlKSkge1xuICAgICAgICAgICAgICAgIGxlZnRCbG9jay5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGVmdEJsb2NrLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBwcm9ncmVzc0JldHMgPSBzaG93QmxvY2sucXVlcnlTZWxlY3RvcihcIi5wcm9ncmVzc19fYmV0c1wiKTtcbiAgICAgICAgaWYgKHByb2dyZXNzQmV0cykge1xuICAgICAgICAgICAgcHJvZ3Jlc3NCZXRzLmNsYXNzTGlzdC5yZW1vdmUoXCJfbGlnaHRcIiwgXCJfcHJvXCIsIFwiX2V4dHJlbWVcIik7XG4gICAgICAgICAgICBwcm9ncmVzc0JldHMuY2xhc3NMaXN0LmFkZChzdGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXZlbERyb3BzLmZvckVhY2goKGRyb3BCbG9jaykgPT4ge1xuICAgICAgICAgICAgaWYgKGRyb3BCbG9jay5jbGFzc0xpc3QuY29udGFpbnMoc3RhdGUpKSB7XG4gICAgICAgICAgICAgICAgZHJvcEJsb2NrLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkcm9wQmxvY2suY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRyb3BzLmZvckVhY2goaXRlbSA9PntcbiAgICAgICAgICAgIGRpZmZpY3VsdHMuZm9yRWFjaChzdGF0ZSA9PntcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoc3RhdGUpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICBkcm9wc1swXS5jbGFzc0xpc3QuYWRkKHN0YXRlKVxuICAgICAgICBjb25zdCByZXZlYWxTaG93QmxvY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICBzaG93QmxvY2suY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7XG4gICAgICAgICAgICBzaG93QmxvY2suc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiXG4gICAgICAgICAgICBzaG93QmxvY2suc3R5bGUuaGVpZ2h0ID0gaGlkZUJsb2NrLmNsaWVudEhlaWdodFxuICAgICAgICAgICAgaGlkZUJsb2NrLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpXG4gICAgICAgICAgICBzaG93UmVzdWx0QmxvY2soc2hvd0Jsb2NrLCBzaG93Q2xhc3MpXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlc3VsdHMuY29udFwiKT8uY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGFuaW1hdGUpIHtcbiAgICAgICAgICAgIGxldCBpc1JldmVhbGVkID0gZmFsc2U7XG4gICAgICAgICAgICBjb25zdCByZXZlYWxPbmNlID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpc1JldmVhbGVkKSByZXR1cm47XG4gICAgICAgICAgICAgICAgaXNSZXZlYWxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV2ZWFsU2hvd0Jsb2NrKCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBMZWdhY3kgZmxvdyBleHBlY3RlZCBhbmltYXRpb25lbmQsIGJ1dCBjdXJyZW50IHN0eWxlcyB1c2UgdHJhbnNpdGlvbnMvbm8gYW5pbWF0aW9uLlxuICAgICAgICAgICAgaGlkZUJsb2NrLmFkZEV2ZW50TGlzdGVuZXIoXCJhbmltYXRpb25lbmRcIiwgcmV2ZWFsT25jZSwge29uY2U6IHRydWV9KTtcbiAgICAgICAgICAgIGhpZGVCbG9jay5hZGRFdmVudExpc3RlbmVyKFwidHJhbnNpdGlvbmVuZFwiLCByZXZlYWxPbmNlLCB7b25jZTogdHJ1ZX0pO1xuICAgICAgICAgICAgc2V0VGltZW91dChyZXZlYWxPbmNlLCAxMDUwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldmVhbFNob3dCbG9jaygpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzaG93UmVzdWx0QmxvY2soc2hvd0Jsb2NrLCBzaG93Q2xhc3Mpe1xuICAgICAgICBzaG93QmxvY2suY2xhc3NMaXN0LmFkZChzaG93Q2xhc3MpXG4gICAgICAgIHNob3dCbG9jay5zdHlsZS5oZWlnaHQgPSBcImF1dG9cIlxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFuaW1hdGVQcm9ncmVzc0JldHNJdGVtcyhiZXRzV3JhcCkge1xuICAgICAgICBpZiAoIWJldHNXcmFwKSByZXR1cm47XG4gICAgICAgIGJldHNXcmFwLmNsYXNzTGlzdC5yZW1vdmUoXCJwcm9ncmVzc19fYmV0cy0tYW5pbWF0ZVwiKTtcbiAgICAgICAgdm9pZCBiZXRzV3JhcC5vZmZzZXRXaWR0aDtcbiAgICAgICAgYmV0c1dyYXAuY2xhc3NMaXN0LmFkZChcInByb2dyZXNzX19iZXRzLS1hbmltYXRlXCIpO1xuICAgIH1cblxuICAgIGFzeW5jIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIGxldCBhdHRlbXB0cyA9IDA7XG4gICAgICAgIGNvbnN0IG1heEF0dGVtcHRzID0gMjA7XG4gICAgICAgIGNvbnN0IGF0dGVtcHRJbnRlcnZhbCA9IDUwO1xuXG4gICAgICAgIGZ1bmN0aW9uIHRyeURldGVjdFVzZXJJZCgpIHtcbiAgICAgICAgICAgIGlmICh3aW5kb3cuc3RvcmUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGF0ZSA9IHdpbmRvdy5zdG9yZS5nZXRTdGF0ZSgpO1xuICAgICAgICAgICAgICAgIHVzZXJJZCA9IHN0YXRlLmF1dGguaXNBdXRob3JpemVkICYmIHN0YXRlLmF1dGguaWQgfHwgJyc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHdpbmRvdy5nX3VzZXJfaWQpIHtcbiAgICAgICAgICAgICAgICB1c2VySWQgPSB3aW5kb3cuZ191c2VyX2lkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoZGVidWcpIHVzZXJJZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIikgfHwgbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHF1aWNrQ2hlY2tBbmRSZW5kZXIoKSB7XG4gICAgICAgICAgICBjaGVja1VzZXJBdXRoKCk7XG4gICAgICAgICAgICByZW5kZXJVc2VycygpO1xuXG5cbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudG9DaG9zZVwiKS5mb3JFYWNoKGZ1bmN0aW9uIChidG4pIHtcbiAgICAgICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNob3NlXCIpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRQb3NpdGlvbiA9IHRhcmdldEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0IC0gMjtcblxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0YXJnZXRQb3NpdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29uc3QgY2FyZExpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sZXZlbHNfX2NhcmQuX2xpZ2h0XCIpO1xuICAgICAgICAgICAgY29uc3QgY2FyZFBybyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGV2ZWxzX19jYXJkLl9wcm9cIik7XG4gICAgICAgICAgICBjb25zdCBjYXJkRXh0cmVtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGV2ZWxzX19jYXJkLl9leHRyZW1lXCIpO1xuICAgICAgICAgICAgbW9uaXRvclZpc2liaWxpdHkoY2FyZExpZ2h0LCBcInNob3dDYXJkXCIsIDQwMCk7XG4gICAgICAgICAgICBtb25pdG9yVmlzaWJpbGl0eShjYXJkUHJvLCBcInNob3dDYXJkXCIsIDgwMCk7XG4gICAgICAgICAgICBtb25pdG9yVmlzaWJpbGl0eShjYXJkRXh0cmVtZSwgXCJzaG93Q2FyZFwiLCAxMjAwKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgd2FpdEZvclVzZXJJZCA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0cnlEZXRlY3RVc2VySWQoKTtcbiAgICAgICAgICAgICAgICBpZiAodXNlcklkIHx8IGF0dGVtcHRzID49IG1heEF0dGVtcHRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHF1aWNrQ2hlY2tBbmRSZW5kZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYXR0ZW1wdHMrKztcbiAgICAgICAgICAgIH0sIGF0dGVtcHRJbnRlcnZhbCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGF3YWl0IHdhaXRGb3JVc2VySWQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9hZFRyYW5zbGF0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHJlcXVlc3QoYC90cmFuc2xhdGVzLyR7bG9jYWxlfWApXG4gICAgICAgICAgICAudGhlbihqc29uID0+IHtcbiAgICAgICAgICAgICAgICBpMThuRGF0YSA9IGpzb247XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlKCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgbXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBtdXRhdGlvbk9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZW5uaXMtY2hhbGxlbmdlXCIpLCB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc3VidHJlZTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBQb3B1cHM6INCy0YHRliDQsiDQvtC00L3QvtC80YMg0LHQu9C+0YbRliAucG9wdXBzLCDQstGW0LTQutGA0LjRgtGC0Y8g0L/QviBkYXRhLXBvcHVwLCDQt9Cw0LrRgNC40YLRgtGPINC/0L4gLnBvcHVwc19faXRlbS1jbG9zZVxuICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IHBvcHVwV3JhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cHMnKTtcbiAgICAgICAgaWYgKCFwb3B1cFdyYXApIHJldHVybjtcblxuICAgICAgICBmdW5jdGlvbiBvcGVuUG9wdXBCeUF0dHIocG9wdXBBdHRyLCBwb3B1cENsYXNzKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXRQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cFtkYXRhLXBvcHVwPVwiJyArIHBvcHVwQXR0ciArICdcIl0nKTtcbiAgICAgICAgICAgIGlmICh0YXJnZXRQb3B1cCkge1xuICAgICAgICAgICAgICAgIHRhcmdldFBvcHVwLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIHBvcHVwV3JhcC5jbGFzc0xpc3QucmVtb3ZlKCdfb3BhY2l0eScpO1xuICAgICAgICAgICAgICAgIHBvcHVwV3JhcC5jbGFzc0xpc3QuYWRkKHBvcHVwQ2xhc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY2xvc2VBbGxQb3B1cHMoKSB7XG4gICAgICAgICAgICBjb25zdCBwb3B1cHNDbGFzcyA9IFsnX2xldmVsTGlnaHQnLCAnX2xldmVsUHJvJywgJ19sZXZlbEV4dHJlbWUnLCAnX3JlbWluZGVySW5mbyddO1xuICAgICAgICAgICAgcG9wdXBXcmFwLmNsYXNzTGlzdC5hZGQoJ19vcGFjaXR5Jyk7XG4gICAgICAgICAgICBwb3B1cHNDbGFzcy5mb3JFYWNoKGZ1bmN0aW9uIChjbHMpIHtcbiAgICAgICAgICAgICAgICBwb3B1cFdyYXAuY2xhc3NMaXN0LnJlbW92ZShjbHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucG9wdXAnKS5mb3JFYWNoKGZ1bmN0aW9uIChwKSB7XG4gICAgICAgICAgICAgICAgcC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdhdXRvJztcbiAgICAgICAgfVxuXG4gICAgICAgIHBvcHVwV3JhcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xvc2VzdCgnLnBvcHVwc19faXRlbS1jbG9zZScpKSB7XG4gICAgICAgICAgICAgICAgY2xvc2VBbGxQb3B1cHMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlLnRhcmdldCA9PT0gcG9wdXBXcmFwKSB7XG4gICAgICAgICAgICAgICAgY2xvc2VBbGxQb3B1cHMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgY29uc3Qgb3BlbmVyID0gZS50YXJnZXQuY2xvc2VzdCgnW2RhdGEtcG9wdXBdJyk7XG4gICAgICAgICAgICBpZiAoIW9wZW5lcikgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKG9wZW5lci5jbGFzc0xpc3QuY29udGFpbnMoJ3BvcHVwJykpIHJldHVybjtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBjb25zdCBhdHRyID0gb3BlbmVyLmRhdGFzZXQucG9wdXA7XG4gICAgICAgICAgICBpZiAoIWF0dHIpIHJldHVybjtcbiAgICAgICAgICAgIGNvbnN0IHBvcHVwQ2xhc3MgPSAnXycgKyBhdHRyO1xuICAgICAgICAgICAgb3BlblBvcHVwQnlBdHRyKGF0dHIsIHBvcHVwQ2xhc3MpO1xuICAgICAgICB9KTtcbiAgICB9KSgpO1xuXG4gICAgLy8gPT09PT09PT09PSBMZXZlbHMgZGVjb3IgYW5pbWF0aW9uczogZmx5LW91dCBmcm9tIGNlbnRlciwgdGhlbiBsZXZpdGF0aW9uID09PT09PT09PT1cbiAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBERUNPUl9GTFlfT1VUX05BTUVTID0gW1xuICAgICAgICAgICAgJ2RlY29yRmx5T3V0QmFsbExlZnQnLFxuICAgICAgICAgICAgJ2RlY29yRmx5T3V0QmFsbFJpZ2h0JyxcbiAgICAgICAgICAgICdkZWNvckZseU91dFNodXR0ZXJMZWZ0JyxcbiAgICAgICAgICAgICdkZWNvckZseU91dFNodXR0ZXJSaWdodCdcbiAgICAgICAgXTtcblxuICAgICAgICBjb25zdCBkZWNvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZXZlbHMgLmRlY29yJyk7XG4gICAgICAgIGlmICghZGVjb3IpIHJldHVybjtcblxuICAgICAgICBjb25zdCBmaW5pc2hlZEZseU91dCA9IG5ldyBTZXQoKTtcblxuICAgICAgICBmdW5jdGlvbiBvbkZseU91dEVuZChlKSB7XG4gICAgICAgICAgICBpZiAoIURFQ09SX0ZMWV9PVVRfTkFNRVMuaW5jbHVkZXMoZS5hbmltYXRpb25OYW1lKSkgcmV0dXJuO1xuICAgICAgICAgICAgZmluaXNoZWRGbHlPdXQuYWRkKGUuYW5pbWF0aW9uTmFtZSk7XG4gICAgICAgICAgICBpZiAoZmluaXNoZWRGbHlPdXQuc2l6ZSA9PT0gREVDT1JfRkxZX09VVF9OQU1FUy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBkZWNvci5jbGFzc0xpc3QuYWRkKCdkZWNvci1sZXZpdGF0ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZGVjb3IuYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgb25GbHlPdXRFbmQpO1xuICAgIH0pKCk7XG5cbiAgICAvLyA9PT09PT09PT09IFByb2dyZXNzIGJldHM6IHJ1biBpdGVtIGFuaW1hdGlvbiBvbmx5IHdoZW4gLnByb2dyZXNzIGxvc2VzIC5oaWRlID09PT09PT09PT1cbiAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBwcm9ncmVzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9ncmVzcycpO1xuICAgICAgICBpZiAoIXByb2dyZXNzKSByZXR1cm47XG4gICAgICAgIGxldCB3YXNIaWRkZW4gPSBwcm9ncmVzcy5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGUnKTtcblxuICAgICAgICBmdW5jdGlvbiBydW5CZXRzQW5pbWF0aW9uKCkge1xuICAgICAgICAgICAgY29uc3QgaXNIaWRkZW4gPSBwcm9ncmVzcy5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGUnKTtcbiAgICAgICAgICAgIGlmICh3YXNIaWRkZW4gJiYgIWlzSGlkZGVuKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYmV0c1dyYXAgPSBwcm9ncmVzcy5xdWVyeVNlbGVjdG9yKCcucHJvZ3Jlc3NfX2JldHMnKTtcbiAgICAgICAgICAgICAgICBhbmltYXRlUHJvZ3Jlc3NCZXRzSXRlbXMoYmV0c1dyYXApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2FzSGlkZGVuID0gaXNIaWRkZW47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXdhc0hpZGRlbikge1xuICAgICAgICAgICAgY29uc3QgYmV0c1dyYXAgPSBwcm9ncmVzcy5xdWVyeVNlbGVjdG9yKCcucHJvZ3Jlc3NfX2JldHMnKTtcbiAgICAgICAgICAgIGFuaW1hdGVQcm9ncmVzc0JldHNJdGVtcyhiZXRzV3JhcCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcbiAgICAgICAgICAgIG11dGF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChtKSB7XG4gICAgICAgICAgICAgICAgaWYgKG0uYXR0cmlidXRlTmFtZSA9PT0gJ2NsYXNzJykge1xuICAgICAgICAgICAgICAgICAgICBydW5CZXRzQW5pbWF0aW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHByb2dyZXNzLCB7YXR0cmlidXRlczogdHJ1ZX0pO1xuICAgIH0pKCk7XG5cbiAgICAvL3Rlc3RcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWVudS1idG5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tZW51LXRlc3RcIikuY2xhc3NMaXN0LnRvZ2dsZShcImhpZGVcIilcbiAgICB9KVxuXG4gICAgY29uc3QgTEVWRUxfQ0xBU1NfTUFQID0ge1xuICAgICAgICBlYXN5OiBcIl9saWdodFwiLFxuICAgICAgICBtZWRpdW06IFwiX3Byb1wiLFxuICAgICAgICBleHRyZW1lOiBcIl9leHRyZW1lXCJcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2V0Tm9TcGluc1Rlc3RTdGF0ZSgpIHtcbiAgICAgICAgY29uc3Qgbm9TcGlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uby1zcGlucycpO1xuICAgICAgICBjb25zdCBzcGluc1JvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zcGlucy1yb3cnKTtcbiAgICAgICAgbm9TcGlucz8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICBzcGluc1Jvdz8uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFwcGx5TGV2ZWxTZWxlY3Rpb24obGV2ZWxUeXBlKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkTGV2ZWxDbGFzcyA9IExFVkVMX0NMQVNTX01BUFtsZXZlbFR5cGVdO1xuICAgICAgICBpZiAoIXNlbGVjdGVkTGV2ZWxDbGFzcykgcmV0dXJuO1xuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGV2ZWxzLmNvbnRcIik/LmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2dyZXNzXCIpPy5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKTtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2dyZXNzX19sZWZ0XCIpLmZvckVhY2goKGxlZnRCbG9jaykgPT4ge1xuICAgICAgICAgICAgaWYgKGxlZnRCbG9jay5jbGFzc0xpc3QuY29udGFpbnMoc2VsZWN0ZWRMZXZlbENsYXNzKSkge1xuICAgICAgICAgICAgICAgIGxlZnRCbG9jay5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGVmdEJsb2NrLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBwcm9ncmVzc0JldHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2dyZXNzX19iZXRzXCIpO1xuICAgICAgICBpZiAocHJvZ3Jlc3NCZXRzKSB7XG4gICAgICAgICAgICBwcm9ncmVzc0JldHMuY2xhc3NMaXN0LnJlbW92ZShcIl9saWdodFwiLCBcIl9wcm9cIiwgXCJfZXh0cmVtZVwiKTtcbiAgICAgICAgICAgIHByb2dyZXNzQmV0cy5jbGFzc0xpc3QuYWRkKHNlbGVjdGVkTGV2ZWxDbGFzcyk7XG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2dyZXNzIC5kcm9wLl9saWdodCwgLnByb2dyZXNzIC5kcm9wLl9wcm8sIC5wcm9ncmVzcyAuZHJvcC5fZXh0cmVtZVwiKS5mb3JFYWNoKChkcm9wQmxvY2spID0+IHtcbiAgICAgICAgICAgIGlmIChkcm9wQmxvY2suY2xhc3NMaXN0LmNvbnRhaW5zKHNlbGVjdGVkTGV2ZWxDbGFzcykpIHtcbiAgICAgICAgICAgICAgICBkcm9wQmxvY2suY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRyb3BCbG9jay5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXN1bHRzLmNvbnRcIik/LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpO1xuICAgICAgICBzZXROb1NwaW5zVGVzdFN0YXRlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcnVuTGVnYWN5TGV2ZWxVSShsZXZlbENsYXNzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZGlmZmljdWx0cyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBBcnJheS5pc0FycmF5KGRpZmZpY3VsdHMpICYmIHR5cGVvZiBtYWluUGFnZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBtYWluUGFnZSkge1xuICAgICAgICAgICAgZGlmZmljdWx0cy5mb3JFYWNoKChjc3MpID0+IHtcbiAgICAgICAgICAgICAgICBtYWluUGFnZS5jbGFzc0xpc3QucmVtb3ZlKGNzcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHR5cGVvZiB0b2dnbGVCbG9ja3MgPT09IFwiZnVuY3Rpb25cIiAmJlxuICAgICAgICAgICAgdHlwZW9mIGNob3NlQmxvY2sgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgICAgIHR5cGVvZiByZXN1bHRCbG9jayAhPT0gXCJ1bmRlZmluZWRcIlxuICAgICAgICApIHtcbiAgICAgICAgICAgIHRvZ2dsZUJsb2NrcyhjaG9zZUJsb2NrLCBcImNob3NlSGlkZVwiLCByZXN1bHRCbG9jaywgXCJyZXN1bHRTaG93XCIsIGxldmVsQ2xhc3MsIHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBsb2FkZXIgIT09IFwidW5kZWZpbmVkXCIgJiYgbG9hZGVyKSB7XG4gICAgICAgICAgICBsb2FkZXIuY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gXCJhdXRvXCI7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBtYWluUGFnZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBtYWluUGFnZSkge1xuICAgICAgICAgICAgbWFpblBhZ2UuY2xhc3NMaXN0LnJlbW92ZShcImxvYWRpbmdcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmV4dHJlbWUtYnRuXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGFwcGx5TGV2ZWxTZWxlY3Rpb24oXCJleHRyZW1lXCIpO1xuICAgICAgICBydW5MZWdhY3lMZXZlbFVJKFwiX2V4dHJlbWVcIik7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy51bmF1dGgtbXNnLCAucGFydC1idG4nKS5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJ0bi1qb2luJykuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIH0pO1xuICAgIH0pXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lYXN5LWJ0blwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBhcHBseUxldmVsU2VsZWN0aW9uKFwiZWFzeVwiKTtcbiAgICAgICAgcnVuTGVnYWN5TGV2ZWxVSShcIl9saWdodFwiKTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnVuYXV0aC1tc2csIC5wYXJ0LWJ0bicpLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICB9KTtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuLWpvaW4nKS5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgfSk7XG4gICAgfSlcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1lZGl1bS1idG5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgYXBwbHlMZXZlbFNlbGVjdGlvbihcIm1lZGl1bVwiKTtcbiAgICAgICAgcnVuTGVnYWN5TGV2ZWxVSShcIl9wcm9cIik7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy51bmF1dGgtbXNnLCAucGFydC1idG4nKS5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJ0bi1qb2luJykuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIH0pO1xuXG4gICAgfSlcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG5nLWJ0blwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBjb25zdCBjdXJyZW50TG9jYWxlID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImxvY2FsZVwiKTtcblxuICAgICAgICBpZiAoY3VycmVudExvY2FsZSA9PT0gXCJlblwiKSB7XG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFwibG9jYWxlXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcImxvY2FsZVwiLCBcImVuXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgfSk7XG5cbiAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucmF0ZS1idG4nKS5mb3JFYWNoKGJ0biA9PiB7XG4gICAgLy8gICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAvLyAgICAgICAgIGNvbnN0IHRhcmdldEl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZ3Jlc3NfX2JldHMtaXRlbTpudGgtY2hpbGQoMSknKTtcbiAgICAvLyAgICAgICAgIGlmICh0YXJnZXRJdGVtKSB7XG4gICAgLy8gICAgICAgICAgICAgdGFyZ2V0SXRlbS5jbGFzc0xpc3QuYWRkKCdfZmFpbCcpO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICAgICAgY29uc3QgdGFyZ2V0SXRlbTIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZ3Jlc3NfX2JldHMtaXRlbTpudGgtY2hpbGQoMiknKTtcbiAgICAvLyAgICAgICAgIGlmICh0YXJnZXRJdGVtMikge1xuICAgIC8vICAgICAgICAgICAgIHRhcmdldEl0ZW0yLmNsYXNzTGlzdC5hZGQoJ19kb25lJyk7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgICAgICBjb25zdCB0YXJnZXRJdGVtMyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9ncmVzc19fYmV0cy1pdGVtOm50aC1jaGlsZCgzKScpO1xuICAgIC8vICAgICAgICAgaWYgKHRhcmdldEl0ZW0zKSB7XG4gICAgLy8gICAgICAgICAgICAgdGFyZ2V0SXRlbTMuY2xhc3NMaXN0LmFkZCgneW91Jyk7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH0pO1xuICAgIC8vIH0pO1xuXG4gICAgY29uc3QgZGVmYXVsdFNwaW5zUm93TWFya3VwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNwaW5zLXJvdycpPy5pbm5lckhUTUwgfHwgJyc7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndpdGgtc3BpbnMtYnRuJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBub1NwaW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5vLXNwaW5zJyk7XG4gICAgICAgIGNvbnN0IHNwaW5zUm93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNwaW5zLXJvdycpO1xuXG4gICAgICAgIGlmICghc3BpbnNSb3cpIHJldHVybjtcblxuICAgICAgICBpZiAoZGVmYXVsdFNwaW5zUm93TWFya3VwKSB7XG4gICAgICAgICAgICBzcGluc1Jvdy5pbm5lckhUTUwgPSBkZWZhdWx0U3BpbnNSb3dNYXJrdXA7XG4gICAgICAgIH1cbiAgICAgICAgc3BpbnNSb3cuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICBub1NwaW5zPy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgfSk7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXV0aC1idG4nKT8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGlmKHVzZXJJZCl7XG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFwidXNlcklkXCIpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcInVzZXJJZFwiLCBcIjdcIilcbiAgICAgICAgfVxuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKClcbiAgICB9KTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBoYXNJZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3VzZXJJZCcpO1xuICAgICAgICBjb25zdCBoaWRlRmxhZyA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2hpZGVQYXJ0QnRuJyk7XG5cbiAgICAgICAgaWYgKGhhc0lkICYmIGhpZGVGbGFnID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wYXJ0LWJ0bicpLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBlbnN1cmVVcGRhdGVkUGxhY2Vob2xkZXIoY29udGFpbmVyU2VsZWN0b3IpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXJTZWxlY3Rvcik7XG4gICAgICAgIGlmICghY29udGFpbmVyKSByZXR1cm47XG5cbiAgICAgICAgbGV0IHVwZFNwYW4gPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnVwZCcpO1xuICAgICAgICBpZiAoIXVwZFNwYW4pIHtcbiAgICAgICAgICAgIHVwZFNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICB1cGRTcGFuLmNsYXNzTmFtZSA9ICd1cGQnO1xuICAgICAgICAgICAgaWYgKGNvbnRhaW5lclNlbGVjdG9yID09PSAnLnByb2dyZXNzX19yaWdodC11cGRhdGVkJykge1xuICAgICAgICAgICAgICAgIHVwZFNwYW4uaWQgPSAnbGFzdFVwZCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJyAnKSk7XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodXBkU3Bhbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXVwZFNwYW4udGV4dENvbnRlbnQgfHwgIXVwZFNwYW4udGV4dENvbnRlbnQudHJpbSgpIHx8IHVwZFNwYW4udGV4dENvbnRlbnQudHJpbSgpID09PSAnLScpIHtcbiAgICAgICAgICAgIHVwZFNwYW4udGV4dENvbnRlbnQgPSBERUZBVUxUX1VQREFURURfQVQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhcHBseVVwZGF0ZWRQbGFjZWhvbGRlcnMoKSB7XG4gICAgICAgIGVuc3VyZVVwZGF0ZWRQbGFjZWhvbGRlcignLnByb2dyZXNzX19yaWdodC11cGRhdGVkJyk7XG4gICAgICAgIGVuc3VyZVVwZGF0ZWRQbGFjZWhvbGRlcignLnByb2dyZXNzX191cGRhdGVkLW1vYicpO1xuICAgIH1cblxuXG4gICAgbG9hZFRyYW5zbGF0aW9ucygpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGFwcGx5VXBkYXRlZFBsYWNlaG9sZGVycygpO1xuICAgICAgICAgICAgcmV0dXJuIGluaXQoKTtcbiAgICAgICAgfSk7XG5cblxuXG5cblxufSkoKTsiXX0=
