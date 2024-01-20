'use client'

import React, { use, useEffect, useState } from 'react';
import { CHOICES } from '@/app/data/constants';
import WheelLabel from '@/app/components/WheelLabel';
import { Button } from "@/app/components/ui/button"
import PrizeBanner from "@/app/components/PrizeBanner"
import { motion, AnimatePresence } from "framer-motion"
import Image from 'next/image';
import dynamic from 'next/dynamic';

const data = CHOICES

const Wheel = dynamic(
  () => import('react-custom-roulette').then((mod) => mod.Wheel),
  { ssr: false }
);

const RandomWheel = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [showPrizeBanner, setShowPrizeBanner] = useState(false);
  const resetGame = () => {
    setShowPrizeBanner(false);
    //setPrizeNumber(0);
  //  setMustSpin(true);
    // any other state resets if necessary
  };
  const handleSpinClick = async () => {
    if (!mustSpin) {
      const response = await fetch('/api/random');
      const data = await response.json();
      const winnerIndex = data.winnerIndex;
      setPrizeNumber(winnerIndex);
      setMustSpin(true);
    }
  };

  const spinStopped = () => {
    setMustSpin(false);
    setShowPrizeBanner(true);
  }

  return (
    <div className='flex flex-col'>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: showPrizeBanner ? 0.3 : 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='flex justify-center items-center gap-6 w-full h-screen'
        >
          <Image
            className="fixed left-0 top-0 -z-10 h-full w-full opacity-50"
            src="/bg-fog.png"
            alt="HAQ"
            width={1440}
            height={200}
          />
          <div className='flex flex-col gap-3'>
            {CHOICES.map((choice, index) => (
              <WheelLabel key={index} color={choice.style.backgroundColor} label={choice.name} />
            ))}
          </div>

          <div className='flex flex-col items-center gap-6'>
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={data}
              spinDuration={1}
              radiusLineWidth={0}
              outerBorderColor='#FFFFFF0'
              onStopSpinning={() => {
                spinStopped();
              }}
            />
            <Button className='w-1/2' onClick={handleSpinClick}>GO!</Button>
          </div>
        </motion.div>
        <PrizeBanner isVisible={showPrizeBanner} winner={CHOICES[prizeNumber]?.name} prizeNumber={prizeNumber} onSpinAgain={resetGame}  />
      </AnimatePresence>

    </div>
  );
};

export default RandomWheel;
