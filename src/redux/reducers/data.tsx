import {LOAD_HOME_MEMBER, LOAD_USER} from '../constants';

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
