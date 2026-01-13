export const getTagsMicroData = (tags) => {
  let tagsMicrodata = '';

  for (let i = 0; i < tags.length; i += 1) {
    tagsMicrodata += `${i > 0 ? ',' : ''}{
           "name": ${JSON.stringify(tags[i].tagName)}
         }`;
  }

  return tagsMicrodata;
};
