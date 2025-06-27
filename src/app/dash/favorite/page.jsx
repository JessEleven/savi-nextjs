'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import dayjs from 'dayjs'
import { FocusIcon, StarIcon } from '../assets/dash-icons'
import { SkeletonCard } from '../components-dash/ui/skeletons'
import ErrorFetching from '../components-dash/ui/error-fetching'
import { toast } from 'sonner'
import FileHeaderBar from '../components-dash/ui/file-header-bar'
import EmptyList from '../components-dash/ui/empty-list'
import { getAllJsonFavorite, toggleFavorite } from '@/libs/api/json-favorite'

export default function FavoritePage () {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const scrollRef = useRef(null)
  const [hasScrollbar, setHasScrollbar] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [queryTime, setQueryTime] = useState(0)

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const start = performance.now()
        const storage = await getAllJsonFavorite()
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
      {(!loading && !error && data.length <= 0) && <EmptyList message='No favorite files found' />}
      {(!loading && !error && data.length > 0) && (
        <div
          ref={scrollRef}
          className={`flex flex-col gap-y-3 h-[480px] overflow-y-auto scrollbar-custom ${hasScrollbar ? 'pr-1.5' : ''}`}
        >
          {data.map((item) => (
            <Link key={item.id} href={`/dash/${item.id}?from=favorite`} className='block'>
              <article className='px-5 py-2.5 rounded-lg border border-neutral-600 hover:border-teal-600 transition-all duration-300 ease-in-out'>
                <div className='flex items-center justify-between gap-x-5'>
                  {/* File content */}
                  <div className='flex flex-col space-y-1 truncate'>
                    <div className='flex items-center gap-x-1'>
                      <FocusIcon className='text-cyan-600' />
                      <h3 className='text-[16px] font-medium truncate'>{item.fileName}</h3>
                    </div>
                    <h3 className='truncate text-sm text-neutral-400'>
                      {dayjs(item.createdAt).format('MMMM DD, YYYY • hh:mm a')}
                    </h3>
                  </div>

                  {/* Remove from favorites */}
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
                          setData((prev) => prev.filter((noHeart) => noHeart.id !== item.id))
                        }
                      })
                      toast.success('File removed from favorites')
                    }}
                  >
                    <StarIcon className='text-yellow-400' />
                  </button>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
