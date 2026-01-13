export const screenSizeInitial = () => {
  let screenWidth = +localStorage.getItem('screenWidth');
  if(screenWidth){
    if (screenWidth >= 768 &&  screenWidth <= 1024) return 'Tablet';
    if (screenWidth > 1024) return 'Desktop';
    if (screenWidth < 768) return 'Mobile';
  }
  return null;
};
