import React from 'react';

type Props = {
  name?: string,
  content?: string,
};

const MetaTag: React.FC<Props> = React.memo(({ name, content }) => (
  <meta name={name} content={content} />
));

export default MetaTag;
