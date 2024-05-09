import React, { useState } from 'react';
import './Cards.css';

function Cards() {
  const [showInput1, setShowInput1] = useState(false);
  const [inputValue1, setInputValue1] = useState('');
  const [confirmedValue1, setConfirmedValue1] = useState('');

  const [showInput2, setShowInput2] = useState(false);
  const [inputValue2, setInputValue2] = useState('');
  const [confirmedValue2, setConfirmedValue2] = useState('');


  const handleBuyClick1 = () => {
    setShowInput1(true);
  };

  const handleInputChange1 = (e) => {
    const value = e.target.value;
    // Allow only numbers
    if (/^\d*$/.test(value) || value === '') {
      setInputValue1(value);
    }
  };

  const handleConfirmClick1 = () => {
    // Set confirmed value and hide input
    setConfirmedValue1(inputValue1);
    setShowInput1(false);
  };

  const handlePopupClose1 = () => {
    // Clear confirmed value after closing popup
    setConfirmedValue1('');
  };

  const handleBuyClick2 = () => {
    setShowInput2(true);
  };

  const handleInputChange2 = (e) => {
    const value = e.target.value;
    // Allow only numbers
    if (/^\d*$/.test(value) || value === '') {
      setInputValue2(value);
    }
  };

  const handleConfirmClick2 = () => {
    // Set confirmed value and hide input
    setConfirmedValue2(inputValue2);
    setShowInput2(false);
  };

  const handlePopupClose2 = () => {
    // Clear confirmed value after closing popup
    setConfirmedValue2('');
  };

  

 

  return (
    <div className='cards'>
      <h1>Check out other users:</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          {/* First Container */}
          <div className='cards__container'>
            <div className='cards__items'>
              <div className='card'>
                <h3>User 1</h3>
                <p>Energy: 100 kW</p>
                {!showInput1 && (
                  <button onClick={handleBuyClick1}>Buy</button>
                )}
                {showInput1 && (
                  <div>
                    <input
                      type='text'
                      value={inputValue1}
                      onChange={handleInputChange1}
                    />
                    <button onClick={handleConfirmClick1}>Confirm</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Second Container */}
          <div className='cards__container'>
            <div className='cards__items'>
              <div className='card'>
                <h3>User 2</h3>
                <p>Energy: 150 kW</p>
                {!showInput2 && (
                  <button onClick={handleBuyClick2}>Buy</button>
                )}
                {showInput2 && (
                  <div>
                    <input
                      type='text'
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
      {(confirmedValue1 || confirmedValue2) && (
        <div className='popup'>
          <div className='popup__content'>
            <h2>Success!</h2>
            {confirmedValue1 && (
              <p>You bought {confirmedValue1} kW from User 1</p>
            )}
            {confirmedValue2 && (
              <p>You bought {confirmedValue2} kW from User 2</p>
            )}
            <button onClick={handlePopupClose2}>Close</button>
          </div>
        </div>
      )}
      
    </div>
    




  );
}

export default Cards;
