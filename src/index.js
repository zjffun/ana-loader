import path from 'path';

import getDependencies from './getDependencies';

import schema from './options.json';

export const raw = true;

const defaultExcludes = [/node_modules/];

export default function loader(source) {
  let excludes = defaultExcludes;

  const options = this.getOptions(schema) || {};

  if (Array.isArray(options.excludes)) {
    excludes = options.excludes.map((exclude) => {
      if (exclude instanceof RegExp) {
        return exclude;
      }
      return new RegExp(exclude);
    });
  }

  const { resourcePath } = this;

  if (excludes.some((exclude) => exclude.test(resourcePath))) {
    return '';
  }

  const ext = path.extname(resourcePath);
  const sourceStr = source.toString();

  const deps = getDependencies(sourceStr, ext);

  const newSource = deps.map((dep) => `import '${dep}';`).join('\n');

  return newSource;
}
