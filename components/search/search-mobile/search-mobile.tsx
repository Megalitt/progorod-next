import React from 'react';
import { useRouter } from 'next/router';
import styles from './search-mobile.module.scss';

const SearchMobile = () => {
  const router = useRouter();

  const handleSearchEnterSubmit = (evt) => {
    const { value } = evt.target;
    if (evt.which === 13 && value.trim().length >= 3) {
      evt.preventDefault();
      router.push(`/search?searchRequest=${value}`);
    }
  };

  const handleSearchSubmit = (evt) => {
    evt.preventDefault();
    const { value } = evt.target[0];

    if (value.trim().length >= 3) {
      router.push(`/search?searchRequest=${value}`);
    }
  };

  return (
    <form className={styles.searchMobile} onSubmit={handleSearchSubmit}>
      <input
        className={styles.searchMobileInput}
        type="text"
        placeholder="Поиск"
        name="search_request"
        autoComplete="off"
        onKeyPress={handleSearchEnterSubmit}
      />
      <button
        className={styles.searchMobileBtn}
        type="submit"
        aria-label="Искать"
      />
    </form>
  );
};

export default SearchMobile;
