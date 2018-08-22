import mediumZoom from 'medium-zoom';
import { postConfig } from "../../config";
import { getURLParameters, scrollDirection, relative, setTitle, creatPoster, scrollFixed, smoothScroll } from "./utils";
const { name } = getURLParameters();
const { relatedPost } = postConfig;

const $header = document.querySelector('.header');
const $page = document.querySelector('.post-page');
const $title = document.querySelector(".post-page .post-header .title");
const $mata = document.querySelector(".post-page .post-header .meta");
const $content = document.querySelector(".post-page .post-content");
const $related = document.querySelector(".post-page .post-related");
const $nav = document.querySelector(".post-page .post-nav");
const $navList = document.querySelector(".post-page .post-nav .nav-list");

const metaData = window.database.posts.find(item => item.name === name);
setTitle(metaData.title);
$title.innerHTML = metaData.title;
$mata.innerHTML = metaData.topic.split(',').map(item => {
  return `<a href="/archive.html?topic=${encodeURIComponent(item.trim())}" title="${item.trim()}" class="topic">${item.trim()}</a>`
}).join('<span class="dot"></span>') + `<span class="dot"></span>` + `<span class="time" title="${metaData.creatDate}">${relative(metaData.creatDate)}</span>`;

import(/* webpackChunkName: "post" */ `../posts/${name}/post.md`)
  .then(module => {
    const postData = module.default;
    setTimeout(() => {
      $content.innerHTML = postData;
      creatNav();
      mediumZoom('.post-page .post-content img');
    }, 500);
  })
  .catch(e => {
    window.location.href = "/404.html";
  });

let relatedHtml = [];
const searchTopic = metaData.topic.split(',')[0].trim();
window.database.posts.some((item, index) => {
  const topics = item.topic.split(',').map(item => item.trim());
  if (topics.indexOf(searchTopic) > -1 && item.name !== metaData.name) {
    relatedHtml.push(`
      <div class="related-item flex-item text-ellipsis">
          <a class="poster" href="/post.html?name=${encodeURIComponent(item.name)}" title="${item.title}" style="background-image: url(${item.poster || creatPoster()});"></a>
          <a class="title" href="/post.html?name=${encodeURIComponent(item.name)}" title="${item.title}">${item.title}</a>
          <div class="time" title="${item.creatDate}">${relative(item.creatDate)}</div>
      </div>
    `)
  }
  if (relatedHtml.length >= relatedPost) return true;
});
$related.insertAdjacentHTML("beforeend", relatedHtml.join(''));

scrollDirection(direction => {
  $header.dataset.scrollDirection = direction;
});

scrollFixed('.post-nav', 80);

function creatNav() {
  if (metaData.wide) {
    $page.insertAdjacentHTML("afterbegin", `<div class="post-poster"><img src="${metaData.poster}" alt="${metaData.title}" /></div>`);
  } else {
    $nav.insertAdjacentHTML("afterbegin", `<div class="poster" style="background-image: url(${metaData.poster || creatPoster()})"></div>`);
  }

  const $allNav = Array.from(document.querySelectorAll('.post-page .post-content h2'));
  const navHtml = $allNav.map((item, index) => {
    return `<a class="nav-item" data-index="${index}" href="#">${item.textContent}</a>`
  }).join('');
  $navList.innerHTML = navHtml;
  $navList.addEventListener('click', e => {
    e.preventDefault();
    const index = e.target.dataset.index;
    smoothScroll($allNav[index]);
  });
}