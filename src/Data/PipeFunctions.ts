import {
  forbiddenBottom, forbiddenLeft, forbiddenRight, forbiddenTop, pipeVariations, PipeVariationsType,
} from './PipeData';
import socket from './socket';

export const pipeIndex = (pipe: string) => pipeVariations.findIndex((obj) => obj.pipe === pipe);

export const processData = (data: string) => {
  const pipes: string[][] = data.slice(4).split('\n').filter(
    (el) => el !== '',
  ).map((el) => el.split(''));

  const modifiedPipes = pipes.map((row) => row.map((pipe) => {
    const index = pipeIndex(pipe);

    return pipeVariations[index];
  }));

  const columns = pipes[0].length;

  const rows = pipes.length;

  return { modifiedPipes, columns, rows };
};

export const touchesBorder = (
  arr: PipeVariationsType[][], y: number, x: number, columns: number, rows: number,
) => {
  let result = false;
  const { pipe } = arr[x][y];

  // checks top border with both corners
  if (!x) {
    if (!y) {
      if (forbiddenTop.includes(pipe) || forbiddenLeft.includes(pipe)) {
        result = true;
      }
    } else if (y === columns - 1) {
      if (forbiddenTop.includes(pipe) || forbiddenRight.includes(pipe)) {
        result = true;
      }
    } else if (forbiddenTop.includes(pipe)) {
      result = true;
    }
    // checks bottom border with both corners
  } else if (x === rows - 1) {
    if (!y) {
      if (forbiddenBottom.includes(pipe) || forbiddenLeft.includes(pipe)) {
        result = true;
      }
    } else if (y === columns - 1) {
      if (forbiddenBottom.includes(pipe) || forbiddenRight.includes(pipe)) {
        result = true;
      }
    } else if (forbiddenBottom.includes(pipe)) {
      result = true;
    }
    // checks left border
  } else if (!y) {
    if (forbiddenLeft.includes(pipe)) {
      result = true;
    }
    // checks right border
  } else if (y === columns - 1) {
    if (forbiddenRight.includes(pipe)) {
      result = true;
    }
  }

  return result;
};

export const checkTop = (arr: PipeVariationsType[][], x: number, y: number) => {
  if (!y) {
    return false;
  }

  return arr[y][x].directions[0] && arr[y - 1][x].directions[2];
};

export const checkBottom = (arr: PipeVariationsType[][], x: number, y: number, rows: number) => {
  if (y === rows - 1) {
    return false;
  }

  return arr[y][x].directions[2] && arr[y + 1][x].directions[0];
};

export const checkRight = (arr: PipeVariationsType[][], x: number, y: number, columns: number) => {
  if (x === columns - 1) {
    return false;
  }

  return arr[y][x].directions[1] && arr[y][x + 1].directions[3];
};

export const checkLeft = (arr: PipeVariationsType[][], x: number, y: number) => {
  if (!x) {
    return false;
  }

  return arr[y][x].directions[3] && arr[y][x - 1].directions[1];
};

export const checkConnections = (arr: PipeVariationsType[][], x: number, y: number, columns: number, rows: number) => {
  const connections = [false, false, false, false];

  if (checkTop(arr, x, y)) connections[0] = true;
  if (checkRight(arr, x, y, columns)) connections[1] = true;
  if (checkBottom(arr, x, y, rows)) connections[2] = true;
  if (checkLeft(arr, x, y)) connections[3] = true;

  return connections;
};

export const rotatePipe = (x: number, y: number, command: 'manual' | 'automatic') => {
  if (command === 'manual') {
    socket.send(`rotate ${x} ${y}`);
    socket.send('map');
  } else {
    socket.send(`rotate ${x} ${y}`);
  }
};

export const cleanBorders = (arr: PipeVariationsType[][], columns: number, rows: number) => {
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < columns; x += 1) {
      if (touchesBorder(arr, x, y, columns, rows)) {
        rotatePipe(x, y, 'automatic');
      }
    }
  }
  socket.send('map');
};

export const faceUpwards = (arr: PipeVariationsType[][], columns: number, rows: number) => {
  if (arr) {
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < columns; x += 1) {
        if (!arr[y][x].directions[0]) {
          rotatePipe(x, y, 'automatic');
        }
      }
    }
  }
  socket.send('map');
};

export const adjustPipes = (arr: PipeVariationsType[][], columns: number, rows: number) => {
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < columns; x += 1) {
      const connections = checkConnections(arr, x, y, columns, rows);
      if (!connections.includes(true)) {
        rotatePipe(x, y, 'automatic');
      }
    }
  }
  socket.send('map');
};

export const connectCrosses = (arr: PipeVariationsType[][], columns: number, rows: number) => {
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < columns; x += 1) {
      if (arr[y][x].pipe === '╋') {
        const connections = checkConnections(arr, x, y, columns, rows);
        if (connections.includes(false)) {
          const index = connections.indexOf(false);
          if (index === 0) {
            rotatePipe(x, y - 1, 'automatic');
          } else if (index === 1) {
            rotatePipe(x + 1, y, 'automatic');
          } else if (index === 2) {
            rotatePipe(x, y + 1, 'automatic');
          } else if (index === 3) {
            rotatePipe(x - 1, y, 'automatic');
          }
        }
      }
    }
  }
  socket.send('map');
};
