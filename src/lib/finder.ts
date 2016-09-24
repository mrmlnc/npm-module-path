'use strict';

import * as path from 'path';
import { spawn } from 'child_process';

export function getDefaultNodePaths(root: string): string[] {
	const isWindows = process.platform === 'win32';
	const isLinux = process.platform === 'linux';
	const isDarwin = process.platform === 'darwin';

	if (!root) {
		root = '.';
	}

	let defaultPaths = [path.join(root, 'node_modules')];
	if (isWindows && process.env.NVM_SYMLINK) {
		defaultPaths.push(path.join(process.env.NVM_SYMLINK, 'node_modules'));
		defaultPaths.push(path.join(process.env.APPDATA, 'npm/node_modules'));
	} else if (isLinux) {
		defaultPaths.push('/usr/lib/node_modules');
	} else if (isDarwin) {
		defaultPaths.push('/usr/local/lib/node_modules');
		defaultPaths.push(path.join(process.env.HOME, '.npm-packages'));
	}

	if (process.env.NVM_PATH && (isLinux || isDarwin)) {
		defaultPaths.push(path.join(process.env.NVM_PATH, '..', 'node_modules'));
	}

	return defaultPaths;
}

export function getNodePrefix(): Promise<string> {
	const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';

	return new Promise((resolve, reject) => {
		const prefix = spawn(npmCommand, ['config', 'get', 'prefix']);
		prefix.stdout.on('data', (data: Buffer) => {
			const globalPath = data.toString().replace(/[\s\r\n]+$/, '');
			return resolve(globalPath);
		});
		prefix.stderr.on('data', (data: Buffer) => {
			return reject(data.toString());
		});
	});
}
