const path = require("path");
const wrap = require("./wrap");
const isProd = process.env.NODE_ENV === "production";

const config = {
  theme: "default",
  dev: {
    port: 3000,
    outputPath: path.join(process.cwd(), "./"),
    publicPath: "/"
  },
  web: {
    title: "Just another Island blog",
    keywords: "island, blog",
    description: "Just another Island blog",
    copyright: "© 2018 All Rights Reserved. Powered By <a href=\"https://github.com/zhw2590582/island-cli\">Island</a>",
    author: {
      name: "Harvey Zack",
      title: "A designer and front-end engineer",
      description: "Hi, I'am Harvey Zack, a designer and front-end engineer from China."
    },
    post: {
      excerpt: 100,
      pageSize: 10,
      posterSize: 20,
      relatedPost: 3
    },
    menus: [
      {
        name: "About",
        link: "/about.html"
      },
      {
        name: "Archive",
        link: "/archive.html"
      },
      {
        name: "Message",
        link: "/message.html"
      },
      {
        name: "Editor",
        link: "/editor.html"
      }
    ],
    socials: [
      {
        name: "weibo",
        link: "http://weibo.com/qq717995589"
      },
      {
        name: "github",
        link: "https://github.com/zhw2590582"
      },
      {
        name: "dribbble",
        link: "https://dribbble.com/HarveyZack"
      },
      {
        name: "twitter",
        link: "https://twitter.com/HarveyZack1990"
      }
    ],
    links: [
      {
        name: "weibo",
        link: "http://weibo.com/qq717995589"
      },
      {
        name: "github",
        link: "https://github.com/zhw2590582"
      },
      {
        name: "dribbble",
        link: "https://dribbble.com/HarveyZack"
      },
      {
        name: "twitter",
        link: "https://twitter.com/HarveyZack1990"
      }
    ]
  }
};

module.exports = wrap(config);
