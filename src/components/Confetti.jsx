/** @format */

// Confetti.js
import React from 'react';
import Confetti from 'react-confetti';

const ConfettiComponent = () => {
  return (
    <Confetti
      width={window.innerWidth}
      height={window.innerHeight}
      numberOfPieces={800}
      recycle={false}
      gravity={0.1}
      run={true}
    />
  );
};

export default ConfettiComponent;
