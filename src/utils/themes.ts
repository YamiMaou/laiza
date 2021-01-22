import { lightTheme, darkTheme } from '~/renderer/constants/themes';

export const getTheme = (name: string) => {
  if (name === 'laiza-light') return lightTheme;
  else if (name === 'laiza-dark') return darkTheme;
  return lightTheme;
};
