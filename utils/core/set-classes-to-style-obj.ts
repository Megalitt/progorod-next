import styles from '../../components/link-custom/link-custom.module.scss';

export const setClassesToStyleObj = (style: object, classes: string): string => (
  classes.split(' ').map((item) => styles[item]).join(' ')
);
