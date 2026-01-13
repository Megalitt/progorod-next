import React from 'react';
import { Social } from '../index';

const Footer = ({ social, serverHostname }) => {
  const date = new Date();

  return (
    <>
      <footer className="footer">
        <span className="footer__text">
          ©
          {' '}
          { date.getFullYear() }
          {' '}
          {serverHostname}
        </span>
        <Social social={social} />
      </footer>
      <style jsx>
        {`
          .footer {
            background-color: #4D7299;
            padding: 10px;
            color: #fff;
            text-align: center;
          }
          
          .footer__text {
            display: block;
            margin-bottom: 10px;
            font-size: 12px;
          }
        `}
      </style>
    </>
  );
};

export default Footer;
