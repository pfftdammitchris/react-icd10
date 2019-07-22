import axios from '../node_modules/axios/dist/axios'
import { ResponseData } from './types'

// export const filterer = (
//   codes: string[],
//   results: { [code: string]: string },
//   inputValue = '',
// ) => (acc: string[] = [], code: string) => {
//   let shouldShow = false
//   const diagnosisResult = results[code] || ''
//   const hasInvalidChars = /^.*?(?=[\+\^#%&$\*:<>\?/\{\|\}\[\]\\\)\(]).*$/g.test(
//     inputValue,
//   )
//   if (hasInvalidChars) return acc
//   if (!inputValue) {
//     shouldShow = true
//   } else if (new RegExp(inputValue, 'i').test(diagnosisResult)) {
//     shouldShow = true
//   } else if (new RegExp(inputValue, 'i').test(code)) {
//     shouldShow = true
//   }
//   if (shouldShow) acc.push(code)
//   return acc
// }

// Supports cancelation of the previous onSearch request if a new onSearch is immediately invoked right after
export const makeFetchICD10Request = () => {
  let call: any
  return async (keyword: string): Promise<any> => {
    try {
      if (call) call.cancel()
      call = axios.CancelToken.source()
      return axios.get(
        `https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=code,name&terms=${keyword}`,
        { cancelToken: call.token },
      )
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
