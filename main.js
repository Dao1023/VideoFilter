// ==UserScript==
// @name         VideoFilter
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  B站视频过滤器，根据内容时长，播放量、弹幕数等过滤
// @author       Dao
// @match        https://www.bilibili.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 检查所有视频的时长并隐藏时长大于1小时的视频
    function checkVideoDuration() {
        const videoItems = document.querySelectorAll('.video-page-card-small'); // 根据你的HTML样例，选择合适的选择器
        videoItems.forEach(item => {
            const timeElement = item.querySelector('.duration'); // 选择包含视频时长的元素
            if (timeElement) {
                const timeText = timeElement.innerText || timeElement.textContent;
                const parts = timeText.split(':').map(Number); // 将时长分割为[小时, 分钟, 秒]
                let duration = 0;
                if (parts.length === 3) {
                    duration += parts[0] * 3600; // 小时转换为秒
                    duration += parts[1] * 60;   // 分钟转换为秒
                    duration += parts[2];         // 秒
                } else if (parts.length === 2) {
                    duration += parts[0] * 60;   // 分钟转换为秒
                    duration += parts[1];         // 秒
                }
                
                if (duration < 600 | duration > 1800) { // 1小时 = 3600秒
                    item.style.display = 'none'; // 隐藏这个视频
                }
            }
        });
    }

    // 每3秒运行一次函数，因为B站页面可能是动态加载的
    setInterval(checkVideoDuration, 3000);
})();
