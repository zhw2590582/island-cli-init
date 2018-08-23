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

  // 添加当前主题路径
  config.dev.themePath = `/src/theme/${config}/`;
  
  return config;
};
