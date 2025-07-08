import axios, { AxiosError } from "axios";
import type { Difficulty } from "../types/difficulty";
import type { LetterResult } from "../types/letterResult";
import type { GameSession } from "../types/gameSession";
import { throwCorrectException } from "./errorHandler";

const BASE_URL = "https://word-api-hmlg.vercel.app/api";

export const getDifficulties = async (): Promise<Difficulty[] | undefined> => {
    try {
        const res = await axios.get(`${BASE_URL}/difficulties`);
        return res.data;
    } catch (err) {
        if (err instanceof AxiosError) {
            throwCorrectException(err);
        }
        return undefined;
    }
};

export const getSession = async (difficultyId: string): Promise<GameSession | undefined> => {
    try {
        const res = await axios.get(`${BASE_URL}/difficulties/${difficultyId}`);
        return res.data;
    } catch (err) {
        if (err instanceof AxiosError) {
            throwCorrectException(err);
        }
        return undefined;
    }
};

export const checkWord = async (sessionId: string, word: string): Promise<LetterResult[] | undefined> => {
    try {
        const res = await axios.post(`${BASE_URL}/checkWord`, {
            sessionId,
            word,
        });
        return res.data;
    } catch (err) {
        if (err instanceof AxiosError) {
            throwCorrectException(err);
        }
        return undefined;
    }
};