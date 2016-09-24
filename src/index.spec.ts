'use strict';

import * as assert from 'assert';

import { resolveOne, resolveMany } from './index';

describe('Resolve one module path', () => {
	it('Search `mocha` module path.', () => {
		return resolveOne('mocha').then((filepath) => {
			assert.ok(/node_modules\/mocha$/.test(filepath));
		});
	});

	it('Search `npm` module path.', () => {
		return resolveOne('npm').then((filepath) => {
			assert.ok(/node_modules\/npm$/.test(filepath));
		});
	});

	it('Search `npm` module path and return only dir.', () => {
		return resolveOne('npm', '.', { resolveDir: true }).then((filepath) => {
			assert.ok(/node_modules$/.test(filepath));
		});
	});

	it('Search `npm` module with `resolveOnlyByPrefix` option.', () => {
		return resolveOne('npm', '.', { resolveOnlyByPrefix: true }).then((filepath) => {
			assert.ok(/node_modules\/npm$/.test(filepath));
		});
	});

	it('Should give an error if module is not found.', () => {
		return resolveOne('notFound').then((filepath) => {
			assert.equal(filepath, undefined);
		});
	});

	it('Should return cached path.', () => {
		return resolveOne('npm', '.', { cache: 'cache/path/to/module' }).then((filepath) => {
			assert.equal(filepath, 'cache/path/to/module');
		});
	});
});

describe('Resolve many modules paths', () => {
	it('Search `mocha` & `tslint` module path.', () => {
		return resolveMany(['mocha', 'tslint']).then((filepaths) => {
			assert.ok(/node_modules\/mocha$/.test(filepaths[0]));
			assert.ok(/node_modules\/tslint$/.test(filepaths[1]));
		});
	});

	it('Search `npm` module path.', () => {
		return resolveMany(['npm']).then((filepaths) => {
			assert.ok(/node_modules\/npm$/.test(filepaths[0]));
		});
	});

	it('Search `mocha` & `npm` module path and return only dir.', () => {
		return resolveMany(['mocha', 'npm'], '.', { resolveDir: true }).then((filepaths) => {
			assert.ok(/node_modules$/.test(filepaths[0]));
			assert.ok(/node_modules$/.test(filepaths[1]));
		});
	});

	it('Search `npm` module with `resolveOnlyByPrefix` option.', () => {
		return resolveMany(['npm'], '.', { resolveOnlyByPrefix: true }).then((filepaths) => {
			assert.ok(/node_modules\/npm$/.test(filepaths[0]));
		});
	});

	it('Should give an error if module is not found.', () => {
		return resolveMany(['mocha', 'notFound', 'npm']).then((filepaths) => {
			assert.ok(/node_modules\/mocha$/.test(filepaths[0]));
			assert.equal(filepaths[1], undefined);
			assert.ok(/node_modules\/npm$/.test(filepaths[2]));
		});
	});

	it('Should return cached path.', () => {
		return resolveMany(['npm'], '.', { cache: 'cache/path/to/module' }).then((filepaths) => {
			assert.equal(filepaths[0], 'cache/path/to/module');
		});
	});
});
