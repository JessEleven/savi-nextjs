'use client'

import Editor, { loader } from '@monaco-editor/react'
import Link from 'next/link'
import { LoaderIcon } from '../assets/dash-icons'
import { useEffect, useRef } from 'react'
import EditorOptions from '../components-dash/editor-options'
import { createJsonStorage } from '@/libs/api/json-storage'
import { useRouter } from 'next/navigation'
import EditorOpDropdown from '../components-dash/editor-op-dropdown'
import UploadFile from '../components-dash/ui/upload-file'
import { useForm } from 'react-hook-form'
import { inputSchema } from '@/libs/validation-schema/input-schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { downloadFile } from '@/utils/download'
import { toast } from 'sonner'
import { copyFile } from '@/utils/clipboard'
import Text from '../components-dash/ui/text'

export default function NewPage () {
  // const [isFocused, setIsFocused] = useState(false)
  const {
    setValue,
    trigger,
    watch,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm({
    resolver: yupResolver(inputSchema),
    mode: 'onChange'
  })
  const editorRef = useRef(null)
  const router = useRouter()

  const onSubmit = async (formData) => {
    const content = editorRef.current?.getValue()
    const parsed = JSON.parse(content)

    try {
      await createJsonStorage({
        ...formData,
        fileContent: parsed
      })
      toast.success('File created successfully')
      reset()
      router.push('/dash')
    } catch (error) {
      // console.error('Invalid JSON:', error)
      toast.error('Invalid JSON or failed to create')
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

  const handleFileCopying = async () => {
    const content = editorRef.current?.getValue()
    const success = copyFile(content)
    return success
  }

  const handleFileDownload = () => {
    const fileName = watch('fileName')
    const fileContent = editorRef.current?.getValue()

    /* if (!fileName) {
      return toast.error('The file name field is empty')
    } */

    if (!fileContent) {
      return toast.error('The editor has no content')
    }
    let parsed

    try {
      parsed = JSON.parse(fileContent)
    } catch (error) {
      // console.error('Invalid JSON structure:', error)
      return toast.error('Invalid JSON structure')
    }

    const isEmptyJson =
    (typeof parsed === 'object' && !Array.isArray(parsed) && Object.keys(parsed).length === 0) || // {}
    (Array.isArray(parsed) && parsed.length === 0) || // []
    (Array.isArray(parsed) && parsed.length === 1 && JSON.stringify(parsed[0]) === '{}') // [{}]

    if (isEmptyJson) {
      return toast.error('Cannot download an empty JSON structure')
    }
    downloadFile({ fileName, fileContent: parsed })
    toast.success('File downloaded successfully')
  }

  return (
    <main className='mt-7 mb-10'>
      <article className='card-container'>
        <Text name='Create a new file' />

        <form onSubmit={handleSubmit(onSubmit)} className='mt-5 text-sm'>
          <div className='flex flex-col relative'>
            <label htmlFor='fileName'>File name</label>
            <input
              id='fileName'
              type='text'
              name='fileName'
              className='mt-1.5 outline-none focus:border-slate-400 bg-transparent border border-neutral-600 rounded-[5px] px-4 py-1.5 font-normal'
              placeholder='e.g. First file, New file...'
              {...register('fileName')}
            />
            {errors.fileName && (
              <p className='absolute top-16 text-rose-400'>{errors.fileName.message}</p>
            )}
          </div>

          <div className='flex flex-col mt-7'>
            <div className='flex items-center justify-between mb-2.5'>
              <EditorOptions
                handleFormat={handleFormat}
                editorRef={editorRef}
                handleFileDownload={handleFileDownload}
                handleFileCopying={handleFileCopying}
              />
              <EditorOpDropdown
                handleFormat={handleFormat}
                editorRef={editorRef}
                handleFileDownload={handleFileDownload}
                handleFileCopying={handleFileCopying}
              />
              <UploadFile editorRef={editorRef} />
            </div>

            <div className='relative rounded-md overflow-hidden'>
              <Editor
                name='fileContent'
                onChange={(value) => {
                  setValue('fileContent', value)
                  trigger('fileContent')
                }}
                height='500px'
                defaultLanguage='json'
                theme='custom-vs-dark'
                loading={<LoaderIcon className='animate-spin' />}
                onMount={(editor) => {
                  editorRef.current = editor
                  // editor.onDidFocusEditorWidget(() => setIsFocused(true))
                  // editor.onDidBlurEditorWidget(() => setIsFocused(false))
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
            <input type='hidden' {...register('fileContent')} value={watch('fileContent') || ''} />

            {errors.fileContent && (
              <p className='absolute top-[782px] text-rose-400'>
                {errors.fileContent.message}
              </p>
            )}
          </div>

          <div className='flex justify-end gap-x-2.5 mt-7'>
            <Link href='/dash' className='block px-4 py-[7px] btn-border'>Cancel</Link>
            <button
              type='submit'
              disabled={!isValid}
              className='px-4 py-[8.5px] btn-bg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
            >Save
            </button>
          </div>
        </form>
      </article>
    </main>
  )
}
