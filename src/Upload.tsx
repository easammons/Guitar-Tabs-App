import { Link } from 'react-router-dom'
import './Upload.css'
import MyButton from './MyButton.tsx'

function MyLink({ location, text }: { location: string, text: string }) {
    return <Link to={location}>{text}</Link>
}

export default function Upload() {
  return (
    <div className="upload">
      <nav className="upload-nav">
        <img
          className="upload-nav__logo"
          src="/guitar-favicon.png"
          alt="TabVerter logo"
        />
        <h1 className="upload-nav__title">TabVerter</h1>
      </nav>
      <div className="upload-dropzone">
        <p className="upload-dropzone__label">Upload file or Document</p>
      </div>
      <MyButton location="/download" text="Capture Mode" />
    </div>
  )
}
