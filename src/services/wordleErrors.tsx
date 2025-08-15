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
    super("Error del servidor.");
  }
}

// Manjos de errores de la api, enn este caso, que la api este caida.
export class ApiDownError extends WordleError {
  constructor() {
    super("El servidor no responde.");
  }
}

export class UnknownError extends WordleError {
  constructor() {
    super(`Error desconocido.`);
  }
}