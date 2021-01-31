# eval-json-path
Evaluate/Query the value of json object at given path

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

> Commonly js object variable can be accessed by property name or index. This module allow to access by path/steps given by a string

## Usage

```js

const evalJsonPath = require('eval-json-path')

const value = evalJsonPath(obj, 'prop.subprop[prett-prop][3].lastprop')

const sameValue = obj.prop.subprop['prett-prop'][3].lastprop
```

> The evaluation is done by each step, which is null-safe, any not-existing step will result undefined or fallback

## API

evalJsonPath(obj, path, fallback)

- obj: The object should has sub property
- path: A string represent the path/steps
- fallback: A optional fallback for any not-existing step
