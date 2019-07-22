# react-icd10 (pending release)

> Search the International Classification of Diseases table for classifying diagnoses and reasons for visits in health care

[![NPM](https://img.shields.io/npm/v/react-icd10.svg)](https://www.npmjs.com/package/react-icd10)

## Install

```bash
# NPM
npm install --save react-icd10

# Yarn
yarn add react-icd10
```

## Usage

```jsx
import React from 'react'
import ReactICD10 from 'react-icd10'

const App = () => (
  <ReactICD10
    render={({ onChange, fetching, fetched, fetchError, data }) => (
      <div className='container'>
        <input onChange={onChange} type='text' placeholder='Search diagnosis' />
        <pre>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      </div>
    )}
  />
)

export default App
```

`data` is an object of results received from the query.

It takes on the following shape:

```ts
interface StateData {
  codes: string[]
  results: { [code: string]: ICD10Object }
  total: number
}
```

The `data.results` object is an object of key/values, where each key is an ICD10 `code` and its value is its corresponding _ICD10 object_.

An ICD10 object takes on the following shape:

```ts
interface ICD10Object {
  code?: string
  description?: string
  comment?: string
}
```

After the results are returned from the query, it will be attached to a local state.

The state--including the data from the query will be passed to the `render` prop.

Here is what `data` looks like in JSON:

![react-icd10 international classification of diseases library](https://pfftdammitchris-react.s3-us-west-1.amazonaws.com/react-icd10/icd10.jpg)

## Dependencies

- axios

## License

MIT © [pfftdammitchris](https://github.com/pfftdammitchris)
