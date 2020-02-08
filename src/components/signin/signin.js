import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../common/navBar';
import Footer from '../common/footer';
import AppContext from '../../context/appContext/appContext';

import './signin.scss';

const Signin = ({ history }) => {
  const appContext = useContext(AppContext);
  const { signInUser, isLoading } = appContext;

  const user = JSON.parse(localStorage.getItem('myinfo'));

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const onchange = (event) => {
    event.persist();
    setValues((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  // eslint-disable-next-line consistent-return
  const onSubmit = async (e) => {
    e.preventDefault();
    await signInUser(values, history);
  };

  useEffect(() => {
    if (user?.isAuthenticated) {
      history.push('/dashboard');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavBar text1="LOGIN" text2="REGISTER" text3="LOGOUT" history={history} />
      <div className="signin">
        <form onSubmit={onSubmit} className="signin__form">
          <div className="signin__container">
            <h3 className="signin__heading">Welcome Back</h3>
            <div className="signin__row">
              <input
                className="signin__input"
                name="email"
                type="email"
                placeholder="Email Address"
                onChange={onchange}
                value={values.email}
                required
              />
            </div>
            <div className="signin__row">
              <input
                className="signin__input"
                name="password"
                type="password"
                placeholder="Password"
                value={values.password}
                onChange={onchange}
                required
              />
            </div>
            <div className="signin__row">
              <button className="signin__btn" type="submit" value="LOGIN">
                {isLoading ? 'Please wait...' : 'LOGIN'}
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer text1="LOGIN" text2="REGISTER" />
    </>
  );
};

Signin.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export default Signin;
