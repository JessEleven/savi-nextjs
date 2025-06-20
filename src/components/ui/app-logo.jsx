import Image from 'next/image'
import Logo from '../../../public/logo.svg'
import clsx from 'clsx'

const fontSizeMap = {
  12: 'text-sm 2xl:text-sm',
  20: 'text-xl md:text-2xl'
}

export default function AppLogo ({
  showText = false,
  size,
  fontSize
}) {
  return (
    <div className='flex items-center'>
      <Image
        src={Logo}
        alt='Logo'
        style={{ width: `${size}px`, height: `${size}px` }}
        priority
      />
      {showText && (
        <h3 className={clsx('ml-1.5 font-medium', fontSizeMap[fontSize])}>
          Savi
        </h3>
      )}
    </div>
  )
}
