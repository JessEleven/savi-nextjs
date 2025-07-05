import clsx from 'clsx'
import { useParams, usePathname } from 'next/navigation'
import { CheckIcon, CopyIcon } from '../../assets/dash-icons'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function Clipboard ({ editorRef, handleFileCopying, responsiveMode }) {
  const { id } = useParams()
  const pathname = usePathname()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [copied])

  const areOnRoutes = ['/dash/new', `/dash/${id}/edit`, `/dash/${id}/edit/fav`]

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
        className={(areOnRoutes.includes(pathname) && responsiveMode)
          ? clsx('bg-transparent flex items-center gap-x-1.5',
            responsiveMode === 'md' && 'editor-btn')
          : 'editor-btn text-sm leading-3.5'}
      >
        {copied
          ? (
            <CheckIcon className={(areOnRoutes.includes(pathname) && responsiveMode) &&
              clsx('size-6', responsiveMode === 'md' && 'w-4 h-4')}
            />
            )
          : (<CopyIcon className={(areOnRoutes.includes(pathname) && responsiveMode) &&
              clsx('size-6', responsiveMode === 'md' && 'w-4 h-4')}
             />)}
        <span>Copy</span>
      </button>
    </>
  )
}
