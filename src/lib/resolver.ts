'use strict';

import * as path from 'path';

import { normalize, getNodeModulesDir, pathExist } from './utils';
import { getNodePrefix } from './finder';

import { IResolveOptions } from '../index';

export function resolveOneModule(toResolve: string, paths: string[], options: IResolveOptions): Promise<string> {
	return Promise
		.all(paths.map((dir) => pathExist(path.join(dir, toResolve))))
		.then((resolves: boolean[]) => {
			for (let index = 0; index < resolves.length; index++) {
				if (resolves[index]) {
					const modulePath = normalize(paths[index]);
					return options.resolveDir ? modulePath : modulePath + '/' + toResolve;
				}
			}

			return '';
		});
}

export function resolveOneModuleByPrefix(toResolve: string, options: IResolveOptions): Promise<string> {
	return getNodePrefix().then((prefix) => {
		const globalModules = [path.join(prefix, getNodeModulesDir())];
		return resolveOneModule(toResolve, globalModules, options);
	}).then((result) => {
		if (result === '') {
			return undefined;
		}

		return result;
	});
}

export function resolveManyModules(toResolve: string[], paths: string[], options: IResolveOptions, skipTry = false): Promise<string[]> {
	const promises = toResolve.map((name) => {
		return Promise.all(paths.map((dir) => pathExist(path.join(dir, name))));
	});

	return Promise.all(promises).then((resolves) => {
		const result: string[] = [];
		const toContinue: string[] = [];
		resolves.forEach((resolve, moduleIndex) => {
			const moduleName = toResolve[moduleIndex];
			const trueIndex = resolve.indexOf(true);
			if (trueIndex !== -1) {
				const modulePath = normalize(paths[trueIndex]);
				result.push(options.resolveDir ? modulePath : modulePath + '/' + moduleName);
				return;
			}

			result.push(undefined);
			toContinue.push(moduleName);
		});

		if (toContinue.length !== 0 && !skipTry) {
			return resolveManyModuleByPrefix(toContinue, options, true).then((resultByPrefix) => {
				return result.map((filepath) => {
					return filepath === undefined ? resultByPrefix.shift() : filepath;
				});
			});
		}

		return (result.length !== 0) ? result : [''];
	});
}

export function resolveManyModuleByPrefix(toResolve: string[], options: IResolveOptions, skipTry = false): Promise<string[]> {
	return getNodePrefix().then((prefix) => {
		const globalModules = [path.join(prefix, getNodeModulesDir())];
		return resolveManyModules(toResolve, globalModules, options, skipTry);
	});
}
