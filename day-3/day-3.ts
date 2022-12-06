/**
 * https://adventofcode.com/2022/day/3
 */

import { readFileSync } from 'fs';

const inputText = readFileSync('./input.txt', 'utf-8');
const rucksackData = inputText.split('\n');

/**
 * Find the item type that appears in both compartments of each rucksack. What is the sum of the priorities of those item types?
 * Answer: 7428
 */

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

/**
 * Part 2 - Find the item type that corresponds to the badges of each three-Elf group. What is the sum of the priorities of those item types?
 * Answer: 2650
 */

// Generate a new data array where the rucksack strings are in a group of three inside a sub array
const groupsOfThreeRucksacks: [string, string, string][] = [];
for (let i = 0; i < rucksackData.length; i += 3) {
	const [[first, second, third]] = rucksackData.slice(i, i + 3);
	groupsOfThreeRucksacks.push([first, second, third]);
}

const sumOfPriorities2 = groupsOfThreeRucksacks.reduce((acc, rucksackData) => {
	const [first, second, third] = rucksackData;
	const badge = first.split('').find((item) => second.includes(item) && third.includes(item));

	let priorityPoints = 0;
	if (badge) {
		priorityPoints = lowerCasePrioritiesPointsMap[badge] || upperCasePrioritiesPointsMap[badge];
	}

	return acc + priorityPoints;
}, 0);

console.log(sumOfPriorities2); // 2650
