import React from 'react';
import classNames from 'classnames';
import { useField } from 'formik';
import useToggleVisibleAnimate from '../../hooks/use-close-animate';
import useClickOutside from '../../hooks/use-click-outside';

import styles from './project-select-custom.module.scss';

type CategoriesType = {
  id: number,
  title: string,
};

type Props = {
  name: string,
  className?: string,
  classNameActive?: string,
  options: Array<CategoriesType>
  selectedDefaultValue: any,
  isCloseAnimated?: boolean;
  isShowElement?: boolean;
  setFieldValue: (fieldName: string, fieldValue: string | number) => void;
};

const ProjectSelectCustom: React.FC<Props> = React.memo(({
  className,
  classNameActive,
  setFieldValue,
  ...props
}) => {
  const { options, selectedDefaultValue, name } = props;
  const [field, meta] = useField(props);
  const [currentSelectedName, setCurrentSelectedName] = React.useState(selectedDefaultValue);
  const [currentSelectedValue, setCurrentSelectedValue] = React.useState(0);

  const optionsCutFirstItem = options.slice(0, options.length);

  const {
    isShowElement,
    isCloseAnimated,
    handleOpenClick,
    handleCloseClick,
  } = useToggleVisibleAnimate();

  const handleVisibleToggleClick = React.useCallback(
    (evt) => {
      evt.preventDefault();
      if (!isShowElement) {
        handleOpenClick();
      } else {
        handleCloseClick();
      }
    },
    [isShowElement],
  );

  const handlaSelectOptionClick = React.useCallback((evt) => {
    setCurrentSelectedName(evt.target.innerText);
    setCurrentSelectedValue(+evt.target.getAttribute('data-value'));
    setFieldValue(name, +evt.target.getAttribute('data-value'));
  }, []);

  const refDropdown = useClickOutside(() => {
    handleCloseClick();
  });

  const selectedName = currentSelectedName === selectedDefaultValue
    ? options[currentSelectedName].title
    : currentSelectedName;

  return (
    <div
      className={classNames(styles.field, className, {
        [classNameActive]: !isCloseAnimated,
        [styles.fieldActive]: !isCloseAnimated,
        [styles.fieldIsSelected]: currentSelectedValue > 0 || selectedDefaultValue > 0,
        [styles.fieldError]: meta.error,
      })}
      onClick={handleVisibleToggleClick}
      onKeyDown={handleVisibleToggleClick}
      tabIndex={0}
      role="button"
    >
      {selectedName}
      <input
        {...field}
        type="hidden"
        value={currentSelectedValue > 0 ? currentSelectedValue : selectedDefaultValue}
      />
      { isShowElement && (
      <div
        className={classNames(styles.dropDown, {
          [styles.dropDownClose]: isCloseAnimated,
        })}
        ref={refDropdown}
      >
        { optionsCutFirstItem.map((item) => (
          <div
            className={styles.dropDownItem}
            key={`select-${item.title}`}
            data-value={item.id}
            onClick={handlaSelectOptionClick}
            onKeyDown={handlaSelectOptionClick}
            role="button"
            tabIndex={0}
          >
            {item.title}
          </div>
        ))}
      </div>
      )}
      {meta.error
        ? <span>{meta.error}</span>
        : null}
    </div>
  );
});

export default ProjectSelectCustom;
