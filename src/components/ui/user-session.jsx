import { auth } from '@/libs/auth'
import { GitHubIcon } from '@/resources/assets/main-icons'
import { headers } from 'next/headers'
import Link from 'next/link'

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
            href='https://github.com/JessEleven/savi-nextjs'
            rel='noreferrer'
            target='_blank'
            aria-label='GitHub Icon'
            className='btn-border-icon block'
          >
            <GitHubIcon />
          </a>
        </li>

        {session
          ? (
            <>
              <li>
                <Link href='/dash' className='block px-4 py-[8.5px] btn-bg'>
                  Dashboard
                </Link>
              </li>
            </>
            )
          : (
            <>
              <li>
                <Link href='/sign-in' className='block px-4 py-[8.5px] btn-bg'>
                  Sign In
                </Link>
              </li>
            </>
            )}
      </ul>
    </nav>
  )
}
