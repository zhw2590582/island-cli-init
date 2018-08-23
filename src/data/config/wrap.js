module.exports = function(config) {
    config.menus = config.menu
      .map(item => {
        return `<a class="item" title="${item.name}" href="${item.link}">${item.name}</a>`;
      })
      .join("");
  
    config.socials = config.socials
      .map(item => {
        return `<a class="social-item" title="${item.name}" href="${item.link}" target="_blank">${item.name}</a>`;
      })
      .join('<span class="dot"></span>');
  
    config.links = config.links
      .map(item => {
        return `<a class="link-item" title="${item.name}" href="${item.link}">${item.name}</a>`;
      })
      .join("");
  
    return config;
  };
  