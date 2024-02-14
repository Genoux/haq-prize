'use client'

import RandomWheel from "@/app/components/TheWheel";
import { motion } from "framer-motion";
import Image from 'next/image';
import TheWheel2 from "@/app/components/TheWheel2";
import TheWheel3 from "@/app/components/TheWheel3";

export default function Home() {
  return (
    <motion.div>
      <main>
        <TheWheel3 />
      </main>
      </motion.div>
  );
}
