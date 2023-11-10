import styled from 'styled-components';
import { SelectProps } from '../interfaces/component-interface'

const ChibiSelectContainer = styled.div`
margin-top: 24px;
`

const ChibiSelect = styled.select`
width: 300px;
height: 30px;
`

export default function Select({ selectedOption, onChange, options}: SelectProps){
  return (
    <ChibiSelectContainer>
    <ChibiSelect value={selectedOption} onChange={onChange}>
      <option value="">Select an option</option>
      {options.map((option:string[], index:number) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </ChibiSelect>
  </ChibiSelectContainer>
  )
}