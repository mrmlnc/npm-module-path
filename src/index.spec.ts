'use strict';

import * as assert from 'assert';

import { resolveOne, resolveMany } from './index';

describe('Resolve one module path', () => {
	it('Should work with local modules', () => {
		return resolveOne('mocha').then((filepath) => {
			assert.equal(filepath, 'node_modules/mocha');
		});
	});

	it('Should return a directory contains modules', () => {
		return resolveOne('npm', '.', { resolveDir: true }).then((filepath) => {
			assert.ok(/node_modules/.test(filepath));
		});
	});

	it('Should work with global modules', () => {
		return resolveOne('npm').then((filepath) => {
			assert.ok(/node_modules\/npm/.test(filepath));
		});
	});

	it('Should work with modules with `resolveOnlyByPrefix` option', () => {
		return resolveOne('npm', '.', { resolveOnlyByPrefix: true }).then((filepath) => {
			assert.ok(/node_modules\/npm/.test(filepath));
		});
	});

	it('Should give an error if module is not found', () => {
		return resolveOne('notFound').then((filepath) => {
			assert.equal(filepath, undefined);
		});
	});

	it('Should work with the cache path', () => {
		return resolveOne('npm', '.', { cache: 'cache/path/to/module' }).then((filepath) => {
			assert.equal(filepath, 'cache/path/to/module');
		});
	});
});

describe('Resolve many modules paths', () => {
	it('Should work with local modules', () => {
		return resolveMany(['mocha', 'tslint']).then((filepaths) => {
			assert.equal(filepaths[0], 'node_modules/mocha');
			assert.equal(filepaths[1], 'node_modules/tslint');
		});
	});

	it('Should return a directory contains modules', () => {
		return resolveMany(['mocha', 'npm'], '.', { resolveDir: true }).then((filepaths) => {
			assert.ok(/node_modules/.test(filepaths[0]));
			assert.ok(/node_modules/.test(filepaths[1]));
		});
	});

	it('Should work with global modules', () => {
		return resolveMany(['npm']).then((filepaths) => {
			assert.ok(/node_modules\/npm/.test(filepaths[0]));
		});
	});

	it('Should work with modules with `resolveOnlyByPrefix` option', () => {
		return resolveMany(['npm'], '.', { resolveOnlyByPrefix: true }).then((filepaths) => {
			assert.ok(/node_modules\/npm/.test(filepaths[0]));
		});
	});

	it('Should give an error if module is not found', () => {
		return resolveMany(['mocha', 'notFound', 'npm']).then((filepaths) => {
			assert.ok(/node_modules\/mocha/.test(filepaths[0]));
			assert.equal(filepaths[1], undefined);
			assert.ok(/node_modules\/npm/.test(filepaths[2]));
		});
	});

	it('Should work with the cache path', () => {
		return resolveMany(['npm'], '.', { cache: 'cache/path/to/module' }).then((filepaths) => {
			assert.equal(filepaths[0], 'cache/path/to/module');
		});
	});
});
