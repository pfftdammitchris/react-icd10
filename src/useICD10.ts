import { useEffect, useReducer, useState } from 'react'
import axios from '../node_modules/axios/dist/axios'
import { Action, ResponseData, State, UseICD10Args } from './types'
import { makeFetchICD10Request, parseResponse } from './utils'

const defaultFetchState = {
  fetching: false,
  fetched: false,
  fetchError: null,
}

const defaultDataState = {
  codes: [],
  results: {},
  total: 0,
}

const initialState: State = {
  data: defaultDataState,
  ...defaultFetchState,
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'fetching':
      return {
        ...state,
        ...defaultFetchState,
        data: state.data,
        fetching: true,
      }
    case 'fetched':
      return {
        ...state,
        ...defaultFetchState,
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
        ...defaultFetchState,
        data: state.data,
        fetchError: action.error,
      }
    case 'no-results':
      return { ...state, ...defaultFetchState, ...defaultDataState }
    case 'reset':
      return { ...state, ...defaultDataState }
    default:
      return state
  }
}

const useICD10 = (params: UseICD10Args) => {
  const [mounted, setMounted] = useState(false)
  const [state, dispatch] = useReducer(reducer, initialState)

  const search: (keyword: string) => Promise<any> = makeFetchICD10Request(
    params,
  )

  const onSearch = (keyword: string) => {
    if (keyword) {
      if (!state.fetching) dispatch({ type: 'fetching' })
      search(keyword)
        .then((response: { data: ResponseData }) => {
          const parsedResults = parseResponse(response.data)
          if (parsedResults) {
            // if (codes && !codes.length) return dispatch({ type: 'no-results' })
            if (mounted) dispatch({ type: 'fetched', results: parsedResults })
          } else dispatch({ type: 'no-results' })
        })
        .catch((error) => {
          console.error(error)
          if (mounted && !axios.isCancel(error)) {
            dispatch({ type: 'fetch-failed', error })
          }
        })
    }
  }

  const reset = () => {
    dispatch({ type: 'reset' })
  }

  // const stringify = (results) => (code: string) =>
  //   results[code] ? `${code}: ${results[code].toUpperCase()}` : ''

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  return {
    ...state,
    onSearch,
    reset,
  }
}

export default useICD10
