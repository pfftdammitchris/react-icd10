export type Action =
  | { type: 'set-mounted'; mounted: boolean }
  | { type: 'fetching' }
  | { type: 'fetched'; results: StateData }
  | { type: 'fetch-failed'; error: any }
  | { type: 'no-results' }

export type ResponseData = [number, string[], any, any]

export interface State {
  mounted: boolean
  fetching: boolean
  fetched: boolean
  fetchError: any | null
  data: StateData
}

export interface StateData {
  codes: string[]
  results: { [code: string]: ICD10Object }
  total: number
}

export interface ICD10Object {
  code?: string
  description?: string
  comment?: string
}
