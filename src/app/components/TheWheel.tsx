'use client'

import React, { useState } from 'react';
import { CHOICES } from '@/app/data/constants';
import { Wheel } from 'react-custom-roulette'
import WheelLabel from '@/app/components/WheelLabel';
import { Button } from "@/app/components/ui/button"

const data = CHOICES

const RandomWheel = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = async () => {
    if (!mustSpin) {
      const response = await fetch('/api/random');
      const data = await response.json();
      const winnerIndex = data.winnerIndex;
      setPrizeNumber(winnerIndex);
      setMustSpin(true);
    }
  }

  return (
    <div className='flex'>
      <div className='flex flex-col gap-3'>
        <WheelLabel color="#393939" label='Skin mystere' />
        <WheelLabel color="#DFA718" label='Skin mystere +950' />
        <WheelLabel color="#2545ED" label='Skin legendaire' />
        <WheelLabel color="#5200FF" label='Skin ultimate' />
        <WheelLabel color="#FF2459" label='Commentateur décide' />
      </div>

      <div className='flex flex-col'>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          perpendicularText={true}
          radiusLineWidth={0}
          textColors={['#FFFFFF']}
          textDistance={70}
          fontSize={15}
          onStopSpinning={() => {
            setMustSpin(false);
          }}
        />

        <Button variant="outline" onClick={handleSpinClick}>GO!</Button>
      </div>
    </div>
  );
};

export default RandomWheel;
