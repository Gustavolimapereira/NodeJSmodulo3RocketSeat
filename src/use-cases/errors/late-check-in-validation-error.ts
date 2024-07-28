export class LateCheckinValidationError extends Error {
  constructor() {
    super("O check in não pode ser validade após 20 minutos de sua criação.");
  }
}
