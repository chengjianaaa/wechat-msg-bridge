/* *
 * wechat api 子路由
 */

import router from "koa-router";
import * as wechat from "../controllers/wechat/index.js";

const routers = router().all(
  "/bridge",
  wechat.signatureHandler,
  wechat.msgHandler
);

export default routers;
