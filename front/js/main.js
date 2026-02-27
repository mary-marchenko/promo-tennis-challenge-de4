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
    const popupWrap = document.querySelector('.popups');
    if (!popupWrap) return;

    function openPopupByAttr(popupAttr, popupClass) {
        document.body.style.overflow = 'hidden';
        const targetPopup = document.querySelector('.popup[data-popup="' + popupAttr + '"]');
        if (targetPopup) {
            targetPopup.classList.add('active');
            popupWrap.classList.remove('_opacity');
            popupWrap.classList.add(popupClass);
        }
    }

    function closeAllPopups() {
        const popupsClass = ['_levelLight', '_levelPro', '_levelExtreme', '_reminderInfo'];
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
        const opener = e.target.closest('[data-popup]');
        if (!opener) return;
        if (opener.classList.contains('popup')) return;
        const attr = opener.dataset.popup;
        if (!attr) return;
        const popupClass = '_' + attr;
        openPopupByAttr(attr, popupClass);
    });
})();

// ========== Levels decor animations: fly-out from center, then levitation ==========
(function () {
    const DECOR_FLY_OUT_NAMES = [
        'decorFlyOutBallLeft',
        'decorFlyOutBallRight',
        'decorFlyOutShutterLeft',
        'decorFlyOutShutterRight'
    ];

    const decor = document.querySelector('.levels .decor');
    if (!decor) return;

    const finishedFlyOut = new Set();

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
    const progress = document.querySelector('.progress');
    const bets = document.querySelector('.progress__bets');
    if (!progress || !bets) return;

    function runBetsAnimation() {
        if (!progress.classList.contains('hide')) {
            bets.classList.add('progress__bets--animate');
        }
    }

    runBetsAnimation();

    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (m) {
            if (m.attributeName === 'class') {
                runBetsAnimation();
            }
        });
    });
    observer.observe(progress, { attributes: true });
})();

//test

document.querySelector(".menu-btn").addEventListener("click", () =>{
    document.querySelector(".menu-test").classList.toggle("hide")
})

const LEVEL_CLASS_MAP = {
    easy: "_light",
    medium: "_pro",
    hight: "_extreme"
};

function applyLevelSelection(levelType) {
    const selectedLevelClass = LEVEL_CLASS_MAP[levelType];
    if (!selectedLevelClass) return;

    document.querySelector(".levels.cont")?.classList.add("hide");
    document.querySelector(".progress")?.classList.remove("hide");

    document.querySelectorAll(".progress__left").forEach((leftBlock) => {
        if (leftBlock.classList.contains(selectedLevelClass)) {
            leftBlock.classList.remove("hide");
        } else {
            leftBlock.classList.add("hide");
        }
    });

    const progressBets = document.querySelector(".progress__bets");
    if (progressBets) {
        progressBets.classList.remove("_light", "_pro", "_extreme");
        progressBets.classList.add(selectedLevelClass);
    }

    document.querySelector(".results.cont")?.classList.remove("hide");
}

function runLegacyLevelUI(levelClass) {
    if (typeof difficults !== "undefined" && Array.isArray(difficults) && typeof mainPage !== "undefined" && mainPage) {
        difficults.forEach((css) => {
            mainPage.classList.remove(css);
        });
    }

    if (
        typeof toggleBlocks === "function" &&
        typeof choseBlock !== "undefined" &&
        typeof resultBlock !== "undefined"
    ) {
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

document.querySelector(".hight-btn").addEventListener("click", () =>{
    applyLevelSelection("hight");
    runLegacyLevelUI("_hight");
    document.querySelectorAll('.unauth-msg, .part-btn').forEach(el => {
        el.classList.add('hide');
    });

    document.querySelectorAll('.btn-join').forEach(el => {
        el.classList.remove('hide');
    });
})
document.querySelector(".easy-btn").addEventListener("click", () =>{
    applyLevelSelection("easy");
    runLegacyLevelUI("_easy");
    document.querySelectorAll('.unauth-msg, .part-btn').forEach(el => {
        el.classList.add('hide');
    });

    document.querySelectorAll('.btn-join').forEach(el => {
        el.classList.remove('hide');
    });
})
document.querySelector(".medium-btn").addEventListener("click", () =>{
    applyLevelSelection("medium");
    runLegacyLevelUI("_medium");
    document.querySelectorAll('.unauth-msg, .part-btn').forEach(el => {
        el.classList.add('hide');
    });

    document.querySelectorAll('.btn-join').forEach(el => {
        el.classList.remove('hide');
    });

})

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

document.querySelectorAll('.rate-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const targetItem = document.querySelector('.result__bets-item.showItem:nth-child(1)');
        if (targetItem) {
            targetItem.classList.add('_fail');
        }
        const targetItem2 = document.querySelector('.result__bets-item.showItem:nth-child(2)');
        if (targetItem2) {
            targetItem2.classList.add('_done');
        }
        const targetItem3 = document.querySelector('.result__bets-item.showItem:nth-child(3)');
        if (targetItem3) {
            targetItem3.classList.add('you');
            document.querySelector('.result__bets-you').style.opacity = '1';
        }
    });
});
