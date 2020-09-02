import { AxiosAdapter } from './axios-adapter/axios-adapter'
import { DataRequest, DataResponse, ItemResponse } from '../presentation/protocols'

export class JiraConsult {
  private readonly axiosAdapter: AxiosAdapter

  constructor (axiosAdapter: AxiosAdapter) {
    this.axiosAdapter = axiosAdapter
  }

  async request (data: DataRequest): Promise<DataResponse> {
    let body = {
      expand: [],
      fields: ['timespent'],
      jql: `project = SD AND Organizations = '${data.organizationCod}' AND worklogDate >= '${data.initialDate}' AND worklogDate <= '${data.finalDate}'`,
      fieldsByKeys: true,
      maxResults: 1,
      startAt: 0
    }

    const totalIssues = await this.axiosAdapter.post('/rest/api/3/search', body)

    body.fields = ['issuetype', 'priority', 'summary', 'reporter', 'created', 'assignee', 'status', 'timespent', 'timetracking']
    body.maxResults = totalIssues.total

    const dataResult = await this.axiosAdapter.post('/rest/api/3/search', body)

    const processedData = this.handleData(dataResult)

    return processedData
  }

  handleData (dataResult: any): DataResponse {
    const { total, issues } = dataResult
    let dataResponse: DataResponse = {
      totalIssue: Number(total),
      totalTimeSpent: 0,
      items: []
    }

    const filteredIssues = issues.filter((issue: any) => issue.fields.timespent > 0)
    
    const processedIssues = filteredIssues.map((issue: any) => {
      const { key, fields } = issue

      dataResponse.totalTimeSpent += Number(fields.timespent)

      let processedIssue = <ItemResponse>{}

      processedIssue.key = String(key)
      processedIssue.issuetype = String(fields.issuetype.name)
      processedIssue.priority = String(fields.priority.name)
      processedIssue.summary = String(fields.summary)
      processedIssue.reporter = {
        name: String(fields.reporter.displayName),
        email: String(fields.reporter.emailAddress),
        avatar: String(fields.reporter.avatarUrls['48x48'])
      }
      processedIssue.created = String(fields.created)
      processedIssue.status = String(fields.status.name)
      processedIssue.timespent = Number(fields.timespent)

      if ( fields.assignee ) {
        processedIssue.assignee = {
          name: String(fields.assignee.displayName),
          email: String(fields.assignee.emailAddress),
          avatar: String(fields.assignee.avatarUrls['48x48'])
        }
      } else {
        processedIssue.assignee = {
          name: 'No one designated',
          email: 'No one designated',
          avatar: 'No one designated'
        }
      }
      return processedIssue
    })
    dataResponse.items = processedIssues
    return dataResponse
  }
}




