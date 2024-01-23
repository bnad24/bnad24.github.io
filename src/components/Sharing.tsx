import { useMemo } from 'react';
import {
  FacebookIcon,
  FacebookShareButton,
  MailruIcon,
  MailruShareButton,
  OKIcon,
  OKShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  ViberIcon,
  ViberShareButton,
  VKIcon,
  VKShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';
import { HASHTAG, TITLE } from '../constants';

const ICON_SIZE = 24;

export function Sharing() {
  const url = useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return undefined;
  }, []);

  return (
    <div className="sharing-button-wrapper">
      <TelegramShareButton url={url} title={TITLE}>
        <TelegramIcon size={ICON_SIZE} />
      </TelegramShareButton>

      <WhatsappShareButton url={url} title={TITLE}>
        <WhatsappIcon size={ICON_SIZE} />
      </WhatsappShareButton>

      <VKShareButton url={url} title={TITLE}>
        <VKIcon size={ICON_SIZE} />
      </VKShareButton>

      <FacebookShareButton url={url} title={TITLE} hashtag={HASHTAG}>
        <FacebookIcon size={ICON_SIZE} />
      </FacebookShareButton>

      <TwitterShareButton url={url} title={TITLE} hashtags={[HASHTAG]}>
        <TwitterIcon size={ICON_SIZE} />
      </TwitterShareButton>

      <OKShareButton url={url} title={TITLE}>
        <OKIcon size={ICON_SIZE} />
      </OKShareButton>

      <MailruShareButton url={url}>
        <MailruIcon size={ICON_SIZE} />
      </MailruShareButton>

      <ViberShareButton url={url} title={TITLE}>
        <ViberIcon size={ICON_SIZE} />
      </ViberShareButton>
    </div>
  );
}
