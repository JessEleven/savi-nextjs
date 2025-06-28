import AppLogo from './app-logo'

export default function Footer () {
  return (
    <footer className='absolute bottom-0 w-full pt-0.5 bg-gradient-to-r from-neutral-800 via-neutral-600 to-neutral-800'>
      <div className='flex items-center justify-between px-5 md:px-0 lg:px-14 xl:px-24 py-1.5 bg-[#292c2e] text-neutral-400'>
        <AppLogo iconSize={18} showText fontSize={12} />
        <h4 className='text-xs'>
          Built by Jesús R.
        </h4>
      </div>
    </footer>
  )
}
