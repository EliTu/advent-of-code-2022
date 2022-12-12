/**
 * https://adventofcode.com/2022/day/7
 */

import { readFileSync } from 'fs';

const inputText = readFileSync('./input.txt', 'utf-8');
const treesMap = inputText.split('\n');

let visibleTreeCounter = treesMap[0].length * 4;

console.log(visibleTreeCounter);

for (let i = 1; i < treesMap.length; i++) {
	const currentTreesRow = treesMap[i];

	for (let j = 1; j < currentTreesRow.length; j++) {
		const currentTree = Number(currentTreesRow[j]);

		if (currentTree === 0) continue;

		const leftTree = Number(currentTreesRow[j - 1]);
		const rightTree = Number(currentTreesRow[j + 1]);
		const topTree = Number(treesMap[i - 1][j]);
		const bottomTree = Number(treesMap?.[i + 1]?.[j] || 0);

		if ([leftTree, rightTree, topTree, bottomTree].some((tree) => tree < currentTree)) {
			visibleTreeCounter += 1;
		}
	}
}

// console.log(visibleTreeCounter);
