import qs from 'qs';
import * as apiService from '../services/api';
import jweixin from '../utils/jweixin';
import { Toast } from 'antd-mobile';

export default {
  namespace: 'index',
  state: {
    _JSSDKConfig: 0,
    _GoodInfo: null
  },
  reducers: {
    updateJSSDKConfig(state, { payload }) {
      return {
        ...state,
        _JSSDKConfig: payload
      }
    },
    updateGoodInfo(state, { payload }) {
      return {
        ...state,
        _GoodInfo: payload
      }
    }
  },
  effects: {
    * fetchJSSDKConfig({ payload }, { put, call, select }) {
      const { data, errcode, errmsg } = yield call(apiService.get, { url: `/jssdk/config?${qs.stringify(payload)}` });
      if (!errcode && !errmsg && data) {
        jweixin(data, () => {
          Toast.info(`扫码插件初始化成功`);
        }, (res) => {
          Toast.fail(`扫码插件初始化失败：${JSON.stringify(res, null, 0)}`);
        });
        yield put({ type: 'updateJSSDKConfig', payload: data });
      }
    },
    * fetchGoodInfo({ payload }, { put, call, select }) {
      if (payload) {
        payload.range = 'ONE';
        if (typeof payload.cond === 'object') {
          payload.cond = JSON.stringify(payload.cond, null, 0);
        }
      }
      const ret = yield call(apiService.get, { url: `/good?${qs.stringify(payload)}` });
      const { errcode, errmsg } = ret;
      let { data } = ret;
      if (!errcode && !errmsg && data) {
        data = Array.isArray(data) && data.length > 0 ? data[0] : null;
        yield put({ type: 'updateGoodInfo', payload: data });
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/') {
          dispatch({
            type: 'fetchJSSDKConfig', payload: { jsApiList: 'scanQRCode' }
          });
        }
      });
    },
  },
}
