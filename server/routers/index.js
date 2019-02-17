// 路由层，控制路由

import Router from "koa-router";

import msgParser from "./msgParser.js";

const router = Router();

router.use("/msgParser", msgParser.routes(), msgParser.allowedMethods());

export default router;
