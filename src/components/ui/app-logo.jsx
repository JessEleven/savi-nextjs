import Image from 'next/image'
import Logo from '../../../public/logo.svg'
import clsx from 'clsx'

const iconSizeMap = {
  18: 'w-[18px] h-[18px]',
  26: 'w-[26px] h-[26px]',
  54: 'w-[54px] h-[54px'
}

const fontSizeMap = {
  12: 'text-sm',
  20: 'text-xl'
}

export default function AppLogo ({
  showText = false,
  iconSize,
  fontSize
}) {
  return (
    <div className='flex items-center'>
      <Image
        src={Logo}
        alt='Logo'
        className={clsx(iconSizeMap[iconSize])}
        // style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
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
