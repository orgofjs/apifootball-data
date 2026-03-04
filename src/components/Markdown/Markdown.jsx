// Lightweight markdown renderer — no external deps
// Supports: headers, bold, italic, inline code, fenced code blocks,
// unordered/ordered lists, blockquotes, horizontal rules, links, paragraphs.

import './Markdown.css'

function parseInline(text) {
  // Process inline elements: bold, italic, inline code, links
  const parts = []
  let i = 0

  const RE = /(`[^`]+`)|(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(\[([^\]]+)\]\(([^)]+)\))/g
  let last = 0
  let match

  while ((match = RE.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index))
    }
    if (match[1]) {
      // inline code
      parts.push(<code key={match.index} className="md-code">{match[1].slice(1, -1)}</code>)
    } else if (match[2]) {
      // bold
      parts.push(<strong key={match.index}>{match[3]}</strong>)
    } else if (match[4]) {
      // italic
      parts.push(<em key={match.index}>{match[5]}</em>)
    } else if (match[6]) {
      // link
      parts.push(
        <a key={match.index} href={match[8]} target="_blank" rel="noopener noreferrer" className="md-link">
          {match[7]}
        </a>
      )
    }
    last = match.index + match[0].length
  }

  if (last < text.length) parts.push(text.slice(last))
  return parts.length === 1 && typeof parts[0] === 'string' ? text : parts
}

function Markdown({ content }) {
  if (!content) return null

  const lines = content.split('\n')
  const elements = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Fenced code block
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim()
      const codeLines = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      elements.push(
        <div key={i} className="md-code-block">
          {lang && <span className="md-code-lang">{lang}</span>}
          <pre><code>{codeLines.join('\n')}</code></pre>
        </div>
      )
      i++
      continue
    }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) {
      elements.push(<hr key={i} className="md-hr" />)
      i++
      continue
    }

    // Headings
    const h = line.match(/^(#{1,4})\s+(.+)$/)
    if (h) {
      const level = h[1].length
      const text = parseInline(h[2])
      const id = h[2]
        .toLowerCase()
        .replace(/ş/g, 's').replace(/ç/g, 'c').replace(/ğ/g, 'g')
        .replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ı/g, 'i')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
      const Tag = `h${level}`
      elements.push(<Tag key={i} id={id} className={`md-h${level}`}>{text}</Tag>)
      i++
      continue
    }

    // Table
    if (line.startsWith('|') && i + 1 < lines.length && /^\|[-| :]+\|$/.test(lines[i + 1])) {
      const headers = line.split('|').filter((_, idx, arr) => idx > 0 && idx < arr.length - 1).map(h => h.trim())
      i += 2 // skip header + separator
      const rows = []
      while (i < lines.length && lines[i].startsWith('|')) {
        const cells = lines[i].split('|').filter((_, idx, arr) => idx > 0 && idx < arr.length - 1).map(c => c.trim())
        rows.push(cells)
        i++
      }
      elements.push(
        <table key={i}>
          <thead>
            <tr>{headers.map((h, j) => <th key={j}>{parseInline(h)}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri}>{row.map((cell, ci) => <td key={ci}>{parseInline(cell)}</td>)}</tr>
            ))}
          </tbody>
        </table>
      )
      continue
    }

    // Blockquote
    if (line.startsWith('> ')) {
      const quoteLines = []
      while (i < lines.length && lines[i].startsWith('> ')) {
        quoteLines.push(lines[i].slice(2))
        i++
      }
      elements.push(
        <blockquote key={i} className="md-blockquote">
          {quoteLines.map((l, j) => <p key={j}>{parseInline(l)}</p>)}
        </blockquote>
      )
      continue
    }

    // Unordered list
    if (/^[-*]\s/.test(line)) {
      const items = []
      while (i < lines.length && /^[-*]\s/.test(lines[i])) {
        items.push(lines[i].slice(2))
        i++
      }
      elements.push(
        <ul key={i} className="md-ul">
          {items.map((it, j) => <li key={j}>{parseInline(it)}</li>)}
        </ul>
      )
      continue
    }

    // Ordered list
    if (/^\d+\.\s/.test(line)) {
      const items = []
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ''))
        i++
      }
      elements.push(
        <ol key={i} className="md-ol">
          {items.map((it, j) => <li key={j}>{parseInline(it)}</li>)}
        </ol>
      )
      continue
    }

    // Empty line — skip
    if (line.trim() === '') {
      i++
      continue
    }

    // Paragraph
    const paraLines = []
    while (i < lines.length && lines[i].trim() !== '' && !lines[i].startsWith('#') && !lines[i].startsWith('```') && !lines[i].startsWith('> ') && !/^[-*]\s/.test(lines[i]) && !/^\d+\.\s/.test(lines[i]) && !/^---+$/.test(lines[i].trim())) {
      paraLines.push(lines[i])
      i++
    }
    if (paraLines.length) {
      elements.push(
        <p key={i} className="md-p">{parseInline(paraLines.join(' '))}</p>
      )
    }
  }

  return <div className="md-body">{elements}</div>
}

export default Markdown
