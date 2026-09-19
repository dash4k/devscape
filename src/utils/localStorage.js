export const getThemeState = () => {
  return localStorage.getItem('theme');
};

export const putThemeState = (themeState) => {
  return localStorage.setItem('theme', themeState);
};
