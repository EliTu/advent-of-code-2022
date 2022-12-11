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
	const endCharsBoundIndex = 4;
	const charsSlice = getSignalSlice(i, endCharsBoundIndex);
	const isUnique = isCharSequenceUnique(charsSlice);

	if (isUnique) {
		packetMarker += i + (endCharsBoundIndex - 1);
		break;
	}
}
console.log(packetMarker); // 1896

/**
 * Part 2 - How many characters need to be processed before the first start-of-message marker is detected?
 * Answer: 3452
 */

let sentenceMarker = 1;
for (let i = 0; i < signal.length; i++) {
	const endCharsBoundIndex = 14;
	const charsSlice = getSignalSlice(i, endCharsBoundIndex);
	const isUnique = isCharSequenceUnique(charsSlice);

	if (isUnique) {
		sentenceMarker += i + (endCharsBoundIndex - 1);
		break;
	}
}
console.log(sentenceMarker); // 3452

/* Helpers */

/**
 * Get a string between the designated bounds from the signals string.
 * @example 'abcdefg'
 *  getSignalSlice(1, 4) -> 'bcde'
 */
function getSignalSlice(startIdx: number, endIdx: number) {
	return signal.slice(startIdx, startIdx + endIdx);
}

/**
 * Check if the parameter characters are all unique (no repeating characters) by saving them one by one
 * in a record object and checking if any char already appears in the record.
 */
function isCharSequenceUnique(chars: string) {
	const charsArr = chars.split('');
	const record: Record<string, string> = {};

	for (let char of charsArr) {
		if (record[char]) {
			return false;
		}
		record[char] = char;
	}
	return true;
}
