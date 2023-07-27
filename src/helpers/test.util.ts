export const sleep = (timeInMs: number) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(undefined), timeInMs);
  });
