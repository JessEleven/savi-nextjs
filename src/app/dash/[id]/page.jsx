'use client'

import { getAllJsonStorage } from '@/libs/api/json-storage'
import Editor from '@monaco-editor/react'
import { useEffect, useState } from 'react'

export default function Page ({ params }) {
  const { id } = params
  const [data, setData] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        const allFiles = await getAllJsonStorage()
        const currentFile = allFiles.find((item) => item.id === id)
        setData(currentFile)
      } catch (error) {
        console.error('Error fetching file:', error)
      }
    })()
  }, [id])

  if (!data) return <p className='text-center mt-5'>Cargando...</p>

  return (
    <main className='mt-5 flex flex-col mx-auto w-full lg:w-[700px] xl:w-[850px] 2xl:w-[1000px]'>
      <h3 className='text-transparent bg-clip-text bg-linear-30 from-rose-400 via-cyan-400 font-medium text-2xl'>
        Create or upload a JSON file
      </h3>
      <h3 className='text-base'>File name: {data.fileName} {data.createdAt}</h3>
      <div className='rounded-[5px] overflow-hidden mt-2.5'>
        <Editor
          value={JSON.stringify(data.fileContent, null, 2)}
          height='500px'
          defaultLanguage='json'
          theme='vs-dark'
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
