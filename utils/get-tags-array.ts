export const getTagsArray = (tags: string) => {
  const tagsSetArray = typeof tags === 'string' ? tags.trim().split(',') : '';
  const tagList = [];

  if (typeof tags === 'string' && tags.length > 0) {
    for (let i = 0; i < tagsSetArray.length; i += 1) {
      const arrTags = tagsSetArray[i].split(':');
      tagList.push({
        tagHref: `/tags/${arrTags[0]}`,
        tagName: arrTags[1],
      });
    }
  }

  return tagList;
};
