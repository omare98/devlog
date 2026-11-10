import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { UI, pathFor, type Lang } from '../i18n/ui'
import { entriesFor } from './posts'

/** 한 언어의 RSS. 번역이 없는 글은 한국어 원문 주소로 잇는다. */
export async function feedFor(lang: Lang, context: APIContext) {
  const entries = await entriesFor(lang)
  return rss({
    title: UI[lang].homeTitle,
    description: UI[lang].description,
    site: context.site!,
    items: entries.map((e) => ({
      title: e.post.data.title,
      pubDate: e.post.data.date,
      description: e.post.data.summary,
      link: pathFor(e.translated ? lang : 'ko', `/posts/${e.slug}/`),
    })),
  })
}
