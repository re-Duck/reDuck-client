/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{js,ts,jsx,tsx}'];
export const theme = {
  colors: {
    'white': '#ffffff',
    'black': '#030712',
    'yello-scale': {
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
  },
};
export const plugins = [];
