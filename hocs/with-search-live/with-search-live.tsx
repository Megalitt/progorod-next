import React, {
  ComponentType,
  useState,
  useCallback,
} from 'react';

import { useRouter } from 'next/router';
import { debounce } from '../../utils/core/debounce';
import { apiGetSearchResult } from '../../services/search';

type PostsType = {
  title: string,
  image: string,
  uri: string,
  empty_template: boolean | number,
  comments_count: number,
  publish_at: number,
  tags: string,
};

type Props = {
  handleChangeInput?: (evt: React.ReactNode) => void,
  handleChangeInputSync?: (evt: React.ReactNode) => void,
  handleSearchEnterSubmit?: (evt: React.ReactNode) => void,
  handleSearchSubmit?: (evt: React.ReactNode) => void,
  onCloseSearch?: () => void,
  searchRequest?: string,
  currentPage?: number,
  totalCountPages?: number,
  disableComment?: string | number,
  picModerateYear?: number,
  posts?: Array<PostsType>,
  lastNews?: any,
  results?: object,
  isLoaded?: boolean,
  isNotFound?: boolean
  isCloseSearchAnimated?: boolean,
  inputEl?: any;
  isLiveHeader?: boolean,
  searchRequestValue?: string,
  rightMainBanners?: any,
  bannersRight?: any,
  bannersCentral?: any,
  bannersMediaMetrika?: any,
};

export const WithSearchLive = (Component: ComponentType<Props>) => {
  const WithSearchLiveComponent = (props: Props) => {
    const {
      onCloseSearch,
      isCloseSearchAnimated,
      searchRequest,
      currentPage,
      posts,
      lastNews,
      isLiveHeader,
      rightMainBanners,
      bannersRight,
      bannersCentral,
      bannersMediaMetrika,
      disableComment,
      picModerateYear,
    } = props;

    const inputEl = React.useRef(null);
    const [results, setResults] = useState([]);
    const [searchRequestValue, setSearchRequestValue] = useState(searchRequest);
    const [searchCurrentPageLive, setSearchCurrentPageLive] = React.useState(currentPage);
    const [isLoaded, setLoaded] = useState<boolean>(true);
    const [isNotFound, setNoFound] = useState(false);
    const router = useRouter();

    const handleChangeInput = async (evt) => {
      const { value } = evt.target;
      if (value.trim().length >= 3) {
        setLoaded(false);
        setSearchCurrentPageLive(1);

        if (isLiveHeader) {
          const { data }:any = await apiGetSearchResult(value);
          if (data.length > 0) {
            setResults(data);
            setNoFound(false);
          } else {
            setResults([]);
            setNoFound(true);
          }
        } else {
          router.push(`/search?searchRequest=${value}&per-page=15&page=1`);
        }
      } else {
        setResults([]);
        setNoFound(false);
      }
      setLoaded(true);
    };

    const onHandleChangeInputDebounce = useCallback(debounce(handleChangeInput, 500), []);

    const onHandleSearchEnterSubmit = (evt) => {
      const { value } = evt.target;
      if (evt.which === 13 && value.trim().length >= 3) {
        evt.preventDefault();
        router.push(`/search?searchRequest=${value}&page=1&per-page=15`);
      }
    };

    const onHandleSearchSubmit = (evt) => {
      evt.preventDefault();
      const { value } = evt.target[0];
      if (value.trim().length >= 3) {
        router.push(`/search?searchRequest=${value}&page=1&per-page=15`);
      }
    };

    const handleChangeInputSync = (evt) => {
      setSearchRequestValue(evt.target.value);
    };

    return (
      <>
        <Component
          {...props}
          onCloseSearch={onCloseSearch}
          isCloseSearchAnimated={isCloseSearchAnimated}
          handleChangeInput={onHandleChangeInputDebounce}
          handleChangeInputSync={handleChangeInputSync}
          handleSearchEnterSubmit={onHandleSearchEnterSubmit}
          handleSearchSubmit={onHandleSearchSubmit}
          results={results}
          isLoaded={isLoaded}
          isNotFound={isNotFound}
          searchRequest={searchRequest}
          currentPage={searchCurrentPageLive}
          posts={posts}
          lastNews={lastNews}
          inputEl={inputEl}
          searchRequestValue={searchRequestValue}
          rightMainBanners={rightMainBanners}
          bannersRight={bannersRight}
          bannersCentral={bannersCentral}
          bannersMediaMetrika={bannersMediaMetrika}
          disableComment={disableComment}
          picModerateYear={picModerateYear}
        />
      </>
    );
  };

  WithSearchLiveComponent.defaultProps = {
    handleChangeInput: () => null,
    handleChangeInputSync: () => null,
    handleSearchEnterSubmit: () => null,
    handleSearchSubmit: () => null,
    onCloseSearch: () => null,
    searchRequest: '',
    searchRequestValue: '',
    isCloseSearchAnimated: false,
    totalCountPages: 0,
    disableComment: 0,
    currentPage: 1,
    results: false,
    isLoaded: true,
    isNotFound: false,
    posts: [],
    inputEl: null,
    isLiveHeader: false,
    rightMainBanners: [],
    bannersRight: [],
    bannersCentral: [],
    bannersMediaMetrika: [],
  };
  return WithSearchLiveComponent;
};
