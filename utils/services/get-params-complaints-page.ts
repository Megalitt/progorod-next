export const getParamsComplaintsPage = (query: any) => {
  const {
    category,
    dataFrom,
    dataTo,
    searchRequest,
    order,
    key,
  } = query;

  const categoryGet = category ? `?category=${category || 0}` : '';
  const orderGet = order ? '?order=__views' : '';
  const keyGet = key ? '?key=article_review' : '';
  const dataFromGet = dataFrom ? `&dataFrom=${dataFrom}` : '';
  const dataToGet = dataTo ? `&dataTo=${dataTo}` : '';
  const searchRequestGet = searchRequest ? `?searchRequest=${searchRequest}` : '';

  return {
    categoryGet,
    dataFromGet,
    dataToGet,
    searchRequestGet,
    orderGet,
    keyGet,
  };
};
