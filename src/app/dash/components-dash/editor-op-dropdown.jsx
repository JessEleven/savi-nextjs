import { useState } from 'react'
import Format from './ui/format'
import Clean from './ui/clean'
import { DotsIcon } from '../assets/dash-icons'
import DownloadFile from './ui/download-file'
import Clipboard from './ui/clipboard'

export default function EditorOpDropdown ({
  handleFormat,
  editorRef,
  handleFileDownload,
  handleFileCopying
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className='block md:hidden'>
      <button
        type='button'
        aria-label='Dots Icon'
        onClick={() => setOpen(!open)}
        className='relative p-[7px] rounded-[5px] border border-neutral-600 hover:bg-neutral-500/40 hover:border-neutral-500
        transition-colors duration-200 ease-in-out leading-3.5'
      >
        <DotsIcon />
      </button>

      {open && (
        <article className='fixed z-40 bottom-0 left-0 w-full p-5 space-y-2.5 text-base rounded-t-[10px] bg-[#383535]'>
          <Format handleFormat={handleFormat} />
          <Clean editorRef={editorRef} />
          <Clipboard
            editorRef={editorRef}
            handleFileCopying={handleFileCopying}
            responsiveMode
          />
          <DownloadFile handleFileDownload={handleFileDownload} responsiveMode />
        </article>
      )}
    </div>
  )
}
