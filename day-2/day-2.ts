/**
 * https://adventofcode.com/2022/day/2
 */

import { readFileSync } from 'fs';

const strategyData = {
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
}, 0);
console.log(splitInput);
