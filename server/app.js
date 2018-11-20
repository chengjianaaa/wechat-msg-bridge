/* 后端服务入口文件 */

// Koa库及Koa扩展库
import Koa from "koa";
import xmlParser from "koa-xml-body";
import bodyParser from "koa-bodyparser";
import logger from "koa-logger";

// 配置文件
// const config = require("../config");
import config from "./config.js";

// 路由文件
// const routers = require("./routers");
import routers from "./routers/index.js";

// 应用实例
const app = new Koa();

// 配置控制台日志中间件
app.use(logger());

// 配置ctx.body的xml解析中间件
app.use(xmlParser());

// 配置ctx.body解析中间件
app.use(bodyParser());

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods());

// 坚听启动端口
app.listen(config.port);
console.log(`the server is start at port ${config.port}`);
