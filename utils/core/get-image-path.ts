export const getImagePath = ({
  image = null,
  sizeName = null,
  isWebp = '',
  globalArticleOrigin,
}: any) => {
  // @ts-ignore
  const domain = process.env.NEXT_PUBLIC_DEV === 'true' ? process.env.NEXT_PUBLIC_API_HOSTNAME : '';
  const domainInPath = globalArticleOrigin ? `https://${globalArticleOrigin}` : domain;

  if (image) {
    const fillePathNoExt = image.replace(/(\.[^/.]+)+$/, '');
    const ext = image.substr(image.lastIndexOf('.') + 1);

    if (sizeName) {
      return isWebp === 'webp'
        ? `${domainInPath}${fillePathNoExt}-${sizeName}.${ext}.${isWebp}`
        : `${domainInPath}${fillePathNoExt}-${sizeName}.${ext}`;
    }
    if (!sizeName && isWebp === 'webp') {
      return `${domainInPath}${fillePathNoExt}.${ext}${ext !== 'webp' ? `.${isWebp}` : ''}`;
    }

    return `${domainInPath}${image}`;
  }

  return '';
};
