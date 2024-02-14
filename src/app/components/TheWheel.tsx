import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Button } from "@/app/components/ui/button"
import RoulettePro from 'react-roulette-pro';
import 'react-roulette-pro/dist/index.css';
import PrizeBanner from "@/app/components/PrizeBanner"

import reproductionArray from '@/utills/reproductionArray';
import getRandomIntInRange from '@/utills/getRandomIntInRange';
import duplicateObjectsInArray from '@/utills/duplicateObjectsInArray';
import shuffleArray from '@/utills/shuffleArray';

interface Prizes {
  id: string;
  image: string;
  text: string;
  odds: number;
}


const _skinmystere = duplicateObjectsInArray({
  id: 'a44c728d-8a0e-48ca-a963-3d5ce6dd41b0',
  image: '/images/Skinmystère.png',
  text: 'Skin mystère',
  odds: .9, // Example odds
}, 9);

const _skinmystere950 = duplicateObjectsInArray({
  id: '7d24b681-82d9-4fc0-b034-c82f9db11a59',
  image: '/images/SkinMystère950.png',
  text: 'Skin Mystère +950',
  odds: .3, // Example odds
}, 3);

const _skinlegendaire = duplicateObjectsInArray({
  id: '9da9a287-952f-41bd-8c7a-b488938d7c7a',
  image: '/images/SkinLégendaire.png',
  text: 'Skin Légendaire',
  odds: .2, // Example odds
}, 2);

const _skinultimate = duplicateObjectsInArray({
  id: '04106f3f-f99f-47e4-a62e-3c81fc8cf794',
  image: '/images/SkinULTIMATE.png',
  text: 'Skin ULTIMATE',
  odds: .2, // Example odds
}, 2);

const _choixdescommentateurs = duplicateObjectsInArray({
  id: '23c551bf-8425-4ffd-b7c2-77c87844f89d',
  image: '/images/Choixdescommentateurs.png',
  text: 'Choix des commentateurs',
  odds: .1, // Example odds
}, 1);

const prizes: Prizes[] = [
  ..._skinmystere,
  ..._skinmystere950,
  ..._skinlegendaire,
  ..._skinultimate,
  ..._choixdescommentateurs,
];
console.log("prizes:", prizes);


const API = {
  getPrizeIndex: async () => {
    // Implement a weighted random selection based on the odds
    const totalOdds = prizes.reduce((acc, prize) => acc + prize.odds, 0);
    let randomOdds = Math.random() * totalOdds;
    for (let i = 0; i < prizes.length; i++) {
      randomOdds -= prizes[i].odds;
      if (randomOdds <= 0) {
        return (i + prizes.length * 4); // Adjust index for the reproduced array
      }
    }
    return 0; // Fallback index
  },
};
const TheWheel = () => {
  const [prizeList, setPrizeList] = useState([] as Prizes[]);
  const [start, setStart] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [prizeIndex, setPrizeIndex] = useState(0);
  const [showPrizeBanner, setShowPrizeBanner] = useState(false);
  const [winnerObject, setWinnerObject] = useState({} as Prizes);

  useEffect(() => {
    const reproducedArray = [
      ...prizes,
      ...reproductionArray(prizes, prizes.length * 3),
      ...prizes,
      ...reproductionArray(prizes, prizes.length),
    ];

    const list = [...reproducedArray].map((item) => ({
      ...item,
      id: `${item.id}--${nanoid()}`,
    }));

    const shuffledArray = shuffleArray([...list]);

    setPrizeList(shuffledArray as Prizes[]);
  }, []);

  useEffect(() => {
    if (!prizeIndex || start) {
      return;
    }

    setStart(true);
  }, [prizeIndex, start]);

  useEffect(() => {
    if (!spinning || !prizeList.length) {
      return;
    }

    const prepare = async () => {
      const newPrizeIndex = await API.getPrizeIndex();
      setPrizeIndex(newPrizeIndex);
      setStart(false);
    };

    prepare();
  }, [spinning, prizeList]);

  const handleStart = () => {
    let delay = 0
    if (showPrizeBanner) {
      setShowPrizeBanner(false);
      delay = 2000;
    }
    setTimeout(() => {
      setSpinning(true);
    }, delay);
  };

  const handlePrizeDefined = () => {
    console.log(prizeList[prizeIndex].text);
    setSpinning(false);
    setWinnerObject(prizeList[prizeIndex]);

    setTimeout(() => {
      setShowPrizeBanner(true);
    }, 1000);
  };

  return (
    <div>
      <PrizeBanner isVisible={showPrizeBanner} winner={winnerObject.text} prizeNumber={winnerObject.odds} onSpinAgain={() => { setShowPrizeBanner(false) }}  />
      <div className='relative overflow-hidden'>
        <div className="absolute z-20 top-0 left-0 w-full h-full bg-gradient-to-l from-black via-transparent to-black"></div>
        <RoulettePro
          prizes={prizeList}
          start={start}
          prizeIndex={prizeIndex}
          onPrizeDefined={handlePrizeDefined}
          spinningTime={6}
          classes={{
            wrapper: 'roulette-pro-wrapper-additional-styles',
          }}
          options={{ stopInCenter: true, withoutAnimation: true }}
          defaultDesignOptions={{ prizesWithText: true }}
        />
      </div>
      <div>
        <div className="w-full justify-center items-center flex">
          <Button onClick={handleStart} size={'lg'} type="button">
            Spin
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TheWheel;
