export const onResize = (callback, options) => {
  let isTabletLoad = 0;
  let isMobileLoad = 0;
  let isDesktopLoad = 0;


  const observer = new ResizeObserver((entries) => {
    let defMobile = 768;
    let defDesktop = 1024;
    let screenWidth = +entries[0].contentRect.width;

    if (options) {
      defMobile = options.mobile ? options.mobile : defMobile;
      defDesktop = options.desktop ? options.desktop : defDesktop;
    }

    isMobileLoad = (screenWidth < defMobile) ? isMobileLoad - 1 : 0;
    isTabletLoad = (screenWidth >= defMobile && screenWidth <= defDesktop) ? isTabletLoad - 1 : 0;
    isDesktopLoad = (screenWidth >= defDesktop + 1) ? isDesktopLoad - 1 : 0;
      
    if (isTabletLoad === -1) callback({flag: 'Tablet', screenWidth});
    if (isDesktopLoad === -1) callback({flag: 'Desktop', screenWidth});
    if (isMobileLoad === -1) callback({flag: 'Mobile', screenWidth});
  });
  observer.observe(document.documentElement);
};
