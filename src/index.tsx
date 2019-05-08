import * as React from 'react'
import styles from './styles.css'

export interface Props {
  text: string
}

const ReactICD10 = (props: any) => {
  console.log(props)
  return <div className={styles.container}>ICD10</div>
}

export default ReactICD10
