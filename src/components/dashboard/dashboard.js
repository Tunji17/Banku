import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Loading from '../common/loader';
import NavBar from '../common/navBar';
import AppContext from '../../context/appContext/appContext';


import './dashboard.scss';

const Dashboard = ({ history }) => {
  const appContext = useContext(AppContext);
  const { getInfo, transferFunds, isLoading } = appContext;


  const user = JSON.parse(localStorage.getItem('myinfo'));

  useEffect(() => {
    if (user === null || user?.isAuthenticated === false) {
      history.push('/');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getInfo()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [values, setValues] = useState({
    accountNumber: '',
    amount: '',
  });

  const onchange = (event) => {
    event.persist();
    setValues((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  // eslint-disable-next-line consistent-return
  const onSubmit = async (e) => {
    e.preventDefault();
    await transferFunds(values, history);
  };


  return (
    isLoading ? <Loading /> : (
      <>
        <NavBar text1="LOGIN" text2="REGISTER" text3="LOGOUT" history={history} />

        <div className="dashboard">
          <div className="dashboard__account">
            <h1 className="dashboard__account--message">
              Welcome Back,
              {' '}
              {user?.name}
              {' '}
              !
            </h1>
            <div className="dashboard__account--info">
              <h2>Account Information=&gt;</h2>
              <div className="dashboard__account--details">
                <h3>
                  Account Number:
                  {' '}
                  {user?.number}
                </h3>
                <h3>
                  Account Type:
                  {' '}
                  {user?.type}
                </h3>
                <h3>
                  Account Balance:
                  {' '}
                  ₦
                  {user?.balance}
                </h3>
              </div>
            </div>
          </div>
          <div className="dashboard__tranferfunds">
            <form onSubmit={onSubmit} className="dashboard__tranferfunds--form">
              <div className="dashboard__tranferfunds--container">
                <h3 className="dashboard__tranferfunds--heading">Send Money Efficiently</h3>
                <div className="dashboard__tranferfunds--row">
                  <input
                    className="dashboard__tranferfunds--input"
                    name="accountNumber"
                    type="number"
                    placeholder="Recieving Account Number"
                    onChange={onchange}
                    value={values.accountNumber}
                    required
                  />
                </div>
                <div className="dashboard__tranferfunds--row">
                  <input
                    className="dashboard__tranferfunds--input"
                    name="amount"
                    type="number"
                    placeholder="Transfer Amount"
                    value={values.amount}
                    onChange={onchange}
                    required
                  />
                </div>
                <div className="dashboard__tranferfunds--row">
                  <button className="dashboard__tranferfunds--btn" type="submit" value="TRANSFER">
                    {isLoading ? 'Please wait...' : 'TRANSFER'}
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div />
        </div>
      </>
    )
  );
};

Dashboard.defaultProps = {
  history: {},
};

Dashboard.propTypes = {
  history: PropTypes.instanceOf(Object),
};

export default Dashboard;
