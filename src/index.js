import path from 'path';

import getDependencies from 'quick-dep';

import schema from './options.json';

export const raw = true;

const defaultExcludes = [/node_modules/];

const types = [
  '.js',
  '.ts',
  '.jsx',
  '.tsx',
  '.css',
  '.sass',
  '.scss',
  '.less',
  '.styl',
  '.html',
  '.vue',
];

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

  let deps = [];

  if (types.includes(ext)) {
    deps = getDependencies(sourceStr, {
      css: true,
      html: true,
    });
  }

  const newSource = deps.map((dep) => `import '${dep}';`).join('\n');

  return newSource;
}
