import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import styles from './question-nav.module.scss';

const QuestionNav: React.FC = () => {
  const router = useRouter();
  const [faqNav, setFaqNav] = useState([{
    name: 'По темам',
    href: '/faq/topic',
    isActive: true,
  },
  {
    name: 'По специалистам',
    href: '/faq/expert',
    isActive: false,
  },
  {
    name: 'По популярности',
    href: '/faq?order=__views',
    isActive: false,
  },
  {
    name: 'По времени',
    href: '/faq?order=timestamp',
    isActive: false,
  },
  ]);

  const handleClickItem = (item) => {
    const currentIndex = faqNav.findIndex((navItem) => item.name === navItem.name);
    const newArr = faqNav.slice();
    // eslint-disable-next-line no-param-reassign,no-return-assign
    newArr.map((elem) => elem.isActive = false);
    newArr[currentIndex].isActive = true;
    setFaqNav(newArr);
    router.push(item.href);
  };

  useEffect(() => {
    const currentIndex = faqNav.findIndex((navItem) => router.asPath === navItem.href);
    if (currentIndex !== -1) {
      const newArr = faqNav.slice();
      // eslint-disable-next-line no-param-reassign,no-return-assign
      newArr.map((elem) => elem.isActive = false);
      newArr[currentIndex].isActive = true;
      setFaqNav(newArr);
    }
  }, []);

  return (
    <div className={styles.nav}>
      {
        faqNav.map((item) => (
          <a
            className={classNames(styles.navItem, {
              [styles.active]: item.isActive,
            })}
            onClick={() => {
              handleClickItem(item);
            }}
            key={item.name}
          >
            {item.name}
          </a>
        ))
      }
    </div>
  );
};

export default QuestionNav;
