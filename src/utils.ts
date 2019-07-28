import axios from '../node_modules/axios/dist/axios'
import { FetchParams, ResponseData } from './types'

const url = 'https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search'

export const isFunction = (v: any): boolean => typeof v === 'function'
export const isString = (v: any): boolean => typeof v === 'string'
export const isArray = (v: any): boolean => Array.isArray(v)

export const getSearchFields = (params: FetchParams): string => {
  const defaultFields = 'code,name'
  if (!params) return defaultFields
  if (!params.fields) return defaultFields
  if (params.fields) {
    if (typeof params.fields === 'string') return params.fields
    if (Array.isArray(params.fields)) return params.fields.join()
  }
  return defaultFields
}

// Supports cancelation of the previous onSearch request if a new onSearch is immediately invoked right after
export const makeFetchICD10Request = (params: FetchParams = {}) => {
  let call: any
  const { limit = 7 } = params
  const queryParams: {
    maxList: number
    sf: string
    terms: string
    q?: string
  } = {
    maxList: limit,
    sf: getSearchFields(params),
    terms: '',
  }
  return async (keyword: string, include?: string): Promise<any> => {
    try {
      if (call) call.cancel()
      call = axios.CancelToken.source()
      queryParams.terms = keyword
      if (include) queryParams.q = include
      const options = { cancelToken: call.token, params: queryParams }
      return axios.get(url, options)
    } catch (error) {
      throw error
    }
  }
}

export const parseResponse = (data: ResponseData) => {
  if (data) {
    const reducer = (
      acc: { [code: string]: string },
      [code, description]: [string, string],
    ) => {
      if (!acc.hasOwnProperty(code)) acc[code] = description
      return acc
    }
    const [totalResults, codes, _, codesAndNames] = data
    return {
      total: totalResults,
      results: codesAndNames.reduce(reducer, {}),
      codes,
    }
  }
  return
}
