import { useEffect, useRef, useState } from 'react'
import Format from './ui/format'
import Clean from './ui/clean'
import { DotsIcon } from '../assets/dash-icons'
import DownloadFile from './ui/download-file'
import Clipboard from './ui/clipboard'
import { AnimatePresence, motion } from 'framer-motion'

export default function EditorOpDropdown ({
  handleFormat,
  editorRef,
  handleFileDownload,
  handleFileCopying
}) {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  useEffect(() => {
    const editorInstance = editorRef?.current

    if (!editorInstance) return

    const focusListener = editorInstance.onDidFocusEditorText(() => {
      setOpen(false)
    })

    return () => {
      focusListener?.dispose()
    }
  }, [editorRef])

  return (
    <div ref={dropdownRef} className='block md:hidden'>
      <button
        type='button'
        aria-label='Dots Icon'
        onClick={() => setOpen(!open)}
        className='relative p-[7px] rounded-[5px] border border-neutral-600 hover:bg-neutral-500/40 hover:border-neutral-500
        transition-colors duration-200 ease-in-out leading-3.5'
      >
        <DotsIcon />
      </button>

      <AnimatePresence>
        {open && (
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className='fixed z-40 bottom-0 left-0 w-full p-5 space-y-4 text-xl font-normal rounded-t-[10px] border-t border-t-neutral-600 bg-neutral-800'
          >
            <h3 className='text-sm text-center text-neutral-400'>Editor options</h3>
            <Format handleFormat={handleFormat} />
            <Clean editorRef={editorRef} />
            <Clipboard
              editorRef={editorRef}
              handleFileCopying={handleFileCopying}
              responsiveMode
            />
            <DownloadFile handleFileDownload={handleFileDownload} responsiveMode />
          </motion.article>
        )}
      </AnimatePresence>
    </div>
  )
}
