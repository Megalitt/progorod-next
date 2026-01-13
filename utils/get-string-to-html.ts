export const getStringToHtml = (htmlString: string) => {
  const isClient = typeof window !== 'undefined' ? true : false;
  const arrayDom = [];
  if (isClient) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html').body.childNodes;

    doc.forEach((item) => {
      if (item.nodeName !== '#text') {
        arrayDom.push((item as HTMLElement).outerHTML);
      } else {
        arrayDom.push((item.textContent.replace(item.textContent, `<div>${item.textContent}</div>`)));
      }
    });
  }

  return (isClient ? arrayDom : [htmlString]);
};
