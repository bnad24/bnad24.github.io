import { MetadataRoute } from 'next';
import { DESCRIPTION, TITLE } from '../constants';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: TITLE,
    short_name: 'Надеждин 2024',
    description: DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    theme_color: '#c6d3e3',
    background_color: '#c6d3e3',
    icons: [
      {
        src: 'favicons/android-chrome-36x36.png',
        sizes: '36x36',
        type: 'image/png',
      },
      {
        src: 'favicons/android-chrome-48x48.png',
        sizes: '48x48',
        type: 'image/png',
      },
      {
        src: 'favicons/android-chrome-72x72.png',
        sizes: '72x72',
        type: 'image/png',
      },
      {
        src: 'favicons/android-chrome-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: 'favicons/android-chrome-144x144.png',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        src: 'favicons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'favicons/android-chrome-256x256.png',
        sizes: '256x256',
        type: 'image/png',
      },
      {
        src: 'favicons/android-chrome-384x384.png',
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: 'favicons/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
