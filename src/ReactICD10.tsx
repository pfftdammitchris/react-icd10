import React from 'react'
import useICD10 from './useICD10'
import './styles.css'

export interface ReactICD10Props {
  render: (args: any) => any
}

const ReactICD10: React.FC<ReactICD10Props> = ({ render }) => render(useICD10())

export default ReactICD10
