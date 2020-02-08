import React, { useReducer } from 'react';
import Proptypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import { message as alert } from 'antd';
import Cookie from 'js-cookie';
import BANKU_SERVICE from '../../utils/bankuAPIService';
import AppContext from './appContext';
import AppRedudcer from './appReducer';
import '../../components/common/alert/antAlert.scss';

import {
  SET_LOADING,
  DISABLE_LOADING,
  SIGNUP_USER,
  SIGNIN_USER,
} from '../types';

const AppState = ({ children }) => {
  const initialState = {
    isLoading: false,
    user: {},
    account: {},
    isAuthenticated: false,
  };

  const [state, dispatch] = useReducer(AppRedudcer, initialState);

  const setIsLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  const disableisLoading = () => {
    dispatch({ type: DISABLE_LOADING });
  };

  const signUpUser = async (values, history) => {
    setIsLoading();
    const userData = Object.keys(values).reduce((object, key) => {
      if (key !== 'error' && key !== 'confirmPassword') {
        // eslint-disable-next-line no-param-reassign
        object[key] = values[key]
      }
      return object
    }, {})
    try {
      const res = await BANKU_SERVICE.post('/user/register', userData);
      const { token, user, account } = res.data.data;
      Cookie.set('bankuToken', token);
      const userInfo = jwtDecode(token);
      const myInfo = {
        ...userInfo,
        ...user,
        isAuthenticated: true,
        ...account,
      };
      localStorage.setItem('myinfo', JSON.stringify(myInfo));
      dispatch({
        type: SIGNUP_USER,
        payload: { user, account },
      });
      alert.success(res.data.message);
      history.push('/dashboard');
    } catch (error) {
      alert.error(error.response.data.message);
      disableisLoading();
    }
  };

  const signInUser = async (userData, history) => {
    setIsLoading();
    try {
      const res = await BANKU_SERVICE.post('/user/login', userData);
      const { token, user, account } = res.data.data;
      Cookie.set('bankuToken', token);
      const userInfo = jwtDecode(token);
      const myInfo = {
        ...userInfo,
        ...user,
        isAuthenticated: true,
        ...account,
      };
      localStorage.setItem('myinfo', JSON.stringify(myInfo));
      dispatch({
        type: SIGNIN_USER,
        payload: { user, account },
      });
      alert.success(res.data.message);
      history.push('/dashboard');
    } catch (error) {
      alert.error(error.response.data.message);
      disableisLoading();
    }
  };

  const transferFunds = async (transaction, history) => {
    setIsLoading();
    try {
      const res = await BANKU_SERVICE.post('/account/send', transaction);
      const user = JSON.parse(localStorage.getItem('myinfo'));
      const newBalance = user.balance - transaction.amount;
      const updateInfo = { ...user, balance: newBalance }
      localStorage.setItem('myinfo', JSON.stringify(updateInfo));
      disableisLoading();
      alert.success(res.data.message);
      history.push('/dashboard');
    } catch (error) {
      alert.error(error.response.data.message);
      disableisLoading();
    }
  };

  return (
    <AppContext.Provider
      value={{
        isLoading: state.isLoading,
        setIsLoading,
        disableisLoading,
        user: state.user,
        signUpUser,
        signInUser,
        isAuthenticated: state.isAuthenticated,
        transferFunds,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppState.propTypes = {
  children: Proptypes.node.isRequired,
};

export default AppState;
