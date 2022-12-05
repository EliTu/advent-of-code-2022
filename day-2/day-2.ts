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

/**
Rock - 1 point
Paper - 2 points
Scissors - 3 points

Lose - 0 points
Draw - 3 points
Win - 6 points
*/
type Shapes = 'rock' | 'paper' | 'scissors';
type Results = 'lose' | 'draw' | 'win';
interface PointsMap {
	shape: Record<Shapes, number>;
	result: Record<Results, number>;
}

const pointsMap: PointsMap = {
	shape: {
		rock: 1,
		paper: 2,
		scissors: 3,
	},
	result: {
		lose: 0,
		draw: 3,
		win: 6,
	},
};

const strategyDataGuide: Record<MyShape, StrategyData> = {
	// Rock
	X: {
		points: pointsMap.shape.rock,
		winsAgainstShape: 'C',
		losesToShape: 'B',
	},
	// Paper
	Y: {
		points: pointsMap.shape.paper,
		winsAgainstShape: 'A',
		losesToShape: 'C',
	},
	// Scissors
	Z: {
		points: pointsMap.shape.scissors,
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
	if (opponentShape !== losesToShape && opponentShape !== winsAgainstShape) roundPoints += pointsMap.result.draw;
	// it's a win
	if (opponentShape === winsAgainstShape) roundPoints += pointsMap.result.win;
	// in case of lose, nothing changes as it is 0 points

	return total + roundPoints;
}, 0);

console.log(totalPoints); // 11873

/**
 * Part 2 - Following the Elf's instructions for the second column, what would your total score be if everything goes exactly according to your strategy guide?
 * Answer: 12014
 */

type StrategyToPointsMap = Record<MyShape, number>;

const { shape, result } = pointsMap;

const updatedStrategyGuide: Record<OpponentShape, StrategyToPointsMap> = {
	// Opponent chooses rock
	A: {
		X: shape.scissors + result.lose, // lose - pick scissors
		Y: shape.rock + result.draw, // draw - pick rock
		Z: shape.paper + result.win, // win - pick paper
	},
	// Opponent chooses paper
	B: {
		X: shape.rock + result.lose, // lose - choose rock
		Y: shape.paper + result.draw, // draw - pick paper
		Z: shape.scissors + result.win, // win - pick scissors
	},
	// Opponent chooses scissors
	C: {
		X: shape.paper + result.lose, // lose - choose paper
		Y: shape.scissors + result.draw, // draw - choose scissors
		Z: shape.rock + result.win, // win - choose rock
	},
};

const totalPoints2 = splitInput.reduce((total, roundInfo) => {
	const [opponentShape, myStrategy] = roundInfo.split(' ');
	const roundPoints = updatedStrategyGuide[opponentShape as OpponentShape][myStrategy as MyShape];

	return total + roundPoints;
}, 0);

console.log(totalPoints2); // 12014
