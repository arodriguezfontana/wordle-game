import { AxiosError } from "axios";

export function throwCorrectException(error: AxiosError): void {
  const status = error.response?.status;

  switch (status) {
    case 400:
      throw new Error("400");
    case 404:
      throw new Error("404");
    case 500:
      throw new Error("500");
    default:
      throw new Error("default");
  };
};