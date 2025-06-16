'use client'

import Link from 'next/link'
import { HomeIcon } from '../../assets/dash-icons'
import { usePathname } from 'next/navigation'

export default function HomeBtn () {
  const pathname = usePathname()

  return (
    <>
      {pathname !== '/dash' && (
        <Link href='/dash' aria-label='Home Icon' className='block btn-border-icon'>
          <HomeIcon />
        </Link>
      )}
    </>
  )
}
