export interface DataResponse {
  totalIssue: number
  totalTimeSpent: number
  items: Array<ItemResponse>
}

export interface ItemResponse {
  key: string
  issuetype: string
  priority: string
  summary: string
  reporter: Agent
  created: string
  assignee: Agent
  status: string
  timespent: number
}

export interface Agent {
  name: string
  email: string
  avatar: string
}