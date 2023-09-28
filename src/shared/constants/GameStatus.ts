export const GAME_STATUS = Object.freeze(['WIN', 'LOST', 'PLAYING'] as const);

export type GameStatus = (typeof GAME_STATUS)[number];
