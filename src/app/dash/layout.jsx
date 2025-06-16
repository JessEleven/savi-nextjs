import DashNav from './components-dash/dash-nav'

export default function DashLayout ({ children }) {
  return (
    <div className='main-container'>
      <DashNav />
      {children}
    </div>
  )
}
