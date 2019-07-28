import React from 'react'
import useICD10 from './useICD10'
import './styles.css'

export interface ReactICD10Props {
  render: (args: any) => React.ReactNode
}

const ReactICD10 = ({ render, ...rest }: ReactICD10Props) =>
  render(useICD10(rest))

export default ReactICD10
