import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import styles from './pagination.module.scss';

type Props = {
  totalCountPages: number,
  initialPage: number,
  onHandlePageChange: ({ selected }: any) => void;
};

const Pagination: React.FC<Props> = React.memo(({
  totalCountPages,
  initialPage,
  onHandlePageChange,
}) => {
  const [pageDisplayed, setPageDisplayed] = useState(5);
  const [marginPagesDisplayed, setMarginPagesDisplayed] = useState(1);

  const onChangePageDisplayed = () => {
    const observer = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;

      if (width < 480) {
        setPageDisplayed(2);
        setMarginPagesDisplayed(0);
      } else if (width > 480) {
        setPageDisplayed(5);
      }

      if (width > 600) {
        setMarginPagesDisplayed(1);
      }
    });
    observer.observe(document.documentElement);

    setTimeout(() => {
      observer.unobserve(document.documentElement);
    }, 0);
  };

  const handleUpdatePageResize = React.useCallback(() => onChangePageDisplayed(), []);

  useEffect(() => {
    onChangePageDisplayed();
    window.addEventListener('resize', handleUpdatePageResize);

    return () => {
      window.removeEventListener('resize', handleUpdatePageResize);
    };
  }, [pageDisplayed]);

  return (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      breakLabel="..."
      breakClassName="break-me"
      pageCount={totalCountPages}
      marginPagesDisplayed={marginPagesDisplayed}
      pageRangeDisplayed={pageDisplayed}
      onPageChange={onHandlePageChange}
      containerClassName={styles.pagination}
      pageLinkClassName={styles.paginationLink}
      breakLinkClassName={styles.paginationLink}
      previousLinkClassName={styles.paginationBtnPrev}
      nextLinkClassName={styles.paginationBtnNext}
      activeLinkClassName={styles.paginationLinkActive}
      disabledClassName={styles.paginationBtnDisabled}
      forcePage={+initialPage - 1}
    />
  );
});

export default Pagination;
