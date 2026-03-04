import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header/Header'
import FetchPage from './pages/FetchPage/FetchPage'
import FilesPage from './pages/FilesPage/FilesPage'
import WikiPage from './pages/WikiPage/WikiPage'
import { useFetch } from './hooks/useFetch'
import { findEndpoint } from './utils/endpoints'
import './App.css'

// All FetchPage state lives here so navigating away and back
// preserves the selected endpoint, filled params AND last response.
function App() {
  const fetchState = useFetch()

  const [selectedEndpointId, setSelectedEndpointId] = useState(null)
  const [formState, setFormState] = useState({ params: {}, saveAs: '', autoSave: false })

  // When endpoint changes reset params but preserve autoSave preference
  const handleSelectEndpoint = (id) => {
    if (id === selectedEndpointId) return
    const ep = findEndpoint(id)
    setSelectedEndpointId(id)
    setFormState(prev => ({ params: {}, saveAs: ep ? ep.id : '', autoSave: prev.autoSave }))
  }

  return (
    <div className="app">
      <Header />
      <main className="app-main">
        <Routes>
          <Route
            path="/"
            element={
              <FetchPage
                fetchState={fetchState}
                selectedEndpointId={selectedEndpointId}
                onSelectEndpoint={handleSelectEndpoint}
                formState={formState}
                setFormState={setFormState}
              />
            }
          />
          <Route path="/files" element={<FilesPage />} />
          <Route path="/wiki" element={<WikiPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
