export class BaseError implements Error {
  message: string;
  name: string;
  stack: string;

  constructor(message: string, stackTrace?: string) {
    this.message = message;

    if (stackTrace == null) {
      this.stack = "";
    } else {
      this.stack = stackTrace;
    }
  }
}

export class MissingParamsError extends BaseError {
  constructor(message: string, stackTrace?: string) {
    super(message, stackTrace);
  }
}

export class UnableToCreateError extends BaseError {
  constructor(message: string, stackTrace?: string) {
    super(message, stackTrace);
  }
}

export class PasswordMismatchError extends BaseError {
  constructor(message: string, stackTrace?: string) {
    super(message, stackTrace);
  }
}

export class RecordNotFoundError extends BaseError {
  constructor(message: string, stackTrace?: string) {
    super(message, stackTrace);
  }
}

export class DBQueryFailedError extends BaseError {
  constructor(message: string, stackTrace?: string) {
    super(message, stackTrace);
  }
}

export class InternalError extends BaseError {
  constructor(message: string, stackTrace?: string) {
    super(message, stackTrace);
  }
}
