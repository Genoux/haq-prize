// components/TheWheel2.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const items = ['A', 'B', 'C']; // The items to loop through

const TheWheel2 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % items.length);
    }, 2000); // Loop through items every 2 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="flex justify-center items-center space-x-4 h-32">
      {items.map((item, index) => (
        <motion.div
          key={index}
          animate={{ scale: currentIndex === index ? 1.5 : 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className={`w-16 h-16 flex justify-center items-center bg-gray-200 rounded-full ${currentIndex === index ? 'text-xl' : 'text-lg'}`}
        >
          {item}
        </motion.div>
      ))}
    </div>
  );
};

export default TheWheel2;
