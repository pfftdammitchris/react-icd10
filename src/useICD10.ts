import { useEffect, useReducer } from 'react'
import axios from '../node_modules/axios/dist/axios'
import { Action, ResponseData, State } from './types'
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
  mounted: false,
  data: defaultDataState,
  ...defaultFetchState,
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'set-mounted':
      return { ...state, mounted: action.mounted }
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
    default:
      return state
  }
}

const search: (keyword: string) => Promise<any> = makeFetchICD10Request()

const useICD10 = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const onSearch = (keyword: string) => {
    if (keyword) {
      dispatch({ type: 'fetching' })
      search(keyword)
        .then((response: { data: ResponseData }) => {
          const parsedResults = parseResponse(response.data)
          if (parsedResults) {
            const { codes } = parsedResults
            if (codes && !codes.length) {
              return dispatch({ type: 'no-results' })
            }
            if (state.mounted) {
              dispatch({ type: 'fetched', results: parsedResults })
            }
          } else {
            dispatch({ type: 'no-results' })
          }
        })
        .catch((error) => {
          if (state.mounted && !axios.isCancel(error)) {
            dispatch({ type: 'fetch-failed', error })
          }
        })
    }
  }

  // Used to prevent review notes from opening when pressing enter
  const onChange = (e: React.SyntheticEvent) => {
    const { value } = e.target as typeof e.target & {
      value: string
    }
    if (value) onSearch(value)
  }

  // const stringify = (results) => (code: string) =>
  //   results[code] ? `${code}: ${results[code].toUpperCase()}` : ''

  useEffect(() => {
    dispatch({ type: 'set-mounted', mounted: true })
    return () => {
      dispatch({ type: 'set-mounted', mounted: false })
    }
  }, [])

  return {
    ...state,
    onSearch,
    onChange,
  }
}

export default useICD10

/*

  // This function will attempt to remove empty fields when adding new fields
  // It will also add an empty field when the user selects an item
  const onSelect = (selectedItem, downshift) => {
    let description
    const code = selectedItem
    if (code) {
      forEachField((field, index) => {
        const codeElem = document.querySelector(
          `input[name="diagnosis[${index}].code"]`,
        )
        const descriptionElem = document.querySelector(
          `input[name="diagnosis[${index}].description"]`,
        )
        if (codeElem && descriptionElem) {
          const _code = codeElem.value
          const _description = descriptionElem.value
          if (!_code && !_description) removeField(index)
        } else removeField(index)
      })
      description = state.data.results[code] || ''
      description = description.toUpperCase()
      pushField({ code, description, comment: '' })
      pushField({ code: '', description: '', comment: '' })
      downshift.clearSelection()
    }
  }
*/
