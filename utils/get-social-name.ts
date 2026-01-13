export const getSocialName = (data, name) => {
  const result = data.filter((item) => (item.name === name));
  return result.length > 0 && {
    url: result[0]?.url,
    iconTitle: result[0]?.iconTitle
  };
};
