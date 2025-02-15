import { Globals } from '../../src/globals';
import { getTestingFunctions } from '../testSimplifier';
import { cleanUpWorkspace, setupWorkspace, reloadConfiguration } from '../testUtils';

suite('replaceWithRegister plugin', () => {
  const { newTest } = getTestingFunctions();
  const YankInnerWord = 'yiw';
  const ReplaceOperator = 'gr';

  setup(async () => {
    await setupWorkspace();
    Globals.mockConfiguration.replaceWithRegister = true;
    await reloadConfiguration();
  });

  teardown(cleanUpWorkspace);

  newTest({
    title: 'Replaces within inner word',
    start: ['|first second'],
    keysPressed: `${YankInnerWord}w${ReplaceOperator}iw`,
    end: ['first firs|t'],
  });

  newTest({
    title: 'Replaces within inner Word',
    start: ['|first sec-ond'],
    keysPressed: `${YankInnerWord}w${ReplaceOperator}iW`,
    end: ['first firs|t'],
  });

  newTest({
    title: "Replaces within ''",
    start: ["|first 'second'"],
    keysPressed: `${YankInnerWord}ww${ReplaceOperator}i'`,
    end: ["first 'firs|t'"],
  });

  newTest({
    title: "Replaces within '' including spaces",
    start: ["|first ' second '"],
    keysPressed: `${YankInnerWord}ww${ReplaceOperator}i'`,
    end: ["first 'firs|t'"],
  });

  newTest({
    title: 'Replaces within ()',
    start: ['|first (second)'],
    keysPressed: `${YankInnerWord}ww${ReplaceOperator}i)`,
    end: ['first (firs|t)'],
  });

  newTest({
    title: 'Replaces within () including spaces',
    start: ['|first ( second )'],
    keysPressed: `${YankInnerWord}ww${ReplaceOperator}i)`,
    end: ['first (firs|t)'],
  });

  newTest({
    title: 'Replaces within a paragraph',
    start: ['  |first', '  second'],
    keysPressed: `${YankInnerWord}${ReplaceOperator}ap`,
    end: ['|first'],
  });

  newTest({
    title: 'Replaces using a specified register',
    start: ['|first second'],
    keysPressed: `"a${YankInnerWord}w"a${ReplaceOperator}iw`,
    end: ['first firs|t'],
  });

  newTest({
    title: 'Replaces within {} over multiple lines',
    start: ['{', '  first', '  s|econd', '  third', '}'],
    keysPressed: `${YankInnerWord}${ReplaceOperator}i}`,
    end: ['{', '|second', '}'],
  });

  newTest({
    title: 'Replaces a multiline register within {} over multiple lines',
    start: ['{', '  first', '  s|econd', '  third', '}'],
    keysPressed: `yj${ReplaceOperator}i}`,
    end: ['{', '  |second', '  third', '}'],
  });

  newTest({
    title: 'Replaces a multiline register within {} over multiple lines',
    start: ['{', '  first', '  s|econd', '  third', '}'],
    keysPressed: `yj${ReplaceOperator}i}`,
    end: ['{', '  |second', '  third', '}'],
  });

  newTest({
    title: 'Yanking inside {} then replacing inside {} in a noop, besides the cursor movement',
    start: ['{', '  first', '  s|econd', '  third', '}'],
    keysPressed: `yi}${ReplaceOperator}i}`,
    end: ['{', '  |first', '  second', '  third', '}'],
  });

  newTest({
    title: 'grr replaces the entire line with the register',
    start: ['first sec|ond third'],
    keysPressed: `${YankInnerWord}grr`,
    end: ['|second'],
  });

  newTest({
    title: 'grr can replace multiple lines',
    start: ['|first', 'second', 'third'],
    keysPressed: `${YankInnerWord}2grr`,
    end: ['|first', 'third'],
  });
});
