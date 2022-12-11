/**
 * https://adventofcode.com/2022/day/6
 */

import { readFileSync } from 'fs';

const inputText = readFileSync('./input.txt', 'utf-8');
const [signal] = inputText.split('\n');

for (let i = 0; i < 10; i++) {
	const set = new Set(...[signal[i], signal[i + 1], signal[i + 2], signal[i + 3]]);
}
