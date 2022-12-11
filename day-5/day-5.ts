/**
 * https://adventofcode.com/2022/day/5
 */

import { readFileSync } from 'fs';

// Stack layout from the input data:
// [M] [H]         [N]
// [S] [W]         [F]     [W] [V]
// [J] [J]         [B]     [S] [B] [F]
// [L] [F] [G]     [C]     [L] [N] [N]
// [V] [Z] [D]     [P] [W] [G] [F] [Z]
// [F] [D] [C] [S] [W] [M] [N] [H] [H]
// [N] [N] [R] [B] [Z] [R] [T] [T] [M]
// [R] [P] [W] [N] [M] [P] [R] [Q] [L]
//  1   2   3   4   5   6   7   8   9

const stacks: Record<number, string[]> = {
	1: ['R', 'N', 'F', 'V', 'L', 'J', 'S', 'M'],
	2: ['P', 'N', 'D', 'Z', 'F', 'J', 'W', 'H'],
	3: ['W', 'R', 'C', 'D', 'G'],
	4: ['N', 'B', 'S'],
	5: ['M', 'Z', 'W', 'P', 'C', 'B', 'F', 'N'],
	6: ['P', 'R', 'M', 'W'],
	7: ['R', 'T', 'N', 'G', 'L', 'S', 'W'],
	8: ['Q', 'T', 'H', 'F', 'N', 'B', 'V'],
	9: ['L', 'M', 'H', 'Z', 'N', 'F'],
};

const inputText = readFileSync('./input.txt', 'utf-8');
const instructions = inputText.split('\n');

/**
 * After the rearrangement procedure completes, what crate ends up on top of each stack?
 * Answer: QPJPLMNNR
 */

for (let i = 0; i < instructions.length; i++) {
	const instruction = instructions[i];
	const numbersData = instruction.replace(/[a-z]/gi, '');

	const [moveQuant, fromStack, toStack] = numbersData.split(' ').filter(Boolean).map(Number);

	for (let j = 0; j < moveQuant; j++) {
		const movedCrate = stacks[fromStack].pop();

		if (movedCrate) {
			stacks[toStack].push(movedCrate);
		}
	}
}

const topCrates = Object.values(stacks).reduce((crates, currentStack) => `${crates}${currentStack.at(-1)}`, '');

console.log(topCrates); // QPJPLMNNR
