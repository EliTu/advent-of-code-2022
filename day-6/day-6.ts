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

let packetMarker = 1;
for (let i = 0; i < signal.length; i++) {
	const charsSlice = getSignalSlice(i, 4);
	const isUnique = isCharSequenceUnique([...charsSlice]);
	if (isUnique) {
		packetMarker += i + 3;
		break;
	}
}

console.log(packetMarker); // 1896

/**
 * Part 2 - How many characters need to be processed before the first start-of-message marker is detected?
 * Answer:
 */

let sentenceMarker = 1;
for (let i = 0; i < signal.length; i++) {
	const charsSlice = getSignalSlice(i, 14);
	const isUnique = isCharSequenceUnique([...charsSlice]);
	if (isUnique) {
		sentenceMarker += i + 13;
		break;
	}
}

console.log(sentenceMarker);

/* Helpers */

function getSignalSlice(start: number, end: number) {
	return signal.slice(start, start + end);
}

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
