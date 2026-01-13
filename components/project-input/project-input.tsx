import React from 'react';
import classNames from 'classnames';
import { useField } from 'formik';

import styles from './project-input.module.scss';

type Props = {
  placeholder?: string,
  name: string,
  className?: string,
  value?: string | any,
  type?: string,
  autoComplete?: string,
};

const ProjectInput: React.FC<Props> = React.memo(({
  className,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <div
      className={classNames(
        styles.wrap,
        className,
        { [styles.error]: meta.touched && meta.error },
      )}
    >
      <input {...field} {...props} className={styles.field} />
      {meta.touched && meta.error
        ? <span>{meta.error}</span>
        : null}
    </div>
  );
});

export default ProjectInput;
