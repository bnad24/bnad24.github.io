export const TITLE = 'Борис Надеждин 2024: неофициальный, но полезный сайт, сделанный волонтёрами.';
export const DESCRIPTION =
  'Неофициальный сайт посвящённый кандидату в президенты Борису Надеждину: календарь выборов 2024, подписи по регионам, адреса штабов где можно поставить подпись, мемы о Надеждине.';
export const IMAGE_URL = '/social.png';
export const HASHTAG = 'надеждин2024';
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
export const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN!;

export const N_PER_REGION_MAX = 2_500;
export const TOTAL_REQUIRED = 100_000;
export const N_REGIONS_REQUIRED = TOTAL_REQUIRED / N_PER_REGION_MAX;

export const TOTAL_DESIRED = 150_000;
export const N_PER_REGION_DESIRED = TOTAL_DESIRED / N_REGIONS_REQUIRED;
