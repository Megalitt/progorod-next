import React, { useCallback, useState } from 'react';
import { getParamsComplaintsPage } from '../../utils/services/get-params-complaints-page';
import Pagination from '../pagination/pagination';
import styles from './pagination-with-load-more.module.scss';

const PaginationWithLoadMore = ({
  searchRequest,
  totalCountPages,
  currentPage,
  routerPush,
  rubric,
  LoadMoreComponent,
  loadDataApi,
}) => {
  const [isResetLoadMore, setResetLoadMore] = useState(false);
  const [resetCurrentPage, setResetCurrentPage] = useState(currentPage);
  const [isLoadMoreClick, setLoadMoreClick] = useState(false);
  const [paginationQuery, setPaginationQuery] = useState({});

  React.useEffect(() => {
    if (searchRequest.page) {
      setResetCurrentPage(searchRequest.page);
    } else {
      setResetCurrentPage(currentPage);
    }
  }, [currentPage, searchRequest]);

  React.useEffect(() => {
    setPaginationQuery(searchRequest);
  }, [searchRequest]);

  React.useEffect(() => {
    if (isLoadMoreClick) {
      const {
        categoryGet,
        dataFromGet,
        dataToGet,
        searchRequestGet,
        orderGet,
        keyGet,
      } = getParamsComplaintsPage(searchRequest);
      const pageGet = (!categoryGet && !dataFromGet && !dataToGet && !searchRequestGet && !orderGet && !keyGet) ? `?page=${resetCurrentPage}` : `&page=${resetCurrentPage}`;
      window.history.pushState('', '', `/${rubric}${searchRequestGet}${categoryGet}${dataFromGet}${dataToGet}${pageGet}`);
    }
  }, [resetCurrentPage, isLoadMoreClick]);

  const handleResetLoadMore = useCallback((isReset: boolean) => {
    setResetLoadMore(isReset);
  }, []);

  const handleLoadMoreClick = useCallback((value: boolean) => {
    setLoadMoreClick(value);
    setResetCurrentPage((prev) => +prev + 1);
  }, []);

  const handlePageChange = useCallback(async ({ selected }: any) => {
    setResetLoadMore(true);
    setLoadMoreClick(false);
    setResetCurrentPage(selected + 1);

    const {
      categoryGet,
      dataFromGet,
      dataToGet,
      searchRequestGet,
      orderGet,
      keyGet,
    } = getParamsComplaintsPage(paginationQuery);

    const pageGet = (!categoryGet && !dataFromGet && !dataToGet && !searchRequestGet && !orderGet && !keyGet) ? `?page=${selected + 1}` : `&page=${selected + 1}`;
    routerPush(`/${rubric}${searchRequestGet}${categoryGet}${dataFromGet}${dataToGet}${pageGet}`);
  }, [paginationQuery]);

  return (
    <>
      {totalCountPages > 0 ? (
        <>
          {resetCurrentPage >= 5 && (
          <LoadMoreComponent
            searchRequest={searchRequest}
            loadDataApi={loadDataApi}
            totalCountPages={totalCountPages}
            resetCurrentPage={+resetCurrentPage + 1}
            isResetLoadMore={isResetLoadMore}
            className={styles.paginationWithLoadMoreBtn}
            onHandleResetLoadMore={handleResetLoadMore}
            onHandleLoadMoreClick={handleLoadMoreClick}
            isLoadedComponent
          />
          )}
          {totalCountPages > 1 && (
            <Pagination
              totalCountPages={totalCountPages}
              initialPage={resetCurrentPage}
              onHandlePageChange={handlePageChange}
            />
          )}
        </>
      ) : 'Ничего не найдено'}
    </>
  );
};

export default PaginationWithLoadMore;
