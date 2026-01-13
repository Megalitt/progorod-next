import React from 'react';
import classNames from 'classnames';
import styles from './article-layout.module.scss';

const ArticleLayout: React.FC = React.memo(({ children }) => {
  const childrens = React.Children.toArray(children);
  return (
    <div
      className={classNames(styles.wrap, {
        [styles.wrapCHEBOKSARY]: process.env.NEXT_PUBLIC_FORK_NAME === 'CHEBOKSARY',
      })}
    >
      {childrens.map((item: { props: { children: React.ReactNode } }, index) => {
        if (childrens.length === 1) {
          return <div key={`article-layout-${Math.random() * index}`} className={styles.body}>{item.props.children}</div>;
        }
        return item;
      })}
    </div>
  );
});

export default ArticleLayout;
