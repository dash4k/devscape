export const pickRandomFromList = (list, count = 3) => {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0 ; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], [copy[j]]] = [copy[j], [copy[i]]];
  }
  return copy.slice(0, count);
};

export const toTitleCase = (str) => {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
