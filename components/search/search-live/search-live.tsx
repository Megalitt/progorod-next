import React from 'react';
import classNames from 'classnames';
import { Loader } from '../../loader';
import { SearchResult } from '../search-result';
import styles from './search-live.module.scss';
import { WithSearchLive } from '../../../hocs/with-search-live/with-search-live';

type Props = {
  handleChangeInput: () => void;
  handleSearchEnterSubmit: () => void;
  handleSearchSubmit: () => void;
  onCloseSearch: () => void,
  isCloseSearchAnimated: boolean,
  results: any[];
  isLoaded: boolean,
  isNotFound: boolean
};

const SearchLive: React.FC<Props> = ({
  onCloseSearch,
  isCloseSearchAnimated,
  handleChangeInput,
  handleSearchEnterSubmit,
  handleSearchSubmit,
  results,
  isLoaded,
  isNotFound,
}) => (
  <>
    <div
      className={classNames(styles.searchLiveShadow, {
        [styles.searchLiveShadowCloseAnimate]: isCloseSearchAnimated,
      })}
      aria-label="Закрыть меню"
      onClick={onCloseSearch}
      aria-hidden="true"
    />
    <div className={classNames(styles.searchLive, {
      [styles.searchLiveCloseAnimate]: isCloseSearchAnimated,
    })}
    >
      <div className={styles.searchLiveInner}>
        <form className={styles.searchLiveForm} onSubmit={handleSearchSubmit}>
          <input
            className={styles.searchLiveInput}
            type="text"
            placeholder="Поиск"
            name="search_request"
            onChange={handleChangeInput}
            onKeyPress={handleSearchEnterSubmit}
            autoComplete="off"
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
          />
          <button
            className={styles.searchLiveSubmit}
            type="submit"
            aria-label="Искать"
          />
        </form>

        { isNotFound
          && isLoaded
          && <div className={styles.searchLiveNotFound}>Ничего не найдено</div>}

        {!isLoaded && <Loader />}
        {results.length > 0 && <SearchResult results={results} />}
      </div>
    </div>
  </>
);

export default WithSearchLive(SearchLive);
