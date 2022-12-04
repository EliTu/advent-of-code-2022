/**
 * https://adventofcode.com/2022/day/2
 */

import { readFileSync } from 'fs';

/**
 * Part 1 - What would your total score be if everything goes exactly according to your strategy guide?
 * Answer: 11873
 */

type MyShape = 'X' | 'Y' | 'Z';
type OpponentShape = 'A' | 'B' | 'C';
interface StrategyData {
	points: number;
	winsAgainstShape: OpponentShape;
	losesToShape: OpponentShape;
}

const strategyDataGuide: Record<MyShape, StrategyData> = {
	X: {
		points: 1,
		winsAgainstShape: 'C',
		losesToShape: 'B',
	},
	Y: {
		points: 2,
		winsAgainstShape: 'A',
		losesToShape: 'C',
	},
	Z: {
		points: 3,
		winsAgainstShape: 'B',
		losesToShape: 'A',
	},
};

const inputText = readFileSync('./input.txt', 'utf-8');
const splitInput = inputText.split('\n');

const totalPoints = splitInput.reduce((total, roundInfo) => {
	const [opponentShape, myShape] = roundInfo.split(' ');
	const { losesToShape, points, winsAgainstShape } = strategyDataGuide[myShape as MyShape];

	let roundPoints = points;

	// it's a draw
	if (opponentShape !== losesToShape && opponentShape !== winsAgainstShape) {
		roundPoints += 3;
	}
	// it's a win
	if (opponentShape === winsAgainstShape) {
		roundPoints += 6;
	}
	// in case of lose, nothing changes as it is 0 points

	return total + roundPoints;
}, 0);

console.log(totalPoints); // 11873
