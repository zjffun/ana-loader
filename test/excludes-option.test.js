import { compile, getCompiler } from './helpers';

describe('"excludes" option', () => {
  it('should work with string array', async () => {
    const compiler = getCompiler('simple.js', {
      excludes: ['foo.tsx'],
    });
    const stats = await compile(compiler);
    const { modules } = stats.toJson();

    const result = modules.map((m) => {
      return {
        id: m.id,
        reasons: m.reasons.map((r) => r.moduleId),
      };
    });

    expect(result).toMatchSnapshot('result');
  });
});
