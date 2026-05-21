import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Upload from './Upload.tsx'
import DownloadPage from './Download.tsx'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Upload />} />
        <Route path="/download" element={<DownloadPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
