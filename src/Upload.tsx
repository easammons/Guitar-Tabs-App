import './Upload.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Upload() {
  // Define useState variable to hold the file the user selected
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // React Router hook to navigate to a different page
  const navigate = useNavigate();

  // This handles the user changing the file. If nothing has changed, nothing happens.
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUploadAndProcess = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile); // Look at /server/routes/upload.py
      // The upload.py file uploads a 'file' thus I am appending to that file here

      const uploadResponse = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData
      });

      if (!uploadResponse.ok) throw new Error('Upload failed');

      const uploadData = await uploadResponse.json();
      const processResponse = await fetch('http://localhost:5000/convert', {
        // Handle the processing of the api.
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          file_id: uploadData.file_id
        }),
      });

      if (!processResponse.ok) throw new Error('Processing failed');

      const processedJson = await processResponse.json();

      navigate('/download', {
        state: {
          tabData: processedJson
        }
      })

    } catch (error) {
      console.error("An error has occured", error);
    } finally {
      setIsProcessing(false);
    }

  }

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
      <input
        className='upload-dropzone'
        name='Upload File Box'
        type="file"
        accept=".xml,.mxl"
        onChange={handleFileChange}
      />
      <button className="upload-btn" onClick={handleUploadAndProcess} disabled={isProcessing}>
        Upload the File
      </button>
    </div>
  )
}
