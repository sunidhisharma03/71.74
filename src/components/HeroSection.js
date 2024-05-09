import React from 'react'
import '../App.css'
import { Button } from './Button'
import './HeroSection.css'

function HeroSection() {
  return (
    <div className="hero-container">
      <h1>
        Hello <span className="name">Urja</span>!
      </h1>
      <p className="carbon-score">Your Carbon Score</p>
      <div
        className="progress-bar"
        role="progressbar"
        style={{ width: '25%' }}
        aria-valuenow="25"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        89%
      </div>
    </div>
  )
}

export default HeroSection
