import { auth } from '@/libs/auth'
import { GitHubIcon } from '@/resources/assets/main-icons'
import { headers } from 'next/headers'
import Link from 'next/link'
import SignOut from './sign-out'

export default async function UserSession () {
  let session = null

  try {
    session = await auth.api.getSession({
      headers: await headers()
    })
  } catch (error) {
    console.error('Error fetching session:', error)
  }

  return (
    <nav>
      <ul className='flex items-center gap-x-2.5 list-none'>
        <li>
          <a
            className='btn-border-icon block'
            href='https://github.com/JessEleven/savi-nextjs'
            rel='noreferrer'
            target='_blank'
            aria-label='GitHub Icon'
          >
            <GitHubIcon />
          </a>
        </li>

        {session
          ? (
            <>
              <li>
                <Link href='/dash' className='btn-bg py-[9px] block'>
                  Dashboard
                </Link>
              </li>
              <li>
                <SignOut text />
              </li>
            </>
            )
          : (
            <>
              <li>
                <Link href='/sign-in' className='btn-bg py-[9px] block'>
                  Sign In
                </Link>
              </li>
            </>
            )}
      </ul>
    </nav>
  )
}
