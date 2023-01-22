import React from 'react'
import Navbar from '../components/Navbar'
import Questions from '../components/Questions'
import './HomePage.css'

const HomePage = () => {
  return (
    <>
    <Navbar/>
    <div className='qcont'>
    <div>

    <Questions/>
    </div>
    </div>
    </>
  )
}

export default HomePage