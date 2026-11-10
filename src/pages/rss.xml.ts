import type { APIContext } from 'astro'
import { feedFor } from '../utils/feed'

export const GET = (context: APIContext) => feedFor('ko', context)
