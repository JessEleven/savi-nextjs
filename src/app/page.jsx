import Nav from '@/components/nav'
import Hero from '@/components/landing/hero'
import Presentation from '@/components/landing/presentation'
import Footer from '@/components/landing/footer'

export default function Home () {
  return (
    <main className='bg-[#292c2e]'>
      <div className='relative min-h-screen main-container'>
        <div className='px-5 md:px-0'>
          <Nav />
          <Hero />
          <Presentation />
        </div>

        <Footer />
      </div>
    </main>
  )
}
