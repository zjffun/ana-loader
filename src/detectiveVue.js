// TODO: PR for dependents/detective-vue2
'use strict';

const compiler = require('@vue/compiler-sfc');
const detectiveTypeScript = require('detective-typescript');
const detectiveEs6 = require('detective-es6');
const detectiveScss = require('detective-scss');
const detectiveStylus = require('detective-stylus');
const detectiveSass = require('detective-sass');
const detectiveHtml = require('detective-html');
const detectivePostcss = require('detective-postcss');

/**
 * Extracts the dependencies of the supplied Vue module
 */
module.exports = function (content, options) {
  if (content === undefined) throw new Error('content not given');
  if (typeof content !== 'string') throw new Error('content is not a string');

  const result = compiler.parse(content, { sourceMap: false });
  const { styles, script, template } = result.descriptor;

  const dependencies = [];

  if (script?.content) {
    if (script.attrs?.lang === 'ts') {
      dependencies.push(...detectiveTypeScript(script.content, options));
    } else {
      dependencies.push(...detectiveEs6(script.content, options));
    }
  }

  if (template) {
    dependencies.push(...detectiveHtml(template.content));
  }

  if (styles) {
    for (const style of styles) {
      switch (style.attrs.lang) {
        case 'scss': {
          dependencies.push(...detectiveScss(style.content, { url: true }));

          break;
        }

        case 'stylus': {
          dependencies.push(...detectiveStylus(style.content, { url: true }));

          break;
        }

        case 'sass': {
          dependencies.push(...detectiveSass(style.content, { url: true }));

          break;
        }

        default:
          dependencies.push(...detectivePostcss(style.content, { url: true }));
      }
    }
  }

  return dependencies;
};
