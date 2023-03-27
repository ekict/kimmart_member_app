import {LOAD_HOME_MEMBER, LOAD_URL, LOAD_USER, REAL_TIME} from '../constants';

export const setLoadUser = (value: any) => {
  return (dispatch: any) => {
    dispatch({type: LOAD_USER, value});
  };
};

export const setLoadHome = (value: any) => {
  return (dispatch: any) => {
    dispatch({type: LOAD_HOME_MEMBER, value});
  };
};

export const setRandomRealtime = (value: any) => {
  return (dispatch: any) => {
    dispatch({type: REAL_TIME, value});
  };
};

export const setLoadURL = (value: any) => {
  return (dispatch: any) => {
    dispatch({type: LOAD_URL, value});
  };
};
