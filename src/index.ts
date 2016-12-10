'use strict';

import { getDefaultNodePaths } from './lib/finder';
import {
	resolveOneModule,
	resolveOneModuleByPrefix,
	resolveManyModules,
	resolveManyModuleByPrefix
} from './lib/resolver';

export interface IResolveOptions {
	cache?: string | string[];
	resolveDir?: boolean;
	resolveOnlyByPrefix?: boolean;
}

export function resolveOne(toResolve: string, root?: string, options?: IResolveOptions): Promise<string> {
	options = Object.assign(<IResolveOptions>{
		cache: '',
		resolveDir: false,
		resolveOnlyByPrefix: false
	}, options);

	if (options.cache) {
		return Promise.resolve(options.cache);
	}

	const defaultPaths = getDefaultNodePaths(root);

	if (options.resolveOnlyByPrefix) {
		return resolveOneModuleByPrefix(toResolve, options);
	}

	return resolveOneModule(toResolve, defaultPaths, options).then((filepath) => {
		if (filepath === '') {
			return resolveOneModuleByPrefix(toResolve, options);
		}

		return filepath;
	});
}

export function resolveMany(toResolve: string[], root?: string, options?: IResolveOptions): Promise<string[]> {
	options = Object.assign(<IResolveOptions>{
		cache: '',
		resolveDir: false,
		resolveOnlyByPrefix: false
	}, options);

	if (options.cache) {
		options.cache = [].concat(options.cache);
		return Promise.resolve(options.cache);
	}

	const defaultPaths = getDefaultNodePaths(root);

	if (options.resolveOnlyByPrefix) {
		return resolveManyModuleByPrefix(toResolve, options);
	}

	return resolveManyModules(toResolve, defaultPaths, options);
}
