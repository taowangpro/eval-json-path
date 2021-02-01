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

## More Examples

```js
const obj = {
  step1: {
    step2: {
      'pretty.nice-step': [
        {},
        {step3: 4}
      ]
    }
  }
}

evalJsonPath(null, 'step1'); // undefined

evalJsonPath(undefined, 'step1'); // undefined

evalJsonPath(3, 'step1'); // undefined

evalJsonPath(false, 'step1'); // undefined

evalJsonPath(obj, 'step1'); // same as obj.step1

evalJsonPath(obj, 'step1.step2'); // same as obj.step1.step2

evalJsonPath(obj, 'step1.step2[pretty.nice-step]'); // obj.step1.step2['pretty.nice-step'])

evalJsonPath(obj, 'step1.step2[pretty.nice-step][1].step3'); // obj.step1.step2['pretty.nice-step'][1].step3)

evalJsonPath(obj, 'step1.xxxxx[pretty.nice-step][1].step3'); // any non-exist step result undefined
```