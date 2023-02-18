import detectiveAmd from 'detective-amd';
import detectiveCjs from 'detective-cjs';
import detectiveTs from 'detective-typescript';
import detectiveEs6 from 'detective-es6';
import detectiveSass from 'detective-sass';
import detectiveScss from 'detective-scss';
import detectiveLess from 'detective-less';
import detectiveStylus from 'detective-stylus';
import detectivePostcss from 'detective-postcss';

const scriptType = ['.js', '.ts', '.tsx', '.jsx'];

export const raw = true;

export default function getDependencies(sourceStr, ext) {
  const depSet = new Set();

  try {
    if (scriptType.includes(ext)) {
      detectiveTs(sourceStr, {
        jsx: true,
      }).forEach((dep) => depSet.add(dep));
      detectiveAmd(sourceStr).forEach((dep) => depSet.add(dep));
      detectiveCjs(sourceStr).forEach((dep) => depSet.add(dep));
      detectiveEs6(sourceStr).forEach((dep) => depSet.add(dep));
    } else if (ext === '.sass') {
      // TODO: url
      detectiveSass(sourceStr).forEach((dep) => depSet.add(dep));
    } else if (ext === '.scss') {
      // TODO: url
      detectiveScss(sourceStr).forEach((dep) => depSet.add(dep));
    } else if (ext === '.less') {
      // TODO: url
      detectiveLess(sourceStr).forEach((dep) => depSet.add(dep));
    } else if (ext === '.styl') {
      // TODO: url
      detectiveStylus(sourceStr).forEach((dep) => depSet.add(dep));
    } else if (ext === '.css') {
      detectivePostcss(sourceStr, { url: true }).forEach((dep) =>
        depSet.add(dep)
      );
    } else if (ext === '.html') {
      // TODO: html
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  const deps = Array.from(depSet);

  return deps;
}
