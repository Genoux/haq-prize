'use client'

import { motion } from "framer-motion";
import TheWheel from "@/app/components/TheWheel";

export default function Home() {
  return (
    <motion.div>
      <main>
        <TheWheel />
      </main>
      </motion.div>
  );
}
