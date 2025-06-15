import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { CheckIcon, CopyIcon } from '../../assets/dash-icons'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function Clipboard ({ editorRef, handleFileCopying, responsiveMode }) {
  const pathname = usePathname()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [copied])

  return (
    <>
      <button
        type='button'
        aria-label='Copy Icon'
        onClick={async () => {
          if (pathname === '/dash/new') {
            const value = editorRef?.current.getValue()

            if (!value || value.trim() === '') {
              return toast.error('The editor has no content')
            }
          }
          const copiedSuccessfully = await handleFileCopying()

          if (copiedSuccessfully) {
            setCopied(true)
            // console.log('Copied successfully:', copiedSuccessfully)
            // return toast.success('It has been copied correctly')
          } else {
            return toast.error('Check the structure of the JSON')
          }
        }}
        className={(pathname === '/dash/new' && responsiveMode)
          ? clsx('bg-transparent flex items-center gap-x-1',
            responsiveMode === 'md' && 'editor-btn')
          : 'editor-btn text-sm leading-3.5'}
      >
        {copied
          ? (
            <CheckIcon className={(pathname === '/dash/new' && responsiveMode) &&
              clsx('size-5', responsiveMode === 'md' && 'w-4 h-4')}
            />
            )
          : (<CopyIcon className={(pathname === '/dash/new' && responsiveMode) &&
              clsx('size-5', responsiveMode === 'md' && 'w-4 h-4')}
             />)}
        <span>Copy</span>
      </button>
    </>
  )
}
