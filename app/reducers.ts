import {combineReducers} from 'redux';
import {SWITCH_VIDEO, TOGGLE_COMMENT} from './actions';

const initialState = {
  app: {
    version: '0.0.1',
  },
  home: {
    currentVideoIndex: 0,
  },
  user: {
    name: 'default',
  },
  comment: {
    isModalVisible: true,
  },
};

let appReducer = (s: any = initialState.app, a: any) => {
  switch (a.type) {
    case 'A':
      return {...s};
    default:
      return s;
  }
};

let homeReducer = (s: any = initialState.home, a: any) => {
  switch (a.type) {
    case SWITCH_VIDEO:
      return {...s, currentVideoIndex: a.currentVideoIndex};
    default:
      return s;
  }
};

let userReducer = (s: any = initialState.user) => s;

let commentReducer = (s: any = initialState.comment, a: any) => {
  switch (a.type) {
    case TOGGLE_COMMENT:
      return {...s, isModalVisible: !s.isModalVisible};
    default:
      return s;
  }
};

export const rootReducer = combineReducers({
  app: appReducer,
  home: homeReducer,
  user: userReducer,
  comment: commentReducer,
});
