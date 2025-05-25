import Image from 'next/image'
import Logo from '../../../public/logo.svg'

export default function AppLogo ({ showText = false, size }) {
  return (
    <div className='flex items-center'>
      <Image
        src={Logo}
        alt='Logo'
        style={{ width: `${size}px`, height: `${size}px` }}
        priority
      />
      {showText && (
        <h3 className='text-center text-xl md:text-2xl font-medium ml-1.5'>Savi</h3>
      )}
    </div>
  )
}
