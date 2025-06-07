import { useRef } from 'react'
import { FileUploadIcon } from '../assets/dash-icons'

export default function UploadFile ({ editorRef }) {
  const fileInputRef = useRef(null)

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new window.FileReader()

    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result)
        const formatted = JSON.stringify(json, null, 2)
        if (editorRef.current) {
          editorRef.current.setValue(formatted)
        }
      } catch (err) {
        window.alert('Invalid JSON file')
      }
      e.target.value = ''
    }
    reader.readAsText(file)
  }

  return (
    <>
      <button
        type='button'
        onClick={() => fileInputRef.current?.click()}
        className='flex items-center gap-x-1 btn-border px-3 py-[7px] cursor-pointer'
      >
        <FileUploadIcon />
        <span>Upload file</span>
      </button>
      <input
        type='file'
        accept='.json'
        ref={fileInputRef}
        className='hidden'
        onChange={handleFileUpload}
      />
    </>
  )
}
