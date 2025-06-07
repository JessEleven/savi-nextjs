import { Roboto } from 'next/font/google'
import '../resources/globals.css'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  display: 'swap'
})

export const metadata = {
  title: 'Savi',
  icons: [{ rel: 'icon', url: '/logo.svg' }],
  description: 'Savi created with next.js'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${roboto.className} bg-neutral-800 text-neutral-50`}>
        {children}
      </body>
    </html>
  )
}
