import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { NewsLine } from '../../../news-line';
import { ProjectInnerLayout } from '../../../../layouts/project-inner-layout';
import { apiGetSearchResult } from '../../../../services/search';
import { WithLoadMore } from '../../../../hocs/with-load-more/with-load-more';
import styles from './search-live-result.module.scss';

const LoadMore = WithLoadMore(NewsLine);

const PaginationWithLoadMore = dynamic(
  () => import('../../../pagination-with-load-more/pagination-with-load-more'),
  { loading: () => <p>...</p> },
);

type PostsType = {
  id: number,
  title: string,
  image: string,
  uri: string,
  empty_template: boolean | number,
  comments_count: number,
  publish_at: number,
  tags: string,
};

type SearchResultProps = {
  handleChangeInput: (evt: React.ReactNode) => void;
  handleChangeInputSync: (evt: React.ReactNode) => void;
  handleSearchEnterSubmit: () => void;
  posts: Array<PostsType>;
  lastNews: any;
  searchRequest: string;
  searchRequestValue: string;
  totalCountPages: number;
  results: any[];
  isNotFound: boolean
  inputEl?: any;
  currentPage: number,
  rightMainBanners?: any,
  bannersRight?: any,
  bannersMediaMetrika?: any,
  bannersCentral?: any,
  disableComment: string | number,
  picModerateYear: number,
};

const SearchLiveResult: React.FC<SearchResultProps> = React.memo(({
  posts,
  lastNews,
  searchRequestValue,
  currentPage,
  results,
  isNotFound,
  inputEl,
  totalCountPages,
  rightMainBanners,
  bannersCentral,
  bannersRight,
  bannersMediaMetrika,
  disableComment,
  picModerateYear,
  handleSearchEnterSubmit,
  handleChangeInput,
  handleChangeInputSync,
}) => {
  const [resetCurrentPage, setResetCurrentPage] = useState(currentPage);
  const { query, push } = useRouter();

  useEffect(() => {
    if (query.page) {
      setResetCurrentPage(+query.page);
    }
  }, [query.page]);

  const resultsData = results && results.length > 0 ? results
    : results.length === 0 && posts && posts.length > 0 && posts;

  return (
    <>
      <div className={styles.searchLivePage}>
        <form className={styles.searchLivePageForm}>
          <input
            className={styles.searchLivePageInput}
            type="text"
            placeholder="Введите текст новости"
            onChange={(evt) => {
              handleChangeInput(evt);
              handleChangeInputSync(evt);
            }}
            onKeyPress={handleSearchEnterSubmit}
            ref={inputEl}
            value={searchRequestValue}
          />
          <button className={styles.searchLivePageSubmit} type="submit" aria-label="Искать" />
        </form>

        <ProjectInnerLayout
          bannersRight={bannersRight}
          rightMainBanners={rightMainBanners}
          bannersCentral={bannersCentral}
          bannersMediaMetrika={bannersMediaMetrika}
          picModerateYear={picModerateYear}
          lastNews={lastNews}
        >
          <>
            {
              resultsData && resultsData.length > 0 && resultsData
                .slice(0, 5)
                .map((newsItem) => <NewsLine {...newsItem} key={`search-${newsItem.id}`} disableComment={disableComment} picModerateYear={picModerateYear} />)
            }
          </>
          <>
            {
              resultsData && resultsData.length > 0 && resultsData
                .slice(5, 10)
                .map((newsItem) => <NewsLine {...newsItem} key={`search-${newsItem.id}`} disableComment={disableComment} picModerateYear={picModerateYear} />)
            }
          </>
          <>
            {
              resultsData && resultsData.length > 0 && resultsData
                .slice(10, 15)
                .map((newsItem) => <NewsLine {...newsItem} key={`search-${newsItem.id}`} disableComment={disableComment} picModerateYear={picModerateYear} />)
            }
          </>
        </ProjectInnerLayout>
        <PaginationWithLoadMore
          searchRequest={query}
          totalCountPages={totalCountPages}
          currentPage={resetCurrentPage}
          routerPush={push}
          rubric="search"
          LoadMoreComponent={LoadMore}
          loadDataApi={apiGetSearchResult}
        />
        {isNotFound && 'Ничего не найдено'}
      </div>
    </>
  );
});

export default SearchLiveResult;
