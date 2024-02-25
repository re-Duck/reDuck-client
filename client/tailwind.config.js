/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{js,ts,jsx,tsx}'];
export const theme = {
  extends: {},
  colors: {
    'white': '#ffffff',
    'black': '#030712',
    'yellow-scale': {
      50: '#FFFCE5',
      100: '#FFF8CC',
      200: '#FFF199',
      300: '#FFEB66',
      400: '#FFE433',
      500: '#FFDD00',
      600: '#CCB100',
      700: '#998500',
      800: '#665800',
      900: '#332C00',
      950: '#1A1600',
    },
    'blue-gray-scale': {
      50: '#ECECEF',
      100: '#D8D8DF',
      200: '#AEAEBC',
      300: '#87879B',
      400: '#616175',
      500: '#40404D',
      600: '#33333D',
      700: '#27272F',
      800: '#19191F',
      900: '#0E0E11',
      950: '#242424',
    },
    'gray-scale': {
      50: '#FDFDFD',
      100: '#FAFAFA',
      200: '#F7F7F7',
      300: '#F1F1F1',
      400: '#E3E3E3',
      500: '#BFBFBF',
      600: '#A1A1A1',
      700: '#787878',
      800: '#646464',
      900: '#454545',
      950: '#242424',
    },
    'red-scale': {
      500: '#F2415A',
      600: '#E5102E',
    },
    'green-scale': {
      600: '#1F9854',
    },
  },
  fontFamily: {
    pilseoung: ['Pilseung_Gothic'],
  },
  fontSize: {
    caption2: [
      '0.625rem',
      {
        lineHeight: '130%',
        letterSpacing: '-0.02em',
      },
    ],
    caption1: [
      '0.75rem',
      {
        lineHeight: '130%',
        letterSpacing: '-0.02em',
      },
    ],
    body3: [
      '0.875rem',
      {
        lineHeight: '160%',
        letterSpacing: '-0.02em',
      },
    ],
    body2: [
      '1rem',
      {
        lineHeight: '160%',
        letterSpacing: '-0.02em',
      },
    ],
    body1: [
      '1.125rem',
      {
        lineHeight: '160%',
        letterSpacing: '-0.02em',
      },
    ],
    headline6: [
      '1.25rem',
      {
        lineHeight: '150%',
        letterSpacing: '-0.02em',
      },
    ],
    headline5: [
      '1.5rem',
      {
        lineHeight: '150%',
        letterSpacing: '-0.02em',
      },
    ],
    headline4: [
      '2rem',
      {
        lineHeight: '150%',
        letterSpacing: '-0.02em',
      },
    ],
    headline3: [
      '2.5rem',
      {
        lineHeight: '150%',
        letterSpacing: '-0.02em',
      },
    ],
    headline2: [
      '3rem',
      {
        lineHeight: '150%',
        letterSpacing: '-0.02em',
      },
    ],
    headline1: [
      '3.75rem',
      {
        lineHeight: '150%',
        letterSpacing: '-0.02em',
      },
    ],
  },
};
export const plugins = [];
