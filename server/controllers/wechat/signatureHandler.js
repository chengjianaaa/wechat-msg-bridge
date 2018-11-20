import config from "../../config.js";
import { checkSignature, renderMsg } from "./utils.js";

/* *
 * 处理微信校验
 * @param {object} ctx 请求上下文
 * @return {string} 响应内容
 * */
const signatureHandler = async (ctx, next) => {
  // 检验签名
  const signature = checkSignature(ctx.query, config.wechatToken);

  if (!signature) {
    // 签名不对，结束请求并返回
    ctx.body = "签名失败...";
  }

  // 签名正确
  if (ctx.method === "GET") {
    // 如果是GET请求，则返回echostr用于通过服务器有效性校验
    ctx.body = ctx.query.echostr;
  } else {
    // POST请求
    await next(); // 移交控制权给其他中间件

    // 完整中间件流程，进行消息返回
    ctx.body = renderMsg(ctx.request.body.xml, "text", ctx.state.content);
  }
};

export { signatureHandler };
