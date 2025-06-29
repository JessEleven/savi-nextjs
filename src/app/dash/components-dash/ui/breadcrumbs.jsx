'use client'

import { SlashIcon } from '../../assets/dash-icons'
import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getAllJsonStorage } from '@/libs/api/json-storage'
import { getAllJsonFavorite } from '@/libs/api/json-favorite'
import { authClient } from '@/libs/auth-client'

export function GetUserName () {
  const [user, setUser] = useState(null)

  useEffect(() => {
    (async () => {
      const { data } = await authClient.getSession()
      setUser(data?.user)
    })()
  }, [])

  const names = user?.name?.split(' ') || []
  const first = names[0] || ''
  const secondInitial = names[1]?.charAt(0) || ''

  return (
    <div className='hidden md:inline-flex items-center'>
      <SlashIcon className='text-slate-400 -rotate-[13deg]' />
      <span className='text-neutral-400'>
        {`${first} ${secondInitial && secondInitial + '.'}`}
      </span>
    </div>
  )
}

export function GetFileName () {
  const { id } = useParams()
  const [fileName, setFileName] = useState(null)
  const searchParams = useSearchParams()

  const from = searchParams.get('from')

  useEffect(() => {
    if (!id) return

    (async () => {
      const getFiles = ((from === 'favorite' || from === 'fav')
        ? getAllJsonFavorite
        : getAllJsonStorage
      )
      const files = await getFiles()
      const file = files.find((item) => item.id === id)
      setFileName(file?.fileName ?? 'Unnamed')
    })()
  }, [id, from])

  // If there is no ID e.g. /dash
  if (!id) return null

  return (
    <div className='hidden md:inline-flex items-center'>
      <SlashIcon className='text-slate-400 -rotate-[13deg]' />
      <span className='text-neutral-400'>{fileName}</span>
    </div>
  )
}
