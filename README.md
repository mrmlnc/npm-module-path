# npm-module-path

> Local and global search module directory.

## Install

```shell
$ npm i -D npm-module-path
```

## Why?

Primarily, this module is designed to search modules for VS Code (language server, etc).

  * Dependencies free
  * Returns the path to the module directory (without `require`)

## Usage

```js
const getModulePath = require('npm-module-path');

getModulePath('moduleName', './workspaceDir', 'cachePath')
  .then((modulePath) => {
    console.log(modulePath);
  })
  .catch(console.error);
```

## Arguments

**workspaceRoot**

  * Type: `String`
  * Default: `./`

The root directory of the project to search the module.

**moduleName**

  * Type: 'String'
  * Default: null

The name of the module that you want to find.

**cachePath**

  * Type: 'String'
  * Default: null

The path that you want to return without searching.

## Changelog

See the [Releases section of our GitHub project](https://github.com/mrmlnc/npm-module-path/releases) for changelogs for each release version.

## License

This software is released under the terms of the MIT license.
