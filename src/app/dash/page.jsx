'use client'

import { useEffect, useRef, useState } from 'react'
import { deleteJsonStorage, getAllJsonStorage } from '@/libs/api/json-storage'
import Link from 'next/link'
import dayjs from 'dayjs'
import {
  ChevronLeft, ChevronRight, DotsIcon, EditIcon,
  FocusIcon, PointIcon, StarIcon, TrashIcon
} from './assets/dash-icons'
import { SkeletonCard } from './components-dash/ui/skeletons'
import ErrorFetching from './components-dash/ui/error-fetching'
import { toast } from 'sonner'
import FileHeaderBar from './components-dash/ui/file-header-bar'
import EmptyList from './components-dash/ui/empty-list'
import { toggleFavorite } from '@/libs/api/json-favorite'
import { motion, AnimatePresence } from 'framer-motion'

export default function DashPage () {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const scrollRef = useRef(null)
  const [hasScrollbar, setHasScrollbar] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [queryTime, setQueryTime] = useState(0)
  const [openById, setOpenById] = useState(null)
  const [hasUpdated, setHasUpdated] = useState([])

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const start = performance.now()
        const storage = await getAllJsonStorage()
        const end = performance.now()
        setQueryTime(Math.round(end - start))
        setData(storage)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    })()
  }, [refresh])

  useEffect(() => {
    const el = scrollRef.current
    if (el && el.scrollHeight > el.clientHeight) {
      setHasScrollbar(true)
    } else {
      setHasScrollbar(false)
    }
  }, [data])

  const handleRefresh = () => {
    setRefresh(prev => !prev)
  }

  return (
    <main className='mt-7 card-container'>
      <FileHeaderBar
        allFiles={data.length}
        handleRefresh={handleRefresh}
        loading={loading}
        hasItems={data.length > 0}
        queryTime={queryTime}
      />
      {loading && <SkeletonCard />}
      {(error && !loading) && <ErrorFetching />}
      {(!loading && !error && data.length <= 0) && <EmptyList message='No files were found' />}
      {(!loading && !error && data.length > 0) && (
        <div
          ref={scrollRef}
          className={`flex flex-col gap-y-3 h-[480px] overflow-y-auto scrollbar-custom ${hasScrollbar ? 'pr-1.5' : ''}`}
        >
          {data.map((item) => (
            <Link key={item.id} href={`/dash/${item.id}`} className='block'>
              <article className='px-5 py-2.5 rounded-lg border border-neutral-600 hover:border-stone-400 transition-colors duration-300 ease-in-out'>
                <div className='flex items-center justify-between gap-x-5'>
                  {/* File content */}
                  <div className='flex flex-col space-y-1 truncate'>
                    <div className='flex items-center gap-x-1'>
                      <FocusIcon className='text-neutral-600 group-hover:text-stone-400' />
                      <h3 className='text-[16px] font-medium truncate'>{item.fileName}</h3>
                    </div>
                    <div className='flex items-center gap-x-0.5'>
                      {/* Updated file */}
                      <PointIcon className={item.updatedAt === item.createdAt
                        ? 'text-emerald-500'
                        : 'text-purple-500'}
                      />

                      {/* Show date */}
                      <button
                        type='button'
                        aria-label='Point Icon'
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setHasUpdated((prev) =>
                            prev.includes(item.id)
                              ? prev.filter((id) => id !== item.id)
                              : [...prev, item.id]
                          )
                        }}
                        className='flex items-center cursor-pointer'
                      >
                        {hasUpdated.includes(item.id) ? <ChevronRight /> : <ChevronLeft />}
                      </button>

                      {hasUpdated.includes(item.id)
                        ? (
                          <h3 className='truncate text-sm text-neutral-400'>
                            {item.updatedAt !== item.createdAt && item.id
                              ? dayjs(item.updatedAt).format('MMMM DD, YYYY • hh:mm a')
                              : 'File not updated'}
                          </h3>
                          )
                        : (
                          <h3 className='truncate text-sm text-neutral-400'>
                            {dayjs(item.createdAt).format('MMMM DD, YYYY • hh:mm a')}
                          </h3>
                          )}
                    </div>
                  </div>

                  <div className='flex items-center gap-x-2.5'>
                    {/* Add an item to favorites */}
                    <button
                      type='button'
                      aria-label='Star Icon'
                      className='btn-border-icon'
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        toggleFavorite({
                          id: item.id,
                          favorite: item.favorite,
                          onSuccess: () => {
                            setData((prev) => prev.filter((star) => star.id !== item.id))
                          }
                        })
                        toast.success('File added to favorites')
                      }}
                    >
                      <StarIcon />
                    </button>

                    {/* To open the modal */}
                    <div className='relative text-sm'>
                      <button
                        type='button'
                        aria-label='Trash Icon'
                        className='btn-border-icon'
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setOpenById(openById === item.id ? null : item.id)
                        }}
                      >
                        <DotsIcon />
                      </button>

                      <AnimatePresence>
                        {(openById === item.id) && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className='absolute top-[41px] right-0 z-40 cursor-default'
                            onClick={(e) => e.preventDefault()}
                          >
                            <div className='w-[114.5px] p-2.5 space-y-2 rounded-md border border-neutral-600 bg-neutral-800'>
                              {/* Update an item */}
                              <Link href={`/dash/${item.id}/edit`} className='block w-fit'>
                                <div className='flex items-center gap-x-1 group'>
                                  <EditIcon className='text-purple-500 md:text-current md:group-hover:text-purple-500 transition-colors duration-200 ease-in-out' />
                                  <span>Edit</span>
                                </div>
                              </Link>

                              {/* Delete an item */}
                              <button
                                type='button'
                                aria-label='Trash Icon'
                                className='flex items-center gap-x-1 cursor-pointer group'
                                onClick={() => {
                                  deleteJsonStorage({
                                    id: item.id,
                                    onSuccess: () => {
                                      setData((prev) => prev.filter((storage) => storage.id !== item.id))
                                      setOpenById(null)
                                    }
                                  })
                                  toast.success('File deleted successfully')
                                }}
                              >
                                <TrashIcon className='text-rose-400 md:text-current md:group-hover:text-rose-400 transition-colors duration-200 ease-in-out' />
                                <span>Delete</span>
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
