function crtRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

(function() {
    // 全域變數：記錄 meow 出現次數
    let meowCount = 0;

    const cat = document.createElement("img");
    cat.className = "cat";
    cat.style.position = "fixed";
    cat.style.width = "150px";
    cat.style.height = "150px";
    cat.style.zIndex = 9999;
    document.body.appendChild(cat);

    const frames = [
        chrome.runtime.getURL("cat_1.1.1.png"),
        chrome.runtime.getURL("cat_1.1.2.png"),
        chrome.runtime.getURL("cat_1.1.3.png"),
        chrome.runtime.getURL("cat_1.1.4.png"),
        chrome.runtime.getURL("cat_1.1.5.png"),
        chrome.runtime.getURL("cat_1.1.6.png"),
        chrome.runtime.getURL("cat_1.1.7.png"),
        chrome.runtime.getURL("cat_1.1.8.png"),
        chrome.runtime.getURL("cat_1.1.9.png"),
        chrome.runtime.getURL("cat_1.1.10.png"),
        chrome.runtime.getURL("cat_1.1.11.png"),
        chrome.runtime.getURL("cat_1.1.12.png"),
        chrome.runtime.getURL("cat_1.1.13.png"),
        chrome.runtime.getURL("cat_1.1.14.png"),
        chrome.runtime.getURL("cat_1.1.15.png"),
        chrome.runtime.getURL("cat_1.1.16.png"),
        chrome.runtime.getURL("cat_1.1.17.png"),
        chrome.runtime.getURL("cat_1.1.18.png"),
        chrome.runtime.getURL("cat_1.1.19.png"),
        chrome.runtime.getURL("cat_1.1.20.png"),
        chrome.runtime.getURL("cat_1.1.21.png"),
        chrome.runtime.getURL("cat_1.1.22.png"),
        chrome.runtime.getURL("cat_1.1.23.png"),
        chrome.runtime.getURL("cat_1.1.24.png")
    ];

    let currentFrame = 0;
    const totalFrames = frames.length;
    const frameInterval = 83; // 每83毫秒換一張圖（動畫幀速度）

    // 連續播放動畫
    setInterval(() => {
        cat.src = frames[currentFrame];
        currentFrame = (currentFrame + 1) % totalFrames;
    }, frameInterval);

    // 移動控制參數
    let phase = "horizontal"; // "horizontal" 或 "vertical"
    let moveTimer;            // 控制移動的計時器
    let movesSinceStop = 0;                   // 從上次暫停以來已移動的次數
    let targetMoves = crtRandomNum(6, 8);       // 隨機設定6~8次後觸發暫停
    let touchMeActive = false;                // 是否正處於「摸我」暫停狀態
    let touchMeTimer = null;                  // 控制暫停持續時間的計時器
    let activeTouchBubble = null;             // 正在顯示的「touchme」對話泡
    let movespeed_1=20;
    let movespeed_2=50;
    // 重置小貓至起始位置（左下角）
    function resetCat() {
        if (moveTimer) {
            clearTimeout(moveTimer);
        }
        movesSinceStop = 0;
        targetMoves = crtRandomNum(6, 8);
        cat.style.left = "10px";
        cat.style.top = (window.innerHeight - 110) + "px";
        cat.classList.remove("face-right", "face-left", "face-down", "face-up");
        cat.classList.add("face-right");
        phase = "horizontal";
        scheduleNextMove();
    }

    // 安排下一次移動（若已達暫停次數則觸發暫停）
    function scheduleNextMove() {
        if (movesSinceStop >= targetMoves) {
            triggerTouchMePause();
            return;
        }
        const waitTime = crtRandomNum(200, 500);
        moveTimer = setTimeout(() => {
            if (phase === "horizontal") {
                horizontalMove();
            } else if (phase === "vertical") {
                verticalMove();
            }
        }, waitTime);
    }

    // 水平移動：沿底部向右
    function horizontalMove() {
        cat.classList.remove("face-right", "face-left", "face-down", "face-up");
        cat.classList.add("face-right");

        movesSinceStop++;
        const rect = cat.getBoundingClientRect();
        const maxRight = window.innerWidth - rect.width - 10;
        if (rect.left >= maxRight) {
            phase = "vertical";
            scheduleNextMove();
            return;
        }
        const distanceX = crtRandomNum(movespeed_1, movespeed_2);
        let newLeft = rect.left + distanceX;
        if (newLeft > maxRight) {
            newLeft = maxRight;
        }
        cat.style.left = newLeft + "px";
        cat.style.top = rect.top + "px";
        if (newLeft >= maxRight) {
            phase = "vertical";
        }
        scheduleNextMove();
    }

    // 垂直移動：沿右側向上
    function verticalMove() {
        cat.classList.remove("face-right", "face-left", "face-down", "face-up");
        cat.classList.add("face-up");

        movesSinceStop++;
        const rect = cat.getBoundingClientRect();
        const minTop = 10;
        const maxRight = window.innerWidth - rect.width - 10;
        cat.style.left = maxRight + "px";
        if (rect.top <= minTop) {
            triggerEndEffect();
            return;
        }
        const distanceY = crtRandomNum(movespeed_1, movespeed_2);
        let newTop = rect.top - distanceY;
        if (newTop < minTop) {
            newTop = minTop;
        }
        cat.style.top = newTop + "px";
        if (newTop <= minTop) {
            triggerEndEffect();
            return;
        }
        scheduleNextMove();
    }

    // 終點效果：觸發後貓咪消失，效果持續8秒，再恢復原狀
    function triggerEndEffect() {
        let time_return = 8000;
        cat.classList.remove("face-right", "face-left", "face-down", "face-up");
        cat.classList.add("face-right");
        const effectChoice = crtRandomNum(1, 5);
        if (effectChoice === 1) {
            document.body.style.transform = "scaleX(-1)";
        } else if (effectChoice === 2) {
            document.documentElement.style.filter = "invert(100%)";
        } else if (effectChoice === 3) {
            let P5=crtRandomNum(0,1);
            if(P5==0){
                window.location.href = "https://youtu.be/dQw4w9WgXcQ?si=A8JI-X5kD874TsFp";
            }
            else {
                window.location.href = "https://www.youtube.com/watch?v=f3MDGKw0wdg";
            }
            
            return;
        } else if (effectChoice === 4) {
            const blueScreen = document.createElement("div");
            blueScreen.className = "bluescreen";
            blueScreen.innerText = "你的貓咪blue了...為什麼要無視貓";
            document.body.appendChild(blueScreen);
        } else if(effectChoice===5){
            // 图片数组
            const images = [
                chrome.runtime.getURL("meme1_1.jpg"),
                chrome.runtime.getURL("meme1_2.jpg"),
                chrome.runtime.getURL("meme1_3.jpg"),
                chrome.runtime.getURL("meme1_4.jpg")
            ];
            console.log(images);
            let index = 0;
            function changeImage() {
                document.body.innerHTML = `
                <div style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%; position: absolute; top: 0; left: 0;background-color: black;">
                    <img src="${images[index]}" style="width: 90vw; height: auto; object-fit: cover;">
                </div>
                `;
                index = (index + 1) % images.length; // 循环轮播
            }
            changeImage(); // 先执行一次
            setInterval(changeImage, 2000); // 每 2 秒换一张
        }
        cat.style.display = "none";
        if (moveTimer) {
            clearTimeout(moveTimer);
        }
        setTimeout(() => {
            document.body.style.transform = "";
            document.documentElement.style.filter = "";
            const blueScreen = document.querySelector(".bluescreen");
            if (blueScreen) {
                blueScreen.remove();
            }
            cat.style.display = "block";
            resetCat();
        }, time_return);
    }

    // 暫停功能：每移動6~8次後暫停，顯示「touchme.png」對話泡
    function triggerTouchMePause() {
        touchMeActive = true;
        const touchBubble = document.createElement("img");
        touchBubble.src = chrome.runtime.getURL("touchme.png");
        touchBubble.style.position = "fixed";
        touchBubble.style.width = "100px";
        touchBubble.style.height = "100px";
        const rect = cat.getBoundingClientRect();
        touchBubble.style.left = (rect.left + rect.width / 2 - 40) + "px";
        touchBubble.style.top = (rect.top - 80) + "px";
        document.body.appendChild(touchBubble);
        activeTouchBubble = touchBubble;

        // 點擊對話泡：若點擊則回到起點
        touchBubble.addEventListener("click", () => {
            if (touchMeTimer) {
                clearTimeout(touchMeTimer);
                touchMeTimer = null;
            }
            touchBubble.remove();
            touchMeActive = false;
            resetCat();
        });

        // 10秒後若未點擊則自動取消暫停，恢復移動
        let timebreak_touch = 3000;
        touchMeTimer = setTimeout(() => {
            if (touchBubble.parentNode) {
                touchBubble.remove();
            }
            touchMeActive = false;
            movesSinceStop = 0;
            targetMoves = crtRandomNum(6, 8);
            scheduleNextMove();
        }, timebreak_touch);
    }

    // 貓咪點擊事件：
    // - 若處於「touchme」暫停狀態則回到起點
    // - 否則累加 meowCount；若達 3 次則觸發梗圖洪流，否則顯示「meow.png」對話泡0.5秒
    cat.addEventListener("click", (e) => {
        if (touchMeActive) {
            e.stopPropagation();
            if (touchMeTimer) {
                clearTimeout(touchMeTimer);
                touchMeTimer = null;
            }
            if (activeTouchBubble && activeTouchBubble.parentNode) {
                activeTouchBubble.remove();
            }
            touchMeActive = false;
            resetCat();
        } else {
            meowCount++;
            if (meowCount >= 3) {
                const mogoBubble = document.createElement("img");
                mogoBubble.src = chrome.runtime.getURL("mogo.png");
                mogoBubble.style.position = "fixed";
                mogoBubble.style.width = "500px";
                mogoBubble.style.height = "300px";
                mogoBubble.style.zIndex = 9999;
                const rect = cat.getBoundingClientRect();
                mogoBubble.style.left = (rect.left + rect.width / 2 - 50) + "px";
                mogoBubble.style.top = (rect.top - 200) + "px";
                document.body.appendChild(mogoBubble);

                setTimeout(() => {
                    mogoBubble.remove();
                    triggerMemeFlood();   // 進入梗圖洪流
                    meowCount = 0;        // 重置 meow 次數
                }, 2000);
            } else {
                let bubble_remove = 500;
                const meowBubble = document.createElement("img");
                meowBubble.src = chrome.runtime.getURL("meow.png");
                meowBubble.style.position = "fixed";
                meowBubble.style.width = "100px";
                meowBubble.style.height = "100px";
                const rect = cat.getBoundingClientRect();
                meowBubble.style.left = (rect.left + rect.width / 2 - 40) + "px";
                meowBubble.style.top = (rect.top - 80) + "px";
                document.body.appendChild(meowBubble);
                setTimeout(() => { meowBubble.remove(); }, bubble_remove);
            }
        }
    });

    // 新增：觸發梗圖洪流
    // 當 meow 點擊次數達 3 次後，此函式會依序每 0.5 秒產生一張 300x300 的 meme 圖片，
    // 總共 95 張，且位置隨機但不重疊，填滿整個頁面。
    function triggerMemeFlood() {
        cat.style.display = "none";
        // 建立 1~95 的陣列，並轉成 meme 檔案 URL（meme1.jpg ~ meme95.jpg）
        let memeList = [];
        for (let i = 1; i <= 95; i++) {
            memeList.push(chrome.runtime.getURL("meme" + i + ".jpg"));
        }
        // 打亂陣列順序
        memeList.sort(() => Math.random() - 0.5);
        
        // 儲存已放置區域，避免重疊
        let placedRects = [];
        let index = 0;
        let interval = setInterval(() => {
            if (index >= memeList.length) {
                clearInterval(interval);
                // 所有 meme 放完後，等待 10 秒後清除並恢復初始狀態
                setTimeout(() => {
                    document.querySelectorAll(".meme-flood").forEach(elem => elem.remove());
                    cat.style.display = "block";
                    resetCat();
                }, 10000);
                return;
            }
            const meme = document.createElement("img");
            meme.src = memeList[index];
            meme.className = "meme-flood";
            meme.style.position = "fixed";
            meme.style.width = "530px";
            meme.style.height = "300px";
            meme.style.zIndex = 10000;
            // 尋找不重疊的位置
            let posFound = false;
            let attempts = 0;
            let left, top;
            let maxAttempts = 100;
            while (!posFound && attempts < maxAttempts) {
                left = crtRandomNum(0, window.innerWidth - 300);
                top = crtRandomNum(0, window.innerHeight - 300);
                let rect = { left: left, top: top, right: left + 300, bottom: top + 300 };
                // 檢查是否與已放置的區域重疊
                let overlap = placedRects.some(r => {
                    return !(rect.right <= r.left || rect.left >= r.right || rect.bottom <= r.top || rect.top >= r.bottom);
                });
                if (!overlap) {
                    placedRects.push(rect);
                    posFound = true;
                }
                attempts++;
            }
            // 若經過多次嘗試仍未找到，則直接使用最後的值
            meme.style.left = left + "px";
            meme.style.top = top + "px";
            document.body.appendChild(meme);
            index++;
        }, 250);
    }

    // 視窗調整時，若小貓超出邊界則重置位置
    window.addEventListener("resize", () => {
        const rect = cat.getBoundingClientRect();
        if (rect.left + rect.width > window.innerWidth - 10 ||
            rect.top + rect.height > window.innerHeight - 10 ||
            rect.top < 0) {
            resetCat();
        }
    });

    // 初始化：設置小貓於左下角並開始移動
    resetCat();
})();