import { AxiosError } from "axios";
import { InvalidWordError, SessionNotFoundError, ServerError, UnknownError, ApiDownError } from "./wordleErrors";

export const throwCorrectError = (
    error: AxiosError,
    context: "getDifficulties" | "getSession" | "postCheckWord" ): never => {
    
    if (!error.response) {
        throw new ApiDownError();
    }
    
    const status = error.response.status;

    switch (context) {
        case "getDifficulties":
            if (status === 500) throw new ServerError();
            break;

        case "getSession":
            switch (status) {
                case 404:
                    throw new SessionNotFoundError();
                case 500:
                    throw new ServerError();
            }
            break;

        case "postCheckWord":
            switch (status) {
                case 400:
                    throw new InvalidWordError();
                case 404:
                    throw new SessionNotFoundError();
                case 500:
                    throw new ServerError();
            }
            break;
    };
    throw new UnknownError();
};