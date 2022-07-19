import { faceUpwards, cleanBorders, connectCrosses } from './PipeFunctions';

export type LevelsType = {
    name: string,
    command: string,
}

export const levels = [
  {
    name: 'Level 1',
    command: 'new 1',
  },
  {
    name: 'Level 2',
    command: 'new 2',
  },
  {
    name: 'Level 3',
    command: 'new 3',
  },
  {
    name: 'Level 4*',
    command: 'new 4',
  },
  {
    name: 'Level 5*',
    command: 'new 5',
  },
  {
    name: 'Level 6*',
    command: 'new 6',
  },
];

export type PipeVariationsType = {
  pipe: string,
  directions: boolean[],
  nextRotate: string,
  img: string,
}

export const forbiddenTop = ['╋', '┃', '╹', '┗', '┛', '┻', '┣', '┫'];
export const forbiddenRight = ['╋', '━', '╺', '┗', '┏', '┻', '┣', '┳'];
export const forbiddenBottom = ['╋', '┃', '╻', '┏', '┓', '┣', '┳', '┫'];
export const forbiddenLeft = ['╋', '━', '╸', '┓', '┛', '┻', '┳', '┫'];

export const pipeVariations = [
  {
    pipe: '╋',
    directions: [true, true, true, true],
    nextRotate: '╋',
    img: './Images/pipe-cross.png',
  },
  {
    pipe: '┃',
    directions: [true, false, true, false],
    nextRotate: '━',
    img: './Images/pipe-vertical.png',
  },
  {
    pipe: '━',
    directions: [false, true, false, true],
    nextRotate: '┃',
    img: './Images/pipe-horizontal.png',
  },
  {
    pipe: '╹',
    directions: [true, false, false, false],
    nextRotate: '╺',
    img: './Images/pipe-end-top.png',
  },
  {
    pipe: '╺',
    directions: [false, true, false, false],
    nextRotate: '╻',
    img: './Images/pipe-end-right.png',
  },
  {
    pipe: '╻',
    directions: [false, false, true, false],
    nextRotate: '╸',
    img: './Images/pipe-end-bottom.png',
  },
  {
    pipe: '╸',
    directions: [false, false, false, true],
    nextRotate: '╹',
    img: './Images/pipe-end-left.png',
  },
  {
    pipe: '┗',
    directions: [true, true, false, false],
    nextRotate: '┏',
    img: './Images/pipe-top-right.png',
  },
  {
    pipe: '┏',
    directions: [false, true, true, false],
    nextRotate: '┓',
    img: './Images/pipe-right-bottom.png',
  },
  {
    pipe: '┓',
    directions: [false, false, true, true],
    nextRotate: '┛',
    img: './Images/pipe-bottom-left.png',
  },
  {
    pipe: '┛',
    directions: [true, false, false, true],
    nextRotate: '┗',
    img: './Images/pipe-left-top.png',
  },
  {
    pipe: '┻',
    directions: [true, true, false, true],
    nextRotate: '┣',
    img: './Images/pipe-T-top.png',
  },
  {
    pipe: '┣',
    directions: [true, true, true, false],
    nextRotate: '┳',
    img: './Images/pipe-T-right.png',
  },
  {
    pipe: '┳',
    directions: [false, true, true, true],
    nextRotate: '┫',
    img: './Images/pipe-T-bottom.png',
  },
  {
    pipe: '┫',
    directions: [true, false, true, true],
    nextRotate: '┻',
    img: './Images/pipe-T-left.png',
  },
];

type ButtonProps = {
  pipeField: PipeVariationsType[][],
  columns: number,
  rows: number,
}

export const buttons = [
  {
    name: 'Face Up',
    handleClick: ({ pipeField, columns, rows }: ButtonProps) => faceUpwards(pipeField, columns, rows),
  },
  {
    name: 'Border Cleanup',
    handleClick: ({ pipeField, columns, rows }: ButtonProps) => cleanBorders(pipeField, columns, rows),
  },
  {
    name: 'Connect Crosses',
    handleClick: ({ pipeField, columns, rows }: ButtonProps) => connectCrosses(pipeField, columns, rows),
  },
];
