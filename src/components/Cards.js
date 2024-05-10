import React, { useState, useRef } from 'react' // Combine both imports into one
import { collection, addDoc } from 'firebase/firestore'
import { firestore } from '../firebase'
import './Cards.css'
import { updatePowerAndRelay } from './readwrite'

function Cards() {
  const messageRef = useRef()
  const [showInput1, setShowInput1] = useState(false)
  const [inputValue1, setInputValue1] = useState('')
  const [confirmedValue1, setConfirmedValue1] = useState('')

  const [showInput2, setShowInput2] = useState(false)
  const [inputValue2, setInputValue2] = useState('')
  const [confirmedValue2, setConfirmedValue2] = useState('')

  const [user1Energy, setUser1Energy] = useState(900)
  const [user2Energy, setUser2Energy] = useState(800)

  const handleBuyClick1 = () => {
    setShowInput1(true)
  }

  const handleInputChange1 = (e) => {
    const value = e.target.value
    // Allow only numbers
    if (/^\d*$/.test(value) || value === '') {
      setInputValue1(value)
    }
  }

  const handleConfirmClick1 = async () => {
    // Set confirmed value and hide input
    setConfirmedValue1(inputValue1)
    setShowInput1(false)
    console.log('Value added successfully')
    updatePowerAndRelay(1)

    try {
      const docRef = await addDoc(collection(firestore, 'energies'), {
        energy: inputValue1,
      })
      setUser1Energy((prev) => prev - inputValue1)
      console.log('Document written with ID: ', docRef.id)
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  const handlePopupClose1 = () => {
    // Clear confirmed value after closing popup
    setConfirmedValue1('')
  }

  const handleBuyClick2 = () => {
    setShowInput2(true)
  }

  const handleInputChange2 = (e) => {
    const value = e.target.value
    // Allow only numbers
    if (/^\d*$/.test(value) || value === '') {
      setInputValue2(value)
    }
  }

  const handleConfirmClick2 = async () => {
    // Set confirmed value and hide input
    setConfirmedValue2(inputValue2)
    setShowInput2(false)
    updatePowerAndRelay(2)

    try {
      const docRef = await addDoc(collection(firestore, 'energies'), {
        energy: inputValue1,
      })
      setUser2Energy((prev) => prev - inputValue1)
      console.log('Document written with ID: ', docRef.id)
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  const handlePopupClose2 = () => {
    // Clear confirmed value after closing popup
    setConfirmedValue2('')
  }

  return (
    <div className="cards">
      <h1>Check out other users:</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          {/* First Container */}
          <div className="cards__container">
            <div className="cards__items">
              <div className="card">
                <h3>User 1</h3>
                <p>Energy: {user1Energy} kW</p>
                {!showInput1 && <button onClick={handleBuyClick1}>Buy</button>}
                {showInput1 && (
                  <div>
                    <input
                      type="text"
                      value={inputValue1}
                      onChange={handleInputChange1}
                      ref={messageRef}
                    />
                    <button onClick={handleConfirmClick1}>Confirm</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Second Container */}
          <div className="cards__container">
            <div className="cards__items">
              <div className="card">
                <h3>User 2</h3>
                <p>Energy: {user2Energy} kW</p>
                {!showInput2 && <button onClick={handleBuyClick2}>Buy</button>}
                {showInput2 && (
                  <div>
                    <input
                      type="text"
                      value={inputValue2}
                      onChange={handleInputChange2}
                    />
                    <button onClick={handleConfirmClick2}>Confirm</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sell Section */}

      {/* Buy Confirmation Popups */}
      {/* Buy Confirmation Popups */}
      {confirmedValue1 && (
        <div className="popup">
          <div className="popup__content">
            <h2>Success!</h2>
            <p>You bought {confirmedValue1} kW from User 1</p>
            <button onClick={handlePopupClose1}>Close</button>
          </div>
        </div>
      )}

      {confirmedValue2 && (
        <div className="popup">
          <div className="popup__content">
            <h2>Success!</h2>
            <p>You bought {confirmedValue2} kW from User 2</p>
            <button onClick={handlePopupClose2}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cards
