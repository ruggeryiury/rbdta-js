/**
 * An error that occurs throughout the `RBDTA-JS` package functionality.
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
