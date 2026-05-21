import './Upload.css'

function MyButton({ title }: { title: string }) {
  return <button className="upload-btn">{title}</button>
}

export default function Upload() {
  return (
    <div className="upload">
      <nav className="upload-nav">
        <img
          className="upload-nav__logo"
          src="/favicon.svg"
          alt="TabVerter logo"
        />
        <h1 className="upload-nav__title">TabVerter</h1>
      </nav>
      <div className="upload-dropzone">
        <p className="upload-dropzone__label">Upload file or Document</p>
      </div>
      <MyButton title="Capture Mode" />
    </div>
  )
}
