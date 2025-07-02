import axios, { AxiosError } from "axios";
import type { Difficulty } from "../types/difficulty";
import type { LetterResult } from "../types/letterResult";
import type { GameSession } from "../types/gameSession";
import { throwCorrectException } from "./errorHandler";

const BASE_URL = "https://word-api-hmlg.vercel.app/api";

export const getDifficulties = async (): Promise<Difficulty[] | undefined> => {
    return axios.get(`${BASE_URL}/difficulties`)
        .then((res) => res.data)
        .catch((err) => {
            if (err instanceof AxiosError) {
                throwCorrectException(err);
            }
            return undefined;
        });
};

export const getSession = async (difficultyId: string): Promise<GameSession | undefined> => {
    return axios.get(`${BASE_URL}/difficulties/${difficultyId}`)
        .then((res) => res.data)
        .catch((err) => {
            if (err instanceof AxiosError) {
                throwCorrectException(err);
            }
            return undefined;
        });
};

export const checkWord = async (sessionId: string, word: string): Promise<LetterResult[] | undefined> => {
    return axios.post(`${BASE_URL}/checkWord`, {
        sessionId,
        word,
    })
        .then((res) => res.data)
        .catch((err) => {
            if (err instanceof AxiosError) {
                throwCorrectException(err);
            }
            return undefined;
        });
};