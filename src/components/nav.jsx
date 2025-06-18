import Link from 'next/link'
import AppLogo from './ui/app-logo'
import UserSession from './ui/user-session'

export default async function Nav () {
  return (
    <header className='h-[60px] flex items-center justify-between'>
      <Link translate='no' href='/' className='block'>
        <AppLogo size={24} showText />
      </Link>

      <UserSession />
    </header>
  )
}
