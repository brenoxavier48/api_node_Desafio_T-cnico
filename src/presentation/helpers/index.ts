import { HttpResponse } from '../protocols'

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: Error
  }
}