// import { Link } from 'react-router-dom'
import MyButton from './MyButton.tsx'

export default function DownloadPage() {
    return(
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
                <p className="upload-dropzone__label">Nice Image Bro!</p>
            </div>
            <MyButton location='/' text="Download PDF" />
        </div>
    )
}