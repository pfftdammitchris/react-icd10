# react-icd10

> Search the International Classification of Diseases table

ICD-10-CM (International Classification of Diseases, 10th Revision, Clinical Modification) is a medical coding system for classifying diagnoses and reasons for visits in U.S. health care settings ([source](https://clinicaltables.nlm.nih.gov/apidoc/icd10cm/v3/doc.html))

[![NPM](https://img.shields.io/npm/v/react-icd10.svg)](https://www.npmjs.com/package/react-icd10)

## Install

```bash
# NPM
npm install --save react-icd10

# Yarn
yarn add react-icd10
```

You will need to have a react version that supports [react hooks](https://reactjs.org/docs/hooks-overview.html) (v16.6+) to use this library, or you will receive errors.

## Usage

To use the component version, import directly from `react-icd10`. The default export is a render prop component that exposes the necessary states to use on your interface, along with a few handy utilities:

```jsx
import React from 'react'
import ReactICD10 from 'react-icd10'

const App = () => (
   <ReactICD10
    render={({
      onSearch,
      fetching,
      fetched,
      fetchError,
      data,
      reset,
    }) => (
      <div className='container'>
        <input
          onChange={(e) => onSearch(e.target.value)}
          type='text'
          placeholder='Search diagnosis'
        />
      </div>
    )}
  />
)

export default App
```

You can limit the results returned by passing in a `limit` prop to the render component. For example, passing in a limit of 100 will return a maximum of 100 results:

```js
const App = () => (
   <ReactICD10
    limit={100}
    render={({
      onSearch,
      fetching,
      fetched,
      fetchError,
      data,
      reset,
    }) => (
      <div className='container'>
        <input
          onChange={(e) => onSearch(e.target.value)}
          type='text'
          placeholder='Search diagnosis'
        />
      </div>
    )}
  />
)
```

If you need an additional constraint to return results that *must* include a second keyword somewhere in each result, you can pass in `include` and your keyword to it:

```js
const App = () => (
   <ReactICD10
    include="medicine" // Will also take an array of strings 
    render={({
      onSearch,
      fetching,
      fetched,
      fetchError,
      data,
      reset,
    }) => (
      <div className='container'>
        <input
          onChange={(e) => onSearch(e.target.value)}
          type='text'
          placeholder='Search diagnosis'
        />
      </div>
    )}
  />
)
```

You can either use the render prop component version that is exported as default, but you can optionally use the react hook version instead which is basically the same flow:

```js
import React from 'react'
import { useICD10 } from 'react-icd10'

const App = () => {
  const { onSearch, ...rest } = useICD10({ limit: 7 })

  const onChange = (e) => {
    onSearch(e.target.value)
  }

  return (
    <div className='container'>
      <div className='content'>
        <pre>
          <code>{JSON.stringify(rest, null, 2)}</code>
        </pre>
        <div>
          <input
            onChange={onChange}
            type='text'
            placeholder='Search diagnosis'
          />
        </div>
      </div>
    </div>
  )
}

export default App
```

### Methods

#### `onSearch`: (keyword: string) => Promise<void>

`onSearch` will use your keyword to query for diagnoses. After the call has finished, `data` will be provided as arguments to the render prop. The data is an object that with this shape:

```ts
interface Data {
  codes: string[]
  results: { [code: string]: ICD10Object, ...others }
  total: number
}

interface ICD10Object {
  code?: string
  description?: string
  comment?: string
}
```

For those who would like to see it from a visual perspective:

![react-icd10 international classification of diseases library](https://pfftdammitchris-react.s3-us-west-1.amazonaws.com/react-icd10/icd10.jpg)

If an error occurred while fetching for the results, `fetchError` will be returned as an `Error` object as part of the render props.

`onSearch` is also optimized internally to avoid duplicate requests, so you can assure that users who are constantly typing for results won't be making mass amounts of requests in between.

#### `reset`: () => void

If you need to reset your results back to an empty state, you can call `reset`, provided from render props as well.

## Dependencies

- axios

## License

MIT © [pfftdammitchris](https://github.com/pfftdammitchris)
