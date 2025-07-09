import axios, { isAxiosError } from "axios";
import type { Difficulty } from "../types/difficulty";
import type { LetterResult } from "../types/letterResult";
import type { GameSession } from "../types/gameSession";
import { UnknownError } from "./wordleErrors";
import { throwCorrectError } from "./throwCorrectError";

const BASE_URL = "https://word-api-hmlg.vercel.app/api";

export const getDifficulties = async (): Promise<Difficulty[]> => {
  try {
    const res = await axios.get(`${BASE_URL}/difficulties`);
    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      throwCorrectError(err, "getDifficulties");
    }
    throw new UnknownError();
  }
};

export const getSession = async (difficultyId: string): Promise<GameSession> => {
  try {
    const res = await axios.get(`${BASE_URL}/difficulties/${difficultyId}`);
    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      throwCorrectError(err, "getSession");
    }
    throw new UnknownError();
  }
};

export const postCheckWord = async (sessionId: string, word: string): Promise<LetterResult[]> => {
  try {
    const res = await axios.post(`${BASE_URL}/checkWord`, {
      sessionId,
      word,
    });
    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      throwCorrectError(err, "postCheckWord");
    }
    throw new UnknownError();
  }
};