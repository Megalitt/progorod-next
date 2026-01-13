import React from 'react';

const Social = ({ social }) => (
  <>
    <ul className="social">
      {social.map((it) => (
        <li key={it.name}>
          <a
            href={it.value}
            className={`social__link ${it.name}`}
            target="_blank"
            aria-label={`Мы в ${it.name}`}
            rel="noopener noreferrer"
          />
        </li>
      ))}
    </ul>
    <style jsx>
      {`
        .social {
            margin: 0;
            padding: 0;
            list-style: none;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .social__link {
            display: block;
            width: 25px;
            height: 25px;
            background-repeat: no-repeat;
            background-position: center;
            opacity: .8;
            transition: opacity .4s;
        }
        
         .social-vk {
              background-image: url("/img/icon-vk.svg");
              background-size: 16px;
        }
    
        .social-fb {
              background-image: url("/img/icon-fb.svg");
              background-size: 10px;
        }
    
        .social-tw {
              background-image: url("/img/icon-tw.svg");
              background-size: 16px;
        }
    
        .social-yt {
              background-image: url("/img/icon-ytb.svg");
              background-size: 16px;
        }
    
        .social-od {
              background-image: url("/img/icon-odn.svg");
              background-size: 12px;
        }
    
        .social-in {
              background-image: url("/img/icon-inst.svg");
              background-size: 14px;
        }
      `}
    </style>
  </>
);

export default Social;
