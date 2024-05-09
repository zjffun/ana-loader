import detectiveAmd from 'detective-amd';
import detectiveCjs from 'detective-cjs';
import detectiveEs6 from 'detective-es6';
import detectiveHtml from 'detective-html';
import detectiveLess from '@dependents/detective-less';
import detectivePostcss from 'detective-postcss';
import detectiveSass from 'detective-sass';
import detectiveScss from 'detective-scss';
import detectiveStylus from 'detective-stylus';
import detectiveTs from 'detective-typescript';
import detectiveVue from './detectiveVue.js';

const tsxType = ['.ts', '.tsx'];

export const raw = true;

export default function getDependencies(sourceStr, ext) {
  const depSet = new Set();

  try {
    if (tsxType.includes(ext)) {
      detectiveTs(sourceStr, {
        jsx: true,
      }).forEach((dep) => depSet.add(dep));
    } else if (ext === '.vue') {
      detectiveVue(sourceStr).forEach((dep) => depSet.add(dep));
    } else if (ext === '.jsx') {
      detectiveAmd(sourceStr).forEach((dep) => depSet.add(dep));
      detectiveCjs(sourceStr).forEach((dep) => depSet.add(dep));
      detectiveEs6(sourceStr).forEach((dep) => depSet.add(dep));
    } else if (ext === '.js') {
      detectiveAmd(sourceStr).forEach((dep) => depSet.add(dep));
      detectiveCjs(sourceStr).forEach((dep) => depSet.add(dep));
      detectiveEs6(sourceStr).forEach((dep) => depSet.add(dep));
    } else if (ext === '.sass') {
      detectiveSass(sourceStr, { url: true }).forEach((dep) => depSet.add(dep));
    } else if (ext === '.scss') {
      detectiveScss(sourceStr, { url: true }).forEach((dep) => depSet.add(dep));
    } else if (ext === '.less') {
      detectiveLess(sourceStr, { url: true }).forEach((dep) => depSet.add(dep));
    } else if (ext === '.styl') {
      // TODO: url
      detectiveStylus(sourceStr).forEach((dep) => depSet.add(dep));
    } else if (ext === '.css') {
      detectivePostcss(sourceStr, { url: true }).forEach((dep) =>
        depSet.add(dep)
      );
    } else if (ext === '.html') {
      detectiveHtml(sourceStr).forEach((dep) => depSet.add(dep));
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  const deps = Array.from(depSet);

  return deps;
}
