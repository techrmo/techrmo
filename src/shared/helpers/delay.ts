export const delay = (time: number): Promise<'delay_finished'> => new Promise((resolve) => {
  setTimeout(() => resolve('delay_finished'), time);
});
