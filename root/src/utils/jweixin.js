import wx from 'weixin-js-sdk';

export default function (obj, onReady, onError) {
  wx.config(Object.assign({ debug: true }, obj));
  wx.ready(onReady);
  wx.error(onError);
}