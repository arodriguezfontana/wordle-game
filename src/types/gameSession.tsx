import type { Difficulty } from "./difficulty";

export type GameSession = {
  sessionId: string;
  difficulty: Difficulty;
  wordLenght: number;
};