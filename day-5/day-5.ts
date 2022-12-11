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

type StacksData = Record<number, string[]>;
const initStacks: StacksData = {
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

const stacksClone = deepCloneStacksData();

for (let i = 0; i < instructions.length; i++) {
	const [moveQuant, fromStack, toStack] = getInstructionNumbers(instructions[i]);

	// Go over the number of crate moves per instruction and move from the designated stack to the target stack
	for (let j = 0; j < moveQuant; j++) {
		const movedCrate = stacksClone[fromStack].pop();
		if (movedCrate) {
			stacksClone[toStack].push(movedCrate);
		}
	}
}

// Create a string of the crates on the top of each stack
const topCrates = generateTopCratesString(stacksClone);
console.log(topCrates); // QPJPLMNNR

/**
 * Part 2 -  After the rearrangement procedure completes, what crate ends up on top of each stack?
 * Answer:BQDNWJPVJ
 */

const stacksClone2 = deepCloneStacksData();

for (let i = 0; i < instructions.length; i++) {
	const [moveQuant, fromStack, toStack] = getInstructionNumbers(instructions[i]);

	const crates = stacksClone2[fromStack].splice(-moveQuant, moveQuant);
	stacksClone2[toStack] = [...stacksClone2[toStack], ...crates];
}

const topCrates2 = generateTopCratesString(stacksClone2);
console.log(topCrates2); // BQDNWJPVJ

/* Helpers */

/**
 * Deep clone the stacks object as well as each stack array, to get a new reference pointer for each one.
 */
function deepCloneStacksData() {
	return Object.entries(initStacks).reduce<StacksData>(
		(stacksData, [stackKey, stackVal]) => ({ ...stacksData, [stackKey]: [...stackVal] }),
		{}
	);
}

/**
 * Transform the instruction string to an array of numbers that correspond to the instructions.
 * @example getInstructionNumbers('move 1 from 3 to 2') -> [1, 3, 2]
 */
function getInstructionNumbers(instructionStr: string) {
	// Remove the string instructions to have only the numerical data
	const instructionNumbers = instructionStr.replace(/[a-z]/gi, '');
	// Remove the white-spaces and convert the data to numbers that are extracted per instruction
	return instructionNumbers.split(' ').filter(Boolean).map(Number);
}

/**
 * Loop over the stacks and pass the last item at the end of each stack into a string.
 */
function generateTopCratesString(stack: StacksData) {
	return Object.values(stack).reduce((crates, currentStack) => crates.concat(currentStack.at(-1) || ''), '');
}
