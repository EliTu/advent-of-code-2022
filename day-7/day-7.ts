/**
 * https://adventofcode.com/2022/day/7
 */

import { readFileSync } from 'fs';

const inputText = readFileSync('./input.txt', 'utf-8');
const commands = inputText.split('\n');

type NodeType = 'directory' | 'file';
interface TreeNode {
	type: NodeType;
	label: string;
	children: string[];
	parentLabel: string | null;
	size: number;
}

const directoryTree: Record<'/' | string, TreeNode> = {
	'/': {
		type: 'directory',
		label: '/',
		children: [],
		parentLabel: null,
		size: 0,
	},
};

/**
 * Part 1 - What is the sum of the total sizes of those directories?
 * Answer: 374534 - WRONG ANSWER, TOO LOW
 */

let currentDirectoryPointer = directoryTree['/'];

// ! This implementation doesn't work well when wanting to calculate deep;y nested directories sizes, should refactor to a recursive function
for (let i = 0; i < commands.length; i++) {
	const currentCommand = commands[i];
	const [first, second, third] = currentCommand.split(' ');

	// If it's a command
	if (first === '$') {
		if (second === 'cd') {
			const { parentLabel, children } = currentDirectoryPointer;
			if (third === '/') {
				currentDirectoryPointer = directoryTree['/'];
			} else if (third === '..') {
				if (parentLabel) {
					currentDirectoryPointer = directoryTree[parentLabel];
				}
				// Means cd into a directory
			} else {
				if (currentDirectoryPointer === null) continue;
				const childLabel = children.find((child) => child === third) || '/';
				currentDirectoryPointer = directoryTree[childLabel];
			}
			continue;
		}
		// Do nothing on 'ls' command
		if (second === 'ls') continue;
	}

	// If it's a directory
	if (first === 'dir') {
		if (directoryTree[second]) continue;

		directoryTree[second] = registerNewNode('directory', second, currentDirectoryPointer.label);
		currentDirectoryPointer.children.push(second);
	}

	// If it's a file
	if (!Number.isNaN(first)) {
		if (directoryTree[second]) continue;

		const { label, parentLabel } = currentDirectoryPointer;
		const fileSize = Number(first);

		directoryTree[second] = registerNewNode('file', second, label, fileSize);

		directoryTree[label].size += fileSize;

		// ! This doesn't work for deeply nested directories as it can only go one node up, needs to be refactored
		if (parentLabel && directoryTree[parentLabel].type === 'directory') {
			directoryTree[parentLabel].size += fileSize;
		}
		currentDirectoryPointer.children.push(second);
	}
}

const totalDirectoriesSize = Object.values(directoryTree)
	.filter((dir) => dir.type !== 'file')
	.reduce((total, { size }) => {
		if (size > 100_000 || !size) return total;
		return total + size;
	}, 0);

console.log(totalDirectoriesSize);

/* Helpers */

function registerNewNode(type: NodeType, label: string, parentLabel: string | null, size = 0): TreeNode {
	return {
		type,
		label,
		children: [],
		parentLabel: parentLabel,
		size,
	};
}
