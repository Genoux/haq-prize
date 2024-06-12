'use client'
 
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import PrizeBanner from "@/app/components/PrizeBanner";
import { Button } from "@/app/components/ui/button";
import Loading from "@/app/components/Loading";
import { PrizePool } from "@/app/components/PrizePool";

interface ImageInfo {
  name: string;
  src: string;
  weight: number;
}

export const prizesList: ImageInfo[] = [
  { name: "Skin Mystère", src: "/images/mystere.webp", weight: 35 },
  { name: "Skin Mystère 950", src: "/images/mystere950.webp", weight: 30 },
  { name: "Skin Légendaire", src: "/images/legendaire.webp", weight: 16 },
  { name: "Skin Ultimate", src: "/images/ultimate.webp", weight: 11 },
  {
    name: "Choix des commentateurs",
    src: "/images/casterchoice.webp",
    weight: 8,
  },
];

function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getRandomImage(prizes: ImageInfo[]): ImageInfo {
  const totalWeight = prizes.reduce((acc, curr) => acc + curr.weight, 0);
  let random = Math.floor(Math.random() * totalWeight);

  for (const prize of prizes) {
    if (random < prize.weight) return prize;
    random -= prize.weight;
  }

  return prizes[0];
}

function calculateIntervals(
  totalDuration: number,
  rotations: number,
  imageCount: number,
): [number, number] {
  const initialInterval = totalDuration / (rotations * imageCount * 2);
  const finalInterval = (totalDuration / (rotations * imageCount)) * 8;
  return [initialInterval, finalInterval];
}

export const RandomPrizePicker = () => {
  const [prizes, setPrizes] = useState(prizesList);
  const [currentPrize, setCurrentPrize] = useState(prizes[0]);
  const [selectedPrize, setSelectedPrize] = useState<ImageInfo | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [showPrizeBanner, setShowPrizeBanner] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [zoomIn, setZoomIn] = useState(false);

  const spinDuration = 8000;
  const rotations = 20;
  const [initialInterval, finalInterval] = useMemo(
    () => calculateIntervals(spinDuration, rotations, prizesList.length),
    [spinDuration, rotations],
  );

  useEffect(() => {
    if (!spinning) return;

    let currentIndex = 0;
    const chosenPrize = getRandomImage(prizes);
    setSelectedPrize(chosenPrize);
    let interval: NodeJS.Timeout;
    const startTime = Date.now();

    const spinImages = () => {
      const elapsedTime = Date.now() - startTime;
      const t = Math.min(elapsedTime / spinDuration, 1);
      const newInterval = lerp(initialInterval, finalInterval, t);

      interval = setTimeout(() => {
        currentIndex = (currentIndex + 1) % prizes.length;
        setCurrentPrize(prizes[currentIndex]);
        setZoomIn(false);

        if (elapsedTime < spinDuration) {
          spinImages();
        } else {
          setCurrentPrize(chosenPrize);
          setWinner(chosenPrize.name);

          setTimeout(() => {
            setZoomIn(true);
            setShowPrizeBanner(true);
          }, 1000);
        }
      }, newInterval);
    };

    spinImages();

    return () => clearTimeout(interval);
  }, [spinning, prizes, initialInterval, finalInterval, spinDuration]);

  const handleSpinButtonClick = () => {
    setPrizes(shuffleArray(prizesList));
    setSelectedPrize(null);
    setSpinning(true);
    setWinner(null);
    setZoomIn(false);
    setShowPrizeBanner(false);
  };

  return (
    <>
      <PrizeBanner
        isVisible={showPrizeBanner}
        prizeNumber={selectedPrize?.weight || 0}
        winner={selectedPrize}
        onSpinAgain={() => {
          setShowPrizeBanner(false);
          setSpinning(false);
          setZoomIn(false);
        }}
      />
      <div
        className="fixed top-0 left-0 -z-10 w-full h-full blur-xl opacity-30"
        style={{
          backgroundImage: `url(${currentPrize.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="-z-10 bg-gradient-to-l absolute top-0 left-0 w-full h-full from-black via-transparent to-black"></div>
      </div>
      <div className="flex flex-col justify-center items-center gap-4 max-w-xs mx-auto">
        {/* <AnimatePresence mode="wait"> */}
        <div className="flex flex-col gap-4 items-center border bg-black bg-opacity-20 p-4 rounded-md">
          <motion.div
            key={currentPrize.src}
            initial={{ scale: 1 }}
            animate={{ scale: zoomIn ? 1 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              alt={currentPrize?.name}
              src={currentPrize?.src}
              width={312}
              height={312}
              className="rounded-md"
            />
          </motion.div>
          <p className="text-xl font-bold">{currentPrize.name}</p>
        </div>

        {/* </AnimatePresence> */}
        <div className="flex gap-4 w-full">
          <Button
            onClick={handleSpinButtonClick}
            disabled={spinning}
            className="w-full"
          >
            {spinning ? <Loading /> : "GO!"}
          </Button>
          <PrizePool prizes={prizesList} />
        </div>
      </div>
    </>
  );
};
