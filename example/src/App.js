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
