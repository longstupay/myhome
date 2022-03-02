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
      "text": "接种点"
    }, {
      "pagePath": "pages/index/index",
      "text": "我的"
    }]
  },
}
