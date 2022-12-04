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

	let roundPoints: number = points;

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

/**
 * Part 2 - Following the Elf's instructions for the second column, what would your total score be if everything goes exactly according to your strategy guide?
 * Answer: 12014
 */

// Rock - 1 point
// Paper - 2 points
// Scissors - 3 points

// Lose - 0 points
// Draw - 3 points
// Win - 6 points

type StrategyToPointsMap = Record<MyShape, number>;

const updatedStrategyGuide: Record<OpponentShape, StrategyToPointsMap> = {
	// Opponent chooses rock
	A: {
		X: 3, // lose - pick scissors
		Y: 4, // draw - pick rock
		Z: 8, // win - pick paper
	},
	// Opponent chooses paper
	B: {
		X: 1, // lose - choose rock
		Y: 5, // draw - pick paper
		Z: 9, // win - pick scissors
	},
	// Opponent chooses scissors
	C: {
		X: 2, // lose - choose paper
		Y: 6, // draw - choose scissors
		Z: 7, // win - choose rock
	},
};

const totalPoints2 = splitInput.reduce((total, roundInfo) => {
	const [opponentShape, myStrategy] = roundInfo.split(' ');
	const roundPoints = updatedStrategyGuide[opponentShape as OpponentShape][myStrategy as MyShape];

	return total + roundPoints;
}, 0);

console.log(totalPoints2); // 12014
