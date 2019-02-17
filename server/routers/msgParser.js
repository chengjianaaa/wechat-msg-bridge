/* *
 * 微信open平台消息推送 子路由
 * 含公众号和小程序
 */

import router from "koa-router";
import * as wechat from "../controllers/wechat/index.js";

const routers = router().all("/", wechat.signatureHandler, wechat.msgHandler);

export default routers;
