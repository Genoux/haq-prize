import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/app/components/ui/button';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';
import Link from 'next/link';

const PrizeBanner = ({ winner = '1', isVisible, prizeNumber, onSpinAgain }: { winner: string, isVisible: boolean, prizeNumber: number, onSpinAgain: () => void }) => {

  useEffect(() => {

    if (isVisible) {
      let duration = prizeNumber * 100;
      let end = Date.now() + duration;

      const frame = function () {
        confetti({
          particleCount: 100,
          startVelocity: 30,
          spread: 360,
          origin: {
            x: Math.random(),
            y: Math.random() - 0.2
          }
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }

      // Call the frame function
      frame();

    }

  }, [isVisible, prizeNumber]);


  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, zIndex: -1 }}
        animate={{ opacity: isVisible ? 1 : 0, zIndex: isVisible ? 50 : -1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        exit={{ opacity: 0, zIndex: -1 }}
        className='flex flex-col justify-center items-center h-screen gap-6 absolute z-50 backdrop-blur-lg w-full top-0 left-0'>
        <div className='text-5xl font-black'>
          {winner ? `${winner}` : ''}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >

          <Button onClick={onSpinAgain} className='mt-4'>
            Spin Again
          </Button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PrizeBanner;
