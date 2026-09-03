import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { profile } from './profile.js'
import { projects } from './projects.js'
import { filterProjects, projectFilters } from './projectFilters.js'

test('profile uses the confirmed owner name and app interest area', () => {
  assert.equal(profile.name, '강민식')
  assert.equal(profile.stats.find((stat) => stat.label === '관심 분야').value, 'Web · Data · AI · App')
})

test('portfolio contains four complete project entries', () => {
  assert.equal(projects.length, 4)

  for (const project of projects) {
    assert.ok(project.id)
    assert.ok(project.number)
    assert.ok(project.title)
    assert.ok(project.category)
    assert.ok(project.description)
    assert.match(project.url, /^https:\/\//)
    assert.ok(project.tags.length > 0)
    assert.match(project.accent, /^#[0-9a-f]{6}$/i)
  }
})

test('bookstore links to the published portfolio project', () => {
  const bookstore = projects.find((project) => project.id === 'bookstore')

  assert.equal(bookstore.url, 'https://kms12191.github.io/bookstore/')
})

test('movie service links to the published Render site', () => {
  const movieService = projects.find((project) => project.id === 'movie-service')

  assert.equal(movieService.url, 'https://filmatique-znpb.onrender.com')
})

test('trading links to the published Vercel site', () => {
  const trading = projects.find((project) => project.id === 'trading')

  assert.equal(trading.url, 'https://trading-lake-ten.vercel.app/')
})

test('project cards expose portfolio actions for the elevator concept', () => {
  for (const project of projects) {
    assert.ok(Array.isArray(project.actions))
    assert.ok(project.actions.some((action) => action.label === '사이트 보기'))

    for (const action of project.actions) {
      assert.ok(action.label)
      assert.match(action.url, /^https:\/\//)
    }
  }

  const movieService = projects.find((project) => project.id === 'movie-service')
  assert.ok(movieService.actions.some((action) => action.label === 'GitHub'))
  assert.ok(movieService.actions.some((action) => action.label === 'Docker'))
})

test('projects include categories used by the playground filters', () => {
  const filters = new Set(projects.flatMap((project) => project.filters))

  for (const filter of ['Web', 'Data', 'AI', 'Flask']) {
    assert.ok(filters.has(filter))
  }
})

test('project filter helper narrows cards by category and search text', () => {
  assert.deepEqual(projectFilters, ['전체', 'Web', 'Data', 'AI', 'Flask'])
  assert.deepEqual(filterProjects(projects, 'Flask').map((project) => project.id), ['movie-service'])
  assert.deepEqual(filterProjects(projects, 'AI').map((project) => project.id), ['drug-main', 'trading'])
  assert.deepEqual(filterProjects(projects, '전체', 'book').map((project) => project.id), ['bookstore'])
})

test('profile groups skills like the referenced stack list design', () => {
  assert.deepEqual(Object.keys(profile.skills), ['Front-End', 'Back-End', 'AI / Data', 'Database', 'Deploy & Tools'])
  assert.deepEqual(profile.skills['Front-End'], ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Vite', 'Tailwind CSS'])
  assert.deepEqual(profile.skills['Back-End'], ['Python', 'Flask', 'FastAPI', 'SQLAlchemy', 'REST API'])
  assert.deepEqual(profile.skills['AI / Data'], ['Pandas', 'NumPy', 'Scikit-learn', 'XGBoost', 'Optuna', 'OpenAI API'])
  assert.deepEqual(profile.skills.Database, ['SQLite', 'PostgreSQL', 'Supabase'])
  assert.deepEqual(profile.skills['Deploy & Tools'], ['Docker', 'Streamlit', 'Git', 'GitHub', 'VS Code', 'Figma'])
})

test('project cards use emoji snapshots instead of title initials', () => {
  const expectedEmojis = new Map([
    ['bookstore', '📚'],
    ['movie-service', '🎬'],
    ['drug-main', '💊'],
    ['trading', '📈'],
  ])

  for (const project of projects) {
    assert.equal(project.emoji, expectedEmojis.get(project.id))
  }
})

test('project card hover styles make interactions clearly visible', () => {
  const css = readFileSync(new URL('../App.css', import.meta.url), 'utf8')

  assert.match(css, /\.elevator-project-card:hover \{[\s\S]*translateX\(10px\)/)
  assert.match(css, /\.elevator-project-card:hover \.floor-emoji/)
  assert.match(css, /\.elevator-project-card:hover \.main-action/)
})

test('app renders an elevator scroll journey structure', () => {
  const appSource = readFileSync(new URL('../App.jsx', import.meta.url), 'utf8')

  assert.match(appSource, /className="elevator-shell"/)
  assert.match(appSource, /className="elevator-rail"/)
  assert.match(appSource, /className="elevator-floor hero-floor"/)
  assert.match(appSource, /className="elevator-floor project-floor"/)
  assert.match(appSource, /className="floor-door"/)
  assert.ok(appSource.includes('Developing Ideas into Services'))
  assert.doesNotMatch(appSource, /ELEVATOR MODE/)
  assert.ok(appSource.includes('층을 내려가며 프로젝트를 확인하세요'))
})

test('elevator floors are generated from all portfolio projects', () => {
  const appSource = readFileSync(new URL('../App.jsx', import.meta.url), 'utf8')

  assert.match(appSource, /projects\.map\(\(project, index\)/)
  assert.match(appSource, /String\(index \+ 2\)\.padStart\(2, '0'\)/)
})

test('elevator layout uses sticky rail and scroll-linked reveal animations', () => {
  const css = readFileSync(new URL('../App.css', import.meta.url), 'utf8')

  assert.match(css, /\.elevator-rail \{[\s\S]*position: sticky/)
  assert.match(css, /\.elevator-floor \{[\s\S]*min-height: min\(760px, calc\(100vh - 120px\)\)/)
  assert.match(css, /animation-timeline: view\(\)/)
  assert.match(css, /@keyframes elevator-open/)
})

test('hero does not show confusing drag decoration text', () => {
  const css = readFileSync(new URL('../App.css', import.meta.url), 'utf8')

  assert.doesNotMatch(css, /content: ['"]drag['"];/)
})

test('profile exposes Gmail and Naver compose links for contact email', () => {
  assert.equal(profile.email, 'ste_reo@naver.com')
  assert.deepEqual(profile.emailLinks, [
    {
      label: 'Gmail로 메일쓰기',
      url: 'https://mail.google.com/mail/?view=cm&fs=1&to=ste_reo%40naver.com',
    },
    {
      label: 'Naver 메일쓰기',
      url: 'https://mail.naver.com/write/popup?to=ste_reo%40naver.com',
    },
  ])
})

test('hero interest card includes app as an interest area', () => {
  const appSource = readFileSync(new URL('../App.jsx', import.meta.url), 'utf8')

  assert.ok(appSource.includes('<strong>Web · Data · AI · App</strong>'))
})

test('hero eyebrow communicates a vision-driven portfolio message', () => {
  const appSource = readFileSync(new URL('../App.jsx', import.meta.url), 'utf8')

  assert.ok(appSource.includes('Developing Ideas into Services'))
  assert.doesNotMatch(appSource, /Card Playground Portfolio/)
})

test('profile exposes a self promotion card for the hero section', () => {
  assert.equal(profile.prCard.label, 'About Me')
  assert.equal(profile.prCard.title, '문제를 서비스로 연결하는 개발자 강민식입니다')
  assert.equal(profile.prCard.description, '데이터를 이해하고, 사용자가 실제로 쓰는 웹/App 서비스로 구현하는 과정을 좋아합니다.')
  assert.deepEqual(profile.prCard.points, [
    '문제를 끝까지 쪼개서 이해합니다',
    '데이터를 근거로 방향을 잡습니다',
    '작동하는 서비스로 완성하는 것을 중요하게 생각합니다',
    '새로운 기술을 프로젝트에 적용하며 성장합니다',
  ])
})

test('self promotion card is rendered in the elevator intro floor', () => {
  const appSource = readFileSync(new URL('../App.jsx', import.meta.url), 'utf8')

  assert.match(appSource, /<section className="elevator-floor hero-floor" id="about">/)
  assert.match(appSource, /className="intro-panel"/)
})

test('self promotion floor appears before the project floors', () => {
  const appSource = readFileSync(new URL('../App.jsx', import.meta.url), 'utf8')

  assert.ok(appSource.indexOf('className="elevator-floor hero-floor"') < appSource.indexOf('className="elevator-floor project-floor"'))
})

test('elevator intro floor has breathing room before project floors', () => {
  const css = readFileSync(new URL('../App.css', import.meta.url), 'utf8')

  assert.ok(css.includes('.hero-floor {\n  margin-bottom: 40px;\n}'))
})


test('intro headline is sized down for elevator layout', () => {
  const css = readFileSync(new URL('../App.css', import.meta.url), 'utf8')

  assert.match(css, /\.intro-panel h1 \{[\s\S]*font-size: clamp\(36px, 5\.4vw, 68px\)/)
})


test('skills floor shows a skills eyebrow and uses smaller heading', () => {
  const appSource = readFileSync(new URL('../App.jsx', import.meta.url), 'utf8')
  const css = readFileSync(new URL('../App.css', import.meta.url), 'utf8')
  const skillsSource = appSource.slice(
    appSource.indexOf('<section className="elevator-floor skills-floor"'),
    appSource.indexOf('<section className="elevator-floor contact-panel"'),
  )

  assert.match(skillsSource, /<p className="eyebrow">Skills<\/p>/)
  assert.match(css, /\.skills-floor \.floor-copy h2 \{[\s\S]*font-size: clamp\(32px, 4\.4vw, 58px\)/)
})


test('document title uses portfolio owner name', () => {
  const html = readFileSync(new URL('../../index.html', import.meta.url), 'utf8')

  assert.match(html, /<title>강민식 \| Potofoilo<\/title>/)
})

test('layout removes the loose top gap above the header', () => {
  const css = readFileSync(new URL('../App.css', import.meta.url), 'utf8')

  assert.match(css, /\.site-header \{[\s\S]*margin: 0 0 28px;/)
})
