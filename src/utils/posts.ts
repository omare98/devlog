import { getCollection, type CollectionEntry } from 'astro:content'
import { DEFAULT_LANG, type Lang } from '../i18n/ui'

type Post = CollectionEntry<'posts'>

/** 글 파일 위치로 언어를 안다. content/posts/en/…은 영어, id/…는 인도네시아어, 그 밖은 한국어 원문이다. */
export function langOf(id: string): Lang {
  const head = id.split('/')[0]
  return head === 'en' || head === 'id' ? head : DEFAULT_LANG
}

/** 언어 접두어를 뺀 글 이름. 번역과 원문은 같은 이름으로 짝지어진다. */
export function slugOf(id: string): string {
  return langOf(id) === DEFAULT_LANG ? id : id.split('/').slice(1).join('/')
}

/** 한 글의 한 언어 모습. translated가 false면 번역이 없어 한국어 원문을 그대로 보인다. */
export interface Entry {
  slug: string
  lang: Lang
  /** 이 언어로 쓰인 글. 번역이 없으면 원문 */
  post: Post
  translated: boolean
}

const newestFirst = (a: Post, b: Post) =>
  b.data.date.getTime() - a.data.date.getTime() || a.id.localeCompare(b.id)

/** 공개된 한국어 원문, 최신순. 같은 날이면 이름순으로 고정한다. 번역이 없는 글도 모든 언어의 목록에 올라야 하므로 기준은 원문이다. */
async function publishedOriginals(): Promise<Post[]> {
  const all = await getCollection('posts', (p) => !p.data.draft)
  return all.filter((p) => langOf(p.id) === DEFAULT_LANG).sort(newestFirst)
}

/** 한 언어의 글 목록. 번역이 있으면 번역을, 없으면 한국어 원문을 쓴다. */
export async function entriesFor(lang: Lang): Promise<Entry[]> {
  const originals = await publishedOriginals()
  if (lang === DEFAULT_LANG) return originals.map((post) => ({ slug: post.id, lang, post, translated: true }))
  const all = await getCollection('posts', (p) => !p.data.draft)
  const translations = new Map(all.filter((p) => langOf(p.id) === lang).map((p) => [slugOf(p.id), p]))
  return originals.map((orig) => {
    const tr = translations.get(orig.id)
    return { slug: orig.id, lang, post: tr ?? orig, translated: tr !== undefined }
  })
}

/** 어떤 글이 어느 언어로 번역돼 있는지. 언어 전환 링크가 번역본이 있을 때만 글로 가게 하려는 것이다. */
export async function translatedLangs(slug: string): Promise<Lang[]> {
  const all = await getCollection('posts', (p) => !p.data.draft)
  return all.filter((p) => slugOf(p.id) === slug).map((p) => langOf(p.id))
}

/** 첫 글부터 오늘까지 며칠째인지(첫 글 날짜가 1일째). */
export function daysSinceFirst(posts: { data: { date: Date } }[]): number {
  const first = Math.min(...posts.map((p) => p.data.date.getTime()))
  return Math.floor((Date.now() - first) / 86_400_000) + 1
}

export const fmtDate = (d: Date) => d.toISOString().slice(0, 10)
