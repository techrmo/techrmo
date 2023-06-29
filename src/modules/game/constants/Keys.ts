export const firstLineKeys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'] as const;
export const secondLineKeys = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '<'] as const;
export const thirdLineKeys = ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'ENTER'] as const;

export type Keys =
  typeof firstLineKeys[number] | typeof secondLineKeys[number] | typeof thirdLineKeys[number]
