import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { message as alert } from 'antd';
import NavBar from '../common/navBar';
import Footer from '../common/footer';
import AppContext from '../../context/appContext/appContext';
import '../common/alert/antAlert.scss';
import './signup.scss';

const Signup = ({ history }) => {
  const appContext = useContext(AppContext);
  const { signUpUser, isLoading } = appContext;

  const user = JSON.parse(localStorage.getItem('myinfo'));


  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: '',
  });

  const onchange = (event) => {
    event.persist();
    setValues((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  useEffect(() => {
    if (user?.isAuthenticated) {
      history.push('/dashboard');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line consistent-return
  const onSubmit = async (e) => {
    e.preventDefault();
    if (values.password !== values.confirmPassword) {
      return alert.error('Password must match confirm Password');
    }
    if (!values.accountType.length) {
      return alert.error('Select an account type you would like to open');
    }
    await signUpUser(values, history);
  };

  return (
    <>
      <NavBar text1="LOGIN" text2="REGISTER" text3="LOGOUT" history={history} />
      <div className="signup">
        <form onSubmit={onSubmit} className="signup__form">
          <div className="signup__container">
            <h3 className="signup__heading">Register</h3>
            <div className="signup__row">
              <div id="signup__fullname--error" />
              <input
                className="signup__input"
                name="name"
                type="text"
                placeholder="Full Name"
                onChange={onchange}
                value={values.fullName}
                required
              />
            </div>
            <div className="signup__row">
              <div id="signup__email--error" />
              <input
                className="signup__input"
                name="email"
                type="email"
                placeholder="Email Address"
                onChange={onchange}
                value={values.email}
                required
              />
            </div>
            <div className="signup__row">
              <select
                className="signup__input--select"
                onBlur={onchange}
                name="accountType"
              >
                <option value="">Choose Type of Account</option>
                <option value="SAVINGS">Savings</option>
                <option value="CURRENT">Current</option>
              </select>
            </div>
            <div className="signup__row">
              <input
                className="signup__input"
                name="password"
                type="password"
                placeholder="Password"
                value={values.password}
                onChange={onchange}
                required
              />
            </div>
            <div className="signup__row">
              <input
                className="signup__input"
                name="confirmPassword"
                type="password"
                placeholder="Password Verification"
                value={values.confirmPassword}
                onChange={onchange}
                required
              />
            </div>
            <div className="signup__row">
              <button className="signup__btn" type="submit" value="REGISTER">
                {isLoading ? 'Please wait...' : 'REGISTER'}
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer text1="LOGIN" text2="REGISTER" />
    </>
  );
};

Signup.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export default Signup;
