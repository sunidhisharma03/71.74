import React, { useState} from 'react';
import './Sell.css';
// import { collection, addDoc } from 'firebase/firestore';
// import {firestore} from '../firebase'

function Sell() {
  const [sellInput, setSellInput] = useState('');
  const [sellConfirmed, setSellConfirmed] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [showSellButton, setShowSellButton] = useState(true);
  // const [myEnergy, my1Energy] = useState(200);
  const [myEnergy] = useState(200);

  const handleSellConfirmClick = async() => {
    // Show input bar and confirm button after clicking Sell button
    setShowInput(true);
    setShowSellButton(false);
    // try{
    //   const docRef = await addDoc(collection(firestore, 'sell_energy'), {
    //    energy: sellInput, 
    //   }); 
    //   my1Energy(prev=>prev-sellInput)
    //   console.log("Document written with ID: ", docRef.id);
    //  } catch (e) {
    //    console.error("Error adding document: ", e);
    //  }
  };

  const handleSellInputChange = (e) => {
    const value = e.target.value;
    // Allow only numbers
    if (/^\d*$/.test(value) || value === '') {
      setSellInput(value);
    }
  };

  const handleSellPopupClose = () => {
    // Clear confirmed value after closing sell popup
    setSellConfirmed('');
    // Hide input bar
    setShowInput(false);
    // Show Sell button again
    setShowSellButton(true);
  };

  const handleSellInputConfirm = () => {
    // Set confirmed value for sell
    setSellConfirmed(sellInput);
    // Additional logic for selling
  };

  return (
    <div className='sell-page'>
      <div className="sell-header">
        <h1>Sell your Energy:</h1>
      </div>
      <div className='sell-container'>
        <div className='sell-card'>
          <h3>Your Energy</h3>
          <p>Energy: {myEnergy} kW</p>
          {showSellButton && (
            <button onClick={handleSellConfirmClick} className='sell-button'>Sell</button>
          )}
          {showInput && (
            <div>
              <input
                type='text'
                value={sellInput}
                onChange={handleSellInputChange}
                className='sell-input'
                placeholder='Enter amount to sell'
              />
              <button onClick={handleSellInputConfirm} className='sell-button'>Confirm</button>
            </div>
          )}
          {sellConfirmed && (
            <div className='sell-overlay'>
              <div className='sell-popup__content'>
                <h2>Success!</h2>
                <p>You sold {sellConfirmed} kW</p>
                <button onClick={handleSellPopupClose} className='sell-button'>Close</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sell;
