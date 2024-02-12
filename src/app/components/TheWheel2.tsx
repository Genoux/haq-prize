import React, { useState, useEffect } from 'react';
import RoulettePro from 'react-roulette-pro';
import 'react-roulette-pro/dist/index.css';

const prizes = [
  { id: '7d24b681-82d9-4fc0-b034-c82f9db11a59', image: 'https://i.ibb.co/6Z6Xm9d/good-1.png' },
  { id: '9da9a287-952f-41bd-8c7a-b488938d7c7a', image: 'https://i.ibb.co/T1M05LR/good-2.png' },
  { id: '04106f3f-f99f-47e4-a62e-3c81fc8cf794', image: 'https://i.ibb.co/Qbm8cNL/good-3.png' },
  { id: '23c551bf-8425-4ffd-b7c2-77c87844f89d', image: 'https://i.ibb.co/5Tpfs6W/good-4.png' },
  { id: 'e4060930-538f-4bf7-ab8e-8d2aa05fba43', image: 'https://i.ibb.co/64k8D1c/good-5.png' },
];

const reproductionArray = (array = [], length = 0) => [
  ...Array(length).fill('_').map(() => array[Math.floor(Math.random() * array.length)]),
];

const prizeList = [
  ...prizes,
  ...reproductionArray(prizes, prizes.length * 3),
  ...prizes,
  ...reproductionArray(prizes, prizes.length),
];

let i = 0;
const getPrizeIndex = async () => {
  const index = prizes.length * 4 + i;
  i = (i + 1) % prizes.length; // Cycle through prizes repeatedly
  return index;
};

const RouletteSpinner = () => {
  const [prizeIndex, setPrizeIndex] = useState(0);
  const [start, setStart] = useState(false);
  const [isRolling, setIsRolling] = useState(false);

  const handlePrizeDefined = () => {
    setIsRolling(false);

    console.log("Prize Defined", prizeList);
  };

  useEffect(() => {
    if (prizeIndex && !start) {
      console.log("Starting spin");
      setTimeout(() => {
        setStart(true);
      }, 0);
    }
  }, [prizeIndex, start]);

  useEffect(() => {
    if (!isRolling) return;

    const prepareSpin = async () => {
      const newPrizeIndex = await getPrizeIndex();
      setPrizeIndex(prev => prev === newPrizeIndex ? newPrizeIndex - 1 : newPrizeIndex);
      setStart(false);
    };

    prepareSpin();
  }, [isRolling]);

  const initiateSpin = async () => {
    if (!isRolling) {
      setIsRolling(true);
      await getPrizeIndex(); // Ensure we have the next prize index ready
    }
  };

  return (
    <>
      <button onClick={initiateSpin} disabled={isRolling}>Spin</button>
      <div>
        <RoulettePro
          prizes={prizeList}
          prizeIndex={prizeIndex}
          spinningTime={3}
          start={start}
          onPrizeDefined={handlePrizeDefined}
          options={{
            stopInCenter: true,
            withoutAnimation: true,
          }}
        />
      </div>
    </>
  );
};

export default RouletteSpinner;
