import axios, { AxiosError } from "axios";
import type { Difficulty } from "../types/difficulty";
import type { LetterResult } from "../types/letterResult";
import type { GameSession } from "../types/gameSession";
import { throwCorrectException } from "./errorHandler";

const BASE_URL = "https://word-api-hmlg.vercel.app/api";

export const getDifficulties = async (): Promise<Difficulty[]> => {
    try {
        const res = await axios.get(`${BASE_URL}/difficulties`);
        return res.data;
    } catch (err) {
        if (err instanceof AxiosError) {
            throwCorrectException(err);
        }
        throw new Error("Error desconocido al obtener dificultades.");
    }
};

export const getSession = async (difficultyId: string): Promise<GameSession> => {
    try {
        const res = await axios.get(`${BASE_URL}/difficulties/${difficultyId}`);
        return res.data;
    } catch (err) {
        if (err instanceof AxiosError) {
            throwCorrectException(err);
        }
        throw new Error("Error desconocido al iniciar partida.");
    }
};

export const checkWord = async (sessionId: string, word: string): Promise<LetterResult[]> => {
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
        throw new Error("Error desconocido al validar palabra.");
    }
};