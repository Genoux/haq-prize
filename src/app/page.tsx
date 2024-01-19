import Image from "next/image";
import RandomWheel from "@/app/components/TheWheel";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <RandomWheel />
    </main>
  );
}
