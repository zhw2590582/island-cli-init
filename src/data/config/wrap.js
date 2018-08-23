const path = require("path");
const glob = require("glob");
const markdownit = require("markdown-it")();
const he = require("he");

module.exports = function(config) {

    // 格式化菜单
    config.web.menus = config.web.menus
      .map(item => {
        return `<a class="item" title="${item.name}" href="${item.link}">${item.name}</a>`;
      })
      .join("");
  
    // 格式化社交链接
    config.web.socials = config.web.socials
      .map(item => {
        return `<a class="social-item" title="${item.name}" href="${item.link}" target="_blank">${item.name}</a>`;
      })
      .join('<span class="dot"></span>');
  
    // 格式化友情链接
    config.web.links = config.web.links
      .map(item => {
        return `<a class="link-item" title="${item.name}" href="${item.link}">${item.name}</a>`;
      })
      .join("");
  
    // 读取页面markdown
    config.web.page = {};
    glob.sync(path.join(process.cwd(), 'src/data/pages', '*.md')).forEach(item => {
      const filename = path.basename(item).toLowerCase().replace(".md", "");;
      const pageData = fs.readFileSync(item, "utf-8");
      config.web.page[filename] = pageData;
    });

    // 添加当前主题路径
    config.dev.themePath = `/src/theme/${config}/`;
    
    return config;
  };
  