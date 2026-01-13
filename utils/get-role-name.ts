import { Role } from './consts';

export const getRoleName = (rolCount) => {
  switch (+rolCount) {
    case Role.NONE:
      return 'Пользователь';
    case Role.WRITER:
      return 'Редактор';
    case Role.ADMIN:
      return 'Модератор';
    default:
      return 'Гость';
  }
};
