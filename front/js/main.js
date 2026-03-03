(function () {

    const apiURL = 'https://allwin-prom.pp.ua/api_sports_tennis_challenge'

    let isVerifiedUser = false;
    let periodAmount = 2 // кількість періодів в акції, треба для кешування інфи з табли
    let tableData = [];
    let activeWeek = null;
    let isPromoOver = false;

    const mainPage = document.querySelector(".tennisChallenge"),
        choseBlock = document.querySelector(".levels"),
        resultBlock = document.querySelector(".progress"),
        unauthMsgs = document.querySelectorAll('.unauth-msg'),
        participateBtns = document.querySelectorAll('.part-btn'),
        redirectBtns = document.querySelectorAll('.btn-join'),
        choseCards = document.querySelectorAll(".levels__card"),
        loader = document.querySelector(".spinner-overlay")

    // document.body.style.overflow = "hidden"

    const ukLeng = document.querySelector('#ukLeng');
    const enLeng = document.querySelector('#enLeng');

    const difficults = ["_light", "_pro", "_extreme"];
    const modeMap = {"novice": "_light", "experienced": "_pro", "insane": "_extreme", "_light": "novice", "_pro": "experienced", "_extreme": "insane"};
    const DEFAULT_UPDATED_AT = '21.01 16:30';

    // let locale = "uk"
    let locale = sessionStorage.getItem("locale") ?? "uk"

    if (ukLeng) locale = 'uk';
    if (enLeng) locale = 'en';

    let debug = false
    let inited = false;

    let i18nData = {};
    const translateState = true;

    // let userId = null
    let userId = sessionStorage.getItem('userId') || null;
    // userId = 403197114

    function participate(mode) {
        if (!userId || !mode) {
            return;
        }

        const params = {userid: userId, mode};
        request('/user', {
            method: 'POST',
            body: JSON.stringify(params)
        }).then(res => {
            participateBtns.forEach(item => item.classList.add('hide'));
            redirectBtns.forEach(item => item.classList.remove('hide'));
            const css = modeMap[mode];
            toggleBlocks(choseBlock, "choseHide", resultBlock, "resultShow", css, true);
        });
    }

    function translate() {
        const elems = document.querySelectorAll('[data-translate]')
        if (elems && elems.length) {
            if(translateState){
                elems.forEach(elem => {
                    const key = elem.getAttribute('data-translate');
                    elem.innerHTML = i18nData[key] || '*----NEED TO BE TRANSLATED----*   key:  ' + key;
                    elem.removeAttribute('data-translate');
                })
            }else{
                console.log("translation works!")
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
        let bets = userInfo.bets
        // let bets = [{betDate: new Date(), status: 'undefined'}]

        displayBetsHistory(bets);
        refreshLastUpdatedDate(userInfo);
        bets = userInfo.bets
            .sort((a, b) => new Date(b.betDate) - new Date(a.betDate))
            .slice(0, 10)
            .reverse();
        refreshBets(bets);
    }

    function refreshLastUpdatedDate(userInfo) {
        const dateContainer = document.querySelector('.progress__right-updated');
        if (!dateContainer) {
            return;
        }

        // Використовуємо єдиний span: або по id, або перший .upd у контейнері (щоб не дублювати)
        let span = dateContainer.querySelector('#lastUpd') || dateContainer.querySelector('.upd');
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

        const updateDate = userInfo?.lastUpdate || userInfo?.lastUpd || userInfo?.updatedAt || null;
        if (updateDate) {
            span.innerHTML = formatDate(updateDate);
        } else {
            span.innerHTML = DEFAULT_UPDATED_AT;
        }

        const mobileSpan = document.querySelector('.progress__updated-mob .upd');
        if (mobileSpan) {
            mobileSpan.innerHTML = updateDate ? formatDate(updateDate) : DEFAULT_UPDATED_AT;
        }
        // Keep visible for authorized user flow; fallback to template date when API has no timestamp yet.
        if (userInfo?.userid) {
            dateContainer.classList.remove('hide');
            return;
        }
        dateContainer.classList.add('hide');
    }

    function formatDate(date) {
        const localDate = new Date(date);
        const day = String(localDate.getDate()).padStart(2, '0');
        const month = String(localDate.getMonth() + 1).padStart(2, '0');
        const hours = String(localDate.getHours()).padStart(2, '0');
        const minutes = String(localDate.getMinutes()).padStart(2, '0');
        return `${day}.${month} ${hours}:${minutes}`;
    }

    function refreshBets(bets) {
        const divs = document.querySelectorAll('.progress__bets-item');
        for (let i = 0; i < bets.length; i++) {
            const element = divs[i];
            const bet = bets[i];
            element.classList.remove('you');
            element.classList.remove('_done');
            element.classList.remove('_fail');
            let status = '_fail';
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
        const spinItem = document.querySelector('.spins-row');
        const noSpinItem = document.querySelector('.no-spins');

        if (!Array.isArray(bets) || bets.length === 0) {
            if (!debug) {
                spinItem.classList.add('hide');
                noSpinItem.classList.remove('hide');
            }
            return;
        }

        bets = bets.sort((a, b) => new Date(b.betDate) - new Date(a.betDate));

        if(debug){
            bets = mockBets
        }


        spinItem.innerHTML =
            `
       <div class="spins-row-head">
            <div class="content-date" data-translate="myBetDate"></div>
            <div class="content-prize" data-translate="myBetPrize"></div>
            <div class="content-status" data-translate="myBetStatus"></div>
        </div>
        `;
        spinItem.classList.remove('hide');
        noSpinItem.classList.add('hide');

        let upd = 0;
        bets.forEach(spin => {
            const spinDate = new Date(spin.betDate);
            const formattedDate = spinDate.toLocaleDateString('uk-UA').slice(0, 5);
            const status = resolveStatusTranslation(spin.status);

            if (status) {
                const spinElement = document.createElement('div');
                spinElement.classList.add('spins-row-item');

                const isWin = spin.status === "win";
                const statusClass = isWin ? '_done' : '';

                spinElement.innerHTML = `
                    <span class="content-date">${formattedDate}</span>
                    <span class="content-prize">ID:${spin.betId}</span>
                    <span class="content-status ${statusClass}"></span>
                `;
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
        for (const lang of ['uk', 'en']) {
            element.classList.remove(baseCssClass + lang);
        }
        element.classList.add(baseCssClass + locale);
    }

    function reportError(err) {
        const reportData = {
            origin: window.location.href,
            userid: userId,
            errorText: err?.error || err?.text || err?.message || 'Unknown error',
            type: err?.name || 'UnknownError',
            stack: err?.stack || ''
        };

        fetch('', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reportData)
        }).catch(console.warn);
    }

    const request = function (link, extraOptions) {
        return fetch(apiURL + link, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            ...(extraOptions || {})
        })
            .then(res => {
                if (!res.ok) throw new Error('API error');
                return res.json();
            })
            .catch(err => {
                console.error('API request failed:', err);

                reportError(err);

                return Promise.reject(err);
            });

    }

    function checkUserAuth() {
        if (userId) {
            const levelInfoBtns = document.querySelectorAll(".levels__card-infoBtn");
            const progressInfoBtns = document.querySelectorAll(".progress__left-infoBtn");

            levelInfoBtns.forEach(el => {
                el.classList.remove("hide")
            });
            progressInfoBtns.forEach(el => {
                el.classList.add("hide");
            });
            for (const unauthMes of unauthMsgs) {
                unauthMes.classList.add('hide');
            }
            // for (const info of choseCardsInfo) {
            //     info.classList.remove('hide');
            // }
            return request(`/promouser/${userId}?nocache=1`)
                .then(res => {
                    if (res.userid) {
                        participateBtns.forEach(item => item.classList.add('hide'));
                        redirectBtns.forEach(item => item.classList.remove('hide'));
                        progressInfoBtns.forEach(el => {
                            el.classList.add("hide");
                        });
                        const css = modeMap[res.mode];
                        toggleBlocks(choseBlock, "choseHide", resultBlock, "resultShow", css, false);
                        displayUserInfo(res);
                    } else {
                        initChooseCards(choseCards);
                        participateBtns.forEach(item => item.classList.remove('hide'));
                        redirectBtns.forEach(item => item.classList.add('hide'));
                    }
                    loader.classList.add("hide")
                    document.body.style.overflow = "auto"
                    mainPage.classList.remove("loading")
                })

        } else {
            document.querySelectorAll(".levels__card-infoBtn, .progress__left-infoBtn").forEach(el => {
                el.classList.add("hide");
            });
            for (let participateBtn of participateBtns) {
                participateBtn.classList.add('hide');
            }
            for (const unauthMes of unauthMsgs) {
                unauthMes.classList.remove('hide');
            }
            // document.querySelectorAll(".chose__card-info").forEach(el => {
            //     el.classList.add("hide")
            // })
            loader.classList.add("hide")
            document.body.style.overflow = "auto"
            mainPage.classList.remove("loading")
            return Promise.resolve(false);
        }
    }

    function renderUsers() {
        if (debug) {
            populateUsersTable(mockUsers, userId);
            return;
        }

        request(`/users/`).then(data => {
            const user = data.find(user => user.userid === userId);
            const mode = user ? user.mode : null;
            const users = data.filter(user => user.mode === mode)
            populateUsersTable(users, userId);
        });
    }

    function populateUsersTable(users, currentUserId) {
        const youRow = document.querySelector('#tableOther');
        const tableBody = document.querySelector('#table');

        if (!users?.length || currentUserId === undefined) return;

        youRow.innerHTML = '';
        tableBody.innerHTML = '';

        users = users.sort((a, b) => b.winCount - a.winCount);


        users.forEach((user, index) => {
            const isCurrentUser = user.userid === currentUserId;
            let isTopUser = false

            if(index <= 5 && isCurrentUser){
                isTopUser = true
            }
            if(index >= 10 && !isCurrentUser) return

            displayUser(user, isCurrentUser, index + 1, isCurrentUser && !isTopUser ? youRow : tableBody);
        });
    }

    function displayUser(user, isCurrentUser, place, target) {
        const userIdDisplay = isCurrentUser ? user.userid : maskUserId(user.userid);
        const row = document.createElement('div');
        row.classList.add('table__row');


        if (isCurrentUser) {
            // Створення елементу 'you' та вставка його після елементу з місцем
            const youText = document.createElement('div');
            youText.classList.add('table__row-item', '_you-text');
            youText.setAttribute('data-translate', 'you');


            row.innerHTML = `
            <div class="table__row-item">${place}</div>
        `;

            // Додаємо "you" текст після місця
            row.appendChild(youText);

            // Потім додаємо userId та ставку
            const userIdDiv = document.createElement('div');
            userIdDiv.classList.add('table__row-item');
            userIdDiv.textContent = userIdDisplay;

            const betDiv = document.createElement('div');
            betDiv.classList.add('table__row-item');
            betDiv.textContent = user.winCount;

            row.appendChild(userIdDiv);
            row.appendChild(betDiv);

            row.classList.add('_you');
        } else {
            row.innerHTML = `
            <div class="table__row-item">${place}</div>
            <div class="table__row-item">${userIdDisplay}</div>
            <div class="table__row-item">${user.winCount}</div>
        `;


        }
        target.appendChild(row);
    }

    function maskUserId(userId) {
        return "****" + userId.toString().slice(4);
    }

    function initChooseCards(cards){
        if (inited) {
            return;
        }

        cards.forEach(card =>{
            card.addEventListener("click", (e) =>{
                if(e.target.classList.contains("info-icon")){
                    return
                }
                for (let i = 0; i < difficults.length; i++) {
                    const item = difficults[i];
                    if (card.classList.contains(item)) {
                        const mode = modeMap[item];
                        participate(mode);
                        setTimeout(() =>{
                            checkUserAuth()
                            renderUsers()
                        }, 200)
                        break;
                    }
                }
            })
        });
        inited = true;
    }

    function monitorVisibility(element, animationClass, delay) {
        if (!element) {
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setTimeout(() =>{
                        element.classList.add(animationClass)
                    }, delay);
                    observer.unobserve(entry.target)
                }
            });
        });

        observer.observe(element);
    }

    function toggleBlocks(hideBlock, hideClass, showBlock, showClass, state, animate){
        mainPage.classList.add(state, locale)
        hideBlock.classList.add(hideClass)
        let drops = showBlock.querySelectorAll(".drop")
        const progressLeftBlocks = showBlock.querySelectorAll(".progress__left");
        const levelDrops = showBlock.querySelectorAll(".drop._light, .drop._pro, .drop._extreme");

        progressLeftBlocks.forEach((leftBlock) => {
            if (leftBlock.classList.contains(state)) {
                leftBlock.classList.remove("hide");
            } else {
                leftBlock.classList.add("hide");
            }
        });

        const progressBets = showBlock.querySelector(".progress__bets");
        if (progressBets) {
            progressBets.classList.remove("_light", "_pro", "_extreme");
            progressBets.classList.add(state);
        }

        levelDrops.forEach((dropBlock) => {
            if (dropBlock.classList.contains(state)) {
                dropBlock.classList.remove("hide");
            } else {
                dropBlock.classList.add("hide");
            }
        });

        drops.forEach(item =>{
            difficults.forEach(state =>{
                item.classList.remove(state)
            })
        })
        drops[0].classList.add(state)
        const revealShowBlock = () => {
            showBlock.classList.remove("hide");
            showBlock.style.display = "flex"
            showBlock.style.height = hideBlock.clientHeight
            hideBlock.classList.add("hide")
            showResultBlock(showBlock, showClass)
            document.querySelector(".results.cont")?.classList.remove("hide");
        };

        if (animate) {
            let isRevealed = false;
            const revealOnce = () => {
                if (isRevealed) return;
                isRevealed = true;
                revealShowBlock();
            };

            // Legacy flow expected animationend, but current styles use transitions/no animation.
            hideBlock.addEventListener("animationend", revealOnce, {once: true});
            hideBlock.addEventListener("transitionend", revealOnce, {once: true});
            setTimeout(revealOnce, 1050);
        } else {
            revealShowBlock();
        }

    }

    function showResultBlock(showBlock, showClass){
        showBlock.classList.add(showClass)
        showBlock.style.height = "auto"
    }

    function animateProgressBetsItems(betsWrap) {
        if (!betsWrap) return;
        betsWrap.classList.remove("progress__bets--animate");
        void betsWrap.offsetWidth;
        betsWrap.classList.add("progress__bets--animate");
    }

    async function init() {
        let attempts = 0;
        const maxAttempts = 20;
        const attemptInterval = 50;

        function tryDetectUserId() {
            if (window.store) {
                const state = window.store.getState();
                userId = state.auth.isAuthorized && state.auth.id || '';
            } else if (window.g_user_id) {
                userId = window.g_user_id;
            }
            if(debug) userId = sessionStorage.getItem("userId") || null;
        }

        function quickCheckAndRender() {
            checkUserAuth();
            renderUsers();


            document.querySelectorAll(".toChose").forEach(function (btn) {
                btn.addEventListener('click', function (e) {
                    e.stopPropagation();

                    const targetElement = document.getElementById("chose");
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 2;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth',
                    });
                });
            });

            const cardLight = document.querySelector(".levels__card._light");
            const cardPro = document.querySelector(".levels__card._pro");
            const cardExtreme = document.querySelector(".levels__card._extreme");
            monitorVisibility(cardLight, "showCard", 400);
            monitorVisibility(cardPro, "showCard", 800);
            monitorVisibility(cardExtreme, "showCard", 1200);

        }

        const waitForUserId = new Promise((resolve) => {
            const interval = setInterval(() => {
                tryDetectUserId();
                if (userId || attempts >= maxAttempts) {
                    quickCheckAndRender();
                    clearInterval(interval);
                    resolve();
                }
                attempts++;
            }, attemptInterval);
        });

        await waitForUserId;
    }

    function loadTranslations() {
        return request(`/translates/${locale}`)
            .then(json => {
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
            e.preventDefault();
            e.stopPropagation();
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

    // ========== Progress bets: run item animation only when .progress loses .hide ==========
    (function () {
        const progress = document.querySelector('.progress');
        if (!progress) return;
        let wasHidden = progress.classList.contains('hide');

        function runBetsAnimation() {
            const isHidden = progress.classList.contains('hide');
            if (wasHidden && !isHidden) {
                const betsWrap = progress.querySelector('.progress__bets');
                animateProgressBetsItems(betsWrap);
            }
            wasHidden = isHidden;
        }

        if (!wasHidden) {
            const betsWrap = progress.querySelector('.progress__bets');
            animateProgressBetsItems(betsWrap);
        }

        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (m) {
                if (m.attributeName === 'class') {
                    runBetsAnimation();
                }
            });
        });
        observer.observe(progress, {attributes: true});
    })();

    //test

    document.querySelector(".menu-btn").addEventListener("click", () => {
        document.querySelector(".menu-test").classList.toggle("hide")
    })

    const LEVEL_CLASS_MAP = {
        easy: "_light",
        medium: "_pro",
        extreme: "_extreme"
    };

    function setNoSpinsTestState() {
        const noSpins = document.querySelector('.no-spins');
        const spinsRow = document.querySelector('.spins-row');
        noSpins?.classList.remove('hide');
        spinsRow?.classList.add('hide');
    }

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

        document.querySelectorAll(".progress .drop._light, .progress .drop._pro, .progress .drop._extreme").forEach((dropBlock) => {
            if (dropBlock.classList.contains(selectedLevelClass)) {
                dropBlock.classList.remove("hide");
            } else {
                dropBlock.classList.add("hide");
            }
        });

        document.querySelector(".results.cont")?.classList.remove("hide");
        setNoSpinsTestState();
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

    document.querySelector(".extreme-btn").addEventListener("click", () => {
        applyLevelSelection("extreme");
        runLegacyLevelUI("_extreme");
        document.querySelectorAll('.unauth-msg, .part-btn').forEach(el => {
            el.classList.add('hide');
        });

        document.querySelectorAll('.btn-join').forEach(el => {
            el.classList.remove('hide');
        });
    })
    document.querySelector(".easy-btn").addEventListener("click", () => {
        applyLevelSelection("easy");
        runLegacyLevelUI("_light");
        document.querySelectorAll('.unauth-msg, .part-btn').forEach(el => {
            el.classList.add('hide');
        });

        document.querySelectorAll('.btn-join').forEach(el => {
            el.classList.remove('hide');
        });
    })
    document.querySelector(".medium-btn").addEventListener("click", () => {
        applyLevelSelection("medium");
        runLegacyLevelUI("_pro");
        document.querySelectorAll('.unauth-msg, .part-btn').forEach(el => {
            el.classList.add('hide');
        });

        document.querySelectorAll('.btn-join').forEach(el => {
            el.classList.remove('hide');
        });

    })

    document.querySelector(".lng-btn").addEventListener("click", () => {
        const currentLocale = sessionStorage.getItem("locale");

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

    const defaultSpinsRowMarkup = document.querySelector('.spins-row')?.innerHTML || '';
    document.querySelector('.with-spins-btn')?.addEventListener('click', () => {
        const noSpins = document.querySelector('.no-spins');
        const spinsRow = document.querySelector('.spins-row');

        if (!spinsRow) return;

        if (defaultSpinsRowMarkup) {
            spinsRow.innerHTML = defaultSpinsRowMarkup;
        }
        spinsRow.classList.remove('hide');
        noSpins?.classList.add('hide');
    });

    document.querySelector('.auth-btn')?.addEventListener('click', () => {
        if(userId){
            sessionStorage.removeItem("userId")
        }else{
            sessionStorage.setItem("userId", "7")
        }
        window.location.reload()
    });

    window.addEventListener('DOMContentLoaded', () => {
        const hasId = sessionStorage.getItem('userId');
        const hideFlag = sessionStorage.getItem('hidePartBtn');

        if (hasId && hideFlag === 'true') {
            document.querySelectorAll('.part-btn').forEach(el => {
                el.classList.add('hide');
            });
        }
    });

    function ensureUpdatedPlaceholder(containerSelector) {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        let updSpan = container.querySelector('.upd');
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


    loadTranslations()
        .then(() => {
            applyUpdatedPlaceholders();
            return init();
        });





})();