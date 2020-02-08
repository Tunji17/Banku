import {
  SET_LOADING,
  DISABLE_LOADING,
  SIGNUP_USER,
  SIGNIN_USER,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case DISABLE_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case SIGNUP_USER:
      return {
        ...state,
        user: action.payload.user,
        account: action.payload.account,
        isAuthenticated: true,
        isLoading: false,
      };
    case SIGNIN_USER:
      return {
        ...state,
        user: action.payload.user,
        account: action.payload.account,
        isAuthenticated: true,
        isLoading: false,
      };
    default:
      return state;
  }
};
