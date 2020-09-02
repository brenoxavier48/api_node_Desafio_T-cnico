import { Controller, HttpRequest } from "../../presentation/protocols";
import { Request, Response } from "express";

export const routeAdapter = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    const httpRequest: HttpRequest = {
      body: request.body
    }
    const httpResponse = await controller.handler(httpRequest)
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
