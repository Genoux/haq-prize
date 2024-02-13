import React, { useState, useEffect } from 'react';
import RoulettePro from 'react-roulette-pro';
import 'react-roulette-pro/dist/index.css';
import { Button } from "@/app/components/ui/button"

const prizes = [
  { text: 'Skin mystère', image: '/images/Skinmystère.png' },
  { text: 'Skin Mystère +950', image: '/images/SkinMystère950.png' },
  { text: 'Skin Légendaire', image: '/images/SkinLégendaire.png' },
  { text: 'Skin ULTIMATE', image: '/images/SkinULTIMATE.png' },
  { text: 'Choix des commentateurs', image: '/images/Choixdescommentateurs.png' },
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
    const name = prizeList[prizeIndex].text;
    setWinnerPrize(name as any);
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
              // prizeItemRenderFunction={(prize) => (
              //   <div className="flex items-center justify-center">
              //     <img src={prize.image} alt={prize.text} className="w-24 h-24" />
              //     <p className="text-white text-3xl">{prize.text}</p>
              //   </div>
              // )}
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
