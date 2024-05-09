import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/app/components/ui/button';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';
import HaqBadge from './HaqBadge';
import Image from 'next/image';
import { X } from 'lucide-react';

const PrizeBanner = ({ winner, isVisible, prizeNumber, onSpinAgain }: { winner: any, isVisible: boolean, prizeNumber: number, onSpinAgain: () => void }) => {

  useEffect(() => {

    if (isVisible) {
      let duration = prizeNumber;
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
    <motion.div
      initial={{ opacity: 0, zIndex: -1 }}
      animate={{ opacity: isVisible ? 1 : 0, zIndex: isVisible ? 50 : -1 }}
      transition={{ duration: 0.25, delay: 0 }}
      exit={{ opacity: 0, zIndex: -1 }}
      className='flex flex-col justify-center items-center h-screen gap-12 bg-black bg-opacity-20 absolute z-50 backdrop-blur-2xl w-full top-0 left-0'>


      <div className='flex flex-col items-center gap-4'>
        <Image alt={winner?.name} src={winner?.src} width={200} height={200} className='rounded-lg' />
        <p className='text-4xl font-black'>
          {winner?.name}
        </p>
      </div>
      <div className='flex flex-col gap-4 justify-center items-center'>

        <h2 className='font-semibold'>Offert par</h2>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            exit={{ opacity: 0 }}
          >
            <HaqBadge />
          </motion.div>
        </AnimatePresence>
        <Button onClick={onSpinAgain} className='mt-4' variant={'ghost'}>
          <X />
        </Button>
      </div>
    </motion.div>

  );
};

export default PrizeBanner;
