import path from 'path';

import { parseComponent } from 'vue-template-compiler';

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

  let deps = [];
  if (ext === '.vue') {
    const component = parseComponent(sourceStr);

    if (component.script) {
      deps = deps.concat(
        getDependencies(
          component.script.content,
          `.${component.script.lang || 'js'}`
        )
      );
    }

    if (component.scriptSetup) {
      deps = deps.concat(
        getDependencies(
          component.scriptSetup.content,
          `.${component.scriptSetup.lang || 'js'}`
        )
      );
    }

    for (const style of component.styles) {
      deps = deps.concat(
        getDependencies(style.content, `.${style.lang || 'css'}`)
      );
    }

    if (component.template) {
      deps = deps.concat(
        getDependencies(
          component.template.content,
          `.${component.template.lang || 'html'}`
        )
      );
    }
  } else {
    deps = getDependencies(sourceStr, ext);
  }

  const newSource = deps.map((dep) => `import '${dep}';`).join('\n');

  return newSource;
}
