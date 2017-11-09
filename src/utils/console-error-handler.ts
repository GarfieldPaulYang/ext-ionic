import { ErrorHandler } from '@angular/core';

export class ConsoleErrorHandler extends ErrorHandler {
  constructor() {
    super();
  }

  handleError(err: any): void {
    super.handleError(err);
  }
}