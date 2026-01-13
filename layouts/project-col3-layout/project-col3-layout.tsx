import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { setColCenterHeight } from '../../store/column-height/column-height-slice';

import styles from './project-col3-layout.module.scss';
import { isMobileSelector } from '../../store/seo/seo-selectors';
import { RowsLayout } from '../rows-layout';

type Props = {
  noRows?: boolean,
  className?: string,
  scroll?: boolean,
};

const ProjectCol3Layout: React.FC<Props> = React.memo(({
  children, noRows = false,
  className,
  scroll,
}) => {
  const isMobile = useSelector(isMobileSelector);
  const dispatch = useDispatch();
  const router = useRouter();

  const measuredRef = React.useRef(null);

  const getRows = (arr) => {
    const innerRows = [];

    for (let i = 1; i < arr.length; i += 1) {
      if (i % 2 !== 0) innerRows.push([arr[i], arr[i + 1]]);
    }
    return innerRows;
  };

  const rows = getRows(children);

  useEffect(() => {
    if (!isMobile && !scroll) {
      const onSetClientHeight = () => {
        const observer = new ResizeObserver((entries) => {
          const {height} = entries[0].contentRect;
          dispatch(setColCenterHeight(measuredRef && measuredRef.current && height));
        });
        observer.observe(measuredRef.current);
  
        setTimeout(() => {
          observer.unobserve(measuredRef.current);
        }, 0);
      };

      onSetClientHeight();

      window.addEventListener('load', onSetClientHeight);
      setTimeout(onSetClientHeight, 5000);
      window.removeEventListener('load', onSetClientHeight);
    }
    
  }, [router, measuredRef, isMobile]);

  return (
    <div className={classNames(styles.grid, className)}>
      <div className={styles.colLeft}>
        {children[0]}
      </div>

      <div className={styles.colRight}>
        <div ref={measuredRef}>
          {!noRows && rows.length > 0 ? (
            rows.map((item, index) => (
              <React.Fragment key={`children-${index}`}>              
                {item[0] && <div className={styles.row}>
                  <div className={styles.contentMain}>{item[0]}</div>
                  <div className={styles.contentRightStretch}>{item[1]}</div>
                </div>}
              </React.Fragment>
            ))
          ) : (
            <>
              <div className={styles.row}>
                <div className={styles.contentMain}>{children[1]}</div>
                <div className={styles.contentRightStretch}>{children[2]}</div>
              </div>
              <RowsLayout>{ children[3] }</RowsLayout>
            </>
          )}
        </div>
      </div>

    </div>
  );
});

export default ProjectCol3Layout;
