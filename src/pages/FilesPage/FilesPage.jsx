import { useState, useEffect, useCallback } from 'react'
import ResponsePanel from '../../components/ResponsePanel/ResponsePanel'
import './FilesPage.css'

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function FilesPage() {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [fileContent, setFileContent] = useState(null)
  const [fileLoading, setFileLoading] = useState(false)
  const [deletingFile, setDeletingFile] = useState(null)
  const [search, setSearch] = useState('')

  const loadFiles = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/files')
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to load files')
      setFiles(json.files)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadFiles()
  }, [loadFiles])

  const handleSelect = async (file) => {
    setSelectedFile(file.name)
    setFileContent(null)
    setFileLoading(true)
    try {
      const res = await fetch(`/api/files/${encodeURIComponent(file.name)}`)
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      setFileContent(json.content)
    } catch (err) {
      setFileContent({ _error: err.message })
    } finally {
      setFileLoading(false)
    }
  }

  const handleDelete = async (e, filename) => {
    e.stopPropagation()
    if (!confirm(`Delete "${filename}"?`)) return
    setDeletingFile(filename)
    try {
      await fetch(`/api/files/${encodeURIComponent(filename)}`, { method: 'DELETE' })
      setFiles(f => f.filter(x => x.name !== filename))
      if (selectedFile === filename) {
        setSelectedFile(null)
        setFileContent(null)
      }
    } finally {
      setDeletingFile(null)
    }
  }

  const handleDownload = (e, file) => {
    e.stopPropagation()
    const url = `/api/files/${encodeURIComponent(file.name)}`
    fetch(url).then(r => r.json()).then(json => {
      const blob = new Blob([JSON.stringify(json.content, null, 2)], { type: 'application/json' })
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = file.name
      a.click()
    })
  }

  const filteredFiles = files.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="files-page">
      <div className="files-sidebar">
        <div className="files-header">
          <div className="files-title">
            <span>SAVED FILES</span>
            <span className="files-count tag">{files.length}</span>
          </div>
          <div className="files-actions">
            <input
              type="text"
              placeholder="Search files..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="files-search"
            />
            <button className="btn" onClick={loadFiles} title="Refresh">
              ↺ REFRESH
            </button>
          </div>
        </div>

        <div className="files-list">
          {loading && (
            <div className="files-state mono">Loading files...</div>
          )}
          {!loading && error && (
            <div className="files-state error mono">{error}</div>
          )}
          {!loading && !error && filteredFiles.length === 0 && (
            <div className="files-state mono">
              {search ? `No files matching "${search}"` : 'No saved files yet. Fetch some data!'}
            </div>
          )}
          {!loading && filteredFiles.map(file => (
            <div
              key={file.name}
              className={`file-item ${selectedFile === file.name ? 'active' : ''}`}
              onClick={() => handleSelect(file)}
            >
              <div className="file-icon">JSON</div>
              <div className="file-info">
                <div className="file-name">{file.name}</div>
                <div className="file-meta mono">
                  <span>{formatSize(file.size)}</span>
                  <span className="sep">·</span>
                  <span>{formatDate(file.modifiedAt)}</span>
                </div>
              </div>
              <div className="file-btns">
                <button
                  className="icon-btn download"
                  onClick={(e) => handleDownload(e, file)}
                  title="Download"
                >
                  ↓
                </button>
                <button
                  className="icon-btn delete"
                  onClick={(e) => handleDelete(e, file.name)}
                  disabled={deletingFile === file.name}
                  title="Delete"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="files-viewer">
        {!selectedFile ? (
          <div className="viewer-empty mono">← Select a file to view its content</div>
        ) : (
          <>
            <div className="viewer-header">
              <span className="viewer-filename">{selectedFile}</span>
              <button
                className="btn"
                onClick={() => handleDownload({ stopPropagation: () => {} }, { name: selectedFile })}
              >
                ↓ DOWNLOAD
              </button>
            </div>
            <div className="viewer-content">
              <ResponsePanel
                result={fileContent}
                loading={fileLoading}
                error={null}
                savedAs={null}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default FilesPage
