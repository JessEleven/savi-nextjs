'use client'

import { useEffect, useState } from 'react'
import { deleteJsonStorage, getAllJsonStorage } from '@/libs/api/json-storage'
import Link from 'next/link'
import dayjs from 'dayjs'
import { HeartIcon, KeyframeFilledIcon, TrashIcon } from './assets/dash-icons'
import SkeletonCard from './components-dash/ui/skeleton-card'
import ErrorFetching from './components-dash/ui/error-fetching'
import { toast } from 'sonner'
import { ClockCirceIcon } from './assets/animated-icons'
import OptionsLinks from './components-dash/ui/options-links'

export default function DashPage () {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const storage = await getAllJsonStorage()
        setData(storage)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) {
    return (
      <SkeletonCard />
    )
  }

  if (data.length <= 0 && !loading) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center'>
        <ClockCirceIcon />
        <h3 className='text-neutral-400 text-sm'>No files were found</h3>
      </div>
    )
  }

  if (error) {
    return (
      <ErrorFetching />
    )
  }

  return (
    <main className='mt-10 card-container'>
      <OptionsLinks />
      <div className='pr-1 h-[525px] overflow-y-auto'>
        {data?.map((item) => (
          <Link key={item.id} href={`/dash/${item.id}`} className='block'>
            <article className='px-5 py-2.5 rounded-lg border border-neutral-600 hover:border-teal-600 transition-all duration-300 ease-in-out'>
              <div className='flex items-center justify-between gap-x-5'>
                <div className='flex flex-col space-y-1 truncate'>
                  <div className='flex items-center gap-x-1'>
                    <KeyframeFilledIcon className='text-cyan-600' />
                    <h3 className='truncate font-medium'>{item.fileName}</h3>
                  </div>
                  <h3 className='truncate text-sm text-neutral-400'>
                    {dayjs(item.createdAt).format('YYYY MMMM DD - hh:mm:ss a')}
                  </h3>
                </div>

                <div className='flex items-center gap-x-2.5'>
                  <button
                    type='button'
                    aria-label='Heart Icon'
                    className='btn-border-icon'
                  >
                    <HeartIcon />
                  </button>
                  <button
                    type='button'
                    aria-label='Trash Icon'
                    className='btn-border-icon'
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      deleteJsonStorage({
                        id: item.id,
                        onSuccess: () => {
                          setData((prev) => prev.filter((storage) => storage.id !== item.id))
                        }
                      })
                      toast.success('File deleted successfully')
                    }}
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  )
}
