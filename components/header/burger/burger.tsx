import React from 'react';
import classNames from 'classnames';
import styles from './burger.module.scss';

type Props = {
  onBurgerClick: () => void,
  isBurgerShow: boolean
};

const Burger: React.FC<Props> = React.memo(({ onBurgerClick, isBurgerShow }) => (
  <button
    type="button"
    aria-label="Открыть меню"
    onClick={onBurgerClick}
    className={classNames(styles.burger, {
      [styles.burgerHide]: !isBurgerShow,
    })}
  />
));

export default Burger;
