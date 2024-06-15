import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Info } from "lucide-react";
import Image from "next/image";
import { Button } from "@/app/components/ui/button";
type PrizePoolProps = {
  prizes: any[];
};

export const PrizePool: React.FC<PrizePoolProps> = ({ prizes }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"outline"} className="h-12 rounded-md">
          <Info className="mr-2 h-full w-4" /> Les prix
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl">
        <DialogHeader>
          <DialogTitle className="mb-4">Prix à gagner</DialogTitle>
          <DialogDescription className="grid grid-cols-3 md:grid-cols-5 gap-4 justify-between ">
            {prizes.map((prize, index) => (
              <div key={index} className="flex items-center flex-col gap-2 relative">
                <Image
                  src={prize.src}
                  alt={prize.name}
                  width={500}
                  height={300}
                  className="rounded-sm"
                />
                <div className="h-full py-2 flex items-center justify-center w-full gap-2 bg-zinc-900 rounded-sm bg-opacity-20 border">
                  <h2 className="text-white text-sm font-semibold text-center">
                    {prize.name}
                  </h2>
                  <p>{prize.description}</p>
                </div>
              </div>
            ))}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
