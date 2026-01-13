export const getFileExtension = (fileName: string) => {
  return fileName && fileName.substr(fileName.lastIndexOf('.') + 1);
};