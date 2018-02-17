import * as apiService from '../services/api';

export default {
  namespace: 'index',
  state: {
    count: 0
  },
  reducers: {
    add(count) { return count + 1 },
    minus(count) { return count - 1 },
  },
  effects: {
    * get({ payload }, { put, call, select }) {
      const { data, errcode, errmsg } = yield call(apiService.get, payload);
      const indexPage = yield select(state => state.index);
      if (!errcode && !errmsg) {
        console.log(indexPage);
        console.log(data);
      }
      yield put({ type: 'add', payload: 210 });
    },
  },
}
