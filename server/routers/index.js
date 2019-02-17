// 路由层，控制路由

import Router from "koa-router";

import wechat from "./wechat.js";

const router = Router();

router.use("/wechat", wechat.routes(), wechat.allowedMethods());

export default router;
