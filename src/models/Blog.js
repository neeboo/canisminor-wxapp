import { wx, api } from '../utils';

export default {
  namespace: 'blog',

  state: {
    blogToc: [],
  },

  reducers: {
    queryBlogTocSuccess(state, action) {
      const blogToc = action.payload.Data;
      return { ...state, blogToc };
    },
  },

  effects: {
    *queryBlogToc(action, { call, put }) {
      wx.showLoading({ title: 'Loading' });
      try {
        const Data = yield call(api.queryBlogToc);
        wx.hideLoading();
        wx.stopPullDownRefresh();
        yield put({ type: 'queryBlogTocSuccess', payload: { Data } });
      } catch (e) {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        console.log('data error', e);
      }
    },
  },
};
