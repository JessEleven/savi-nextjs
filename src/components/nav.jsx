import Link from 'next/link'
import AppLogo from './ui/app-logo'
import SignOut from './ui/sign-out'
import { headers } from 'next/headers'
import { auth } from '@/libs/auth'
import { GitHubIcon } from '@/resources/assets/main-icons'

export default async function Nav () {
  let session = null

  try {
    session = await auth.api.getSession({
      headers: await headers()
    })
  } catch (error) {
    console.error('Error fetching session:', error)
  }

  return (
    <header className='mx:5 md:mx-14'>
      <div className='h-[60px] flex items-center justify-between'>
        <Link translate='no' href='/'>
          <AppLogo size={24} showText />
        </Link>

        <nav>
          <ul className='hidden md:flex md:items-center md:gap-x-2 list-none'>
            <li>
              <a
                className='hover-icon block'
                href='https://github.com/JessEleven/savi-nextjs'
                rel='noreferrer'
                target='_blank'
                aria-label='GitHub repository'
              >
                <GitHubIcon />
              </a>
            </li>

            {session
              ? (
                <>
                  <li>
                    <Link href='/ovw' className='btn-bg block'>
                      Overview
                    </Link>
                  </li>
                  <li>
                    <SignOut text='Sign Out' />
                  </li>
                </>
                )
              : (
                <>
                  <li>
                    <Link href='/sign-in' className='btn-bg block'>
                      Sign In
                    </Link>
                  </li>
                </>
                )}
          </ul>
        </nav>

        <div className='block md:hidden'>
          ❌
        </div>
      </div>
    </header>
  )
}
