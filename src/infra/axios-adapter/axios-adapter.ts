import axios, { AxiosInstance } from 'axios'
import { ApiAdapter, DataRequest } from '../../presentation/protocols'

export class AxiosAdapter implements ApiAdapter{
  private readonly api: AxiosInstance

  constructor (config: any) {
    this.api = axios.create(config)
  }

  async post (url: string, body: any): Promise<any> {
    const issuesInfo = await this.api.post(url, body)
    return issuesInfo.data
  }
}
