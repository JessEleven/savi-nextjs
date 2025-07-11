import clsx from 'clsx'
import { EraserIcon } from '../../assets/dash-icons'

export default function Clean ({ editorRef, responsiveMode }) {
  return (
    <button
      type='button'
      aria-label='Eraser Icon'
      onClick={() => {
        if (editorRef?.current) {
          editorRef.current.setValue('')
        }
      }}
      className={clsx(
        'bg-transparent flex items-center gap-x-1.5',
        responsiveMode === 'md' && 'editor-btn'
      )}
    >
      <EraserIcon className={clsx('size-6', responsiveMode === 'md' && 'w-4 h-4')} />
      <span>Clean</span>
    </button>
  )
}
