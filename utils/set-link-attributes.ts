export const setLinkAttributes = (domainList, url) => {
  let isDomainInWhiteList = false;
  let isDomainInUrl = false;

  const isDomainInString = url.match(/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\\]))?/);
  
  if (isDomainInString) {
    try {
      const apiGetDomain = new URL(url);
      const domainListFiltered = domainList.filter(({ domain }) => (domain === apiGetDomain.host));
      
      if (domainListFiltered.length > 0) {
        isDomainInUrl = false;
        isDomainInWhiteList = true;
      }
    } catch (e) {
      console.log(e);
    }
  }
  

  return {
    isDomainInWhiteList,
    isDomainInString
  };
};
