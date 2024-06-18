export function deepMerge(target, source) {
  for (const key of Object.keys(target)) {
    if (source[key] === undefined) {
      continue;
    }

    if (target[key] instanceof Object && !(target[key] instanceof Array)) {
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}
