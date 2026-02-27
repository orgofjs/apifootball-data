import { useState } from 'react'
import './ResponsePanel.css'

function JsonNode({ data, depth = 0 }) {
  const [collapsed, setCollapsed] = useState(depth > 2)

  if (data === null) return <span className="json-null">null</span>
  if (typeof data === 'boolean') return <span className="json-bool">{data.toString()}</span>
  if (typeof data === 'number') return <span className="json-num">{data}</span>
  if (typeof data === 'string') return <span className="json-str">"{data}"</span>

  if (Array.isArray(data)) {
    if (data.length === 0) return <span className="json-bracket">[]</span>
    return (
      <span>
        <button className="json-toggle" onClick={() => setCollapsed(c => !c)}>
          {collapsed ? '▶' : '▼'}
        </button>
        <span className="json-bracket">[</span>
        {collapsed ? (
          <span className="json-summary" onClick={() => setCollapsed(false)}>
            {data.length} items
          </span>
        ) : (
          <div className="json-block">
            {data.map((item, i) => (
              <div key={i} className="json-row">
                <JsonNode data={item} depth={depth + 1} />
                {i < data.length - 1 && <span className="json-comma">,</span>}
              </div>
            ))}
          </div>
        )}
        <span className="json-bracket">]</span>
      </span>
    )
  }

  if (typeof data === 'object') {
    const keys = Object.keys(data)
    if (keys.length === 0) return <span className="json-bracket">{'{}'}</span>
    return (
      <span>
        <button className="json-toggle" onClick={() => setCollapsed(c => !c)}>
          {collapsed ? '▶' : '▼'}
        </button>
        <span className="json-bracket">{'{'}</span>
        {collapsed ? (
          <span className="json-summary" onClick={() => setCollapsed(false)}>
            {keys.length} keys
          </span>
        ) : (
          <div className="json-block">
            {keys.map((key, i) => (
              <div key={key} className="json-row">
                <span className="json-key">"{key}"</span>
                <span className="json-colon">: </span>
                <JsonNode data={data[key]} depth={depth + 1} />
                {i < keys.length - 1 && <span className="json-comma">,</span>}
              </div>
            ))}
          </div>
        )}
        <span className="json-bracket">{'}'}</span>
      </span>
    )
  }

  return <span>{String(data)}</span>
}

function ResponsePanel({ result, error, savedAs, loading }) {
  const [viewMode, setViewMode] = useState('tree')

  if (loading) {
    return (
      <div className="response-state">
        <div className="response-loading">
          <div className="loading-bar" />
          <span className="mono">FETCHING DATA...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="response-state">
        <div className="response-error">
          <span className="error-icon">✕</span>
          <span className="error-msg mono">{error}</span>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="response-state">
        <div className="response-idle mono">
          <span className="blink">_</span> Awaiting request...
        </div>
      </div>
    )
  }

  const resultCount = result?.results ?? result?.response?.length ?? null
  const rawJson = JSON.stringify(result, null, 2)

  const handleCopy = () => {
    navigator.clipboard.writeText(rawJson)
  }

  return (
    <div className="response-panel fade-in">
      <div className="response-toolbar">
        <div className="response-stats mono">
          {resultCount !== null && (
            <span className="stat-pill accent">
              {resultCount} results
            </span>
          )}
          {result?.errors?.length > 0 && (
            <span className="stat-pill danger">
              {result.errors.length} errors
            </span>
          )}
          {savedAs && (
            <span className="stat-pill saved">
              ✓ Saved as {savedAs}
            </span>
          )}
        </div>
        <div className="response-view-toggle">
          <button
            className={`view-btn ${viewMode === 'tree' ? 'active' : ''}`}
            onClick={() => setViewMode('tree')}
          >
            TREE
          </button>
          <button
            className={`view-btn ${viewMode === 'raw' ? 'active' : ''}`}
            onClick={() => setViewMode('raw')}
          >
            RAW
          </button>
          <button className="btn" onClick={handleCopy} title="Copy JSON">
            COPY
          </button>
        </div>
      </div>

      <div className="response-body">
        {viewMode === 'tree' ? (
          <div className="json-tree mono">
            <JsonNode data={result} depth={0} />
          </div>
        ) : (
          <pre className="json-raw mono">{rawJson}</pre>
        )}
      </div>
    </div>
  )
}

export default ResponsePanel
