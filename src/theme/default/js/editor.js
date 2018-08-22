import "../sass/editor";
const iframeEl = document.querySelector(".editor-page");
const iframeHeight = document.body.clientHeight - 50;
iframeEl.style.height = iframeHeight + 'px';
const iframeHtml = `<iframe src="https://blog.zhw-island.com/markdown-editor/?height=${iframeHeight - 5}" frameborder="none" scrolling="auto" style="width: 100%; height: 100%;"></iframe>`;
iframeEl.insertAdjacentHTML("beforeend", iframeHtml);