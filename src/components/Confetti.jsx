/** @format */

import React from 'react';
import Confetti from 'react-confetti';

const ConfettiComponent = () => {
  return (
    <Confetti
      width={window.innerWidth}
      height={window.innerHeight}
      numberOfPieces={700}
      recycle={false}
      gravity={0.3}
      run={true}
    />
  );
};

export default ConfettiComponent;
