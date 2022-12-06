/**
 * https://adventofcode.com/2022/day/4
 */

import { readFileSync } from 'fs';

const inputText = readFileSync('./input.txt', 'utf-8');
const sectionsData = inputText.split('\n');

/**
 * Part 1 - In how many assignment pairs does one range fully contain the other?
 */

const numberOfOverlaps = sectionsData.reduce((total, sections) => {
	const [firstSection, secondSection] = sections.split(',') as [string, string];

	const [firstSectionLowerBound, firstSectionUpperBound] = firstSection.split('-').map(Number);
	const [secondSectionLowerBound, secondSectionUpperBound] = secondSection.split('-').map(Number);

	const isSecondSectionContained =
		firstSectionLowerBound <= secondSectionLowerBound && firstSectionUpperBound >= secondSectionUpperBound;
	const isFirstSectionContained =
		firstSectionLowerBound >= secondSectionLowerBound && firstSectionUpperBound <= secondSectionUpperBound;

	if (isFirstSectionContained || isSecondSectionContained) return total + 1;

	return total;
}, 0);
console.log(numberOfOverlaps);