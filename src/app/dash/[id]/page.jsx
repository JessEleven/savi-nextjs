'use client'

import Editor from '@monaco-editor/react'
import { useEffect, useState } from 'react'
import ErrorFetching from '../components-dash/ui/error-fetching'
import { LoaderIcon } from '../assets/dash-icons'
import dayjs from 'dayjs'
import { downloadFile } from '@/utils/download'
import DownloadFile from '../components-dash/ui/download-file'
import Clipboard from '../components-dash/ui/clipboard'
import { copySavedFile } from '@/utils/clipboard'
import { useSearchParams } from 'next/navigation'
import { getJsonStorageById } from '@/libs/api/json-storage'
import { getJsonFavoriteById } from '@/libs/api/json-favorite'

export default function GetPageId ({ params }) {
  const { id } = params
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const searchParams = useSearchParams()

  const from = searchParams.get('from')

  useEffect(() => {
    (async () => {
      try {
        const file = (from === 'favorite'
          ? await getJsonFavoriteById(id)
          : await getJsonStorageById(id)
        )
        setData(file)
      } catch (error) {
        // console.error('Error fetching file:', error)
        setError(error)
      }
    })()
  }, [id])

  const handleFileCopying = async () => {
    return await copySavedFile(data.fileContent)
  }

  const handleFileDownload = () => {
    downloadFile({ fileName: data.fileName, fileContent: data.fileContent })
  }

  if (!data) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <LoaderIcon className='animate-spin' />
      </div>
    )
  }

  if (error) {
    return (
      <ErrorFetching />
    )
  }

  return (
    <main className='mt-7 mb-10 flex flex-col mx-auto w-full lg:w-[700px] xl:w-[850px] 2xl:w-[1000px]'>
      <div className='block md:flex md:items-center justify-between mb-5 truncate'>
        <h3 className='text-2xl truncate font-medium'>{data.fileName}</h3>
        <h3 className='text-sm text-neutral-400'>
          {dayjs(data.createdAt).format('MMMM DD, YYYY • hh:mm a')}
        </h3>
      </div>

      <div className='flex items-center gap-x-2.5'>
        <Clipboard handleFileCopying={handleFileCopying} />
        <DownloadFile handleFileDownload={handleFileDownload} />
      </div>

      <div className='rounded-lg overflow-hidden mt-2.5'>
        <Editor
          value={JSON.stringify(data.fileContent, null, 2)}
          height='500px'
          defaultLanguage='json'
          theme='vs-dark'
          loading={null}
          options={{
            readOnly: true,
            domReadOnly: true,
            minimap: { enabled: false },
            guides: {
              bracketPairs: false,
              highlightActiveBracketPair: false
            },
            matchBrackets: 'never',
            folding: true,
            automaticLayout: true,
            padding: { top: 22, bottom: 22 },
            fontFamily: 'Consolas',
            fontLigatures: true,
            cursorBlinking: 'solid',
            smoothScrolling: true,
            cursorStyle: 'line',
            contextmenu: false,
            renderLineHighlight: 'none',
            fontSize: 14,
            lineHeight: 22,
            letterSpacing: 0.5,
            scrollbar: {
              verticalScrollbarSize: 12,
              horizontalScrollbarSize: 12
            },
            scrollBeyondLastLine: false,
            renderLineHighlightOnlyWhenFocus: true
          }}
        />
      </div>
    </main>
  )
}
