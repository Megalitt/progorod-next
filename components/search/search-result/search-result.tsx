import React from 'react';
import { LinkTarget } from '../../link-target';
import styles from './search-result.module.scss';

type SearchResultType = {
  id: number,
  title: string,
  rubric: string,
  empty_template: boolean | number,
  uri: string,
};

type Props = {
  results:Array<SearchResultType>
};

const SearchResult: React.FC<Props> = React.memo(({ results }) => (
  <div className={styles.searchResult}>
    {results.map((result) => (
      <LinkTarget key={`SearchResult-${result.id}`} isTemplate={result.empty_template} href={result.uri}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className={styles.searchResultItem}>
          {result.title}
        </a>
      </LinkTarget>
    ))}
  </div>
));

export default SearchResult;
