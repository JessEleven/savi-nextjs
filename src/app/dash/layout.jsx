import { Suspense } from 'react'
import DashNav from './components-dash/dash-nav'

export default function DashLayout ({ children }) {
  return (
    <div className='main-container'>
      <Suspense fallback={null}>
        <DashNav />
      </Suspense>
      <Suspense fallback={null}>
        {children}
      </Suspense>
    </div>
  )
}
