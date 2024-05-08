
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HomeHeader() {
  return (
    <header>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: [0.585, 0.535, 0.23, 0.85], duration: 0.2 }}
      >
        <div className='mx-auto flex flex-col items-center gap-3'>
          <h1 className="text-center text-5xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">{"Tirage HAQ"}</h1>
        </div>

      </motion.div>
    </header>
  );
}