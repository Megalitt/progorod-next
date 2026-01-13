import React from 'react';
import { isTagScriptEmptyRegExp, isScriptFullTag } from '../../../utils/consts';
import { createMarkup } from '../../../utils/core/create-markup';

const Banner = ({ bannerData }) => {
  const { html, id } = bannerData;
  const removeScriptTagWithSrc = html.replace(isTagScriptEmptyRegExp, '');
  const bannerContent = removeScriptTagWithSrc.replace(isScriptFullTag, '');
  return (
    bannerContent ? (
      <>
        <div
          id={id}
          className="banner"
          dangerouslySetInnerHTML={createMarkup(bannerContent)}
        />
      </>
    )
      : (<div />)
  );
};

export default Banner;
