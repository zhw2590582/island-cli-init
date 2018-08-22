import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
dayjs.extend(relativeTime);
dayjs.locale('zh-cn');
import { webConfig, postConfig } from "../../../config";

// 判读是否手机环境
export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

// 获取url参数
export function getURLParameters() {
  var url = window.location.href;
  return (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(function(a, v) {
    return (a[v.slice(0, v.indexOf("="))] = v.slice(v.indexOf("=") + 1)), a;
  }, {});
}

// 生成url
export function URLJoin(...args) {
  return args
    .join("/")
    .replace(/[\/]+/g, "/")
    .replace(/^(.+):\//, "$1://")
    .replace(/^file:/, "file:/")
    .replace(/\/(\?|&|#[^!])/g, "$1")
    .replace(/\?/g, "&")
    .replace("&", "?");
}

// 延迟执行
export function debounce(fn, delay) {
  let timer = null;
  return function() {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  };
}

// 更新url
export function urlUpdate(name, val, callback) {
  const oldParam = getURLParameters();
  oldParam[name] = val;
  const newParam = Object.keys(oldParam).map(key => {
    return `?${key}=${oldParam[key]}`;
  });
  history.pushState({}, "", URLJoin(...newParam));
  callback && callback();
}

// 无限加载
export function infiniteScroll(callback) {
  function getDocumentHeight() {
    const body = document.body;
    const html = document.documentElement;
    return Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
  }

  function getScrollTop() {
    return window.pageYOffset !== undefined
      ? window.pageYOffset
      : (document.documentElement || document.body.parentNode || document.body)
          .scrollTop;
  }

  const debounceCallback = debounce(callback, 500);
  window.addEventListener("scroll", e => {
    if (getScrollTop() < getDocumentHeight() - window.innerHeight - 100) return;
    debounceCallback();
  });
}

// 设置标题
export function setTitle(subTitle, callback) {
  window.document.title = `${subTitle} - ${webConfig.title}`;
  callback && callback();
}

// 滚动固定
export function scrollFixed(selector, distance = 0) {
  const el = document.querySelector(selector);
  if (el) {
    const elTop =
      el.getBoundingClientRect().top -
      document.body.getBoundingClientRect().top;
    function callback() {
      if (document.documentElement.scrollTop > elTop - distance) {
        el.classList.add("fixed");
      } else {
        el.classList.remove("fixed");
      }
    }
    callback();
    window.addEventListener("scroll", callback);
  }
}

// 随机特色图
export function creatPoster() {
  const randomIntegerInRange = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  return `/static/img/posters/img${randomIntegerInRange(
    1,
    postConfig.posterSize
  )}.png`;
}

// 判断滚动方向
export function scrollDirection(callback) {
  const debounceCallback = debounce(callback, 50);
  let scrollPos = 0;
  window.addEventListener("scroll", function() {
    if (document.body.getBoundingClientRect().top > scrollPos) {
      debounceCallback("up");
    } else {
      debounceCallback("down");
    }
    scrollPos = document.body.getBoundingClientRect().top;
  });
}

// 相对时间
export function relative(time) {
  return dayjs(time).fromNow();
}

// 字符串溢出
export function truncateString(str, num) {
  return str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;
}

// 排序文章
export function sortPosts(posts) {
  let stickyPost = [];
  let newPosts = [];
  posts.forEach(item => {
      if (item.sticky) {
          stickyPost.unshift(item);
      } else {
        newPosts.push(item);
      }
  });
  newPosts.unshift(...stickyPost.reverse());
  return newPosts;
}

// 滚动到元素
export function smoothScroll(element) {
  window.scroll({
    behavior: 'smooth',
    left: 0,
    top: element.getBoundingClientRect().top + window.scrollY - 80
  });
}