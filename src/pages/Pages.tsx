import React from 'react'
import HomePage from '../component/HomePage/HomePage'
import AboutUs from '../component/HomePage/AboutUs'
import Header from '../component/HomePage/Header'

const Pages: React.FC = () => {
  return (
    <section className="pages">
        <Header/>
  <HomePage/>
  <AboutUs/>
    </section>
  
  )
}

export default Pages