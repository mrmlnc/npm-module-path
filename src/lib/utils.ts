'use strict';

import * as fs from 'fs';

export function normalize(filepath: string): string {
	return filepath.replace(/\\/g, '/');
}

export function getNodeModulesDir(): string {
	const isWindows = process.platform === 'win32';

	let nodeModules = 'node_modules';
	if (!isWindows) {
		nodeModules = 'lib/node_modules';
	}

	return nodeModules;
}

export function pathExists(filepath: string): Promise<boolean> {
	return new Promise((resolve) => {
		fs.access(filepath, (err) => {
			resolve(!err);
		});
	});
}
