import React from 'react';
import classNames from 'classnames';

import styles from './button.module.scss';

type Props = {
  disabled?: boolean,
  className?: string,
  onClick?: any,
  type?: any,
};

const Button: React.FC<Props> = React.memo(({ className, ...props }) => (
  <button className={classNames(styles.button, className)} {...props} />
));

export default Button;
