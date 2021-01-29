const getProp = (mem, prop) =>
  (!mem || typeof mem !== 'object' || !Object.keys(mem).length) ? undefined : mem[prop];

const squareRE = /\[.+?\]/g;

/**
/*
 * support path.to.[very-pretty.name].more
 *
 * evalJsonPath({a:{b:1}, 'a.b':5}, 'a.b') ==> 1
 * evalJsonPath({a:{b:1}, 'a.b':5}, '[a.b]') ==> 5
 *
 * @param jsonObj The json obj to eval
 * @param path The path: step1.step2
 * @param defaultValue The fallback value
 * @returns The evaluate result
 */
export default function evalJsonPath(jsonObj, path, defaultValue) {
  if (!path) return jsonObj;

  const camelProps = path.split(squareRE);
  let result;

  if (camelProps.length === 1) {
    result = camelProps[0].split('.').reduce((mem, a) => getProp(mem, a), jsonObj);
  } else {
    const prettyProps = path.match(squareRE);
    result = camelProps.reduce((mem, a, i) => {
      mem = evalJsonPath(mem, a.replace(/^\.|\.$/g, ''));
      if (prettyProps[i]) {
        mem = getProp(mem, prettyProps[i].replace(/^\[|\]$/g, ''));
      }
      return mem;
    }, jsonObj);
  }

  return result !== undefined ? result : defaultValue;
}
