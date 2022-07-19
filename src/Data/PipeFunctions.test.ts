import {
  checkBottom, checkConnections, checkLeft, checkRight, checkTop, pipeIndex, processData, touchesBorder,
} from './PipeFunctions';

const input = 'map:\n╋┓\n┛┓';
const output = {
  columns: 2,
  modifiedPipes: [
    [{
      directions: [true, true, true, true], img: './Images/pipe-cross.png', nextRotate: '╋', pipe: '╋',
    },
    {
      directions: [false, false, true, true], img: './Images/pipe-bottom-left.png', nextRotate: '┛', pipe: '┓',
    }],
    [{
      directions: [true, false, false, true], img: './Images/pipe-left-top.png', nextRotate: '┗', pipe: '┛',
    },
    {
      directions: [false, false, true, true], img: './Images/pipe-bottom-left.png', nextRotate: '┛', pipe: '┓',
    }],
  ],
  rows: 2,
};

describe('finding pipe index using pipeIndex()', () => {
  test('correct index', () => {
    const response = pipeIndex('╋');
    expect(response).toBe(0);
  });

  test('correct index', () => {
    const response = pipeIndex('┓');
    expect(response).toBe(9);
  });
});

describe('checking processData()', () => {
  test('if truthy', () => {
    const response = processData(input);
    expect(response).toBeTruthy();
  });

  test('if right output', () => {
    const response = processData(input);
    expect(response).toStrictEqual(output);
  });
});

describe('checking touchesBorder()', () => {
  test('if connects with border', () => {
    const response = touchesBorder(output.modifiedPipes, 1, 1, 2, 2);
    expect(response).toBeTruthy();
  });

  test('if connects with border', () => {
    const response = touchesBorder(output.modifiedPipes, 1, 0, 2, 2);
    expect(response).toBeFalsy();
  });
});

describe('checking surrounding connections', () => {
  test('if top connects', () => {
    const response = checkTop(output.modifiedPipes, 1, 1);
    expect(response).toBeFalsy();
  });

  test('if bottom connects', () => {
    const response = checkBottom(output.modifiedPipes, 0, 0, 2);
    expect(response).toBeTruthy();
  });

  test('if left connects', () => {
    const response = checkLeft(output.modifiedPipes, 0, 0);
    expect(response).toBeFalsy();
  });

  test('if right connects', () => {
    const response = checkRight(output.modifiedPipes, 0, 0, 2);
    expect(response).toBeTruthy();
  });

  test('all side connections', () => {
    const response = checkConnections(output.modifiedPipes, 0, 0, 2, 2);
    expect(response).toStrictEqual([false, true, true, false]);
  });
});
