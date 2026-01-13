import React, {
  useCallback,
  useEffect,
  useState
} from 'react';
import classNames from 'classnames';
import { Loader } from '../../components/loader';
import { debounce } from '../../utils/core/debounce';
import styles from './with-load-more.module.scss';

type Props = {
  searchRequest?: any;
  loadDataApi: (searchRequest?: string, count?: number) => void;
  onHandleResetLoadMore?: (isReset: boolean) => void;
  onHandleLoadMoreClick?: (isLoadMore) => void;
  isResetLoadMore?: boolean;
  resetCurrentPage?: number;
  totalCountPages?: number;
  isLoadedComponent?: boolean;
  className?: string;
};

export const WithLoadMore = (Component: React.ComponentType) => {
  const WithLoadMoreComponent = (props: Props) => {
    const {
      searchRequest,
      isResetLoadMore,
      resetCurrentPage,
      totalCountPages,
      className,
      isLoadedComponent,
      loadDataApi,
      onHandleResetLoadMore,
      onHandleLoadMoreClick,
    } = props;

    const [count, setCount] = useState(+resetCurrentPage);
    const [result, setResult] = useState([]);
    const [isLoaded, setLoaded] = useState(true);
    const [isfetchingFlag, setFetchingFlag] = useState(false);

    const handleScroll = useCallback(() => {
      const windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
      if (windowRelativeBottom - 10 < document.documentElement.clientHeight) {
        setFetchingFlag(true);
      }
    }, []);

    const handleGetResult = () => {
      setFetchingFlag(true);
      onHandleResetLoadMore(false);
      onHandleLoadMoreClick(true);
    };

    const getResult = async () => {
      if ('page' in searchRequest) {
        searchRequest.page = count;
      }
      const { data, headers }: any = await loadDataApi(searchRequest, count);
      if (headers) {
        const currentPage = headers['x-pagination-current-page'];
        const totalPage = headers['x-pagination-page-count'];

        if (+currentPage <= +totalPage) {
          setFetchingFlag(false);
          setLoaded(true);
          setResult([...result, ...data]);
        } else {
          setLoaded(true);
        }
        setCount((prev) => prev + 1);
      }
    };

    const getResultDebounce = debounce(getResult, 1000);

    useEffect(() => {
      if (isfetchingFlag) {
        getResultDebounce();
        setLoaded(false);
      }
      if (isResetLoadMore) {
        setCount(resetCurrentPage);
        setResult([]);
        setLoaded(true);
        setFetchingFlag(false);
      }
    }, [isfetchingFlag, isResetLoadMore]);

    useEffect(() => {
      if (count >= 5) {
        window.removeEventListener('scroll', handleScroll);
      } else {
        window.addEventListener('scroll', handleScroll);
      }
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [count]);

    return (
      <>
        {result.length > 0 && result.map((newsItem) => (
          <Component {...newsItem} isLoadedComponent={isLoadedComponent} key={newsItem.id} />
        ))}
        {count >= 5 && count <= +totalCountPages && isLoaded && (
          <button
            className={classNames(styles.withLoadMoreBtn, className)}
            onClick={handleGetResult}
            type="button"
          >
            Показать еще
          </button>
        )}
        {!isLoaded && <Loader />}
      </>
    );
  };

  WithLoadMoreComponent.defaultProps = {
    searchRequest: '',
    isResetLoadMore: false,
    totalCountPages: 0,
    resetCurrentPage: 2,
    className: null,
    isLoadedComponent: false,
    onHandleResetLoadMore: () => null,
    onHandleLoadMoreClick: () => null,
  };

  return WithLoadMoreComponent;
};
