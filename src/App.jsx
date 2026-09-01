import { useMemo, useState } from 'react'
import './App.css'
import { profile } from './data/profile'
import { filterProjects, projectFilters } from './data/projectFilters'
import { projects } from './data/projects'

function App() {
  const [activeFilter, setActiveFilter] = useState('전체')
  const [query, setQuery] = useState('')
  const visibleProjects = useMemo(
    () => filterProjects(projects, activeFilter, query),
    [activeFilter, query],
  )

  return (
    <div className="page-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="포트폴리오 홈">
          {profile.name}
        </a>
        <nav aria-label="주요 메뉴">
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero playground-hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">Card Playground Portfolio</p>
            <h1 id="hero-title">다양한 시도로 더 나은 경험을 만듭니다.</h1>
            <p>{profile.intro}</p>
            <div className="hero-actions">
              <a className="button primary" href="#projects">프로젝트 보기</a>
              <a className="button secondary" href="#contact">연락하기</a>
            </div>
          </div>

          <aside className="hero-board" aria-label="포트폴리오 요약">
            <div className="profile-tile">
              <span className="tile-label">현재 관심사</span>
              <strong>Web · Data · AI · App</strong>
              <p>작동하는 서비스로 만드는 연습을 계속하고 있습니다.</p>
            </div>
            <div className="mini-stats">
              {profile.stats.map((stat) => (
                <div key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="section projects-section" id="projects">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Project Select</p>
              <h2>카드를 골라 프로젝트를 살펴보세요.</h2>
            </div>
            <a href={profile.githubUrl} target="_blank" rel="noreferrer">GitHub 전체 보기</a>
          </div>

          <div className="filter-row" aria-label="프로젝트 필터">
            {projectFilters.map((filter) => (
              <button
                className={filter === activeFilter ? 'active' : ''}
                type="button"
                key={filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
            <label className="search-pill">
              <span>검색</span>
              <input
                type="search"
                placeholder="프로젝트 이름"
                aria-label="프로젝트 검색"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
          </div>

          {visibleProjects.length > 0 ? (
            <div className="playground-grid">
              {visibleProjects.map((project) => (
                <article className="project-card" key={project.id} style={{ '--accent': project.accent }}>
                  <div className="card-topline">
                    <span>{project.marker}</span>
                    <small>{project.number}</small>
                  </div>
                  <div className="project-snapshot" aria-hidden="true">
                    <span>{project.emoji}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p className="project-category">{project.category}</p>
                  <p>{project.description}</p>
                  <ul className="tag-list">
                    {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                  <div className="project-actions">
                    {project.actions.map((action, index) => (
                      <a className={index === 0 ? 'main-action' : ''} href={action.url} target="_blank" rel="noreferrer" key={action.label}>
                        {action.label}
                      </a>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="empty-state">조건에 맞는 프로젝트가 없습니다. 다른 키워드를 입력해 보세요.</p>
          )}

          <div className="summary-strip" aria-label="포트폴리오 요약">
            <div><strong>4+</strong><span>완성 프로젝트</span></div>
            <div><strong>3</strong><span>배포 사이트</span></div>
            <div><strong>∞</strong><span>계속 확장 중</span></div>
            <a href="#contact">다음 이야기 →</a>
          </div>
        </section>

        <section className="section skills-section" id="skills">
          <div>
            <p className="eyebrow">Skill Cards</p>
            <h2>기술은 작게 배우고, 프로젝트에서 크게 연결합니다.</h2>
          </div>
          <div className="skill-cards">
            {Object.entries(profile.skills).map(([group, skills]) => (
              <article className="skill-card" key={group}>
                <h3>{group}</h3>
                <div className="skill-cloud">
                  {skills.map((skill) => <span key={skill}>{skill}</span>)}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-panel" id="contact">
          <div>
            <p className="eyebrow">Contact</p>
            <h2>같이 만들어볼 아이디어가 있다면 편하게 연락해 주세요.</h2>
          </div>
          <div className="contact-actions">
            {profile.emailLinks.map((link, index) => (
              <a
                className={index === 0 ? 'button primary' : 'button secondary'}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                key={link.label}
              >
                {link.label}
              </a>
            ))}
            <a className="button secondary" href={profile.githubUrl} target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
