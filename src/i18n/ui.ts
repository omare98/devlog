/** 사이트의 고정 문구와 언어 목록. 글 본문은 content/posts에 있고, 여기에는 화면 틀의 문구만 둔다. */
export type Lang = 'ko' | 'en' | 'id'

export const LANGS: Lang[] = ['ko', 'en', 'id']
export const DEFAULT_LANG: Lang = 'ko'

/** 언어 전환 링크에 보이는 이름. 각 언어가 자기 이름으로 적혀 있어야 어느 언어에서든 알아본다. */
export const LANG_NAMES: Record<Lang, string> = { ko: '한국어', en: 'English', id: 'Bahasa Indonesia' }

interface Ui {
  logo: [string, string]
  homeTitle: string
  introTitle: string
  introText: string
  description: string
  posts: string
  days: string
  back: string
  koOnly: string
  koOnlyHint: string
  nav: string
  languageLabel: string
  footer: string
}

export const UI: Record<Lang, Ui> = {
  ko: {
    logo: ['개발', '기록'],
    homeTitle: '개발 기록',
    introTitle: '쇼핑몰을 만들며 남기는 기록',
    introText: '한국 상품을 인도네시아 고객 대신 사서 보내 주는 구매대행 쇼핑몰의 개발 일지입니다.',
    description: '쇼핑몰을 만들며 남기는 개발 기록',
    posts: '글',
    days: '일째',
    back: '‹ 글 목록',
    koOnly: '한국어',
    koOnlyHint: '이 글은 아직 번역되지 않아 한국어 원문으로 연결됩니다',
    nav: '사이트',
    languageLabel: '언어',
    footer: '© 개발 기록',
  },
  en: {
    logo: ['dev', 'log'],
    homeTitle: 'Dev Log',
    introTitle: 'Notes from building a shop',
    introText:
      'A development diary for a purchasing-agent shop that buys Korean goods and ships them to customers in Indonesia.',
    description: 'Notes from building an online shop',
    posts: 'posts',
    days: 'days',
    back: '‹ All posts',
    koOnly: 'Korean',
    koOnlyHint: 'Not translated yet, so this links to the Korean original',
    nav: 'Site',
    languageLabel: 'Language',
    footer: '© Dev Log',
  },
  id: {
    logo: ['catatan', 'dev'],
    homeTitle: 'Catatan Pengembangan',
    introTitle: 'Catatan membangun toko online',
    introText:
      'Catatan pengembangan toko jasa titip belanja yang membelikan barang Korea untuk pelanggan di Indonesia.',
    description: 'Catatan membangun toko online',
    posts: 'tulisan',
    days: 'hari',
    back: '‹ Semua tulisan',
    koOnly: 'Korea',
    koOnlyHint: 'Belum diterjemahkan, jadi tautan ini membuka naskah asli berbahasa Korea',
    nav: 'Situs',
    languageLabel: 'Bahasa',
    footer: '© Catatan Pengembangan',
  },
}

/** 언어별 주소. 기본 언어(ko)는 접두어가 없다(/devlog/…), 나머지는 /devlog/en/…, /devlog/id/…. */
export function pathFor(lang: Lang, path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  return lang === DEFAULT_LANG ? `${base}${path}` : `${base}/${lang}${path}`
}
