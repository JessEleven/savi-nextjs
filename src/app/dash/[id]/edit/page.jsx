'use client'

import Editor, { loader } from '@monaco-editor/react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import EditorOptions from '../../components-dash/editor-options'
import { updateJsonStorage } from '@/libs/api/json-storage'
import { updateJsonFavorite } from '@/libs/api/json-favorite'
import EditorOpDropdown from '../../components-dash/editor-op-dropdown'
import UploadFile from '../../components-dash/ui/upload-file'
import { useForm } from 'react-hook-form'
import { inputSchema } from '@/libs/validation-schema/input-schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { downloadFile } from '@/utils/download'
import { toast } from 'sonner'
import { copyFile } from '@/utils/clipboard'
import Text from '../../components-dash/ui/text'
import { SkeletonUpdate } from '../../components-dash/ui/skeletons'

export default function EditPage () {
  const { id } = useParams()
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
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()

  const from = searchParams.get('from')

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const response = (from === 'fav'
          ? await fetch(`/api/json-favorite/${id}`)
          : await fetch(`/api/json-storage/${id}`)
        )
        const result = await response.json()
        const data = result.data

        setValue('fileName', data.fileName)
        setValue('fileContent', JSON.stringify(data.fileContent, null, 2))
      } catch (error) {
        // console.error('Unexpected error:', error)
        toast.error('Failed to load file data')
      } finally {
        setLoading(false)
      }
    })()
  }, [id, from, setValue])

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

  const onSubmit = async (formData) => {
    const content = editorRef.current?.getValue()

    try {
      const parsed = JSON.parse(content)

      from === 'fav'
        ? await updateJsonFavorite({
          id,
          formData: {
            ...formData,
            fileContent: parsed
          }
        })
        : await updateJsonStorage({
          id,
          formData: {
            ...formData,
            fileContent: parsed
          }
        })

      toast.success('File updated successfully')
      reset()
      router.push(from === 'fav' ? '/dash/favorite' : '/dash')
    } catch (error) {
      // console.log('Invalid JSON or failed to update')
      toast.error('Invalid JSON or failed to update')
    }
  }

  const handleFormat = () => {
    editorRef.current?.getAction('editor.action.formatDocument').run()
  }

  const handleFileCopying = async () => {
    const content = editorRef.current?.getValue()
    return copyFile(content)
  }

  const handleFileDownload = () => {
    const fileName = watch('fileName')
    const fileContent = editorRef.current?.getValue()

    if (!fileContent) {
      return toast.error('The editor has no content')
    }
    let parsed

    try {
      parsed = JSON.parse(fileContent)
    } catch {
      // console.error('Invalid JSON structure:', error)
      return toast.error('Invalid JSON structure')
    }

    const isEmptyJson =
      (typeof parsed === 'object' && !Array.isArray(parsed) && Object.keys(parsed).length === 0) ||
      (Array.isArray(parsed) && parsed.length === 0) ||
      (Array.isArray(parsed) && parsed.length === 1 && JSON.stringify(parsed[0]) === '{}')

    if (isEmptyJson) {
      return toast.error('Cannot download an empty JSON structure')
    }
    downloadFile({ fileName, fileContent: parsed })
    toast.success('File downloaded successfully')
  }

  return (
    <main className='mt-7 mb-10'>
      {loading && <SkeletonUpdate />}
      {!loading && (
        <article className='card-container'>
          <Text name='Update JSON file' />

          <form onSubmit={handleSubmit(onSubmit)} className='mt-5 text-sm'>
            <div className='flex flex-col relative'>
              <label htmlFor='fileName'>File name</label>
              <input
                id='fileName'
                type='text'
                name='fileName'
                className='mt-1.5 outline-none focus:border-slate-400 bg-transparent border border-neutral-600 rounded-[5px] px-4 py-1.5 font-normal'
                placeholder='e.g. Updated file...'
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

              <div className='relative rounded-lg overflow-hidden'>
                <Editor
                  defaultLanguage='json'
                  theme='custom-vs-dark'
                  height='500px'
                  value={watch('fileContent')}
                  loading={null}
                  onChange={(value) => {
                    setValue('fileContent', value)
                    trigger('fileContent')
                  }}
                  onMount={(editor) => {
                    editorRef.current = editor
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
                <p className='absolute top-[782px] text-rose-400'>{errors.fileContent.message}</p>
              )}
            </div>

            <div className='flex justify-end gap-x-2.5 mt-7'>
              <Link href='/dash/favorite' className='block px-4 py-[7px] btn-border'>Cancel</Link>
              <button
                type='submit'
                disabled={!isValid}
                className={`px-4 py-[8.5px] btn-bg ${!isValid ? 'disabled:opacity-50 disabled:cursor-not-allowed' : 'cursor-pointer'}`}
              >
                Update
              </button>
            </div>
          </form>
        </article>
      )}
    </main>
  )
}
