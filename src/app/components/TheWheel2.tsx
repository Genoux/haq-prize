import React, { useState } from 'react';
import RoulettePro from 'react-roulette-pro';
import 'react-roulette-pro/dist/index.css';
import { Button } from "@/app/components/ui/button"

interface Prize {
  text: string;
  image: string;
  odds: number;
}

const prizes: Prize[] = [
  { text: 'Skin mystère', image: '/images/Skinmystère.png', odds: 25 },
  { text: 'Skin Mystère +950', image: '/images/SkinMystère950.png', odds: 25 },
  { text: 'Skin Légendaire', image: '/images/SkinLégendaire.png', odds: 25 },
  { text: 'Skin ULTIMATE', image: '/images/SkinULTIMATE.png', odds: 25 },
  { text: 'Choix des commentateurs', image: '/images/Choixdescommentateurs.png', odds: 25 },
];

const generatePrizeList = (prizes: Prize[]): Prize[] => {
  let prizeList: Prize[] = [];
  prizes.forEach((prize) => {
    for (let i = 0; i < prize.odds; i++) {
      prizeList.push(prize);
    }
  });
  return prizeList;
};

const shuffleArray = (array: Prize[]): Prize[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const prizeList = shuffleArray(generatePrizeList(prizes));

const RouletteSpinner: React.FC = () => {
  const [prizeIndex, setPrizeIndex] = useState<number | null>(null);
  const [start, setStart] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [winnerPrize, setWinnerPrize] = useState<string | null>(null);

  const initiateSpin = async () => {
    if (!isRolling) {
      setWinnerPrize(null);
      setIsRolling(true);

      // Select a random prize index based on length of prizeList
      const prizeIndexForWheel = Math.floor(Math.random() * prizeList.length);

      // Now set the prizeIndex with the one found for the wheel
      setPrizeIndex(prizeIndexForWheel);
      setStart(true);
    }
  };

  const handlePrizeDefined = () => {
    setIsRolling(false);
    setStart(false);
    if (prizeIndex !== null) {
      setWinnerPrize(prizeList[prizeIndex].text);
      console.log("Prize Defined", prizeList[prizeIndex]);
    }
  };

  return (
    <>
      <pre>Rolling: {isRolling.toString()}</pre>
      <pre>Winner: {winnerPrize?.toString() || 'Null'}</pre>

      <div className='flex h-screen justify-center items-center'>
        <div className='absolute w-[1920px] flex flex-col items-center justify-center gap-24'>
          <div className='h-12 '>
            <p>{winnerPrize?.toString()}</p>
          </div>
          <div className="relative h-full fade-lr w-3/4">
            <div className='mx-auto'>
              <RoulettePro
                prizes={prizeList as Prize[]}
                prizeIndex={prizeIndex as number}
                spinningTime={10}
                start={start}
                options={{
                  withoutAnimation: true,
                  stopInCenter: true,
                }}
                onPrizeDefined={handlePrizeDefined}
              />
            </div>
          </div>
          <div className='h-12'>
            <Button onClick={initiateSpin} disabled={isRolling}>
              Spin
            </Button>
          </div>
        </div>
      </div>

    </>
  );
};

export default RouletteSpinner;
