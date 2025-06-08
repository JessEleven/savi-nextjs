'use client'

import Editor, { loader } from '@monaco-editor/react'
import Link from 'next/link'
import { LoaderIcon } from '../assets/dash-icons'
import { useEffect, useRef, useState } from 'react'
import EditorOptions from '../components-dash/editor-options'
import UploadFile from '../components-dash/upload-file'
import { createJsonStorage } from '@/libs/api/json-storage'
import { useRouter } from 'next/navigation'

export default function NewPage () {
  const [isFocused, setIsFocused] = useState(false)
  const [formData, setFormData] = useState({
    fileName: '', fileContent: ''
  })
  const editorRef = useRef(null)
  const router = useRouter()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const content = editorRef.current?.getValue()
    const parsed = JSON.parse(content)

    try {
      await createJsonStorage({
        ...formData,
        fileContent: parsed
      })
      router.push('/dash')
    } catch (error) {
      console.error('Unexpected error:', error)
    }
  }

  useEffect(() => {
    loader.init().then(monaco => {
      monaco.editor.defineTheme('custom-vs-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [],
        colors: {
          'editor.lineHighlightBackground': '#2c2c2c',
          'editor.lineHighlightBorder': '#2c2c2c'
        }
      })
    })
  }, [])

  const handleFormat = () => {
    if (editorRef.current) {
      editorRef.current.getAction('editor.action.formatDocument').run()
    }
  }

  return (
    <main className='mt-5'>
      <article className='flex flex-col mx-auto h-fit p-6 w-full lg:w-[700px] xl:w-[850px] 2xl:w-[1000px]'>
        <h3 className='text-transparent bg-clip-text bg-linear-30 from-rose-400 via-cyan-400 font-medium text-2xl'>
          Create or upload a JSON file
        </h3>

        <form onSubmit={handleSubmit} className='mt-5 text-sm'>
          <div className='flex flex-col'>
            <label htmlFor='fileName'>File name</label>
            <input
              id='fileName'
              type='text'
              name='fileName'
              className='mt-1.5 mb-5 outline-none focus:border-slate-400 bg-transparent border border-neutral-600 rounded-md px-4 py-1.5 font-normal'
              placeholder='e.g. First file, New file...'
              onChange={handleChange}
            />
          </div>

          <div className='flex flex-col'>
            <div className='flex items-center justify-between mb-2.5'>
              <EditorOptions
                handleFormat={handleFormat}
                editorRef={editorRef}
              />
              <UploadFile editorRef={editorRef} />
            </div>

            <div className={`rounded-md overflow-hidden border ${isFocused ? 'border-slate-400' : 'border-neutral-600'}`}>
              <Editor
                name='fileContent'
                onChange={(value) => {
                  setFormData({ ...formData, fileContent: value })
                }}
                height='400px'
                defaultLanguage='json'
                theme='custom-vs-dark'
                loading={<LoaderIcon className='animate-spin' />}
                onMount={(editor) => {
                  editorRef.current = editor
                  editor.onDidFocusEditorWidget(() => setIsFocused(true))
                  editor.onDidBlurEditorWidget(() => setIsFocused(false))
                }}
                options={{
                  minimap: { enabled: false },
                  guides: {
                    bracketPairs: false,
                    highlightActiveBracketPair: false
                  },
                  matchBrackets: 'never',
                  folding: true,
                  automaticLayout: true,
                  padding: { top: 22, bottom: 22 },
                  renderWhitespace: 'selection',
                  fontFamily: 'Consolas',
                  fontLigatures: true,
                  cursorBlinking: 'smooth',
                  smoothScrolling: true,
                  contextmenu: true,
                  renderLineHighlight: 'line',
                  tabSize: 2,
                  fontSize: 14,
                  lineHeight: 22,
                  letterSpacing: 0.5,
                  roundedSelection: true,
                  scrollbar: {
                    verticalScrollbarSize: 12,
                    horizontalScrollbarSize: 12
                  },
                  scrollBeyondLastLine: false,
                  renderLineHighlightOnlyWhenFocus: true
                }}
              />
            </div>
          </div>

          <div className='flex justify-end gap-x-3 mt-5'>
            <Link href='/dash' className='btn-border block p-[7px]'>Cancel</Link>
            <button type='submit' className='btn-bg cursor-pointer'>Save</button>
          </div>
        </form>
      </article>
    </main>
  )
}
