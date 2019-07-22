# react-icd10 (pending release)

> Search the International Classification of Diseases table for classifying diagnoses and reasons for visits in health care

[![NPM](https://img.shields.io/npm/v/react-icd10.svg)](https://www.npmjs.com/package/react-icd10)

## Install

```bash
npm install --save react-icd10
```

## Usage

```jsx
import React from 'react'
import ReactICD10 from 'react-icd10'

const App = () => {
  return (
    <div className='container'>
      <div className='content'>
        <ReactICD10
          render={({ onChange, fetching, fetched, fetchError, data }) => (
            <div className='container'>
              <input
                onChange={onChange}
                type='text'
                placeholder='Search diagnosis'
              />
              <pre>
                <code>{JSON.stringify(data, null, 2)}</code>
              </pre>
            </div>
          )}
        />
      </div>
    </div>
  )
}

export default App
```

## License

MIT © [pfftdammitchris](https://github.com/pfftdammitchris)
