import React from 'react'
import Herosection from '../components/hero/herosection'
import Programs from '../components/proqrams/proqrams'
import TrainersSection from '../components/Trainers/TrainerSection'
import Footer from '../layout/footer'
import NowBegin from '../components/NowBegin/NowBegin'

function Home() {
  return (
    <>
   
      <Herosection />
      <Programs />
      <NowBegin/>
      <TrainersSection/>
      <Footer/>
    </>
  )
}

export default Home