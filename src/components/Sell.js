import React, { useState } from 'react'
import './Sell.css'
import { collection, addDoc } from 'firebase/firestore'
import { firestore } from '../firebase'

function Sell() {
  const [sellInput, setSellInput] = useState(0)
  const [sellConfirmed, setSellConfirmed] = useState('')
  const [showInput, setShowInput] = useState(false)
  const [showSellButton, setShowSellButton] = useState(true)
  const [myEnergy, setmyEnergy] = useState(200)

  const handleSellConfirmClick = async (e) => {
    e.preventDefault()
    // Show input bar and confirm button after clicking Sell button
    setShowInput(true)
    setShowSellButton(false)
  }

  const handleSellInputChange = (e) => {
    const value = e.target.value
    setSellInput(value)
  }

  const handleSellPopupClose = () => {
    // Clear confirmed value after closing sell popup
    setSellConfirmed('')
    // Hide input bar
    setShowInput(false)
    // Show Sell button again
    setShowSellButton(true)
  }

  const handleSellInputConfirm = async () => {
    setSellConfirmed(sellInput)

    setmyEnergy((prev) => prev - sellInput)
    try {
      const docRef = await addDoc(collection(firestore, 'sell_energy'), {
        energy: sellInput,
      })
      console.log('Document written with ID: ', docRef.id)
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  return (
    <div className="sell-page">
      <div className="sell-header">
        <h1>Sell your Energy:</h1>
      </div>
      <div className="sell-container">
        <div className="sell-card">
          <h3>Your Energy</h3>
          <p>Energy: {myEnergy} kW</p>
          {showSellButton && (
            <button onClick={handleSellConfirmClick} className="sell-button">
              Sell
            </button>
          )}
          {showInput && (
            <div>
              <input
                type="number"
                value={sellInput}
                onChange={handleSellInputChange}
                className="sell-input"
                placeholder="Enter amount to sell"
              />
              <button onClick={handleSellInputConfirm} className="sell-button">
                Confirm
              </button>
            </div>
          )}
          {sellConfirmed && (
            <div className="sell-overlay">
              <div className="sell-popup__content">
                <h2>Success!</h2>
                <p>You sold {sellConfirmed} kW</p>
                <button onClick={handleSellPopupClose} className="sell-button">
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sell
