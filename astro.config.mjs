import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

// 프로젝트 사이트라 주소가 https://omare98.github.io/devlog/ 이다. base를 빼면 CSS·링크가 깨진다.
export default defineConfig({
  site: 'https://omare98.github.io',
  base: '/devlog',
  integrations: [sitemap()],
})
