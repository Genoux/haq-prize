"use client";

import { motion } from "framer-motion";
import { RandomPrizePicker } from "./components/RandomPrice";
import HaqBadge from "./components/HaqBadge";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <main className="flex flex-col gap-6  justify-center h-screen -mt-20 px-4 sm:px-0">
        <div className="w-full flex flex-col justify-center items-center gap-3">
          <HaqBadge />
          <h1 className="uppercase text-center text-3xl font-extrabold leading-tight md:text-4xl lg:leading-[1.1]">
            {"Tirage HAQ"}
          </h1>
        </div>
        <RandomPrizePicker />
      </main>
    </motion.div>
  );
}
