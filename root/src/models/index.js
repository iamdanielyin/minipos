import qs from 'qs';
import * as apiService from '../services/api';
import jweixin from '../utils/jweixin';

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
        jweixin(Object.assign({ debug: true }, data));
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
