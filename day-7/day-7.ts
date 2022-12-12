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

// const commandsMap = {
// 	$: {
// 		cd: {
// 			'/': directoryTree.root,
// 		},
//         ls:
// 	},
// };

/**
 * Part 1 - What is the sum of the total sizes of those directories?
 */

let currentDirectoryPointer = directoryTree['/'];

for (let i = 0; i < commands.length; i++) {
	const currentCommand = commands[i];
	const [first, second, third] = currentCommand.split(' ');

	// If it's a command
	if (first === '$') {
		if (second === 'cd') {
			if (third === '/') {
				currentDirectoryPointer = directoryTree['/'];
			} else if (third === '..') {
				if (currentDirectoryPointer.parentLabel) {
					currentDirectoryPointer = directoryTree[currentDirectoryPointer.parentLabel];
				}
				// Means cd into a directory
			} else {
				if (currentDirectoryPointer === null) continue;
				const childLabel = currentDirectoryPointer.children.find((child) => child === third) || '/';
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
		continue;
	}

	// If it's a file
	if (!Number.isNaN(first)) {
		if (directoryTree[second]) continue;

		directoryTree[second] = registerNewNode('file', second, currentDirectoryPointer.label, Number(first));
		directoryTree[currentDirectoryPointer.label].size += Number(first);
		currentDirectoryPointer.children.push(second);
		continue;
	}
}

function registerNewNode(type: NodeType, label: string, parentLabel: string | null, size = 0): TreeNode {
	return {
		type,
		label,
		children: [],
		parentLabel: parentLabel,
		size,
	};
}

console.log(currentDirectoryPointer);

console.log(JSON.stringify(directoryTree));
