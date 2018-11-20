import * as msgTmpl from "../../constants/msgTmpl.js";

/* *
 * 处理消息内容
 * @param {object} ctx 请求上下文
 * @param {fn} next
 * @return {string} content 回复的消息内容
 * */
const msgHandler = async (ctx, next) => {
  const msg = ctx.request.body.xml;

  const msgType = msg.MsgType[0];

  let content = "";
  switch (msgType) {
    case "event":
      // 事件消息
      content = eventHandler(msg.Event[0]);
      break;
    case "text":
      // 文本消息
      const openid = ctx.request.query.openid;
      content = textHandler(msg.Content[0], openid);
      break;
    default:
      // 图片等不支持的消息类型
      content = msgTmpl.UNSUPPORTED_TYPE;
  }

  // 设置返回的消息内容搭配ctx中
  ctx.state.content = content;
  await next();
};

/* *
 * 处理事件消息
 * @param {string} event 事件消息的类型
 * @retrun {string} 回复的消息内容 */
const eventHandler = event => {
  let content = "";
  if (event === "subscribe") {
    // 订阅自动回复消息
    content = msgTmpl.SUBSCRIBE;
  }

  return content;
};

/* *
 * 处理文本消息
 * @param {string} text 文本消息内容
 * @param {string} openid 用户openid
 * @return {string} content 回复的消息内容
 * */
const textHandler = (text, openid) => {
  let content = "";

  if (text === "帮助") {
    content = msgTmpl.HELP;
  } else if (text === "骚扰号码") {
    content = msgTmpl.ENTER_NUMBER;
  } else if (isInDissMode(openid)) {
    content = dissHandler(text);
  } else {
    content = msgTmpl.UNKNOWN_COMMAND;
  }

  return content;
};

/* *
 * 处理骚扰请求
 * @param {string} phone 需要骚扰的电话号码
 * @return {string} content 回复的消息内容  */
const dissHandler = phone => {
  let content = "";

  // 手机和座机正则
  const re = /^0\d{2,3}\d{7,8}$|^1[3456789]\d{9}$|^861[3456789]\d{9}$/;

  // 去除多余字符
  phone = phone.replace(/[^0-9]/gi, "");

  if (!re.test(phone)) {
    // 不合法
    content = msgTmpl.INVALID_NUMBER;
  } else {
    call(phone);
    content = msgTmpl.DISS_SUCCESS;
  }

  return content;
};

/* *
 * 发送骚扰请求
 * @param {string} phone 合法的号码
 * @return {bool} 请求结果*/
const call = phone => {
  // BD的Call已经废了，还未弄新的渠道。挖坑待填

  return true;
};

/* *
 * 判断当前请求的用户的聊天是否在diss模式下
 * @param {string} openid 用户的openid
 * @return {bool} 是否在diss模式下 */
const isInDissMode = openid => {
  // 当前只搞了Diss。硬编码返回在diss模式下。
  // 后续扩展功能后，再做补充

  return true;
};

export { msgHandler };
