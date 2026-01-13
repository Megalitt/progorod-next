export const getFormatBytes = (bytes: number, decimals: number = 2) => {
  if (bytes === 0) return '0 Bytes';
  const sizes = ['b', 'Kb', 'Mb'];
  const kb = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const itog = Math.floor(Math.log(bytes) / Math.log(kb));
  return `${parseFloat((bytes / (kb ** itog)).toFixed(dm))} ${sizes[itog]}`;
};
