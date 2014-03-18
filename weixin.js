var express = require('express');
var webot = require('weixin-robot');

var app = express();

// 指定回复消息
webot.set('hi', '你好');

webot.set('subscribe', {
  pattern: function(info) {
    return info.is('event') && info.param.event === 'subscribe';
  },
  handler: function(info) {
    return '欢迎订阅微信机器人';
  }
});

// 接管消息请求
webot.watch(app, { token: 'poppy', path: '/wechat' });

// 如果需要多个实例（即为多个微信账号提供不同回复）：
// var webot2 = new webot.Webot();
// webot2.set({
//   '/hi/i': 'Hello',
//   '/who (are|r) (you|u)/i': 'I\'m a robot.'
// });
// webot2.watch(app, {
//   token: 'token2',
//   path: '/wechat_en', // 这个path不能为之前已经监听过的path的子目录
// });

// 启动 Web 服务
// 微信后台只允许 80 端口
app.listen(80);