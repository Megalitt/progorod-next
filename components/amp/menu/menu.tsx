import React from 'react';
import Link from 'next/link';
import { isTemplateRegEx } from '../../../utils/consts';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'amp-sidebar': any;
    }
  }
}

const Menu = ({ rubrics, settingSuggestNews }) => (
  <>
    <amp-sidebar
      id="sidebar1"
      layout="nodisplay"
      side="left"
    >
      <div className="nav">
        <nav>
          <ul className="nav__list">
            {
                Array.isArray(rubrics) && rubrics.map(({ link, name }) => (
                  <li className="nav__item" key={`amp-menu-${link}`}>
                    <Link prefetch={false} href={link}>
                      <a
                        className="nav__link"
                        {...(isTemplateRegEx.test(link) && { target: '_blank' })}
                      >
                        {name}
                      </a>
                    </Link>
                  </li>
                ))
              }
          </ul>
        </nav>
        {
          +settingSuggestNews === 1 && (
            <Link prefetch={false} href="/offer-news">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a className="nav__link">+ предложить новость</a>
            </Link>
          )
        }
      </div>
    </amp-sidebar>
    <style jsx>
      {`
        .nav {
          width: 280px;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 10px;
          font-family: 'PT Sans', 'Arial', sans-serif;
          font-size: 14px;
          text-align: left;
          background-color: #3D3D3D;
        }
        
        .nav__list {
          margin: 0;
          padding: 0;
          list-style: none;
        }
        
        .nav__link {
          display: inline-block;
          padding: 6px 0;
          color: #fff;
          font-weight: bold;
          text-transform: uppercase;
          text-decoration: none;
        }
      `}
    </style>
  </>
);

export default Menu;
