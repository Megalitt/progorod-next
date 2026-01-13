import React from 'react';
import { getImagePath } from '../../../utils/core/get-image-path';

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface HTMLAttributes<T> {
    [key: string]: any
  }
}

const Header = ({ logoAmp }) => (
  <>
    <header className="header">
      <button className="hamburger" on="tap: sidebar1.toggle" />
      <amp-img
        className={process.env.NEXT_PUBLIC_LOGO_CLASS}
        src={getImagePath({ image: `/${logoAmp}` })}
        width={95}
        height={40}
        layout="responsive"
        alt="Progorod logo"
      />
    </header>
    <style jsx>
      {`
        .header {
          padding: 15px;
          background-color: #4D7299;
          text-align: center;
          position: relative;
        }
        
        .hamburger {
          width: 45px;
          height: 45px;
          border: none;
          background-color: transparent;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          cursor: pointer;
        }
        
        .hamburger::before {
          content: "";
          width: 25px;
          height: 2px;
          background-color: #fff;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%);
          box-shadow: 0 10px 0 #fff, 0 -10px 0 #fff;
        }
        
        .logo-media41 {
          height: 40px;
        }
      `}
    </style>
  </>
);

export default Header;
