import React from 'react'
import '../../App.css'
import Cards from '../Cards'
import HeroSection from '../HeroSection'
import Footer from '../Footer'
import Spinner from '../Spinner'
import Sell from '../Sell'

function Home() {
  return (
    <>
      <HeroSection />
      <Spinner />
      <Cards />
      <Sell />
      <Footer />
    </>
  )
}

export default Home
