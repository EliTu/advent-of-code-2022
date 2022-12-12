/**
 * https://adventofcode.com/2022/day/7
 */

import { readFileSync } from 'fs';

const inputText = readFileSync('./input.txt', 'utf-8');
const treesMap = inputText.split('\n');

let visibleTreeCounter = treesMap[0].length * 2 + treesMap.length * 2 - 4;

for (let i = 1; i < treesMap.length - 1; i++) {
	const currentTreesRow = treesMap[i];

	for (let j = 1; j < currentTreesRow.length - 2; j++) {
		const currentTree = currentTreesRow[j];

		if (currentTree === '0') continue;

		const leftTree = currentTreesRow[j - 1];
		const rightTree = currentTreesRow[j + 1];
		const topTree = treesMap[i - 1][j];
		const bottomTree = treesMap[i + 1][j];

		if ([leftTree, rightTree, topTree, bottomTree].some((tree) => Number(currentTree) > Number(tree))) {
			visibleTreeCounter += 1;
		}
	}
}

console.log(visibleTreeCounter);
