export class WordleError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class InvalidWordError extends WordleError {
  constructor() {
    super("La palabra enviada no es válida.");
  }
}

export class SessionNotFoundError extends WordleError {
  constructor() {
    super("La sesión no existe.");
  }
}

export class ServerError extends WordleError {
  constructor() {
    super(`Error del servidor.`);
  }
}

export class UnknownError extends WordleError {
  constructor() {
    super(`Error desconocido.`);
  }
}