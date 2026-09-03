import './App.css'
import { profile } from './data/profile'
import { projects } from './data/projects'

const elevatorStops = [
  { number: '01', label: 'About', href: '#about' },
  ...projects.map((project, index) => ({
    number: String(index + 2).padStart(2, '0'),
    label: project.title,
    href: '#floor-' + project.id,
  })),
  { number: '06', label: 'Skills', href: '#skills' },
  { number: '07', label: 'Contact', href: '#contact' },
]

function App() {
  return (
    <div className="page-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="포트폴리오 홈">
          {profile.name}
        </a>
        <nav aria-label="주요 메뉴">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main className="elevator-shell" id="top">
        <aside className="elevator-rail" aria-label="엘리베이터 층 이동">
          <span className="rail-title">ELEVATOR</span>
          <div className="rail-line" aria-hidden="true" />
          {elevatorStops.map((stop) => (
            <a className="rail-stop" href={stop.href} key={stop.href}>
              <strong>{stop.number}</strong>
              <span>{stop.label}</span>
            </a>
          ))}
        </aside>

        <div className="elevator-stage">
          <section className="elevator-floor hero-floor" id="about">
            <div className="intro-panel">
              <p className="eyebrow">Developing Ideas into Services</p>
              <h1>{profile.prCard.title}</h1>
              <p>{profile.prCard.description}</p>
              <div className="hero-actions">
                <a className="button primary" href="#projects">층 내려가기</a>
                <a className="button secondary" href="#contact">연락하기</a>
              </div>
            </div>

            <div className="floor-door" aria-label="엘리베이터 인트로 패널">
              <span>01 FLOOR</span>
              <strong>ABOUT</strong>
              <p>층을 내려가며 프로젝트를 확인하세요</p>
              <div className="door-lines" aria-hidden="true">
                <i />
                <i />
              </div>
            </div>

            <div className="intro-checklist">
              {profile.prCard.points.map((point, index) => (
                <p key={point}>
                  <strong>{String(index + 1).padStart(2, '0')}</strong>
                  {point}
                </p>
              ))}
            </div>
          </section>

          <section className="project-bank" id="projects" aria-label="프로젝트 엘리베이터 층">
            {projects.map((project, index) => (
              <section
                className="elevator-floor project-floor"
                id={'floor-' + project.id}
                key={project.id}
                style={{ '--accent': project.accent }}
              >
                <div className="floor-number">
                  <span>{String(index + 2).padStart(2, '0')}</span>
                  <small>FLOOR</small>
                </div>

                <article className="elevator-project-card">
                  <div className="project-kicker">
                    <span>{project.marker}</span>
                    <small>{project.category}</small>
                  </div>
                  <span className="floor-emoji card-emoji" aria-hidden="true">{project.emoji}</span>
                  <h2>{project.title}</h2>
                  <p>{project.description}</p>
                  <ul className="tag-list">
                    {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                  <div className="project-actions">
                    {project.actions.map((action, actionIndex) => (
                      <a
                        className={actionIndex === 0 ? 'main-action' : ''}
                        href={action.url}
                        target="_blank"
                        rel="noreferrer"
                        key={action.label}
                      >
                        {action.label}
                      </a>
                    ))}
                  </div>
                </article>

                <div className="floor-door project-door" aria-hidden="true">
                  <span>{String(index + 2).padStart(2, '0')} FLOOR</span>
                  <strong className="floor-emoji">{project.emoji}</strong>
                  <p>{project.summary}</p>
                  <div className="door-lines" aria-hidden="true">
                    <i />
                    <i />
                  </div>
                </div>
              </section>
            ))}
          </section>

          <section className="elevator-floor skills-floor" id="skills">
            <div className="floor-copy">
              <p className="eyebrow">Skills</p>
              <h2>기술은 층마다 쌓이고, 프로젝트에서 연결됩니다.</h2>
              <strong>Web · Data · AI · App</strong>
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

          <section className="elevator-floor contact-panel" id="contact">
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
        </div>
      </main>
    </div>
  )
}

export default App
