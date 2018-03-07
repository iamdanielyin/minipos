import { stringify } from 'querystring';

const request = require('superagent');
const ibird = require('ibird');

module.exports = (router) => {
  router.get('/jssdk/config', async ctx => {
    const app = ibird.ctx();
    const config = app.c();
    const { weixin } = config;
    const { jsApiList = '' } = ctx.query;
    try {
      let res = await request.get(weixin.ticketUrl);
      const obj = {
        noncestr: Math.random().toString().substring(2),
        jsapi_ticket: res.body.data,
        timestamp: parseInt(Date.now() / 1000),
        url: ctx.href.split('#')[0]
      };
      console.log(JSON.stringify(obj, null, 2));
      res = await request.post(weixin.signatureUrl).send(obj);
      obj.signature = res.body.data || null;
      const ret = {
        debug: false,
        appId: weixin.appid,
        timestamp: obj.timestamp,
        nonceStr: obj.noncestr,
        signature: obj.signature,
        jsApiList: jsApiList.split(',')
      };
      ctx.body = { data: ret };
    } catch (error) {
      ctx.body = {
        errcode: 500,
        errmsg: 'JSSDK配置异常',
        errstack: error.message
      };
    }
  });
}