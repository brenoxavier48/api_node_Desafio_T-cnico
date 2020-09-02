import { AxiosAdapter } from './axios-adapter/axios-adapter'
import { DataRequest } from '../presentation/protocols'

export class JiraConsult {
  private readonly axiosAdapter: AxiosAdapter

  constructor (axiosAdapter: AxiosAdapter) {
    this.axiosAdapter = axiosAdapter
  }

  async request (data: DataRequest): Promise<any> {
    const body = {
      expand: [],
      fields: ['issuetype', 'priority', 'summary', 'reporter', 'created', 'assignee', 'status', 'timespent', 'timetracking'],
      jql: `project = SD AND Organizations = '${data.organizationCod}' AND worklogDate >= '${data.initialDate}' AND worklogDate <= '${data.finalDate}'`,
      fieldsByKeys: true,
      maxResults: 1000,
      startAt: 0
    }

    const dataResult = await this.axiosAdapter.post('/rest/api/3/search', body)
    return dataResult
  }

  hlandeData (dataResult: any) {

  }
}




