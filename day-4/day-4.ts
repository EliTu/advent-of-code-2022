/**
 * https://adventofcode.com/2022/day/4
 */

import { readFileSync } from 'fs';

const inputText = readFileSync('./input.txt', 'utf-8');
const rucksackData = inputText.split('\n');

/**
 * Part 1 - In how many assignment pairs does one range fully contain the other?
 */
