export interface HttpRequest {
  body?: any
}

export interface HttpResponse {
  statusCode: number
  body: any
}

export interface Controller {
  handler (httpRequest: HttpRequest): Promise<HttpResponse>
}

export interface Validator {
  isValid(data: any): boolean
}