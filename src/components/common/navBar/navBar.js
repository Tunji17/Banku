/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './navBar.scss';

const Navbar = ({
  text1,
  text2,
  text3,
  history,
}) => {
  const user = JSON.parse(localStorage.getItem('myinfo'));


  const logOut = () => {
    localStorage.removeItem('myinfo');
    history.push('/')
  };

  return (
    <div className="navbar">
      <nav className="navbar__container">
        <Link to="/dashboard" className="navbar__brand"><h1 className="navbar__brand">Bánkű</h1></Link>
        <input id="toggle-menu" className="navbar__hamburger__toggle" type="checkbox" />
        <label htmlFor="toggle-menu" className="navbar__hamburger__button">
          <span />
          <span />
          <span />
        </label>
        <ul className="navbar__list">
          {
            user?.isAuthenticated ? (
              <li className="navbar__item">
                <span
                  className="navbar__link page__link"
                  onClick={() => logOut()}
                  onKeyPress={() => logOut()}
                  role="button"
                  tabIndex="0"
                >
                  { text3 }
                </span>
              </li>
            ) : (
              <>
                <li className="navbar__item"><Link to="/" className="navbar__link page__link">{ text1 }</Link></li>
                <li className="navbar__item"><Link to="/register" className="navbar__link page__link">{ text2 }</Link></li>
              </>
            )
          }
        </ul>
      </nav>
    </div>
  )
};

Navbar.defaultProps = {
  text1: '',
  text2: '',
  text3: '',
};

Navbar.propTypes = {
  text1: PropTypes.string,
  text2: PropTypes.string,
  text3: PropTypes.string,
  history: PropTypes.instanceOf(Object).isRequired,
};

export default Navbar;
