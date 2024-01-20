'use client'

import RandomWheel from "@/app/components/TheWheel";
import { motion } from "framer-motion";
import Image from 'next/image';

export default function Home() {
  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
    <main className="flex min-h-screen flex-col items-center justify-between">
        <RandomWheel />

      </main>
      </motion.div>
  );
}
