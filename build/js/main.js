"use strict";

// (function () {
//
//     const apiURL = 'https://allwin-prom.pp.ua/api_eurofun'
//
//     let isVerifiedUser = false;
//     let periodAmount = 2 // кількість періодів в акції, треба для кешування інфи з табли
//     let tableData = []
//     let activeWeek = null
//     let isPromoOver = false
//
//     const mainPage = document.querySelector(".eurofan"),
//         unauthMsgs = document.querySelectorAll('.unauth-msg'),
//         participateBtns = document.querySelectorAll('.part-btn'),
//         redirectBtns = document.querySelectorAll('.play-btn'),
//         loader = document.querySelector(".spinner-overlay"),
//         resultsTable = document.querySelector('#table'),
//         resultsTableOther = document.querySelector('#tableOther'),
//         tableTabs = document.querySelectorAll('.table__tabs-item')
//
//     const ukLeng = document.querySelector('#ukLeng');
//     const enLeng = document.querySelector('#enLeng');
//
//     const toggleClasses = (elements, className) => elements.forEach(el => el.classList.toggle(`${className}`));
//     const toggleTranslates = (elements, dataAttr) => elements.forEach(el => {
//         el.setAttribute('data-translate', `${dataAttr}`)
//         el.innerHTML = i18nData[dataAttr] || '*----NEED TO BE TRANSLATED----*   key:  ' + dataAttr;
//         el.removeAttribute('data-translate');
//     });
//
//     let locale = "uk"
//
//     let loaderBtn = false
//
//     if (ukLeng) locale = 'uk';
//     if (enLeng) locale = 'en';
//
//     let debug = false
//
//     if (debug) hideLoader()
//
//     let i18nData = {};
//     const translateState = true;
//
//     let userId = null
//
//     const request = function (link, extraOptions) {
//         return fetch(apiURL + link, {
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             ...(extraOptions || {})
//         })
//             .then(res => {
//                 if (!res.ok) throw new Error('API error');
//                 return res.json();
//             })
//             .catch(err => {
//                 console.error('API request failed:', err);
//
//                 reportError(err);
//
//                 return Promise.reject(err);
//             });
//
//     }
//
//     function hideLoader(){
//         loader.classList.add("hide")
//         document.body.style.overflow = "auto"
//         mainPage.classList.remove("loading")
//     }
//
//     function checkUserAuth() {
//         if (userId) {
//             for (const unauthMes of unauthMsgs) {
//                 unauthMes.classList.add('hide');
//             }
//             return request(`/promouser/${userId}?nocache=1`)
//                 .then(res => {
//                     if (res.userid) {
//                         participateBtns.forEach(item => item.classList.add('hide'));
//                         redirectBtns.forEach(item => item.classList.remove('hide'));
//                         isVerifiedUser = true;
//                     } else {
//                         participateBtns.forEach(item => item.classList.remove('hide'));
//                         redirectBtns.forEach(item => item.classList.add('hide'));
//                         isVerifiedUser = false;
//                     }
//
//                 })
//         } else {
//             for (let redirectBtn of redirectBtns) {
//                 redirectBtn.classList.add('hide');
//             }
//             for (let participateBtn of participateBtns) {
//                 participateBtn.classList.add('hide');
//             }
//             for (const unauthMes of unauthMsgs) {
//                 unauthMes.classList.remove('hide');
//             }
//
//             return Promise.resolve(false);
//         }
//     }
//
//     function participate() {
//         if (!userId) {
//             return;
//         }
//         const params = { userid: userId };
//         fetch(apiURL + '/user/', {
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             method: 'POST',
//             body: JSON.stringify(params)
//         }).then(res => res.json())
//             .then(res => {
//                 loaderBtn = true
//                 toggleClasses(participateBtns, "loader")
//                 toggleTranslates(participateBtns, "loader")
//                 setTimeout(() =>{
//                     toggleTranslates(participateBtns, "loader_ready")
//                     toggleClasses(participateBtns, "done")
//                     toggleClasses(participateBtns, "loader")
//                 }, 500)
//                 setTimeout(()=>{
//                     checkUserAuth()
//                     loadUsers("?nocache=1").then(res => {
//                         renderUsers(activeWeek, tableData)
//                     })
//                 }, 1000)
//
//             })
//             .catch(err => {
//                 console.error('API request failed:', err);
//
//                 reportError(err);
//
//                 return Promise.reject(err);
//             });
//     }
//     function loadUsers(parametr) {
//         const requests = [];
//         tableData.length = 0
//         for (let i = 1; i <= periodAmount; i++) {
//             const week = i; // або будь-яка логіка для формування номера тижня
//             const req = request(`/users/${week}${parametr ? parametr : ""}`).then(data => {
//                 tableData.push({ week, data: data });
//                 if(!activeWeek){
//                     activeWeek = data.activeStageNumber
//                 }
//                 isPromoOver = data.isPromoOver
//             });
//
//             requests.push(req);
//         }
//         // renderUsers(activeWeek, requests);
//
//         return Promise.all(requests)
//             .catch(error => {
//                 console.error('Error loading users:', error);
//             });
//     }
//
//     function reportError(err) {
//         const reportData = {
//             origin: window.location.href,
//             userid: userId,
//             errorText: err?.error || err?.text || err?.message || 'Unknown error',
//             type: err?.name || 'UnknownError',
//             stack: err?.stack || ''
//         };
//
//         fetch('', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(reportData)
//         }).catch(console.warn);
//     }
//
//     function translate() {
//         const elems = document.querySelectorAll('[data-translate]')
//         if (elems && elems.length) {
//
//             if(translateState){
//                 elems.forEach(elem => {
//                     const key = elem.getAttribute('data-translate');
//                     elem.innerHTML = i18nData[key] || '*----NEED TO BE TRANSLATED----*   key:  ' + key;
//                     if (i18nData[key]) {
//                         elem.removeAttribute('data-translate');
//                     }
//                 })
//             }else{
//                 console.log("translation works!")
//             }
//         }
//         if (locale === 'en') {
//             mainPage.classList.add('en');
//         }
//         refreshLocalizedClass();
//
//     }
//
//     function refreshLocalizedClass(element, baseCssClass) {
//         if (!element) {
//             return;
//         }
//         for (const lang of ['uk', 'en']) {
//             element.classList.remove(baseCssClass + lang);
//         }
//         element.classList.add(baseCssClass + locale);
//     }
//
//     function renderUsers(weekNum, userData = []) {
//         weekNum = Number(weekNum);
//         const weekObj = userData.find(w => w.week === weekNum);
//         if (!weekObj || !weekObj.data || !Array.isArray(weekObj.data.users)) {
//             console.error('Невірна структура даних');
//             return;
//         }
//
//         const isStageEnded = weekObj.data.isStageEnded
//
//         userData = weekObj.data.users;
//
//
//         const currentUser = userData.find(user => user.userid === userId);
//
//         if(userId && !currentUser && isVerifiedUser){
//             userData = [...userData, {userid: userId, points: 0}]
//         }
//         populateUsersTable(userData, userId, weekNum, currentUser, isVerifiedUser, isStageEnded);
//     }
//
//     function populateUsersTable(users, currentUserId, week, currentUser, isVerifiedUser, isStageEnded) {
//         if (!users?.length) return;
//         resultsTable.innerHTML = '';
//         resultsTableOther.innerHTML = '';
//
//         const isTopCurrentUser = currentUser && users.slice(0, 10).some(user => user.userid === currentUserId);
//
//         const topUsersLength = !currentUser || isTopCurrentUser ? 13 : 10;
//
//         const topUsers = users.slice(0, topUsersLength);
//
//         topUsers.forEach(user => {
//             displayUser(user, user.userid === currentUserId, resultsTable, topUsers, isTopCurrentUser, week);
//         });
//         if(isVerifiedUser && !currentUser) {
//             displayUser(currentUser, true, resultsTableOther, users, false, week);
//         }
//         if (!isTopCurrentUser && currentUser) {
//             isVerifiedUser = false;
//             displayUser(currentUser, true, resultsTableOther, users, false, week);
//         }
//     }
//
//     function displayUser(user, isCurrentUser, table, users, isTopCurrentUser, week) {
//         const renderRow = (userData, options = {}) => {
//             const { highlight = false, neighbor = false } = options;
//             const userRow = document.createElement('div');
//             userRow.classList.add('table__row');
//
//             const userPlace = users.indexOf(userData) + 1;
//             const prizeKey = debug ? null : getPrizeTranslationKey(userData.points, userPlace);
//
//
//             if (userPlace <= 3) {
//                 userRow.classList.add(`place${userPlace}`);
//             }
//
//             if (highlight || isCurrentUser && !neighbor) {
//                 userRow.classList.add('you');
//             } else if (neighbor) {
//                 userRow.classList.add('_neighbor');
//             }
//
//             userRow.innerHTML = `
//            <div class="table__row-item">
//                 ${userPlace}
// <!--                ${userPlace < 10 ? '0' + userPlace : userPlace}-->
//                 ${isCurrentUser && !neighbor ? '<span class="you">' + translateKey("you") + '</span>' : ''}
//             </div>
//             <div class="table__row-item">
//                 ${isCurrentUser && !neighbor ? userData.userid : maskUserId(userData.userid)}
//             </div>
//             <div class="table__row-item">
//                ${Number(userData.points).toFixed(2)}
//             </div>
//             <div class="table__row-item">
//                 ${prizeKey ? translateKey(prizeKey) : ' - '}
//             </div>
//         `;
//
//             table.append(userRow);
//         };
//         if (isCurrentUser && !isTopCurrentUser) {
//             const index = users.indexOf(user);
//             if (index !== 10 && users[index - 1]) {
//                 renderRow(users[index - 1], { neighbor: true });
//             }
//             renderRow(user, { highlight: true });
//             if (users[index + 1]) {
//                 renderRow(users[index + 1], { neighbor: true });
//             }
//         } else {
//             renderRow(user);
//         }
//     }
//
//     function translateKey(key, defaultValue) {
//         if (!key) {
//             return;
//         }
//         let needKey = debug ? key : `*----NEED TO BE TRANSLATED----* key: ${key}`
//
//         defaultValue =  needKey || key;
//         return i18nData[key] || defaultValue;
//     }
//
//     function maskUserId(userId) {
//         return "**" + userId.toString().slice(2);
//     }
//
//     function getPrizeTranslationKey(points, place) {
//         if (points == null || points < 5) return null;
//         if (place >= 1 && place <= 5) return `prize_${place}`;
//         if (place >= 6 && place <= 10) return `prize_6-10`;
//         if (place >= 11 && place <= 15) return `prize_11-15`;
//         if (place >= 16 && place <= 20) return `prize_16-20`;
//         if (place >= 21 && place <= 50) return `prize_21-50`;
//         if (place >= 51 && place <= 100) return `prize_51-100`;
//     }
//
//     async function init() {
//         let attempts = 0;
//         const maxAttempts = 20;
//         const attemptInterval = 50;
//
//         function tryDetectUserId() {
//             if (window.store) {
//                 const state = window.store.getState();
//                 userId = state.auth.isAuthorized && state.auth.id || '';
//             } else if (window.g_user_id) {
//                 userId = window.g_user_id;
//             }
//         }
//
//         function quickCheckAndRender() {
//             checkUserAuth()
//                 .then(loadUsers)
//                 .then(() =>{
//                     if(isPromoOver){
//                         participateBtns.forEach(el => {
//                             el.classList.add('lock');
//                         })
//                         redirectBtns.forEach(el => {
//                             el.classList.add('lock');
//                         })
//                     }
//
//                     setTimeout(hideLoader, 300);
//
//                     document.querySelectorAll(".table__tabs-item").forEach((tab, i) =>{
//                         tab.classList.remove('active');
//                         if(i === activeWeek - 1) tab.classList.add('active');
//                     })
//                     renderUsers(activeWeek, tableData)
//                     participateBtns.forEach(btn => btn.addEventListener('click', participate));
//
//                     tableTabs.forEach(tab =>{
//                         if(Number(tab.getAttribute("data-week")) > activeWeek){
//                             tab.style.pointerEvents = "none";
//                         }else{
//                             tab.style.pointerEvents = "initial";
//                         }
//
//                     })
//                     document.addEventListener("click", e =>{
//                         if(e.target.closest(".table__tabs-item")){
//                             if(Number(e.target.closest(".table__tabs-item").getAttribute("data-week")) > activeWeek) {
//                                 return
//                             }
//                             e.target.closest(".table__tabs-item").style.pointerEvents = "initial";
//                             tableTabs.forEach(tab =>{
//                                 tab.classList.remove("active");
//                             })
//                             let tabWeek = e.target.closest(".table__tabs-item").getAttribute("data-week");
//                             e.target.closest(".table__tabs-item").classList.add("active");
//                             renderUsers(tabWeek, tableData)
//                         }
//                     })
//                 })
//         }
//
//         const waitForUserId = new Promise((resolve) => {
//             const interval = setInterval(() => {
//                 tryDetectUserId();
//                 if (userId || attempts >= maxAttempts) {
//                     quickCheckAndRender();
//                     clearInterval(interval);
//                     resolve();
//                 }
//                 attempts++;
//             }, attemptInterval);
//         });
//
//         await waitForUserId;
//     }
//
//     function loadTranslations() {
//         return request(`/new-translates/${locale}`)
//             .then(json => {
//                 i18nData = json;
//                 translate();
//             });
//     }
//
//     loadTranslations().then(init)
//
//     // iOS custom scrollbar
//     const isIOS = (() => {
//         const ua = navigator.userAgent || navigator.vendor || window.opera;
//         const iOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
//         const isModernIpad = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
//         return iOS || isModernIpad;
//     })();
//
//     function initIOSScrollbars() {
//         if (!isIOS) return;
//
//         const scrollContainers = document.querySelectorAll('.drop-txt-list, .spins-row-scroll');
//
//         scrollContainers.forEach(container => {
//             if (container.dataset.iosScrollbar) return;
//             container.dataset.iosScrollbar = 'true';
//
//             container.style.position = 'relative';
//
//             // Hide native iOS scrollbar using overflow wrapper technique
//             container.style.marginRight = '-20px';
//             container.style.paddingRight = '30px';
//             container.parentElement.style.overflow = 'hidden';
//
//             const track = document.createElement('div');
//             track.className = 'ios-scrollbar-track';
//
//             const thumb = document.createElement('div');
//             thumb.className = 'ios-scrollbar-thumb';
//
//             track.appendChild(thumb);
//             container.parentElement.style.position = 'relative';
//             container.parentElement.appendChild(track);
//
//             function updateThumb() {
//                 const scrollHeight = container.scrollHeight;
//                 const clientHeight = container.clientHeight;
//                 const scrollTop = container.scrollTop;
//
//                 if (scrollHeight <= clientHeight) {
//                     track.style.display = 'none';
//                     return;
//                 }
//
//                 track.style.display = 'block';
//
//                 const thumbHeight = Math.max((clientHeight / scrollHeight) * clientHeight, 20);
//                 const maxScrollTop = scrollHeight - clientHeight;
//                 const thumbTop = (scrollTop / maxScrollTop) * (clientHeight - thumbHeight);
//
//                 thumb.style.height = thumbHeight + 'px';
//                 thumb.style.transform = `translateY(${thumbTop}px)`;
//             }
//
//             container.addEventListener('scroll', updateThumb);
//
//             const observer = new MutationObserver(updateThumb);
//             observer.observe(container, { childList: true, subtree: true });
//
//             setTimeout(updateThumb, 100);
//
//             container.closest('details')?.addEventListener('toggle', () => {
//                 setTimeout(updateThumb, 50);
//             });
//         });
//     }
//
//     initIOSScrollbars();
//
// })();

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

