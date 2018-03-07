import qs from 'qs';
import * as apiService from '../services/api';
import jweixin from '../utils/jweixin';
import { Toast } from 'antd-mobile';

export default {
  namespace: 'index',
  state: {
    _JSSDKConfig: 0
  },
  reducers: {
    updateJSSDKConfig(state, { payload }) {
      return {
        ...state,
        _JSSDKConfig: payload
      }
    }
  },
  effects: {
    * jssdk_config({ payload }, { put, call, select }) {
      const { data, errcode, errmsg } = yield call(apiService.get, { url: `/jssdk/config?${qs.stringify(payload)}` });
      if (!errcode && !errmsg && data) {
        jweixin(data, () => {
          Toast.info(`初始化成功`);
        }, (res) => {
          Toast.fail(`初始化失败：${JSON.stringify(res, null, 0)}`);
        });
        yield put({ type: 'updateJSSDKConfig', payload: data });
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/') {
          dispatch({
            type: 'jssdk_config', payload: { jsApiList: 'scanQRCode' }
          });
        }
      });
    },
  },
}
