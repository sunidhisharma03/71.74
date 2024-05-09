import React, { useState } from 'react';
import './Sell.css'; // Assuming you have a separate CSS file for selling

function Sell() {
  const [sellInput, setSellInput] = useState('');
  const [sellConfirmed, setSellConfirmed] = useState('');

  const handleSellInputChange = (e) => {
    const value = e.target.value;
    // Allow only numbers
    if (/^\d*$/.test(value) || value === '') {
      setSellInput(value);
    }
  };

  const handleSellConfirmClick = () => {
    // Set confirmed value for sell
    setSellConfirmed(sellInput);
    // Additional logic for selling
  };

  const handleSellPopupClose = () => {
    // Clear confirmed value after closing sell popup
    setSellConfirmed('');
  };

  return (
    <div className='sell-container'>
      <h2>Do you want to sell your Energy</h2>
      <input
        type='text'
        value={sellInput}
        onChange={handleSellInputChange}
        placeholder='Enter amount to sell'
      />
      <button onClick={handleSellConfirmClick}>Sell</button>
      {sellConfirmed && (
        <div className='overlay'>
          <div className='popup__content'>
            <h2>Success!</h2>
            <p>You sold {sellConfirmed} kW</p>
            <button onClick={handleSellPopupClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sell;
