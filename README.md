# wechat-msg-bridge

用于微信公众号和微信小程序的消息推送服务的处理。如关注公众号，给公众号发送消息，将收到微信推送的消息。本应用将对消息做基本的处理。

## 使用

设置环境变量

`wechatToken=微信公众号的token或小程序的token`

安装依赖

`yarn install`

启动服务

`node server/app.js --experimental-modules --loader server/loader.mjs`

或者 Vscode 中直接`F5`启动 Debug 调试功能

\*注： 使用了 es modules（node 的实验性功能）

## 使用的库

- koa2
- koa-bodyparser
- koa-logger
- koa-router
- koa-xml-body
