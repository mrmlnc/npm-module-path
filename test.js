const assert = require('assert');
const m = require('./');

describe('Resolve module path', () => {
  it('Should work with local modules', () => {
    return m('xo').then((filepath) => {
      assert.equal(filepath, 'node_modules/xo');
    });
  });

  it('Should work with global modules', () => {
    return m('npm').then((filepath) => {
      assert.ok(/node_modules\/npm/.test(filepath));
    });
  });

  it('Should give an error if module is not found', () => {
    return m('notFound').catch((err) => {
      assert.equal(err.message, 'Module not found.');
    });
  });

  it('Should work with the cache path', () => {
    return m('npm', '.', 'cache/path/to/module').then((filepath) => {
      assert.equal(filepath, 'cache/path/to/module');
    });
  });
});