// ========== Progress bets: run card animation only when .progress loses .hide ==========
(function () {
  var progress = document.querySelector('.progress');
  var bets = document.querySelector('.progress__bets');
  if (!progress || !bets) return;
  function runBetsAnimation() {
    if (!progress.classList.contains('hide')) {
      bets.classList.add('progress__bets--animate');
    }
  }
  runBetsAnimation();
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
  hight: "_extreme"
};
function applyLevelSelection(levelType) {
  var _document$querySelect, _document$querySelect2, _document$querySelect3;
  var selectedLevelClass = LEVEL_CLASS_MAP[levelType];
  if (!selectedLevelClass) return;
  (_document$querySelect = document.querySelector(".levels.cont")) === null || _document$querySelect === void 0 || _document$querySelect.classList.add("hide");
  (_document$querySelect2 = document.querySelector(".progress")) === null || _document$querySelect2 === void 0 || _document$querySelect2.classList.remove("hide");
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
  (_document$querySelect3 = document.querySelector(".results.cont")) === null || _document$querySelect3 === void 0 || _document$querySelect3.classList.remove("hide");
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
document.querySelector(".hight-btn").addEventListener("click", function () {
  applyLevelSelection("hight");
  runLegacyLevelUI("_hight");
  document.querySelectorAll('.unauth-msg, .part-btn').forEach(function (el) {
    el.classList.add('hide');
  });
  document.querySelectorAll('.btn-join').forEach(function (el) {
    el.classList.remove('hide');
  });
});
document.querySelector(".easy-btn").addEventListener("click", function () {
  applyLevelSelection("easy");
  runLegacyLevelUI("_easy");
  document.querySelectorAll('.unauth-msg, .part-btn').forEach(function (el) {
    el.classList.add('hide');
  });
  document.querySelectorAll('.btn-join').forEach(function (el) {
    el.classList.remove('hide');
  });
});
document.querySelector(".medium-btn").addEventListener("click", function () {
  applyLevelSelection("medium");
  runLegacyLevelUI("_medium");
  document.querySelectorAll('.unauth-msg, .part-btn').forEach(function (el) {
    el.classList.add('hide');
  });
  document.querySelectorAll('.btn-join').forEach(function (el) {
    el.classList.remove('hide');
  });
});

// document.querySelector('.auth-btn')?.addEventListener('click', () => {
//     const hasId = sessionStorage.getItem('userId');
//     hasId ? sessionStorage.removeItem('userId') : sessionStorage.setItem('userId', '100300268'); // айдішку не мінять!
//     location.reload();
// });

// document.querySelector('.auth-btn')?.addEventListener('click', () => {
//     const hasId = sessionStorage.getItem('userId');
//
//     if (hasId) {
//         sessionStorage.removeItem('userId');
//         sessionStorage.removeItem('hidePartBtn'); // флажок більше не потрібен
//     } else {
//         sessionStorage.setItem('userId', '100300268'); // айдішку не мінять!
//         sessionStorage.setItem('hidePartBtn', 'true'); // додаємо флажок
//     }
//
//     location.reload();
// });

// window.addEventListener('DOMContentLoaded', () => {
//     const hasId = sessionStorage.getItem('userId');
//     const hideFlag = sessionStorage.getItem('hidePartBtn');
//
//     if (hasId && hideFlag === 'true') {
//         document.querySelectorAll('.part-btn').forEach(el => {
//             el.classList.add('hide');
//         });
//     }
// });

// document.querySelector(".lng-btn").addEventListener("click", () => {
//     const currentLocale = sessionStorage.getItem("locale");
//
//     if (currentLocale === "en") {
//         sessionStorage.removeItem("locale");
//     } else {
//         sessionStorage.setItem("locale", "en");
//     }
//
//     location.reload();
// });

document.querySelectorAll('.rate-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var targetItem = document.querySelector('.result__bets-item.showItem:nth-child(1)');
    if (targetItem) {
      targetItem.classList.add('_fail');
    }
    var targetItem2 = document.querySelector('.result__bets-item.showItem:nth-child(2)');
    if (targetItem2) {
      targetItem2.classList.add('_done');
    }
    var targetItem3 = document.querySelector('.result__bets-item.showItem:nth-child(3)');
    if (targetItem3) {
      targetItem3.classList.add('you');
      document.querySelector('.result__bets-you').style.opacity = '1';
    }
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsicG9wdXBXcmFwIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwib3BlblBvcHVwQnlBdHRyIiwicG9wdXBBdHRyIiwicG9wdXBDbGFzcyIsImJvZHkiLCJzdHlsZSIsIm92ZXJmbG93IiwidGFyZ2V0UG9wdXAiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJjbG9zZUFsbFBvcHVwcyIsInBvcHVwc0NsYXNzIiwiZm9yRWFjaCIsImNscyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJwIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJ0YXJnZXQiLCJjbG9zZXN0Iiwib3BlbmVyIiwiY29udGFpbnMiLCJhdHRyIiwiZGF0YXNldCIsInBvcHVwIiwiREVDT1JfRkxZX09VVF9OQU1FUyIsImRlY29yIiwiZmluaXNoZWRGbHlPdXQiLCJTZXQiLCJvbkZseU91dEVuZCIsImluY2x1ZGVzIiwiYW5pbWF0aW9uTmFtZSIsInNpemUiLCJsZW5ndGgiLCJwcm9ncmVzcyIsImJldHMiLCJydW5CZXRzQW5pbWF0aW9uIiwib2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwibXV0YXRpb25zIiwibSIsImF0dHJpYnV0ZU5hbWUiLCJvYnNlcnZlIiwiYXR0cmlidXRlcyIsInRvZ2dsZSIsIkxFVkVMX0NMQVNTX01BUCIsImVhc3kiLCJtZWRpdW0iLCJoaWdodCIsImFwcGx5TGV2ZWxTZWxlY3Rpb24iLCJsZXZlbFR5cGUiLCJfZG9jdW1lbnQkcXVlcnlTZWxlY3QiLCJfZG9jdW1lbnQkcXVlcnlTZWxlY3QyIiwiX2RvY3VtZW50JHF1ZXJ5U2VsZWN0MyIsInNlbGVjdGVkTGV2ZWxDbGFzcyIsImxlZnRCbG9jayIsInByb2dyZXNzQmV0cyIsInJ1bkxlZ2FjeUxldmVsVUkiLCJsZXZlbENsYXNzIiwiZGlmZmljdWx0cyIsIkFycmF5IiwiaXNBcnJheSIsIm1haW5QYWdlIiwiY3NzIiwidG9nZ2xlQmxvY2tzIiwiY2hvc2VCbG9jayIsInJlc3VsdEJsb2NrIiwibG9hZGVyIiwiZWwiLCJidG4iLCJ0YXJnZXRJdGVtIiwidGFyZ2V0SXRlbTIiLCJ0YXJnZXRJdGVtMyIsIm9wYWNpdHkiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQyxZQUFZO0VBQ1QsSUFBTUEsU0FBUyxHQUFHQyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxTQUFTLENBQUM7RUFDbkQsSUFBSSxDQUFDRixTQUFTLEVBQUU7RUFFaEIsU0FBU0csZUFBZUEsQ0FBQ0MsU0FB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TUFDWkEsVUFBVSxDQUFDL0QsU0FBUyxDQUFDQyxHQUFHLENBQUMsT0FBTyxDQUFDO0lBQ3JDO0lBQ0EsSUFBTStELFdBQVcsR0FBR3pFLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLDBDQUEwQyxDQUFDO0lBQ3RGLElBQUl3RSxXQUFXLEVBQUU7TUFDYkEsV0FBVyxDQUFDaEUsU0FBUyxDQUFDQyxHQUFHLENBQUMsT0FBTyxDQUFDO0lBQ3RDO0lBQ0EsSUFBTWdFLFdBQVcsR0FBRzFFLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLDBDQUEwQyxDQUFDO0lBQ3RGLElBQUl5RSxXQUFXLEVBQUU7TUFDYkEsV0FBVyxDQUFDakUsU0FBUyxDQUFDQyxHQUFHLENBQUMsS0FBSyxDQUFDO01BQ2hDVixRQUFRLENBQUNDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDSyxLQUFLLENBQUNxRSxPQUFPLEdBQUcsR0FBRztJQUNuRTtFQUNKLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gKGZ1bmN0aW9uICgpIHtcbi8vXG4vLyAgICAgY29uc3QgYXBpVVJMID0gJ2h0dHBzOi8vYWxsd2luLXByb20ucHAudWEvYXBpX2V1cm9mdW4nXG4vL1xuLy8gICAgIGxldCBpc1ZlcmlmaWVkVXNlciA9IGZhbHNlO1xuLy8gICAgIGxldCBwZXJpb2RBbW91bnQgPSAyIC8vINC60ZbQu9GM0LrRltGB0YLRjCDQv9C10YDRltC+0LTRltCyINCyINCw0LrRhtGW0ZcsINGC0YDQtdCx0LAg0LTQu9GPINC60LXRiNGD0LLQsNC90L3RjyDRltC90YTQuCDQtyDRgtCw0LHQu9C4XG4vLyAgICAgbGV0IHRhYmxlRGF0YSA9IFtdXG4vLyAgICAgbGV0IGFjdGl2ZVdlZWsgPSBudWxsXG4vLyAgICAgbGV0IGlzUHJvbW9PdmVyID0gZmFsc2Vcbi8vXG4vLyAgICAgY29uc3QgbWFpblBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmV1cm9mYW5cIiksXG4vLyAgICAgICAgIHVuYXV0aE1zZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudW5hdXRoLW1zZycpLFxuLy8gICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGFydC1idG4nKSxcbi8vICAgICAgICAgcmVkaXJlY3RCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXktYnRuJyksXG4vLyAgICAgICAgIGxvYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3Bpbm5lci1vdmVybGF5XCIpLFxuLy8gICAgICAgICByZXN1bHRzVGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFibGUnKSxcbi8vICAgICAgICAgcmVzdWx0c1RhYmxlT3RoZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFibGVPdGhlcicpLFxuLy8gICAgICAgICB0YWJsZVRhYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFibGVfX3RhYnMtaXRlbScpXG4vL1xuLy8gICAgIGNvbnN0IHVrTGVuZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1a0xlbmcnKTtcbi8vICAgICBjb25zdCBlbkxlbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW5MZW5nJyk7XG4vL1xuLy8gICAgIGNvbnN0IHRvZ2dsZUNsYXNzZXMgPSAoZWxlbWVudHMsIGNsYXNzTmFtZSkgPT4gZWxlbWVudHMuZm9yRWFjaChlbCA9PiBlbC5jbGFzc0xpc3QudG9nZ2xlKGAke2NsYXNzTmFtZX1gKSk7XG4vLyAgICAgY29uc3QgdG9nZ2xlVHJhbnNsYXRlcyA9IChlbGVtZW50cywgZGF0YUF0dHIpID0+IGVsZW1lbnRzLmZvckVhY2goZWwgPT4ge1xuLy8gICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdHJhbnNsYXRlJywgYCR7ZGF0YUF0dHJ9YClcbi8vICAgICAgICAgZWwuaW5uZXJIVE1MID0gaTE4bkRhdGFbZGF0YUF0dHJdIHx8ICcqLS0tLU5FRUQgVE8gQkUgVFJBTlNMQVRFRC0tLS0qICAga2V5OiAgJyArIGRhdGFBdHRyO1xuLy8gICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdHJhbnNsYXRlJyk7XG4vLyAgICAgfSk7XG4vL1xuLy8gICAgIGxldCBsb2NhbGUgPSBcInVrXCJcbi8vXG4vLyAgICAgbGV0IGxvYWRlckJ0biA9IGZhbHNlXG4vL1xuLy8gICAgIGlmICh1a0xlbmcpIGxvY2FsZSA9ICd1ayc7XG4vLyAgICAgaWYgKGVuTGVuZykgbG9jYWxlID0gJ2VuJztcbi8vXG4vLyAgICAgbGV0IGRlYnVnID0gZmFsc2Vcbi8vXG4vLyAgICAgaWYgKGRlYnVnKSBoaWRlTG9hZGVyKClcbi8vXG4vLyAgICAgbGV0IGkxOG5EYXRhID0ge307XG4vLyAgICAgY29uc3QgdHJhbnNsYXRlU3RhdGUgPSB0cnVlO1xuLy9cbi8vICAgICBsZXQgdXNlcklkID0gbnVsbFxuLy9cbi8vICAgICBjb25zdCByZXF1ZXN0ID0gZnVuY3Rpb24gKGxpbmssIGV4dHJhT3B0aW9ucykge1xuLy8gICAgICAgICByZXR1cm4gZmV0Y2goYXBpVVJMICsgbGluaywge1xuLy8gICAgICAgICAgICAgaGVhZGVyczoge1xuLy8gICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4vLyAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuLy8gICAgICAgICAgICAgfSxcbi8vICAgICAgICAgICAgIC4uLihleHRyYU9wdGlvbnMgfHwge30pXG4vLyAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuLy8gICAgICAgICAgICAgICAgIGlmICghcmVzLm9rKSB0aHJvdyBuZXcgRXJyb3IoJ0FQSSBlcnJvcicpO1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpO1xuLy8gICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0FQSSByZXF1ZXN0IGZhaWxlZDonLCBlcnIpO1xuLy9cbi8vICAgICAgICAgICAgICAgICByZXBvcnRFcnJvcihlcnIpO1xuLy9cbi8vICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbi8vICAgICAgICAgICAgIH0pO1xuLy9cbi8vICAgICB9XG4vL1xuLy8gICAgIGZ1bmN0aW9uIGhpZGVMb2FkZXIoKXtcbi8vICAgICAgICAgbG9hZGVyLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpXG4vLyAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSBcImF1dG9cIlxuLy8gICAgICAgICBtYWluUGFnZS5jbGFzc0xpc3QucmVtb3ZlKFwibG9hZGluZ1wiKVxuLy8gICAgIH1cbi8vXG4vLyAgICAgZnVuY3Rpb24gY2hlY2tVc2VyQXV0aCgpIHtcbi8vICAgICAgICAgaWYgKHVzZXJJZCkge1xuLy8gICAgICAgICAgICAgZm9yIChjb25zdCB1bmF1dGhNZXMgb2YgdW5hdXRoTXNncykge1xuLy8gICAgICAgICAgICAgICAgIHVuYXV0aE1lcy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICByZXR1cm4gcmVxdWVzdChgL3Byb21vdXNlci8ke3VzZXJJZH0/bm9jYWNoZT0xYClcbi8vICAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuLy8gICAgICAgICAgICAgICAgICAgICBpZiAocmVzLnVzZXJpZCkge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljaXBhdGVCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKSk7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjdEJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpKTtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGlzVmVyaWZpZWRVc2VyID0gdHJ1ZTtcbi8vICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJykpO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY3RCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKSk7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBpc1ZlcmlmaWVkVXNlciA9IGZhbHNlO1xuLy8gICAgICAgICAgICAgICAgICAgICB9XG4vL1xuLy8gICAgICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICBmb3IgKGxldCByZWRpcmVjdEJ0biBvZiByZWRpcmVjdEJ0bnMpIHtcbi8vICAgICAgICAgICAgICAgICByZWRpcmVjdEJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICBmb3IgKGxldCBwYXJ0aWNpcGF0ZUJ0biBvZiBwYXJ0aWNpcGF0ZUJ0bnMpIHtcbi8vICAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICBmb3IgKGNvbnN0IHVuYXV0aE1lcyBvZiB1bmF1dGhNc2dzKSB7XG4vLyAgICAgICAgICAgICAgICAgdW5hdXRoTWVzLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbi8vICAgICAgICAgICAgIH1cbi8vXG4vLyAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZhbHNlKTtcbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vXG4vLyAgICAgZnVuY3Rpb24gcGFydGljaXBhdGUoKSB7XG4vLyAgICAgICAgIGlmICghdXNlcklkKSB7XG4vLyAgICAgICAgICAgICByZXR1cm47XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgY29uc3QgcGFyYW1zID0geyB1c2VyaWQ6IHVzZXJJZCB9O1xuLy8gICAgICAgICBmZXRjaChhcGlVUkwgKyAnL3VzZXIvJywge1xuLy8gICAgICAgICAgICAgaGVhZGVyczoge1xuLy8gICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4vLyAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuLy8gICAgICAgICAgICAgfSxcbi8vICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuLy8gICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGFyYW1zKVxuLy8gICAgICAgICB9KS50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuLy8gICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbi8vICAgICAgICAgICAgICAgICBsb2FkZXJCdG4gPSB0cnVlXG4vLyAgICAgICAgICAgICAgICAgdG9nZ2xlQ2xhc3NlcyhwYXJ0aWNpcGF0ZUJ0bnMsIFwibG9hZGVyXCIpXG4vLyAgICAgICAgICAgICAgICAgdG9nZ2xlVHJhbnNsYXRlcyhwYXJ0aWNpcGF0ZUJ0bnMsIFwibG9hZGVyXCIpXG4vLyAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9Pntcbi8vICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlVHJhbnNsYXRlcyhwYXJ0aWNpcGF0ZUJ0bnMsIFwibG9hZGVyX3JlYWR5XCIpXG4vLyAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZUNsYXNzZXMocGFydGljaXBhdGVCdG5zLCBcImRvbmVcIilcbi8vICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlQ2xhc3NlcyhwYXJ0aWNpcGF0ZUJ0bnMsIFwibG9hZGVyXCIpXG4vLyAgICAgICAgICAgICAgICAgfSwgNTAwKVxuLy8gICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9Pntcbi8vICAgICAgICAgICAgICAgICAgICAgY2hlY2tVc2VyQXV0aCgpXG4vLyAgICAgICAgICAgICAgICAgICAgIGxvYWRVc2VycyhcIj9ub2NhY2hlPTFcIikudGhlbihyZXMgPT4ge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyVXNlcnMoYWN0aXZlV2VlaywgdGFibGVEYXRhKVxuLy8gICAgICAgICAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgICAgIH0sIDEwMDApXG4vL1xuLy8gICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0FQSSByZXF1ZXN0IGZhaWxlZDonLCBlcnIpO1xuLy9cbi8vICAgICAgICAgICAgICAgICByZXBvcnRFcnJvcihlcnIpO1xuLy9cbi8vICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbi8vICAgICAgICAgICAgIH0pO1xuLy8gICAgIH1cbi8vICAgICBmdW5jdGlvbiBsb2FkVXNlcnMocGFyYW1ldHIpIHtcbi8vICAgICAgICAgY29uc3QgcmVxdWVzdHMgPSBbXTtcbi8vICAgICAgICAgdGFibGVEYXRhLmxlbmd0aCA9IDBcbi8vICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gcGVyaW9kQW1vdW50OyBpKyspIHtcbi8vICAgICAgICAgICAgIGNvbnN0IHdlZWsgPSBpOyAvLyDQsNCx0L4g0LHRg9C00Ywt0Y/QutCwINC70L7Qs9GW0LrQsCDQtNC70Y8g0YTQvtGA0LzRg9Cy0LDQvdC90Y8g0L3QvtC80LXRgNCwINGC0LjQttC90Y9cbi8vICAgICAgICAgICAgIGNvbnN0IHJlcSA9IHJlcXVlc3QoYC91c2Vycy8ke3dlZWt9JHtwYXJhbWV0ciA/IHBhcmFtZXRyIDogXCJcIn1gKS50aGVuKGRhdGEgPT4ge1xuLy8gICAgICAgICAgICAgICAgIHRhYmxlRGF0YS5wdXNoKHsgd2VlaywgZGF0YTogZGF0YSB9KTtcbi8vICAgICAgICAgICAgICAgICBpZighYWN0aXZlV2Vlayl7XG4vLyAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZVdlZWsgPSBkYXRhLmFjdGl2ZVN0YWdlTnVtYmVyXG4vLyAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgIGlzUHJvbW9PdmVyID0gZGF0YS5pc1Byb21vT3ZlclxuLy8gICAgICAgICAgICAgfSk7XG4vL1xuLy8gICAgICAgICAgICAgcmVxdWVzdHMucHVzaChyZXEpO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIC8vIHJlbmRlclVzZXJzKGFjdGl2ZVdlZWssIHJlcXVlc3RzKTtcbi8vXG4vLyAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChyZXF1ZXN0cylcbi8vICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgbG9hZGluZyB1c2VyczonLCBlcnJvcik7XG4vLyAgICAgICAgICAgICB9KTtcbi8vICAgICB9XG4vL1xuLy8gICAgIGZ1bmN0aW9uIHJlcG9ydEVycm9yKGVycikge1xuLy8gICAgICAgICBjb25zdCByZXBvcnREYXRhID0ge1xuLy8gICAgICAgICAgICAgb3JpZ2luOiB3aW5kb3cubG9jYXRpb24uaHJlZixcbi8vICAgICAgICAgICAgIHVzZXJpZDogdXNlcklkLFxuLy8gICAgICAgICAgICAgZXJyb3JUZXh0OiBlcnI/LmVycm9yIHx8IGVycj8udGV4dCB8fCBlcnI/Lm1lc3NhZ2UgfHwgJ1Vua25vd24gZXJyb3InLFxuLy8gICAgICAgICAgICAgdHlwZTogZXJyPy5uYW1lIHx8ICdVbmtub3duRXJyb3InLFxuLy8gICAgICAgICAgICAgc3RhY2s6IGVycj8uc3RhY2sgfHwgJydcbi8vICAgICAgICAgfTtcbi8vXG4vLyAgICAgICAgIGZldGNoKCcnLCB7XG4vLyAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbi8vICAgICAgICAgICAgIGhlYWRlcnM6IHtcbi8vICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4vLyAgICAgICAgICAgICB9LFxuLy8gICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVwb3J0RGF0YSlcbi8vICAgICAgICAgfSkuY2F0Y2goY29uc29sZS53YXJuKTtcbi8vICAgICB9XG4vL1xuLy8gICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZSgpIHtcbi8vICAgICAgICAgY29uc3QgZWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10cmFuc2xhdGVdJylcbi8vICAgICAgICAgaWYgKGVsZW1zICYmIGVsZW1zLmxlbmd0aCkge1xuLy9cbi8vICAgICAgICAgICAgIGlmKHRyYW5zbGF0ZVN0YXRlKXtcbi8vICAgICAgICAgICAgICAgICBlbGVtcy5mb3JFYWNoKGVsZW0gPT4ge1xuLy8gICAgICAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBlbGVtLmdldEF0dHJpYnV0ZSgnZGF0YS10cmFuc2xhdGUnKTtcbi8vICAgICAgICAgICAgICAgICAgICAgZWxlbS5pbm5lckhUTUwgPSBpMThuRGF0YVtrZXldIHx8ICcqLS0tLU5FRUQgVE8gQkUgVFJBTlNMQVRFRC0tLS0qICAga2V5OiAgJyArIGtleTtcbi8vICAgICAgICAgICAgICAgICAgICAgaWYgKGkxOG5EYXRhW2tleV0pIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0ucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScpO1xuLy8gICAgICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgIH1lbHNle1xuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidHJhbnNsYXRpb24gd29ya3MhXCIpXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgaWYgKGxvY2FsZSA9PT0gJ2VuJykge1xuLy8gICAgICAgICAgICAgbWFpblBhZ2UuY2xhc3NMaXN0LmFkZCgnZW4nKTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICByZWZyZXNoTG9jYWxpemVkQ2xhc3MoKTtcbi8vXG4vLyAgICAgfVxuLy9cbi8vICAgICBmdW5jdGlvbiByZWZyZXNoTG9jYWxpemVkQ2xhc3MoZWxlbWVudCwgYmFzZUNzc0NsYXNzKSB7XG4vLyAgICAgICAgIGlmICghZWxlbWVudCkge1xuLy8gICAgICAgICAgICAgcmV0dXJuO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGZvciAoY29uc3QgbGFuZyBvZiBbJ3VrJywgJ2VuJ10pIHtcbi8vICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShiYXNlQ3NzQ2xhc3MgKyBsYW5nKTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoYmFzZUNzc0NsYXNzICsgbG9jYWxlKTtcbi8vICAgICB9XG4vL1xuLy8gICAgIGZ1bmN0aW9uIHJlbmRlclVzZXJzKHdlZWtOdW0sIHVzZXJEYXRhID0gW10pIHtcbi8vICAgICAgICAgd2Vla051bSA9IE51bWJlcih3ZWVrTnVtKTtcbi8vICAgICAgICAgY29uc3Qgd2Vla09iaiA9IHVzZXJEYXRhLmZpbmQodyA9PiB3LndlZWsgPT09IHdlZWtOdW0pO1xuLy8gICAgICAgICBpZiAoIXdlZWtPYmogfHwgIXdlZWtPYmouZGF0YSB8fCAhQXJyYXkuaXNBcnJheSh3ZWVrT2JqLmRhdGEudXNlcnMpKSB7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCfQndC10LLRltGA0L3QsCDRgdGC0YDRg9C60YLRg9GA0LAg0LTQsNC90LjRhScpO1xuLy8gICAgICAgICAgICAgcmV0dXJuO1xuLy8gICAgICAgICB9XG4vL1xuLy8gICAgICAgICBjb25zdCBpc1N0YWdlRW5kZWQgPSB3ZWVrT2JqLmRhdGEuaXNTdGFnZUVuZGVkXG4vL1xuLy8gICAgICAgICB1c2VyRGF0YSA9IHdlZWtPYmouZGF0YS51c2Vycztcbi8vXG4vL1xuLy8gICAgICAgICBjb25zdCBjdXJyZW50VXNlciA9IHVzZXJEYXRhLmZpbmQodXNlciA9PiB1c2VyLnVzZXJpZCA9PT0gdXNlcklkKTtcbi8vXG4vLyAgICAgICAgIGlmKHVzZXJJZCAmJiAhY3VycmVudFVzZXIgJiYgaXNWZXJpZmllZFVzZXIpe1xuLy8gICAgICAgICAgICAgdXNlckRhdGEgPSBbLi4udXNlckRhdGEsIHt1c2VyaWQ6IHVzZXJJZCwgcG9pbnRzOiAwfV1cbi8vICAgICAgICAgfVxuLy8gICAgICAgICBwb3B1bGF0ZVVzZXJzVGFibGUodXNlckRhdGEsIHVzZXJJZCwgd2Vla051bSwgY3VycmVudFVzZXIsIGlzVmVyaWZpZWRVc2VyLCBpc1N0YWdlRW5kZWQpO1xuLy8gICAgIH1cbi8vXG4vLyAgICAgZnVuY3Rpb24gcG9wdWxhdGVVc2Vyc1RhYmxlKHVzZXJzLCBjdXJyZW50VXNlcklkLCB3ZWVrLCBjdXJyZW50VXNlciwgaXNWZXJpZmllZFVzZXIsIGlzU3RhZ2VFbmRlZCkge1xuLy8gICAgICAgICBpZiAoIXVzZXJzPy5sZW5ndGgpIHJldHVybjtcbi8vICAgICAgICAgcmVzdWx0c1RhYmxlLmlubmVySFRNTCA9ICcnO1xuLy8gICAgICAgICByZXN1bHRzVGFibGVPdGhlci5pbm5lckhUTUwgPSAnJztcbi8vXG4vLyAgICAgICAgIGNvbnN0IGlzVG9wQ3VycmVudFVzZXIgPSBjdXJyZW50VXNlciAmJiB1c2Vycy5zbGljZSgwLCAxMCkuc29tZSh1c2VyID0+IHVzZXIudXNlcmlkID09PSBjdXJyZW50VXNlcklkKTtcbi8vXG4vLyAgICAgICAgIGNvbnN0IHRvcFVzZXJzTGVuZ3RoID0gIWN1cnJlbnRVc2VyIHx8IGlzVG9wQ3VycmVudFVzZXIgPyAxMyA6IDEwO1xuLy9cbi8vICAgICAgICAgY29uc3QgdG9wVXNlcnMgPSB1c2Vycy5zbGljZSgwLCB0b3BVc2Vyc0xlbmd0aCk7XG4vL1xuLy8gICAgICAgICB0b3BVc2Vycy5mb3JFYWNoKHVzZXIgPT4ge1xuLy8gICAgICAgICAgICAgZGlzcGxheVVzZXIodXNlciwgdXNlci51c2VyaWQgPT09IGN1cnJlbnRVc2VySWQsIHJlc3VsdHNUYWJsZSwgdG9wVXNlcnMsIGlzVG9wQ3VycmVudFVzZXIsIHdlZWspO1xuLy8gICAgICAgICB9KTtcbi8vICAgICAgICAgaWYoaXNWZXJpZmllZFVzZXIgJiYgIWN1cnJlbnRVc2VyKSB7XG4vLyAgICAgICAgICAgICBkaXNwbGF5VXNlcihjdXJyZW50VXNlciwgdHJ1ZSwgcmVzdWx0c1RhYmxlT3RoZXIsIHVzZXJzLCBmYWxzZSwgd2Vlayk7XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgaWYgKCFpc1RvcEN1cnJlbnRVc2VyICYmIGN1cnJlbnRVc2VyKSB7XG4vLyAgICAgICAgICAgICBpc1ZlcmlmaWVkVXNlciA9IGZhbHNlO1xuLy8gICAgICAgICAgICAgZGlzcGxheVVzZXIoY3VycmVudFVzZXIsIHRydWUsIHJlc3VsdHNUYWJsZU90aGVyLCB1c2VycywgZmFsc2UsIHdlZWspO1xuLy8gICAgICAgICB9XG4vLyAgICAgfVxuLy9cbi8vICAgICBmdW5jdGlvbiBkaXNwbGF5VXNlcih1c2VyLCBpc0N1cnJlbnRVc2VyLCB0YWJsZSwgdXNlcnMsIGlzVG9wQ3VycmVudFVzZXIsIHdlZWspIHtcbi8vICAgICAgICAgY29uc3QgcmVuZGVyUm93ID0gKHVzZXJEYXRhLCBvcHRpb25zID0ge30pID0+IHtcbi8vICAgICAgICAgICAgIGNvbnN0IHsgaGlnaGxpZ2h0ID0gZmFsc2UsIG5laWdoYm9yID0gZmFsc2UgfSA9IG9wdGlvbnM7XG4vLyAgICAgICAgICAgICBjb25zdCB1c2VyUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4vLyAgICAgICAgICAgICB1c2VyUm93LmNsYXNzTGlzdC5hZGQoJ3RhYmxlX19yb3cnKTtcbi8vXG4vLyAgICAgICAgICAgICBjb25zdCB1c2VyUGxhY2UgPSB1c2Vycy5pbmRleE9mKHVzZXJEYXRhKSArIDE7XG4vLyAgICAgICAgICAgICBjb25zdCBwcml6ZUtleSA9IGRlYnVnID8gbnVsbCA6IGdldFByaXplVHJhbnNsYXRpb25LZXkodXNlckRhdGEucG9pbnRzLCB1c2VyUGxhY2UpO1xuLy9cbi8vXG4vLyAgICAgICAgICAgICBpZiAodXNlclBsYWNlIDw9IDMpIHtcbi8vICAgICAgICAgICAgICAgICB1c2VyUm93LmNsYXNzTGlzdC5hZGQoYHBsYWNlJHt1c2VyUGxhY2V9YCk7XG4vLyAgICAgICAgICAgICB9XG4vL1xuLy8gICAgICAgICAgICAgaWYgKGhpZ2hsaWdodCB8fCBpc0N1cnJlbnRVc2VyICYmICFuZWlnaGJvcikge1xuLy8gICAgICAgICAgICAgICAgIHVzZXJSb3cuY2xhc3NMaXN0LmFkZCgneW91Jyk7XG4vLyAgICAgICAgICAgICB9IGVsc2UgaWYgKG5laWdoYm9yKSB7XG4vLyAgICAgICAgICAgICAgICAgdXNlclJvdy5jbGFzc0xpc3QuYWRkKCdfbmVpZ2hib3InKTtcbi8vICAgICAgICAgICAgIH1cbi8vXG4vLyAgICAgICAgICAgICB1c2VyUm93LmlubmVySFRNTCA9IGBcbi8vICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlX19yb3ctaXRlbVwiPlxuLy8gICAgICAgICAgICAgICAgICR7dXNlclBsYWNlfVxuLy8gPCEtLSAgICAgICAgICAgICAgICAke3VzZXJQbGFjZSA8IDEwID8gJzAnICsgdXNlclBsYWNlIDogdXNlclBsYWNlfS0tPlxuLy8gICAgICAgICAgICAgICAgICR7aXNDdXJyZW50VXNlciAmJiAhbmVpZ2hib3IgPyAnPHNwYW4gY2xhc3M9XCJ5b3VcIj4nICsgdHJhbnNsYXRlS2V5KFwieW91XCIpICsgJzwvc3Bhbj4nIDogJyd9XG4vLyAgICAgICAgICAgICA8L2Rpdj5cbi8vICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZV9fcm93LWl0ZW1cIj5cbi8vICAgICAgICAgICAgICAgICAke2lzQ3VycmVudFVzZXIgJiYgIW5laWdoYm9yID8gdXNlckRhdGEudXNlcmlkIDogbWFza1VzZXJJZCh1c2VyRGF0YS51c2VyaWQpfVxuLy8gICAgICAgICAgICAgPC9kaXY+XG4vLyAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVfX3Jvdy1pdGVtXCI+XG4vLyAgICAgICAgICAgICAgICAke051bWJlcih1c2VyRGF0YS5wb2ludHMpLnRvRml4ZWQoMil9XG4vLyAgICAgICAgICAgICA8L2Rpdj5cbi8vICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZV9fcm93LWl0ZW1cIj5cbi8vICAgICAgICAgICAgICAgICAke3ByaXplS2V5ID8gdHJhbnNsYXRlS2V5KHByaXplS2V5KSA6ICcgLSAnfVxuLy8gICAgICAgICAgICAgPC9kaXY+XG4vLyAgICAgICAgIGA7XG4vL1xuLy8gICAgICAgICAgICAgdGFibGUuYXBwZW5kKHVzZXJSb3cpO1xuLy8gICAgICAgICB9O1xuLy8gICAgICAgICBpZiAoaXNDdXJyZW50VXNlciAmJiAhaXNUb3BDdXJyZW50VXNlcikge1xuLy8gICAgICAgICAgICAgY29uc3QgaW5kZXggPSB1c2Vycy5pbmRleE9mKHVzZXIpO1xuLy8gICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAxMCAmJiB1c2Vyc1tpbmRleCAtIDFdKSB7XG4vLyAgICAgICAgICAgICAgICAgcmVuZGVyUm93KHVzZXJzW2luZGV4IC0gMV0sIHsgbmVpZ2hib3I6IHRydWUgfSk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICByZW5kZXJSb3codXNlciwgeyBoaWdobGlnaHQ6IHRydWUgfSk7XG4vLyAgICAgICAgICAgICBpZiAodXNlcnNbaW5kZXggKyAxXSkge1xuLy8gICAgICAgICAgICAgICAgIHJlbmRlclJvdyh1c2Vyc1tpbmRleCArIDFdLCB7IG5laWdoYm9yOiB0cnVlIH0pO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgICAgcmVuZGVyUm93KHVzZXIpO1xuLy8gICAgICAgICB9XG4vLyAgICAgfVxuLy9cbi8vICAgICBmdW5jdGlvbiB0cmFuc2xhdGVLZXkoa2V5LCBkZWZhdWx0VmFsdWUpIHtcbi8vICAgICAgICAgaWYgKCFrZXkpIHtcbi8vICAgICAgICAgICAgIHJldHVybjtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBsZXQgbmVlZEtleSA9IGRlYnVnID8ga2V5IDogYCotLS0tTkVFRCBUTyBCRSBUUkFOU0xBVEVELS0tLSoga2V5OiAke2tleX1gXG4vL1xuLy8gICAgICAgICBkZWZhdWx0VmFsdWUgPSAgbmVlZEtleSB8fCBrZXk7XG4vLyAgICAgICAgIHJldHVybiBpMThuRGF0YVtrZXldIHx8IGRlZmF1bHRWYWx1ZTtcbi8vICAgICB9XG4vL1xuLy8gICAgIGZ1bmN0aW9uIG1hc2tVc2VySWQodXNlcklkKSB7XG4vLyAgICAgICAgIHJldHVybiBcIioqXCIgKyB1c2VySWQudG9TdHJpbmcoKS5zbGljZSgyKTtcbi8vICAgICB9XG4vL1xuLy8gICAgIGZ1bmN0aW9uIGdldFByaXplVHJhbnNsYXRpb25LZXkocG9pbnRzLCBwbGFjZSkge1xuLy8gICAgICAgICBpZiAocG9pbnRzID09IG51bGwgfHwgcG9pbnRzIDwgNSkgcmV0dXJuIG51bGw7XG4vLyAgICAgICAgIGlmIChwbGFjZSA+PSAxICYmIHBsYWNlIDw9IDUpIHJldHVybiBgcHJpemVfJHtwbGFjZX1gO1xuLy8gICAgICAgICBpZiAocGxhY2UgPj0gNiAmJiBwbGFjZSA8PSAxMCkgcmV0dXJuIGBwcml6ZV82LTEwYDtcbi8vICAgICAgICAgaWYgKHBsYWNlID49IDExICYmIHBsYWNlIDw9IDE1KSByZXR1cm4gYHByaXplXzExLTE1YDtcbi8vICAgICAgICAgaWYgKHBsYWNlID49IDE2ICYmIHBsYWNlIDw9IDIwKSByZXR1cm4gYHByaXplXzE2LTIwYDtcbi8vICAgICAgICAgaWYgKHBsYWNlID49IDIxICYmIHBsYWNlIDw9IDUwKSByZXR1cm4gYHByaXplXzIxLTUwYDtcbi8vICAgICAgICAgaWYgKHBsYWNlID49IDUxICYmIHBsYWNlIDw9IDEwMCkgcmV0dXJuIGBwcml6ZV81MS0xMDBgO1xuLy8gICAgIH1cbi8vXG4vLyAgICAgYXN5bmMgZnVuY3Rpb24gaW5pdCgpIHtcbi8vICAgICAgICAgbGV0IGF0dGVtcHRzID0gMDtcbi8vICAgICAgICAgY29uc3QgbWF4QXR0ZW1wdHMgPSAyMDtcbi8vICAgICAgICAgY29uc3QgYXR0ZW1wdEludGVydmFsID0gNTA7XG4vL1xuLy8gICAgICAgICBmdW5jdGlvbiB0cnlEZXRlY3RVc2VySWQoKSB7XG4vLyAgICAgICAgICAgICBpZiAod2luZG93LnN0b3JlKSB7XG4vLyAgICAgICAgICAgICAgICAgY29uc3Qgc3RhdGUgPSB3aW5kb3cuc3RvcmUuZ2V0U3RhdGUoKTtcbi8vICAgICAgICAgICAgICAgICB1c2VySWQgPSBzdGF0ZS5hdXRoLmlzQXV0aG9yaXplZCAmJiBzdGF0ZS5hdXRoLmlkIHx8ICcnO1xuLy8gICAgICAgICAgICAgfSBlbHNlIGlmICh3aW5kb3cuZ191c2VyX2lkKSB7XG4vLyAgICAgICAgICAgICAgICAgdXNlcklkID0gd2luZG93LmdfdXNlcl9pZDtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfVxuLy9cbi8vICAgICAgICAgZnVuY3Rpb24gcXVpY2tDaGVja0FuZFJlbmRlcigpIHtcbi8vICAgICAgICAgICAgIGNoZWNrVXNlckF1dGgoKVxuLy8gICAgICAgICAgICAgICAgIC50aGVuKGxvYWRVc2Vycylcbi8vICAgICAgICAgICAgICAgICAudGhlbigoKSA9Pntcbi8vICAgICAgICAgICAgICAgICAgICAgaWYoaXNQcm9tb092ZXIpe1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljaXBhdGVCdG5zLmZvckVhY2goZWwgPT4ge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2xvY2snKTtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjdEJ0bnMuZm9yRWFjaChlbCA9PiB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnbG9jaycpO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgICAgICAgICAgfVxuLy9cbi8vICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChoaWRlTG9hZGVyLCAzMDApO1xuLy9cbi8vICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YWJsZV9fdGFicy1pdGVtXCIpLmZvckVhY2goKHRhYiwgaSkgPT57XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB0YWIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBpZihpID09PSBhY3RpdmVXZWVrIC0gMSkgdGFiLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuLy8gICAgICAgICAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgICAgICAgICByZW5kZXJVc2VycyhhY3RpdmVXZWVrLCB0YWJsZURhdGEpXG4vLyAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRucy5mb3JFYWNoKGJ0biA9PiBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwYXJ0aWNpcGF0ZSkpO1xuLy9cbi8vICAgICAgICAgICAgICAgICAgICAgdGFibGVUYWJzLmZvckVhY2godGFiID0+e1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgaWYoTnVtYmVyKHRhYi5nZXRBdHRyaWJ1dGUoXCJkYXRhLXdlZWtcIikpID4gYWN0aXZlV2Vlayl7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJpbml0aWFsXCI7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB9XG4vL1xuLy8gICAgICAgICAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9Pntcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGUudGFyZ2V0LmNsb3Nlc3QoXCIudGFibGVfX3RhYnMtaXRlbVwiKSl7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoTnVtYmVyKGUudGFyZ2V0LmNsb3Nlc3QoXCIudGFibGVfX3RhYnMtaXRlbVwiKS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXdlZWtcIikpID4gYWN0aXZlV2Vlaykge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQuY2xvc2VzdChcIi50YWJsZV9fdGFicy1pdGVtXCIpLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImluaXRpYWxcIjtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJsZVRhYnMuZm9yRWFjaCh0YWIgPT57XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYi5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRhYldlZWsgPSBlLnRhcmdldC5jbG9zZXN0KFwiLnRhYmxlX190YWJzLWl0ZW1cIikuZ2V0QXR0cmlidXRlKFwiZGF0YS13ZWVrXCIpO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsb3Nlc3QoXCIudGFibGVfX3RhYnMtaXRlbVwiKS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlclVzZXJzKHRhYldlZWssIHRhYmxlRGF0YSlcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgICAgICB9KVxuLy8gICAgICAgICB9XG4vL1xuLy8gICAgICAgICBjb25zdCB3YWl0Rm9yVXNlcklkID0gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbi8vICAgICAgICAgICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuLy8gICAgICAgICAgICAgICAgIHRyeURldGVjdFVzZXJJZCgpO1xuLy8gICAgICAgICAgICAgICAgIGlmICh1c2VySWQgfHwgYXR0ZW1wdHMgPj0gbWF4QXR0ZW1wdHMpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgcXVpY2tDaGVja0FuZFJlbmRlcigpO1xuLy8gICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbi8vICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuLy8gICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICBhdHRlbXB0cysrO1xuLy8gICAgICAgICAgICAgfSwgYXR0ZW1wdEludGVydmFsKTtcbi8vICAgICAgICAgfSk7XG4vL1xuLy8gICAgICAgICBhd2FpdCB3YWl0Rm9yVXNlcklkO1xuLy8gICAgIH1cbi8vXG4vLyAgICAgZnVuY3Rpb24gbG9hZFRyYW5zbGF0aW9ucygpIHtcbi8vICAgICAgICAgcmV0dXJuIHJlcXVlc3QoYC9uZXctdHJhbnNsYXRlcy8ke2xvY2FsZX1gKVxuLy8gICAgICAgICAgICAgLnRoZW4oanNvbiA9PiB7XG4vLyAgICAgICAgICAgICAgICAgaTE4bkRhdGEgPSBqc29uO1xuLy8gICAgICAgICAgICAgICAgIHRyYW5zbGF0ZSgpO1xuLy8gICAgICAgICAgICAgfSk7XG4vLyAgICAgfVxuLy9cbi8vICAgICBsb2FkVHJhbnNsYXRpb25zKCkudGhlbihpbml0KVxuLy9cbi8vICAgICAvLyBpT1MgY3VzdG9tIHNjcm9sbGJhclxuLy8gICAgIGNvbnN0IGlzSU9TID0gKCgpID0+IHtcbi8vICAgICAgICAgY29uc3QgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50IHx8IG5hdmlnYXRvci52ZW5kb3IgfHwgd2luZG93Lm9wZXJhO1xuLy8gICAgICAgICBjb25zdCBpT1MgPSAvaVBhZHxpUGhvbmV8aVBvZC8udGVzdCh1YSkgJiYgIXdpbmRvdy5NU1N0cmVhbTtcbi8vICAgICAgICAgY29uc3QgaXNNb2Rlcm5JcGFkID0gbmF2aWdhdG9yLnBsYXRmb3JtID09PSAnTWFjSW50ZWwnICYmIG5hdmlnYXRvci5tYXhUb3VjaFBvaW50cyA+IDE7XG4vLyAgICAgICAgIHJldHVybiBpT1MgfHwgaXNNb2Rlcm5JcGFkO1xuLy8gICAgIH0pKCk7XG4vL1xuLy8gICAgIGZ1bmN0aW9uIGluaXRJT1NTY3JvbGxiYXJzKCkge1xuLy8gICAgICAgICBpZiAoIWlzSU9TKSByZXR1cm47XG4vL1xuLy8gICAgICAgICBjb25zdCBzY3JvbGxDb250YWluZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRyb3AtdHh0LWxpc3QsIC5zcGlucy1yb3ctc2Nyb2xsJyk7XG4vL1xuLy8gICAgICAgICBzY3JvbGxDb250YWluZXJzLmZvckVhY2goY29udGFpbmVyID0+IHtcbi8vICAgICAgICAgICAgIGlmIChjb250YWluZXIuZGF0YXNldC5pb3NTY3JvbGxiYXIpIHJldHVybjtcbi8vICAgICAgICAgICAgIGNvbnRhaW5lci5kYXRhc2V0Lmlvc1Njcm9sbGJhciA9ICd0cnVlJztcbi8vXG4vLyAgICAgICAgICAgICBjb250YWluZXIuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuLy9cbi8vICAgICAgICAgICAgIC8vIEhpZGUgbmF0aXZlIGlPUyBzY3JvbGxiYXIgdXNpbmcgb3ZlcmZsb3cgd3JhcHBlciB0ZWNobmlxdWVcbi8vICAgICAgICAgICAgIGNvbnRhaW5lci5zdHlsZS5tYXJnaW5SaWdodCA9ICctMjBweCc7XG4vLyAgICAgICAgICAgICBjb250YWluZXIuc3R5bGUucGFkZGluZ1JpZ2h0ID0gJzMwcHgnO1xuLy8gICAgICAgICAgICAgY29udGFpbmVyLnBhcmVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbi8vXG4vLyAgICAgICAgICAgICBjb25zdCB0cmFjayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuLy8gICAgICAgICAgICAgdHJhY2suY2xhc3NOYW1lID0gJ2lvcy1zY3JvbGxiYXItdHJhY2snO1xuLy9cbi8vICAgICAgICAgICAgIGNvbnN0IHRodW1iID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4vLyAgICAgICAgICAgICB0aHVtYi5jbGFzc05hbWUgPSAnaW9zLXNjcm9sbGJhci10aHVtYic7XG4vL1xuLy8gICAgICAgICAgICAgdHJhY2suYXBwZW5kQ2hpbGQodGh1bWIpO1xuLy8gICAgICAgICAgICAgY29udGFpbmVyLnBhcmVudEVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuLy8gICAgICAgICAgICAgY29udGFpbmVyLnBhcmVudEVsZW1lbnQuYXBwZW5kQ2hpbGQodHJhY2spO1xuLy9cbi8vICAgICAgICAgICAgIGZ1bmN0aW9uIHVwZGF0ZVRodW1iKCkge1xuLy8gICAgICAgICAgICAgICAgIGNvbnN0IHNjcm9sbEhlaWdodCA9IGNvbnRhaW5lci5zY3JvbGxIZWlnaHQ7XG4vLyAgICAgICAgICAgICAgICAgY29uc3QgY2xpZW50SGVpZ2h0ID0gY29udGFpbmVyLmNsaWVudEhlaWdodDtcbi8vICAgICAgICAgICAgICAgICBjb25zdCBzY3JvbGxUb3AgPSBjb250YWluZXIuc2Nyb2xsVG9wO1xuLy9cbi8vICAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsSGVpZ2h0IDw9IGNsaWVudEhlaWdodCkge1xuLy8gICAgICAgICAgICAgICAgICAgICB0cmFjay5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4vLyAgICAgICAgICAgICAgICAgfVxuLy9cbi8vICAgICAgICAgICAgICAgICB0cmFjay5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbi8vXG4vLyAgICAgICAgICAgICAgICAgY29uc3QgdGh1bWJIZWlnaHQgPSBNYXRoLm1heCgoY2xpZW50SGVpZ2h0IC8gc2Nyb2xsSGVpZ2h0KSAqIGNsaWVudEhlaWdodCwgMjApO1xuLy8gICAgICAgICAgICAgICAgIGNvbnN0IG1heFNjcm9sbFRvcCA9IHNjcm9sbEhlaWdodCAtIGNsaWVudEhlaWdodDtcbi8vICAgICAgICAgICAgICAgICBjb25zdCB0aHVtYlRvcCA9IChzY3JvbGxUb3AgLyBtYXhTY3JvbGxUb3ApICogKGNsaWVudEhlaWdodCAtIHRodW1iSGVpZ2h0KTtcbi8vXG4vLyAgICAgICAgICAgICAgICAgdGh1bWIuc3R5bGUuaGVpZ2h0ID0gdGh1bWJIZWlnaHQgKyAncHgnO1xuLy8gICAgICAgICAgICAgICAgIHRodW1iLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVZKCR7dGh1bWJUb3B9cHgpYDtcbi8vICAgICAgICAgICAgIH1cbi8vXG4vLyAgICAgICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdXBkYXRlVGh1bWIpO1xuLy9cbi8vICAgICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIodXBkYXRlVGh1bWIpO1xuLy8gICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShjb250YWluZXIsIHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH0pO1xuLy9cbi8vICAgICAgICAgICAgIHNldFRpbWVvdXQodXBkYXRlVGh1bWIsIDEwMCk7XG4vL1xuLy8gICAgICAgICAgICAgY29udGFpbmVyLmNsb3Nlc3QoJ2RldGFpbHMnKT8uYWRkRXZlbnRMaXN0ZW5lcigndG9nZ2xlJywgKCkgPT4ge1xuLy8gICAgICAgICAgICAgICAgIHNldFRpbWVvdXQodXBkYXRlVGh1bWIsIDUwKTtcbi8vICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICB9KTtcbi8vICAgICB9XG4vL1xuLy8gICAgIGluaXRJT1NTY3JvbGxiYXJzKCk7XG4vL1xuLy8gfSkoKTtcblxuLy8gUG9wdXBzOiDQstGB0ZYg0LIg0L7QtNC90L7QvNGDINCx0LvQvtGG0ZYgLnBvcHVwcywg0LLRltC00LrRgNC40YLRgtGPINC/0L4gZGF0YS1wb3B1cCwg0LfQsNC60YDQuNGC0YLRjyDQv9C+IC5wb3B1cHNfX2l0ZW0tY2xvc2VcbihmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgcG9wdXBXcmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwcycpO1xuICAgIGlmICghcG9wdXBXcmFwKSByZXR1cm47XG5cbiAgICBmdW5jdGlvbiBvcGVuUG9wdXBCeUF0dHIocG9wdXBBdHRyLCBwb3B1cENsYXNzKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICAgICAgY29uc3QgdGFyZ2V0UG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBbZGF0YS1wb3B1cD1cIicgKyBwb3B1cEF0dHIgKyAnXCJdJyk7XG4gICAgICAgIGlmICh0YXJnZXRQb3B1cCkge1xuICAgICAgICAgICAgdGFyZ2V0UG9wdXAuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICBwb3B1cFdyYXAuY2xhc3NMaXN0LnJlbW92ZSgnX29wYWNpdHknKTtcbiAgICAgICAgICAgIHBvcHVwV3JhcC5jbGFzc0xpc3QuYWRkKHBvcHVwQ2xhc3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xvc2VBbGxQb3B1cHMoKSB7XG4gICAgICAgIGNvbnN0IHBvcHVwc0NsYXNzID0gWydfbGV2ZWxMaWdodCcsICdfbGV2ZWxQcm8nLCAnX2xldmVsRXh0cmVtZScsICdfcmVtaW5kZXJJbmZvJ107XG4gICAgICAgIHBvcHVwV3JhcC5jbGFzc0xpc3QuYWRkKCdfb3BhY2l0eScpO1xuICAgICAgICBwb3B1cHNDbGFzcy5mb3JFYWNoKGZ1bmN0aW9uIChjbHMpIHtcbiAgICAgICAgICAgIHBvcHVwV3JhcC5jbGFzc0xpc3QucmVtb3ZlKGNscyk7XG4gICAgICAgIH0pO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucG9wdXAnKS5mb3JFYWNoKGZ1bmN0aW9uIChwKSB7XG4gICAgICAgICAgICBwLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICB9KTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdhdXRvJztcbiAgICB9XG5cbiAgICBwb3B1cFdyYXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoZS50YXJnZXQuY2xvc2VzdCgnLnBvcHVwc19faXRlbS1jbG9zZScpKSB7XG4gICAgICAgICAgICBjbG9zZUFsbFBvcHVwcygpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlLnRhcmdldCA9PT0gcG9wdXBXcmFwKSB7XG4gICAgICAgICAgICBjbG9zZUFsbFBvcHVwcygpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGNvbnN0IG9wZW5lciA9IGUudGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLXBvcHVwXScpO1xuICAgICAgICBpZiAoIW9wZW5lcikgcmV0dXJuO1xuICAgICAgICBpZiAob3BlbmVyLmNsYXNzTGlzdC5jb250YWlucygncG9wdXAnKSkgcmV0dXJuO1xuICAgICAgICBjb25zdCBhdHRyID0gb3BlbmVyLmRhdGFzZXQucG9wdXA7XG4gICAgICAgIGlmICghYXR0cikgcmV0dXJuO1xuICAgICAgICBjb25zdCBwb3B1cENsYXNzID0gJ18nICsgYXR0cjtcbiAgICAgICAgb3BlblBvcHVwQnlBdHRyKGF0dHIsIHBvcHVwQ2xhc3MpO1xuICAgIH0pO1xufSkoKTtcblxuLy8gPT09PT09PT09PSBMZXZlbHMgZGVjb3IgYW5pbWF0aW9uczogZmx5LW91dCBmcm9tIGNlbnRlciwgdGhlbiBsZXZpdGF0aW9uID09PT09PT09PT1cbihmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgREVDT1JfRkxZX09VVF9OQU1FUyA9IFtcbiAgICAgICAgJ2RlY29yRmx5T3V0QmFsbExlZnQnLFxuICAgICAgICAnZGVjb3JGbHlPdXRCYWxsUmlnaHQnLFxuICAgICAgICAnZGVjb3JGbHlPdXRTaHV0dGVyTGVmdCcsXG4gICAgICAgICdkZWNvckZseU91dFNodXR0ZXJSaWdodCdcbiAgICBdO1xuXG4gICAgY29uc3QgZGVjb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGV2ZWxzIC5kZWNvcicpO1xuICAgIGlmICghZGVjb3IpIHJldHVybjtcblxuICAgIGNvbnN0IGZpbmlzaGVkRmx5T3V0ID0gbmV3IFNldCgpO1xuXG4gICAgZnVuY3Rpb24gb25GbHlPdXRFbmQoZSkge1xuICAgICAgICBpZiAoIURFQ09SX0ZMWV9PVVRfTkFNRVMuaW5jbHVkZXMoZS5hbmltYXRpb25OYW1lKSkgcmV0dXJuO1xuICAgICAgICBmaW5pc2hlZEZseU91dC5hZGQoZS5hbmltYXRpb25OYW1lKTtcbiAgICAgICAgaWYgKGZpbmlzaGVkRmx5T3V0LnNpemUgPT09IERFQ09SX0ZMWV9PVVRfTkFNRVMubGVuZ3RoKSB7XG4gICAgICAgICAgICBkZWNvci5jbGFzc0xpc3QuYWRkKCdkZWNvci1sZXZpdGF0ZScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVjb3IuYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgb25GbHlPdXRFbmQpO1xufSkoKTtcblxuLy8gPT09PT09PT09PSBQcm9ncmVzcyBiZXRzOiBydW4gY2FyZCBhbmltYXRpb24gb25seSB3aGVuIC5wcm9ncmVzcyBsb3NlcyAuaGlkZSA9PT09PT09PT09XG4oZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHByb2dyZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2dyZXNzJyk7XG4gICAgY29uc3QgYmV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9ncmVzc19fYmV0cycpO1xuICAgIGlmICghcHJvZ3Jlc3MgfHwgIWJldHMpIHJldHVybjtcblxuICAgIGZ1bmN0aW9uIHJ1bkJldHNBbmltYXRpb24oKSB7XG4gICAgICAgIGlmICghcHJvZ3Jlc3MuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRlJykpIHtcbiAgICAgICAgICAgIGJldHMuY2xhc3NMaXN0LmFkZCgncHJvZ3Jlc3NfX2JldHMtLWFuaW1hdGUnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJ1bkJldHNBbmltYXRpb24oKTtcblxuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9ucykge1xuICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAobSkge1xuICAgICAgICAgICAgaWYgKG0uYXR0cmlidXRlTmFtZSA9PT0gJ2NsYXNzJykge1xuICAgICAgICAgICAgICAgIHJ1bkJldHNBbmltYXRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShwcm9ncmVzcywgeyBhdHRyaWJ1dGVzOiB0cnVlIH0pO1xufSkoKTtcblxuLy90ZXN0XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWVudS1idG5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWVudS10ZXN0XCIpLmNsYXNzTGlzdC50b2dnbGUoXCJoaWRlXCIpXG59KVxuXG5jb25zdCBMRVZFTF9DTEFTU19NQVAgPSB7XG4gICAgZWFzeTogXCJfbGlnaHRcIixcbiAgICBtZWRpdW06IFwiX3Byb1wiLFxuICAgIGhpZ2h0OiBcIl9leHRyZW1lXCJcbn07XG5cbmZ1bmN0aW9uIGFwcGx5TGV2ZWxTZWxlY3Rpb24obGV2ZWxUeXBlKSB7XG4gICAgY29uc3Qgc2VsZWN0ZWRMZXZlbENsYXNzID0gTEVWRUxfQ0xBU1NfTUFQW2xldmVsVHlwZV07XG4gICAgaWYgKCFzZWxlY3RlZExldmVsQ2xhc3MpIHJldHVybjtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGV2ZWxzLmNvbnRcIik/LmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZ3Jlc3NcIik/LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9ncmVzc19fbGVmdFwiKS5mb3JFYWNoKChsZWZ0QmxvY2spID0+IHtcbiAgICAgICAgaWYgKGxlZnRCbG9jay5jbGFzc0xpc3QuY29udGFpbnMoc2VsZWN0ZWRMZXZlbENsYXNzKSkge1xuICAgICAgICAgICAgbGVmdEJsb2NrLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGVmdEJsb2NrLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBwcm9ncmVzc0JldHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2dyZXNzX19iZXRzXCIpO1xuICAgIGlmIChwcm9ncmVzc0JldHMpIHtcbiAgICAgICAgcHJvZ3Jlc3NCZXRzLmNsYXNzTGlzdC5yZW1vdmUoXCJfbGlnaHRcIiwgXCJfcHJvXCIsIFwiX2V4dHJlbWVcIik7XG4gICAgICAgIHByb2dyZXNzQmV0cy5jbGFzc0xpc3QuYWRkKHNlbGVjdGVkTGV2ZWxDbGFzcyk7XG4gICAgfVxuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXN1bHRzLmNvbnRcIik/LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpO1xufVxuXG5mdW5jdGlvbiBydW5MZWdhY3lMZXZlbFVJKGxldmVsQ2xhc3MpIHtcbiAgICBpZiAodHlwZW9mIGRpZmZpY3VsdHMgIT09IFwidW5kZWZpbmVkXCIgJiYgQXJyYXkuaXNBcnJheShkaWZmaWN1bHRzKSAmJiB0eXBlb2YgbWFpblBhZ2UgIT09IFwidW5kZWZpbmVkXCIgJiYgbWFpblBhZ2UpIHtcbiAgICAgICAgZGlmZmljdWx0cy5mb3JFYWNoKChjc3MpID0+IHtcbiAgICAgICAgICAgIG1haW5QYWdlLmNsYXNzTGlzdC5yZW1vdmUoY3NzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgICB0eXBlb2YgdG9nZ2xlQmxvY2tzID09PSBcImZ1bmN0aW9uXCIgJiZcbiAgICAgICAgdHlwZW9mIGNob3NlQmxvY2sgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgdHlwZW9mIHJlc3VsdEJsb2NrICE9PSBcInVuZGVmaW5lZFwiXG4gICAgKSB7XG4gICAgICAgIHRvZ2dsZUJsb2NrcyhjaG9zZUJsb2NrLCBcImNob3NlSGlkZVwiLCByZXN1bHRCbG9jaywgXCJyZXN1bHRTaG93XCIsIGxldmVsQ2xhc3MsIHRydWUpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgbG9hZGVyICE9PSBcInVuZGVmaW5lZFwiICYmIGxvYWRlcikge1xuICAgICAgICBsb2FkZXIuY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9IFwiYXV0b1wiO1xuXG4gICAgaWYgKHR5cGVvZiBtYWluUGFnZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBtYWluUGFnZSkge1xuICAgICAgICBtYWluUGFnZS5jbGFzc0xpc3QucmVtb3ZlKFwibG9hZGluZ1wiKTtcbiAgICB9XG59XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGlnaHQtYnRuXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICBhcHBseUxldmVsU2VsZWN0aW9uKFwiaGlnaHRcIik7XG4gICAgcnVuTGVnYWN5TGV2ZWxVSShcIl9oaWdodFwiKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudW5hdXRoLW1zZywgLnBhcnQtYnRuJykuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICB9KTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4tam9pbicpLmZvckVhY2goZWwgPT4ge1xuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgfSk7XG59KVxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lYXN5LWJ0blwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgYXBwbHlMZXZlbFNlbGVjdGlvbihcImVhc3lcIik7XG4gICAgcnVuTGVnYWN5TGV2ZWxVSShcIl9lYXN5XCIpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy51bmF1dGgtbXNnLCAucGFydC1idG4nKS5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIH0pO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJ0bi1qb2luJykuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICB9KTtcbn0pXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1lZGl1bS1idG5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgIGFwcGx5TGV2ZWxTZWxlY3Rpb24oXCJtZWRpdW1cIik7XG4gICAgcnVuTGVnYWN5TGV2ZWxVSShcIl9tZWRpdW1cIik7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnVuYXV0aC1tc2csIC5wYXJ0LWJ0bicpLmZvckVhY2goZWwgPT4ge1xuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgfSk7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuLWpvaW4nKS5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIH0pO1xuXG59KVxuXG4vLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXV0aC1idG4nKT8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4vLyAgICAgY29uc3QgaGFzSWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1c2VySWQnKTtcbi8vICAgICBoYXNJZCA/IHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oJ3VzZXJJZCcpIDogc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgndXNlcklkJywgJzEwMDMwMDI2OCcpOyAvLyDQsNC50LTRltGI0LrRgyDQvdC1INC80ZbQvdGP0YLRjCFcbi8vICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbi8vIH0pO1xuXG4vLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXV0aC1idG4nKT8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4vLyAgICAgY29uc3QgaGFzSWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1c2VySWQnKTtcbi8vXG4vLyAgICAgaWYgKGhhc0lkKSB7XG4vLyAgICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oJ3VzZXJJZCcpO1xuLy8gICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKCdoaWRlUGFydEJ0bicpOyAvLyDRhNC70LDQttC+0Log0LHRltC70YzRiNC1INC90LUg0L/QvtGC0YDRltCx0LXQvVxuLy8gICAgIH0gZWxzZSB7XG4vLyAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3VzZXJJZCcsICcxMDAzMDAyNjgnKTsgLy8g0LDQudC00ZbRiNC60YMg0L3QtSDQvNGW0L3Rj9GC0YwhXG4vLyAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ2hpZGVQYXJ0QnRuJywgJ3RydWUnKTsgLy8g0LTQvtC00LDRlNC80L4g0YTQu9Cw0LbQvtC6XG4vLyAgICAgfVxuLy9cbi8vICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbi8vIH0pO1xuXG4vLyB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbi8vICAgICBjb25zdCBoYXNJZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3VzZXJJZCcpO1xuLy8gICAgIGNvbnN0IGhpZGVGbGFnID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnaGlkZVBhcnRCdG4nKTtcbi8vXG4vLyAgICAgaWYgKGhhc0lkICYmIGhpZGVGbGFnID09PSAndHJ1ZScpIHtcbi8vICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBhcnQtYnRuJykuZm9yRWFjaChlbCA9PiB7XG4vLyAgICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4vLyAgICAgICAgIH0pO1xuLy8gICAgIH1cbi8vIH0pO1xuXG4vLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxuZy1idG5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbi8vICAgICBjb25zdCBjdXJyZW50TG9jYWxlID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImxvY2FsZVwiKTtcbi8vXG4vLyAgICAgaWYgKGN1cnJlbnRMb2NhbGUgPT09IFwiZW5cIikge1xuLy8gICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFwibG9jYWxlXCIpO1xuLy8gICAgIH0gZWxzZSB7XG4vLyAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJsb2NhbGVcIiwgXCJlblwiKTtcbi8vICAgICB9XG4vL1xuLy8gICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuLy8gfSk7XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yYXRlLWJ0bicpLmZvckVhY2goYnRuID0+IHtcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IHRhcmdldEl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzdWx0X19iZXRzLWl0ZW0uc2hvd0l0ZW06bnRoLWNoaWxkKDEpJyk7XG4gICAgICAgIGlmICh0YXJnZXRJdGVtKSB7XG4gICAgICAgICAgICB0YXJnZXRJdGVtLmNsYXNzTGlzdC5hZGQoJ19mYWlsJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdGFyZ2V0SXRlbTIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzdWx0X19iZXRzLWl0ZW0uc2hvd0l0ZW06bnRoLWNoaWxkKDIpJyk7XG4gICAgICAgIGlmICh0YXJnZXRJdGVtMikge1xuICAgICAgICAgICAgdGFyZ2V0SXRlbTIuY2xhc3NMaXN0LmFkZCgnX2RvbmUnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0YXJnZXRJdGVtMyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXN1bHRfX2JldHMtaXRlbS5zaG93SXRlbTpudGgtY2hpbGQoMyknKTtcbiAgICAgICAgaWYgKHRhcmdldEl0ZW0zKSB7XG4gICAgICAgICAgICB0YXJnZXRJdGVtMy5jbGFzc0xpc3QuYWRkKCd5b3UnKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXN1bHRfX2JldHMteW91Jykuc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgICAgfVxuICAgIH0pO1xufSk7XG4iXX0=
