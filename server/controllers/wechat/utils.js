import crypto from "crypto";

/* *
 * 检查微信签名
 * @param {object} params 需校验的内容
 * @param {string} token  微信公众号平台设置的token
 * @return {bool} 是否通过校验
 * */
const checkSignature = (params, token) => {
  // 1. 获取微信服务器GET请求的参数signature，timestamp， nonce，echostr
  const signature = params.signature,
    timestamp = params.timestamp,
    nonce = params.nonce;

  // 2. 进行字典排序
  let array = [token, timestamp, nonce];
  array.sort();

  // 3. 将字典进行字符串拼接并进行sha1加密
  const str = array.join("");
  const hashCode = crypto
    .createHash("sha1")
    .update(str, "utf8")
    .digest("hex");

  // 4. 将获得加密后的字符串与signature对比，检测该请求是否来源于微信
  return hashCode === signature;
};

/* *
 * 组装回复的消息
 * @param {object} wechatMsg 微信POST的消息内容
 * @param {string} type 回复的消息类型
 * @param {string} content 回复的消息内容
 * @return {string} xml */
const renderMsg = (wechatMsg, type, content) => {
  const timestamp = Date.now();
  const createTime = Math.trunc(timestamp / 1000);

  const xml = `<xml>
    <ToUserName><![CDATA[${wechatMsg.FromUserName}]]></ToUserName>
    <FromUserName><![CDATA[${wechatMsg.ToUserName}]]></FromUserName>
    <CreateTime><![CDATA[${createTime}]]></CreateTime>
    <MsgType><![CDATA[${type}]]></MsgType>
    <Content><![CDATA[${content}]]></Content>
  </xml>`;
  return xml;
};

export { checkSignature, renderMsg };
