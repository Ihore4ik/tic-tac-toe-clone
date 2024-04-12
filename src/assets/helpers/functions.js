export const getRandomNumber = (num) => {
  return Math.floor(Math.random() * num) + 1;
};

export const wait = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
};
