/**
 * https://adventofcode.com/2022/day/6
 */

import { readFileSync } from 'fs';

const inputText = readFileSync('./input.txt', 'utf-8');
const [signal] = inputText.split('\n');

/**
 * Part 1 - How many characters need to be processed before the first start-of-packet marker is detected?
 * Answer: 1896
 */

let marker = 1;
for (let i = 0; i < signal.length; i++) {
	const isUnique = isCharSequenceUnique([signal[i], signal[i + 1], signal[i + 2], signal[i + 3]]);
	if (isUnique) {
		marker += i + 3;
		break;
	}
}

console.log(marker); // 1896

/* Helpers */

function isCharSequenceUnique(chars: string[]) {
	const record: Record<string, string> = {};
	for (let char of chars) {
		if (record[char]) {
			return false;
		}
		record[char] = char;
	}
	return true;
}
