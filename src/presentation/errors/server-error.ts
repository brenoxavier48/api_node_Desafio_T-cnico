export class ServerError extends Error {
  constructor (error: Error) {
    super('Internal Server Error')
    this.name = 'Internal Server Error' + error
  }
}
