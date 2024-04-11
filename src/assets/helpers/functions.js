export const getRandomNumber = (num) => {
  return Math.floor(Math.random() * num);
};

export const checkActivePlayer = (value,player) => {
  return value === player ? "activePlayer" : "";
};
