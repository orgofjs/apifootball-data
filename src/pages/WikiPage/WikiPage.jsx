import { useState, useEffect, useRef } from 'react'
import Markdown from '../../components/Markdown/Markdown'
import { WIKI_SECTIONS, WIKI_CONTENT } from '../../utils/wikiContent'
import './WikiPage.css'

function WikiPage() {
  const [activeId, setActiveId] = useState('giris')
  const contentRef = useRef(null)

  // Highlight sidebar item based on scroll position
  useEffect(() => {
    const container = contentRef.current
    if (!container) return

    const onScroll = () => {
      const headings = container.querySelectorAll('[id]')
      let current = 'giris'
      for (const el of headings) {
        if (el.getBoundingClientRect().top <= 100) {
          current = el.id
        }
      }
      setActiveId(current)
    }

    container.addEventListener('scroll', onScroll, { passive: true })
    return () => container.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    const container = contentRef.current
    if (!container) return
    const el = container.querySelector(`#${id}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="wiki-page">
      {/* Sidebar */}
      <aside className="wiki-sidebar">
        <div className="wiki-sidebar-title">WIKI</div>
        <nav className="wiki-nav">
          {WIKI_SECTIONS.map(section => (
            <button
              key={section.id}
              className={`wiki-nav-item ${activeId === section.id ? 'active' : ''}`}
              onClick={() => scrollTo(section.id)}
              type="button"
            >
              <span className="wiki-nav-icon">{section.icon}</span>
              <span className="wiki-nav-label">{section.label}</span>
            </button>
          ))}
        </nav>
        <div className="wiki-sidebar-footer">
          <a
            href="https://www.api-football.com/documentation-v3"
            target="_blank"
            rel="noopener noreferrer"
            className="wiki-api-link"
          >
            ↗ API Docs
          </a>
        </div>
      </aside>

      {/* Content */}
      <main className="wiki-content" ref={contentRef}>
        <div className="wiki-content-inner">
          <Markdown content={WIKI_CONTENT} />
        </div>
      </main>
    </div>
  )
}

export default WikiPage
