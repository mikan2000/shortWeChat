var express = require('express');
var webot = require('weixin-robot');
var googleapis = require('./lib/googleapis.js');

var app = express();
// 指定回复消息
webot.set('subscribe', {
  pattern: function(info) {
    return info.is('event') && info.param.event === 'subscribe';
  },
  handler: function(info) {
    return '欢迎订阅短网址小助手，发送一个长网址给我，会返回一个短网址哦~如果是淘宝网址，请将返回的短网址复制到浏览器中打开。';
  }
});
webot.set('shorturl', {
  pattern: '^((http|https)://)?[\\\S]+\\\.[\\\S]+$',
  handler: function(info, next) {
    var msg = "fanhui";
    googleapis
    .discover('urlshortener', 'v1')
    .execute(function(err, client) {
      client.urlshortener.url
          .insert({ longUrl: info.text })
          .execute(function(err, result) {
            if (err) {
              msg = err;
              return next();
            } else {
              console.log('Result: ', result.id);
              msg = result.id;
              return next(null, msg);
            }
          });
    });
  }
});

// 接管消息请求
webot.watch(app, { token: 'poppy', path: '/wechat' });
app.listen(80);