const path = require("path");
const wrap = require("./wrap");

const config = {
  theme: "default",
  dev: {
    port: 3000,
    outputPath: path.join(process.cwd(), "./"),
    publicPath: "/",
    devPaths: {},
  },
  web: {
    title: "老赵茶馆 - 少年，你有多忧伤！",
    keywords: "老赵, 茶馆, 前端, 代码, 美术, 电影, 音乐, 分享",
    description: "Hi，老赵其实不老，只是个九零后文艺青年，一枚会设计的前端攻城狮，爱互联网，爱美术，爱游戏，爱电影，爱音乐...",
    copyright: "© 2018 All Rights Reserved.	Theme by 老赵茶馆",
    author: {
      name: "Harvey Zack",
      title: "一枚会设计的前端攻城狮",
      description: "Hi，老赵其实不老，只是个九零后文艺青年，职业为前端攻城狮，爱互联网，爱美术，爱游戏，爱电影，爱音乐..."
    },
    post: {
      excerpt: 100,
      pageSize: 5,
      posterSize: 7,
      relatedPost: 3
    },
    menus: [
      {
        name: "关于",
        link: "/about.html"
      },
      {
        name: "归档",
        link: "/archive.html"
      },
      {
        name: "留言",
        link: "/message.html"
      },
      {
        name: "编辑器",
        link: "/editor.html"
      }
    ],
    socials: [
      {
        name: "老赵",
        link: "https://github.com/"
      },
      {
        name: "老赵",
        link: "https://github.com/"
      },
      {
        name: "老赵",
        link: "https://github.com/"
      },
      {
        name: "老赵",
        link: "https://github.com/"
      },
      {
        name: "老赵",
        link: "https://github.com/"
      }
    ],
    links: [
      {
        name: "老",
        link: "https://github.com/"
      },
      {
        name: "老赵",
        link: "https://github.com/"
      },
      {
        name: "老赵茶",
        link: "https://github.com/"
      },
      {
        name: "老",
        link: "https://github.com/"
      },
      {
        name: "老赵",
        link: "https://github.com/"
      },
      {
        name: "老赵",
        link: "https://github.com/"
      },
      {
        name: "老赵",
        link: "https://github.com/"
      }
    ]
  }
};

module.exports = wrap(config);
