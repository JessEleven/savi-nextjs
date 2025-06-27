'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HomeIcon, PlusIcon, StarIcon } from '../../assets/dash-icons'

export function NewFileBtn () {
  const pathname = usePathname()

  if (pathname === '/dash' || pathname === '/dash/favorite' || pathname === '/dash/new') return null

  return (
    <Link href='/dash/new' aria-label='Plus Icon' className='block p-[7.5px] btn-bg'>
      <PlusIcon />
    </Link>
  )
}

export function HomeBtn () {
  const pathname = usePathname()

  if (pathname === '/dash') return null

  return (
    <Link href='/dash' aria-label='Home Icon' className='block btn-border-icon'>
      <HomeIcon />
    </Link>
  )
}

export function FavoriteBtn () {
  const pathname = usePathname()

  if (pathname === '/dash' || pathname === '/dash/favorite' || pathname === '/dash/new') return null

  return (
    <Link href='/dash/favorite' aria-label='Star Icon' className='block btn-border-icon'>
      <StarIcon />
    </Link>
  )
}
