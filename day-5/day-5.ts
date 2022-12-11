/**
 * https://adventofcode.com/2022/day/5
 */

// Stack layout from the input data:
// [M] [H]         [N]
// [S] [W]         [F]     [W] [V]
// [J] [J]         [B]     [S] [B] [F]
// [L] [F] [G]     [C]     [L] [N] [N]
// [V] [Z] [D]     [P] [W] [G] [F] [Z]
// [F] [D] [C] [S] [W] [M] [N] [H] [H]
// [N] [N] [R] [B] [Z] [R] [T] [T] [M]
// [R] [P] [W] [N] [M] [P] [R] [Q] [L]
//  1   2   3   4   5   6   7   8   9

const stacks = {
	1: ['R', 'N', 'F', 'V', 'L', 'J', 'S', 'M'],
	2: ['P', 'N', 'D', 'Z', 'F', 'J', 'W', 'H'],
	3: ['W', 'R', 'C', 'D', 'G'],
	4: ['N', 'B', 'S'],
	5: ['M', 'Z', 'W', 'P', 'C', 'B', 'F', 'N'],
	6: ['P', 'R', 'M', 'W'],
	7: ['R', 'T', 'N', 'G', 'L', 'S', 'W'],
	8: ['Q', 'T', 'H', 'F', 'N', 'B', 'V'],
	9: ['L', 'M', 'H', 'Z', 'N', 'F'],
};
