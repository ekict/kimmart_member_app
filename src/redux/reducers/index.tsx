import {combineReducers} from 'redux';
import {makeid} from '../../services/utils';
import {IS_ONLINE, REAL_TIME} from '../constants';
import {User, Home, URL} from './data';

const Internet = (state = true, action: any) => {
  switch (action.type) {
    case IS_ONLINE:
      return action.value;
    default:
      return state;
  }
};

const RealTimeRandom = (state = makeid(), action: any) => {
  switch (action.type) {
    case REAL_TIME:
      return action.value;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  online: Internet,
  user: User,
  home: Home,
  realtime: RealTimeRandom,
  url: URL,
});

export type ReducerProps = ReturnType<typeof rootReducer>;

export default rootReducer;
