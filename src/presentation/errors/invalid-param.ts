export class InvalidParamError extends Error {
  constructor (paramName: string) {
    super('Invalid Param Error')
    this.name = `Invalid Param: ${paramName}`
  }
}