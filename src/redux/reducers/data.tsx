import {LOAD_HOME_MEMBER, LOAD_URL, LOAD_USER} from '../constants';

export const User = (state = null, action: any) => {
  switch (action.type) {
    case LOAD_USER:
      return action.value;
    default:
      return state;
  }
};

export const Home = (state = null, action: any) => {
  switch (action.type) {
    case LOAD_HOME_MEMBER:
      return action.value;
    default:
      return state;
  }
};

export const URL = (state = '', action: any) => {
  switch (action.type) {
    case LOAD_URL:
      return action.value;
    default:
      return state;
  }
};
