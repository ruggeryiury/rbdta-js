/**
 * A generic error that occurs throughout the `RBDTA-JS` package functionality.
 * - - - -
 */
export class RBDTAJSError extends Error {
  /**
   * @param {string} message The message you want to display.
   */
  constructor(message: string) {
    super(message)
    this.name = 'RBDTAError'
    Error.captureStackTrace(this, RBDTAJSError)
    Object.setPrototypeOf(this, RBDTAJSError.prototype)
  }
}

/**
 * An error that occurs when the user tries to parse incomplete information through the `SongsDTA` class,
 * which requires complete DTA information.
 * - - - -
 */
export class WrongDTATypeError extends Error {
  /**
   * @param {string} message The message you want to display.
   */
  constructor(message: string) {
    super(message)
    this.name = 'WrongDTATypeError'
    Error.captureStackTrace(this, WrongDTATypeError)
    Object.setPrototypeOf(this, WrongDTATypeError.prototype)
  }
}
