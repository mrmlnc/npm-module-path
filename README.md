# npm-module-path

> Local and global search module directory.

[![Travis](https://img.shields.io/travis/mrmlnc/npm-module-path.svg?style=flat-square)](https://travis-ci.org/mrmlnc/npm-module-path)
[![AppVeyor](https://img.shields.io/appveyor/ci/mrmlnc/npm-module-path.svg?style=flat-square)](https://ci.appveyor.com/project/mrmlnc/npm-module-path)

## Install

```shell
$ npm i -S npm-module-path
```

## Why?

Primarily, this module is designed to search modules for VS Code (language server extension, etc).

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
