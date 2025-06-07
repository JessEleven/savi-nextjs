import { EraserIcon, FileIcon } from '../assets/dash-icons'

export default function EditorOptions ({ handleFormat, editorRef }) {
  return (
    <div className='flex items-center gap-x-2.5 leading-3.5'>
      <button
        type='button'
        onClick={handleFormat}
        className='editor-btn'
      >
        <FileIcon />
        <span>Format</span>
      </button>
      <button
        type='button'
        onClick={() => {
          if (editorRef.current) {
            editorRef.current.setValue('')
          }
        }}
        className='editor-btn'
      >
        <EraserIcon />
        <span>Clean</span>
      </button>
    </div>
  )
}
