import "../sass/pages";
import "../sass/archive";
import { getURLParameters, relative } from "./utils";
let { search, topic }  = getURLParameters();
search = decodeURIComponent(search).toLowerCase();
topic = decodeURIComponent(topic).toLowerCase();
const $archiveHeader = document.querySelector(".archive-header");
const $archiveList = document.querySelector(".archive-posts");
let posts = [];

if (search !== 'undefined') {
    posts = window.database.posts.filter(item => {
        return item.title.toLowerCase().includes(search) || item.excerpt.toLowerCase().includes(search) || item.topic.toLowerCase().includes(search); 
    });
    $archiveHeader.innerHTML = `搜索：${search}`
} else if (topic !== 'undefined') {
    posts = window.database.posts.filter(item => {
        return item.topic.toLowerCase().includes(topic);
    });
    $archiveHeader.innerHTML = `话题：${topic}`
} else {
    posts = window.database.posts;
    $archiveHeader.innerHTML = `全部文章`
}

const archiveHtml = posts.map(item => {
    return `
        <div class="archive-item">
            <a href="/post.html?name=${encodeURIComponent(item.name)}" class="title" title="${item.name}">${item.title}</a>
            <div class="meta clearfix">
                ${item.topic.split(',').map(item => `<a href="/archive.html?topic=${encodeURIComponent(item.trim())}" title="${item.trim()}" class="topic">${item.trim()}</a>`).join('<span class="dot"></span>')}
                <span class="dot"></span>
                <span class="time" title="${item.creatDate}">${item.creatDate}</span>
            </div>
        </div>
    `;
}).join('');

$archiveList.innerHTML = archiveHtml;