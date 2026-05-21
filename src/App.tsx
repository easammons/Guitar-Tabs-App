import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Upload from './Upload.tsx'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Upload />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
