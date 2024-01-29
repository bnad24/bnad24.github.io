'use client';

import { useCallback, useMemo } from 'react';
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
import { usePlausible } from 'next-plausible';
import { HASHTAG, TITLE } from '../constants';

const ICON_SIZE = 24;

export function Sharing() {
  const url = useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return undefined;
  }, []);

  const plausible = usePlausible();

  const sendEvent = useCallback(
    (via: string) => {
      return () => {
        plausible('share', { props: { via, url } });
      };
    },
    [plausible, url],
  );

  return (
    <span style={{ margin: '0 auto', display: 'flex' }}>
      <span style={{ margin: 'auto', marginRight: '0.5rem', verticalAlign: 'middle' }}>{'Поделиться'}</span>

      <span className="sharing-button-wrapper">
        <TelegramShareButton url={url} title={TITLE} onClick={sendEvent('telegram')}>
          <TelegramIcon size={ICON_SIZE} />
        </TelegramShareButton>

        <WhatsappShareButton url={url} title={TITLE} onClick={sendEvent('whatsapp')}>
          <WhatsappIcon size={ICON_SIZE} />
        </WhatsappShareButton>

        <VKShareButton url={url} title={TITLE} onClick={sendEvent('vk')}>
          <VKIcon size={ICON_SIZE} />
        </VKShareButton>

        <FacebookShareButton url={url} title={TITLE} hashtag={HASHTAG} onClick={sendEvent('facebook')}>
          <FacebookIcon size={ICON_SIZE} />
        </FacebookShareButton>

        <TwitterShareButton url={url} title={TITLE} hashtags={[HASHTAG]} onClick={sendEvent('twitter')}>
          <TwitterIcon size={ICON_SIZE} />
        </TwitterShareButton>

        <OKShareButton url={url} title={TITLE} onClick={sendEvent('ok')}>
          <OKIcon size={ICON_SIZE} />
        </OKShareButton>

        <MailruShareButton url={url} onClick={sendEvent('mailru')}>
          <MailruIcon size={ICON_SIZE} />
        </MailruShareButton>

        <ViberShareButton url={url} title={TITLE} onClick={sendEvent('viber')}>
          <ViberIcon size={ICON_SIZE} />
        </ViberShareButton>
      </span>
    </span>
  );
}
