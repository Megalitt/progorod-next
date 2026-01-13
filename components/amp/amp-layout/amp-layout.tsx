import React from 'react';
import { Header, Footer } from '../index';

const AmpLayout = ({ children, serverHostname, logoAmp }) => (
  <>
    <div className={`container ${process.env.NEXT_PUBLIC_LOGO_CLASS}`}>
      <Header logoAmp={logoAmp} />
      <main className="main">
        {children}
      </main>
      <Footer social={[]} serverHostname={serverHostname} />
    </div>
    <style jsx>
      {`
        .container {
          max-width: 980px;
          margin: 0 auto;
          overflow: hidden;
          color: #3D3D3D;
          font-family: 'PT Sans', 'Arial', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.5;
          overflow-wrap: break-word;
          word-wrap: break-word;
          background-color: #fff;
        }
        
        .main {
          min-height: calc(100vh - 110px);
          padding: 20px 15px;
        }
      `}
    </style>
  </>
);

export default AmpLayout;
