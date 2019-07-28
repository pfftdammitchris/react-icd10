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
