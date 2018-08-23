module.exports = function(config) {
  config.web.menus = config.web.menus
    .map(item => {
      return `<a class="item" title="${item.name}" href="${item.link}">${item.name}</a>`;
    })
    .join('');

  config.web.socials = config.web.socials
    .map(item => {
      return `<a class="social-item" title="${item.name}" href="${item.link}" target="_blank">${item.name}</a>`;
    })
    .join('<span class="dot"></span>');

  config.web.links = config.web.links
    .map(item => {
      return `<a class="link-item" title="${item.name}" href="${item.link}">${item.name}</a>`;
    })
    .join('');

  config.path = `/src/theme/${config.theme}`;
  
  return config;
};
