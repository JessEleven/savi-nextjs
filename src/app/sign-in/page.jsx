'use client'

import { authClient } from '@/libs/auth-client'

export default function SignInForm () {
  const signInWithGithub = async () => {
    try {
      await authClient.signIn.social({
        provider: 'github',
        callbackURL: '/dash'
      })
    } catch (error) {
      console.error('Unexpected error:', error)
    }
  }

  return (
    <main className='flex flex-col items-center justify-center h-screen'>
      <div className='w-full md:w-96 mx-16'>
        <div className='mx-5 md:mx-0'>
          <h2 className='text-2xl'>Welcome back</h2>
          <h3 className='mb-5 text-base text-neutral-400'>Sign in to create a JSON file</h3>
          <button
            type='button'
            className='session-btn'
            onClick={signInWithGithub}
          >
            🟢
            <span>Continue with GitHub</span>
          </button>
        </div>
      </div>
    </main>
  )
}
