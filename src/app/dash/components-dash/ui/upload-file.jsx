import { useRef } from 'react'
import { FileUploadIcon } from '../../assets/dash-icons'
import { toast } from 'sonner'

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
      } catch (error) {
        return toast.error('The JSON file is not valid')
      }
      e.target.value = ''
    }
    reader.readAsText(file)
  }

  return (
    <>
      <button
        type='button'
        aria-label='File Upload Icon'
        onClick={() => fileInputRef.current?.click()}
        className='flex items-center gap-x-1 btn-border px-4 py-[7px] cursor-pointer'
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
