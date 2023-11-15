export const range = (start: number, stop: number, step: number) => {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, i) => start + i * step
  );
};

export const boolean_range = (start: number, stop: number, step: number) => {
  let a = Array.from(
    { length: (stop - start) / step + 1 },
    (_, i) => start + i * step
  );
  return a.map((e) => false);
};
