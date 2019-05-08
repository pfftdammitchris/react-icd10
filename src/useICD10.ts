import * as React from 'react'
import axios from 'axios'
import { CodeDescription } from './typings'

const { useState, useEffect, useReducer } = React

const parseResponse = (data: any[]) => {
  if (data) {
    const [totalResults, codes, _, codesAndNames] = data
    return {
      total: totalResults,
      results: codesAndNames.reduce(
        (acc, [code, description]: CodeDescription) => {
          if (!acc.hasOwnProperty(code)) acc[code] = description
          return acc
        },
        {},
      ),
      codes,
    }
  }
}

// Supports cancelation of the previous onSearch request if a new onSearch is immediately invoked right after
const icd10Req = (token: string, options: any) => {
  let call: any
  return async (keyword: string) => {
    try {
      if (call) call.cancel()
      call = axios.CancelToken.source()

      return axios.get(
        'https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search',
        { cancelToken: call.token },
      )
    } catch (error) {
      throw error
    }
  }
}

const initialState = {
  codes: [],
  results: {},
  total: 0,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'fetching':
      return { ...state, fetching: true }
    case 'fetched':
      return {
        ...state,
        fetching: false,
        fetched: true,
        data: {
          codes: action.results.codes,
          results: action.results.results,
          total: action.results.total,
        },
      }
    case 'fetch-failed':
      return {
        ...state,
        fetching: false,
        fetched: false,
        fetchError: action.error,
      }
    case 'no-results':
      return { ...state, fetching: false }
    default:
      return state
  }
}

const useICD10 = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const stringify = (results: any) => (code: string) =>
    results[code] ? `${code}: ${results[code].toUpperCase()}` : ''

  return {
    ...state,
  }
}

export default useICD10
