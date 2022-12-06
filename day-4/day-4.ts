/**
 * https://adventofcode.com/2022/day/4
 */

import { readFileSync } from 'fs';

const inputText = readFileSync('./input.txt', 'utf-8');
const sectionsData = inputText.split('\n');

type SectionName = 'firstSection' | 'secondSection';
type SectionsDataArray = Record<SectionName, [number, number]>[];

// Swap the sections input data into an array of 2 number arrays, so from '1-4, 3-4' -> [{firstSection: [1, 4], secondSection: [3, 4]}]
const mappedSectionDataArr = sectionsData.reduce<SectionsDataArray>((sectionsDataArray, currentSectionData) => {
	const [firstSection, secondSection] = currentSectionData.split(',') as [string, string];
	return [
		...sectionsDataArray,
		{
			firstSection: firstSection.split('-').map(Number) as [number, number],
			secondSection: secondSection.split('-').map(Number) as [number, number],
		},
	];
}, []);

/**
 * Part 1 - In how many assignment pairs does one range fully contain the other?
 * Answer - 471
 */

const numberOfContainedOverlaps = mappedSectionDataArr.reduce((total, { firstSection, secondSection }) => {
	const [firstSectionLowerBound, firstSectionUpperBound] = firstSection;
	const [secondSectionLowerBound, secondSectionUpperBound] = secondSection;

	const isSecondSectionContained =
		firstSectionLowerBound <= secondSectionLowerBound && firstSectionUpperBound >= secondSectionUpperBound;
	const isFirstSectionContained =
		firstSectionLowerBound >= secondSectionLowerBound && firstSectionUpperBound <= secondSectionUpperBound;

	if (isFirstSectionContained || isSecondSectionContained) return total + 1;

	return total;
}, 0);

console.log(numberOfContainedOverlaps); // 471

/**
 * Part 2 - In how many assignment pairs do the ranges overlap?
 * Answer - 888
 */

const numberOfAnyOverlaps = mappedSectionDataArr.reduce((total, { firstSection, secondSection }) => {
	const [firstSectionLowerBound, firstSectionUpperBound] = firstSection;
	const [secondSectionLowerBound, secondSectionUpperBound] = secondSection;

	const isNoBoundOverlap =
		firstSectionUpperBound < secondSectionLowerBound || firstSectionLowerBound > secondSectionUpperBound;

	if (!isNoBoundOverlap) return total + 1;

	return total;
}, 0);

console.log(numberOfAnyOverlaps); // 888
