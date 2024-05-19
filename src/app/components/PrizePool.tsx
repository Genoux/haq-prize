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
        <Button variant={"outline"}>
          <Info className="mr-2 h-4 w-4" /> Les prix
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="mb-4">Les prix à gagner</DialogTitle>
          <DialogDescription className="grid grid-cols-3 sm:flex gap-4 justify-between ">
            {prizes.map((prize, index) => (
              <div key={index} className="flex items-start flex-col gap-2">
                <Image
                  src={prize.src}
                  alt={prize.name}
                  width={300}
                  height={300}
                  className="rounded-sm"
                />
                <div>
                  <h2 className="font-normal text-white text-xs">
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
