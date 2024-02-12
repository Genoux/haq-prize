import React, { useState, useEffect } from 'react';
import RoulettePro from 'react-roulette-pro';
import 'react-roulette-pro/dist/index.css';
import { Button } from "@/app/components/ui/button"

const prizes = [
  { name: 'Skin mystère', id: '7d24b681-82d9-4fc0-b034-c82f9db11a59', image: '/images/Skinmystère.png' },
  { name: 'Skin Mystère +950', id: '9da9a287-952f-41bd-8c7a-b488938d7c7a', image: '/images/SkinMystère950.png' },
  { name: 'Skin Légendaire', id: '04106f3f-f99f-47e4-a62e-3c81fc8cf794', image: '/images/SkinLégendaire.png' },
  { name: 'Skin ULTIMATE', id: '23c551bf-8425-4ffd-b7c2-77c87844f89d', image: '/images/SkinULTIMATE.png' },
  { name: 'Choix des commentateurs', id: 'e4060930-538f-4bf7-ab8e-8d2aa05fba43', image: '/images/Choixdescommentateurs.png' },
];

const reproductionArray = (array = [], length = 0) => [
  ...Array(length).fill('_').map(() => array[Math.floor(Math.random() * array.length)]),
];

const prizeList = [
  ...prizes,
  ...reproductionArray(prizes, prizes.length * 5),
  ...prizes,
  ...reproductionArray(prizes, prizes.length),
];

let i = 0;
const getPrizeIndex = async () => {
  const index = prizes.length * 6 + i;
  i = (i + 1) % prizes.length; // Cycle through prizes repeatedly
  return index;
};



const RouletteSpinner = () => {
  const [prizeIndex, setPrizeIndex] = useState(0);
  const [start, setStart] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [winnerPrize, setWinnerPrize] = useState(null) ;

  const handlePrizeDefined = () => {
    setIsRolling(false);
    const name = prizeList[prizeIndex].name;
    setWinnerPrize(name as any);
    setTimeout(() => {
      setWinnerPrize(null);
      setIsRolling(true);
    }, 1000);
    console.log("Prize Defined", prizeList[prizeIndex]);
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
      console.log("prepareSpin - newPrizeIndex:", prizeList[newPrizeIndex]);
      setPrizeIndex(prev => prev === newPrizeIndex ? newPrizeIndex - 1 : newPrizeIndex);
      setStart(false);
    };

    prepareSpin();
  }, [isRolling]);

  const initiateSpin = async () => {
    if (!isRolling) {
      setWinnerPrize(null);
      setIsRolling(true);
      await getPrizeIndex(); // Ensure we have the next prize index ready
    }
  };

  return (
    <div className='flex h-screen justify-center items-center'>
      <div className='absolute w-[1920px] flex flex-col items-center justify-center gap-24'>
        <div className='h-12 '>
        <p>{winnerPrize}</p>
      </div>
        <div className="relative h-full fade-lr w-3/4">
          <div className='mx-auto'>
            <RoulettePro
              prizes={prizeList}
              prizeIndex={prizeIndex}
              spinningTime={15}
              start={start}
              onPrizeDefined={handlePrizeDefined}
              options={{
                stopInCenter: true,
                withoutAnimation: true,
              }}
            />
          </div>
          <div className="absolute z-50 top-0 left-0 w-full h-full bg-gradient-to-l from-black via-transparent to-black"></div>
        </div>
        <Button className='p-4' onClick={initiateSpin} disabled={isRolling}>Spin</Button>
      </div>
    </div>
  );
};

export default RouletteSpinner;
