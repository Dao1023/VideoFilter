// ==UserScript==
// @name         B站视频时长过滤
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  隐藏时长大于1小时的B站视频
// @author       You
// @match        https://www.bilibili.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 检查所有视频的时长并隐藏时长大于1小时的视频
    function checkVideoDuration() {
        const videoItems = document.querySelectorAll('.video-item, .video-card-common'); // 在这里你可以根据实际的B站页面结构选择合适的选择器
        videoItems.forEach(item => {
            const timeElement = item.querySelector('.so-imgTag_rb, .dur'); // 选择包含视频时长的元素
            if (timeElement) {
                const timeText = timeElement.innerText || timeElement.textContent;
                const [minutePart, secondPart] = timeText.split(':');
                const duration = parseInt(minutePart, 10) * 60 + parseInt(secondPart, 10); // 将时长转换为秒
                if (duration > 3600) { // 1小时 = 3600秒
                    item.style.display = 'none'; // 隐藏这个视频
                }
            }
        });
    }

    // 每3秒运行一次函数，因为B站页面可能是动态加载的
    setInterval(checkVideoDuration, 3000);
})();
