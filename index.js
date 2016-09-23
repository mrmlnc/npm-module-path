'use strict';

const path = require('path');
const fs = require('fs');
const exec = require('child_process').exec;

function pathsExists(filepath) {
	return new Promise((resolve) => fs.stat(filepath, (err) => resolve(!err)));
}

function resolveModule(moduleName, workspaceRoot, cachePath) {
	if (cachePath) {
		return new Promise((resolve) => resolve(cachePath));
	}

	if (!workspaceRoot) {
		workspaceRoot = '.';
	}

	const nodePath = [path.join(workspaceRoot, 'node_modules')];
	return new Promise((resolve, reject) => {
		exec('npm config get prefix', (err, stdout) => {
			if (err) {
				reject(err);
			}

			const globalPath = stdout.toString().replace(/[\s\r\n]+$/, '');
			if (globalPath.length > 0) {
				if (process.platform === 'win32') {
					nodePath.push(path.join(globalPath, 'node_modules'));
				} else {
					nodePath.push(path.join(globalPath, 'lib', 'node_modules'));
				}
			}

			resolve(nodePath);
		});
	}).then((paths) => {
		return Promise.all(paths.map((filepath) => {
			return pathsExists(path.join(filepath, moduleName));
		}));
	}).then((results) => {
		for (let index = 0; index < results.length; index++) {
			if (results[index]) {
				return path.join(nodePath[index], moduleName).replace(/\\/g, '/');
			}
		}

		const err = {
			code: 'ENOENT',
			message: 'Module not found.'
		};

		return Promise.reject(err);
	});
}

module.exports = resolveModule;
