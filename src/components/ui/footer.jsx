import AppLogo from './app-logo'

export default function Footer () {
  return (
    <footer className='absolute bottom-0 w-full pt-0.5 bg-gradient-to-r from-neutral-800 via-stone-500 to-neutral-800'>
      <div className='flex items-center justify-between px-0 lg:px-14 xl:px-24 py-1.5 bg-neutral-800 text-neutral-400'>
        <AppLogo size={16} showText fontSize={12} />
        <h4 className='text-xs'>
          Built by Jesús R.
        </h4>
      </div>
    </footer>
  )
}
