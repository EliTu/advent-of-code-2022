/**
 * https://adventofcode.com/2022/day/2
 */

import { readFileSync } from 'fs';

type MyShape = 'X' | 'Y' | 'Z';
type OpponentShape = 'A' | 'B' | 'C';
interface StrategyData {
	points: number;
	winsAgainst: OpponentShape;
	losesTo: OpponentShape;
}

const strategyDataGuide: Record<MyShape, StrategyData> = {
	X: {
		points: 1,
		winsAgainst: 'C',
		losesTo: 'B',
	},
	Y: {
		points: 2,
		winsAgainst: 'A',
		losesTo: 'C',
	},
	Z: {
		points: 3,
		winsAgainst: 'B',
		losesTo: 'A',
	},
};

const inputText = readFileSync('./input.txt', 'utf-8');
const splitInput = inputText.split('\n');

const totalPoints = splitInput.reduce((total, round) => {
	const [opponentShape, myShape] = round.split(' ');
	const { losesTo, points, winsAgainst } = strategyDataGuide[myShape as MyShape];

	let roundPoints = points;

	// it's a draw
	if (opponentShape !== losesTo && opponentShape !== winsAgainst) {
		roundPoints += 3;
	}
	// it's a win
	if (opponentShape === winsAgainst) {
		roundPoints += 6;
	}
	// in case of lose, nothing changes as it is 0 points

	return total + roundPoints;
}, 0);
console.log(totalPoints); // 11873
