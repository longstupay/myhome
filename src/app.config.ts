export default {
  pages: [
    'pages/home/index',
    'pages/index/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    "list": [{
      "pagePath": "pages/home/index",
      "text": "接种点",
      "iconPath":"./static/icon/tab1.png",
      "selectedIconPath":"./static/icon/tab1s.png"
    }, {
      "pagePath": "pages/index/index",
      "text": "我的",
      "iconPath":"./static/icon/icon_home.png",
      "selectedIconPath":"./static/icon/icon_homes.png"
    }]
  },
}
