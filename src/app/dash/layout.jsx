import { Suspense } from 'react'
import DashNav from './components-dash/dash-nav'

export default function DashLayout ({ children }) {
  return (
    <div className='main-container'>
      <div className='mx-5 md:mx-0'>
        <Suspense fallback={<div className='w-full h-[60px]' />}>
          <DashNav />
        </Suspense>
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </div>
    </div>
  )
}
