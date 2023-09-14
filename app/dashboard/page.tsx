import React from 'react'
import Reports from '../components/Report'
import BabwReport from '../components/BabwReport'
import BabyReport from '../components/BabyReport'
import PetReport from '../components/PetReport'

export default function dashabord() {
  return (
    <div>
        <Reports/>
        <BabwReport/>
        <BabyReport/>
        <PetReport/>
    </div>
  )
}
