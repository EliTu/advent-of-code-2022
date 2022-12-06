/**
 * https://adventofcode.com/2022/day/3
 */

import { readFileSync } from 'fs';

/**
 * Find the item type that appears in both compartments of each rucksack. What is the sum of the priorities of those item types?
 * Answer: 7428
 */

const inputText = readFileSync('./input.txt', 'utf-8');
const rucksackData = inputText.split('\n');

const priorityItems = 'abcdefghijklmnopqrstuvwxyz';
const generatePrioritiesPointsMap = (isUpperCase = false) =>
	priorityItems
		.split('')
		.reduce<Record<string, number>>(
			(acc, curr, i) => ({ ...acc, [isUpperCase ? curr.toUpperCase() : curr]: (isUpperCase ? 27 : 1) + i }),
			{}
		);

const lowerCasePrioritiesPointsMap = generatePrioritiesPointsMap();
const upperCasePrioritiesPointsMap = generatePrioritiesPointsMap(true);

const sumOfPriorities = rucksackData.reduce((acc, rucksack) => {
	const length = rucksack.length;
	const middleIndex = length / 2;

	const firstRucksack = rucksack.slice(0, middleIndex);
	const secondRucksack = rucksack.slice(middleIndex, length);

	const duplicateItem = firstRucksack.split('').find((item) => secondRucksack.includes(item));

	let priorityPoints = 0;
	if (duplicateItem) {
		priorityPoints = lowerCasePrioritiesPointsMap[duplicateItem] || upperCasePrioritiesPointsMap[duplicateItem];
	}

	return acc + priorityPoints;
}, 0);

console.log(sumOfPriorities); // 7428
