/** 태그 칩 색의 hue(0~360). 정한 태그는 고정, 새 태그는 이름에서 한결같이 계산해 어떤 태그든 항상 같은 색이다. */
const FIXED: Record<string, number> = {
  Spring: 145, React: 195, 설계: 265, 보안: 355, Flyway: 25, DB: 45, UX: 330,
  테스트: 170, Android: 95, 모바일: 225, MariaDB: 210, Capacitor: 215, CSS: 285,
}

export function tagHue(tag: string): number {
  const fixed = FIXED[tag]
  if (fixed !== undefined) return fixed
  let h = 0
  for (const ch of tag) h = (h * 31 + ch.charCodeAt(0)) % 360
  return h
}
