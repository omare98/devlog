import { getCollection } from 'astro:content'

/** 공개된 글을 최신순으로. 같은 날이면 파일 이름순으로 고정한다. */
export async function publishedPosts() {
  const posts = await getCollection('posts', (p) => !p.data.draft)
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime() || a.id.localeCompare(b.id))
}

/** 첫 글부터 오늘까지 며칠째인지(첫 글 날짜가 1일째). */
export function daysSinceFirst(posts: { data: { date: Date } }[]): number {
  const first = Math.min(...posts.map((p) => p.data.date.getTime()))
  return Math.floor((Date.now() - first) / 86_400_000) + 1
}

export const fmtDate = (d: Date) => d.toISOString().slice(0, 10)
