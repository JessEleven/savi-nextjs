import clsx from 'clsx'
import { EraserIcon } from '../../assets/dash-icons'

export default function Clean ({ editorRef, responsiveMode }) {
  return (
    <button
      type='button'
      onClick={() => {
        if (editorRef?.current) {
          editorRef.current.setValue('')
        }
      }}
      className={clsx(
        'bg-transparent flex items-center gap-x-1',
        responsiveMode === 'md' && 'editor-btn'
      )}
    >
      <EraserIcon className={clsx('size-5', responsiveMode === 'md' && 'w-4 h-4')} />
      <span>Clean</span>
    </button>
  )
}
