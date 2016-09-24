'use strict';

import * as fs from 'fs';

export function normalize(filepath: string): string {
	return filepath.replace(/\\/g, '/');
}

export function getNodeModulesDir(): string {
	const isLinux = process.platform === 'linux';

	let nodeModules = 'node_modules';
	if (isLinux) {
		nodeModules = 'lib/node_modules';
	}

	return nodeModules;
}

export function pathExist(filepath: string) {
	return new Promise((resolve) => fs.stat(filepath, (err) => resolve(!err)));
}
