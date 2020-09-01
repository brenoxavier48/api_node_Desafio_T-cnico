export class MissingParamError extends Error {
  constructor (params: string) {
    super(`Missing params`)
    this.name = `Missing Param Error - It´s missing any theses params ${params}`
  }
}