import loading from 'app-loading';
import { postConfig } from "../../../config";
import { urlUpdate, setTitle, creatPoster, relative } from "./index";
const { pageSize } = postConfig;

export default function creatPost(selector, page, posts) {
    const el = document.querySelector(selector);
    const pageTotle = posts.slice((page - 1) * pageSize, page * pageSize);
    const postHtml = pageTotle.map(item => {
        return `
        <div class="post-item flex">
            <div class="post-left flex-item">
                ${item.wide ? `
                    <div class="post-top">
                        <a href="/post.html?name=${encodeURIComponent(item.name)}" title="${item.name}" class="poster" style="background-image: url(${item.poster || creatPoster()});"></a>
                    </div>
                ` : ``}
                <a href="/post.html?name=${encodeURIComponent(item.name)}" class="title" title="${item.name}">${item.title}</a>
                <div class="content">${item.excerpt}</div>
                <div class="meta clearfix">
                    ${item.topic.split(',').map(item => `<a href="/archive.html?topic=${encodeURIComponent(item.trim())}" title="${item.trim()}" class="topic">${item.trim()}</a>`).join('<span class="dot"></span>')}
                    <span class="dot"></span>
                    <span class="time" title="${item.creatDate}">${relative(item.creatDate)}</span>
                    ${item.sticky ? `<span class="lnr lnr-bookmark sticky fr" title="置顶文章"></span>` : ``}
                </div>
            </div>
            ${!item.wide ? `
                <div class="post-right">
                    <a href="/post.html?name=${encodeURIComponent(item.name)}" title="${item.name}" class="poster" style="background-image: url(${item.poster || creatPoster()});"></a>
                </div>
            ` : ``}
        </div>
        `
    }).join('');

    const loadHtml = `
        <div class="post-item flex post-loading">
            <div class="post-left flex-item">
                <div class="title">
                    <div class="load"></div>
                    <div class="load" style="width: 50%"></div>
                </div>
                <div class="content">
                    <div class="load"></div>
                    <div class="load" style="width: 80%"></div>
                </div>
                <div class="meta">
                    <div class="load" style="width: 20%"></div>
                </div>
            </div>
            <div class="post-right">
                <div class="poster load"></div>
            </div>
        </div>
    `;

    const loadEnd = `<div class="loadEnd">没有更多文章了</div>`;

    if (page === 1) {
        el.insertAdjacentHTML("beforeend", postHtml);
    } else {
        if (postHtml.trim()) {
            el.insertAdjacentHTML("beforeend", loadHtml);
            loading.setColor('#000').start();
            setTimeout(() => {
                Array.from(document.querySelectorAll('.post-loading')).forEach(item => item.remove());
                el.insertAdjacentHTML("beforeend", postHtml);
                setTimeout(loading.stop.bind(loading), 700);
            }, 500);
        } else {
            const loadEndEl = document.querySelector('.loadEnd');
            if (!loadEndEl) {
                setTimeout(() => {
                    el.insertAdjacentHTML("beforeend", loadEnd);
                }, 500);
            }
        }
    }
}