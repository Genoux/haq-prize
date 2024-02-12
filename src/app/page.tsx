'use client'

import RandomWheel from "@/app/components/TheWheel";
import { motion } from "framer-motion";
import Image from 'next/image';
import TheWheel2 from "@/app/components/TheWheel2";

export default function Home() {
  return (
    <motion.div>
      <main className="flex flex-col items-center justify-between">
        <TheWheel2 />

      </main>
      </motion.div>
  );
}
