import { AxiosError } from "axios";

export function throwCorrectException(error: AxiosError): void {
  const status = error.response?.status;

  switch (status) {
    case 400:
      throw new Error("...");
    case 404:
      throw new Error("...");
    case 500:
      throw new Error("...");
    default:
      throw new Error("...");
  };
};