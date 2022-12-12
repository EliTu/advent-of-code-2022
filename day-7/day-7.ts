/**
 * https://adventofcode.com/2022/day/7
 */

import { readFileSync } from 'fs';

const inputText = readFileSync('./input.txt', 'utf-8');
const commands = inputText.split('\n');

console.log(commands.length);

interface TreeNode {
	type: 'directory' | 'file';
	label: string;
	children: TreeNode[];
	size: number;
}

const directoryTree: Record<string, TreeNode> = {
	root: {
		type: 'directory',
		label: '/',
		children: [],
		size: 0,
	},
};

/**
 * Part 1 - What is the sum of the total sizes of those directories?
 */

for (let i = 0; i < commands.length; i++) {}
