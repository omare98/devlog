import type { APIContext } from 'astro'
import type { Lang } from '../../i18n/ui'
import { feedFor } from '../../utils/feed'

export function getStaticPaths() {
  return [{ params: { lang: 'en' } }, { params: { lang: 'id' } }]
}

export const GET = (context: APIContext) => feedFor(context.params.lang as Lang, context)
