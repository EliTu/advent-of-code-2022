/**
 * https://adventofcode.com/2022/day/7
 */

import { readFileSync } from 'fs';

const inputText = readFileSync('./input.txt', 'utf-8');
const treesMap = inputText.split('\n');

let visibleTreeCounter = treesMap[0].length * 2 + treesMap.length * 2 - 4;

for (let i = 1; i < treesMap.slice(0, 2).length - 1; i++) {
	const currentTreesRow = treesMap[i];

	console.log(treesMap[i], treesMap.slice(0, 1).length - 1);

	for (let j = 1; j < currentTreesRow.length - 1; j++) {
		const currentTree = Number(currentTreesRow[j]);

		if (currentTree === 0) continue;

		const leftTree = Number(currentTreesRow[j - 1]);
		const rightTree = Number(currentTreesRow[j + 1]);
		const topTree = Number(treesMap[i - 1][j]);
		const bottomTree = Number(treesMap?.[i + 1]?.[j] || 0);

		if ([leftTree, rightTree, topTree, bottomTree].some((tree) => currentTree > tree)) {
			visibleTreeCounter += 1;
		}
	}
}

// console.log(visibleTreeCounter);
