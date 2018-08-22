import loading from 'app-loading';
import "app-loading/app-loading.min.css";
import "highlight.js/styles/github.css";
import '../sass/common';
import '../sass/posts';
import '../fonts/linearicons/style.css';
import "../sass/utils/tui-editor-contents.css";
import { scrollFixed, creatPoster } from "./utils/index";
import database from '../database/index.json';
window.database = database;

// 加载条
loading.setColor('#000').start();
document.addEventListener('DOMContentLoaded', e => {
    setTimeout(loading.stop.bind(loading), 1200);
});

// 自动选中菜单
const pageName = window.location.pathname;
const menuList = Array.from(document.querySelectorAll('.menu .item'));
const current = menuList.find(item => item.href.includes(pageName));
current && pageName !== '/' && current.classList.add('current');

// 搜索
const searchTool = document.querySelector('.search-tool');
const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search-input');
searchBtn.addEventListener('click', e => {
    e.preventDefault();
    if (searchTool.classList.contains('active')) {
        window.location.href = '/archive.html?search=' + encodeURIComponent(searchInput.value.trim());
    } else {
        searchTool.classList.add('active');
        searchInput.focus();
    }
});

// 全局失焦
document.addEventListener('click', e => {
    if (!e.path.some(item => item === searchTool) && searchTool.classList.contains('active')) {
        searchTool.classList.remove('active');
    }
});

// 滚动固定侧边栏
scrollFixed('.scroll-fixed', 60);

// 热门话题
const topicEl = document.querySelector(".widget.topic .content");
if (topicEl) {
    const topicObj = {};
    window.database.posts.forEach(post => {
        post.topic.split(',').forEach(item => {
            if (topicObj[item]) {
                topicObj[item] += 1;
            } else {
                topicObj[item] = 1;
            }
        });
    });
    const topicHtml = Object.keys(topicObj).filter(Boolean).slice(0, 20).map(item => {
        return `<a class="topic-item" title="${item.trim()}" href="/archive.html?topic=${encodeURIComponent(item.trim())}">${item.trim()}(${topicObj[item]})</a>`
    }).join('');
    topicEl.insertAdjacentHTML("beforeend", topicHtml);
}

// 近期文章
const recentEl = document.querySelector(".widget.recent .content");
if (recentEl) {
    const recentHtml = window.database.posts.slice(0, 5).map(post => {
        return `
            <div class="recent-item flex">
                <a class="poster" href="/post.html?name=${encodeURIComponent(post.name)}" title="${post.name}" style="background-image: url(${post.poster || creatPoster()});"></a>
                <div class="info flex-item flex flex-hc">
                    <a class="title text-ellipsis" href="/post.html?name=${encodeURIComponent(post.name)}" title="${post.name}">${post.title}</a>
                    <div class="cat text-ellipsis">
                        ${post.topic.split(',').map(item => `<a href="/archive.html?topic=${encodeURIComponent(item.trim())}" title="${item.trim()}" class="topic">${item.trim()}</a>`).join('<span class="dot"></span>')}
                    </div>
                </div>
            </div>
        `
    }).join('');
    recentEl.insertAdjacentHTML("beforeend", recentHtml);
}