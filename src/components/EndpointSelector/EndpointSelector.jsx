import { useState } from 'react'
import { ENDPOINT_GROUPS } from '../../utils/endpoints'
import './EndpointSelector.css'

function EndpointSelector({ selectedId, onSelect }) {
  const [search, setSearch] = useState('')

  const filtered = ENDPOINT_GROUPS.map(group => ({
    ...group,
    endpoints: group.endpoints.filter(e =>
      e.label.toLowerCase().includes(search.toLowerCase()) ||
      e.endpoint.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(g => g.endpoints.length > 0)

  return (
    <div className="ep-selector">
      <label>ENDPOINT</label>
      <input
        type="text"
        className="ep-search"
        placeholder="Filter endpoints..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="ep-list">
        {filtered.map(group => (
          <div key={group.group} className="ep-group">
            <div className="ep-group-label">{group.group}</div>
            {group.endpoints.map(ep => (
              <button
                key={ep.id}
                className={`ep-item ${selectedId === ep.id ? 'active' : ''}`}
                onClick={() => onSelect(ep.id)}
                type="button"
              >
                <span className="ep-item-label">{ep.label}</span>
                <span className="ep-item-path">/{ep.endpoint}</span>
              </button>
            ))}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="ep-empty">No endpoints match "{search}"</div>
        )}
      </div>
    </div>
  )
}

export default EndpointSelector
