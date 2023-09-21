export const getStatus = (isWinner: boolean, isLost: boolean) => {
  if (isWinner) {
    return 'WIN';
  }

  if (isLost) {
    return 'LOST';
  }

  return 'PLAYING';
};
