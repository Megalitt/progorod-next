declare module 'react-share' {
  import { FC } from 'react';

  interface ShareButtonProps {
    children?: any,
    url: string,
    className?: string
  }

  declare const VKShareButton: FC<ShareButtonProps>;
  declare const VKShareCount: FC<ShareButtonProps>;
  declare const WhatsappShareButton: FC<ShareButtonProps>;
  declare const TelegramShareButton: FC<ShareButtonProps>;

  export {
    VKShareButton,
    VKShareCount,
    WhatsappShareButton,
    TelegramShareButton,
  };
}
