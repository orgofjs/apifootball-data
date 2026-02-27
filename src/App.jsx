import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header/Header'
import FetchPage from './pages/FetchPage/FetchPage'
import FilesPage from './pages/FilesPage/FilesPage'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<FetchPage />} />
          <Route path="/files" element={<FilesPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
