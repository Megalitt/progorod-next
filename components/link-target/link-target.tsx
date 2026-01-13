import React, { Children } from 'react';
import Link from 'next/link';
import { isTemplateRegEx } from '../../utils/consts';

type Props = {
  isTemplate: boolean | number | string,
  href: string,
};

const LinkTarget: React.FC<Props> = ({ children, isTemplate, href }) => {
  const child: any = Children.only(children);
  const isTemplateRegExTarget = href && isTemplateRegEx.test(href);
  return (
    <>
      {
        !(parseInt(String(isTemplate), 10)) && !isTemplateRegExTarget && href
          ? (
            <Link href={href} prefetch={false} scroll>
              {React.cloneElement(child)}
            </Link>
          )
          : (
            <>
              {React.cloneElement(child, {
                target: '_blank',
                href,
              })}
            </>
          )
      }
    </>
  );
};

export default LinkTarget;
