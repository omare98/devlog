import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { publishedPosts } from '../utils/posts'

export async function GET(context: APIContext) {
  const posts = await publishedPosts()
  return rss({
    title: '개발 기록',
    description: '쇼핑몰을 만들며 남기는 개발 기록',
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.summary,
      link: `/devlog/posts/${p.id}/`,
    })),
  })
}
