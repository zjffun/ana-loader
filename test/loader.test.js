import {
  compile,
  execute,
  getCompiler,
  getErrors,
  getWarnings,
  readAsset,
} from './helpers';

describe('loader', () => {
  it('should work', async () => {
    const compiler = getCompiler('simple.js');
    const stats = await compile(compiler);

    const { modules } = stats.toJson();

    const result = modules.map((m) => {
      return {
        id: m.id,
        reasons: m.reasons.map((r) => r.moduleId),
      };
    });

    expect(result).toMatchSnapshot('result');

    expect(
      execute(readAsset('main.bundle.js', compiler, stats))
    ).toMatchSnapshot('main.bundle.js');
    expect(getErrors(stats)).toMatchSnapshot('errors');
    expect(getWarnings(stats)).toMatchSnapshot('warnings');
  });
});
