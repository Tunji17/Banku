import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './footer.scss';

const Footer = ({ text1, text2 }) => (
  <div className="footer">
    <Link to="/" className="footer__brand"><h1 className="footer__brand">Bánkű</h1></Link>
    <ul className="footer__list">
      <li className="footer__item"><Link to="/" className="footer__link">{ text1 }</Link></li>
      <li className="footer__item"><Link to="/register" className="footer__link">{ text2 }</Link></li>
    </ul>
  </div>
);

Footer.defaultProps = {
  text1: '',
  text2: '',
};

Footer.propTypes = {
  text1: PropTypes.string,
  text2: PropTypes.string,
};

export default Footer;
