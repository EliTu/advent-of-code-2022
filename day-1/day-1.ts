/**
 * https://adventofcode.com/2022/day/1
 */
/**
 * Part 1 - Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?
 */

import { readFileSync } from 'fs';

const inputText = readFileSync('./input.txt', 'utf-8');
const splitInput = inputText.split('\n\n');

const totalCaloriesPerElf = splitInput.reduce<number[]>((acc, curr) => {
	const splitSums = curr.split('\n');
	const totalCalories = splitSums.reduce((total, current) => total + Number(current), 0);
	return [...acc, totalCalories];
}, []);

const maxCalories = Math.max(...totalCaloriesPerElf);
console.log(maxCalories); // 67450

/**
 * Part 2 - Find the top three Elves carrying the most Calories. How many Calories are those Elves carrying in total?
 */
const sortedTotalCalories = totalCaloriesPerElf.sort((a, b) => b - a);
const topElvesWithMostCalories = sortedTotalCalories.slice(0, 3);
const totalTopElvesCalories = topElvesWithMostCalories.reduce((total, curr) => total + curr);
console.log(totalTopElvesCalories); // 199357
