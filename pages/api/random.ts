import type { NextApiRequest, NextApiResponse } from 'next';
import { CHOICES } from '@/app/data/constants';

function getWinningSegment(choices: any[]) {
    // Calculate the total size
    const totalSize = choices.reduce((acc: any, choice: { optionSize: any; }) => acc + choice.optionSize, 0);

    // Calculate cumulative sizes
    let cumulativeSizes = [];
    let cumulativeTotal = 0;
    for (let choice of choices) {
        cumulativeTotal += choice.optionSize;
        cumulativeSizes.push(cumulativeTotal);
    }

    // Generate a random number within the range of totalSize
    let randomNumber = Math.random() * totalSize;

    // Determine the winning segment
    for (let i = 0; i < cumulativeSizes.length; i++) {
        if (randomNumber <= cumulativeSizes[i]) {
            return i; // This is the index of the winning segment
        }
    }

    return -1; // In case something goes wrong
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const winningIndex = getWinningSegment(CHOICES);
    console.log("handler - winningIndex:", winningIndex);
    res.status(200).json({ winnerIndex: winningIndex });
}
