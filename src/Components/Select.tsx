import React from 'react';
import styled from 'styled-components';

const ChibiSelectContainer = styled.div`
margin-top: 24px;
`

const ChibiSelect = styled.select`
width: 300px;
height: 30px;
`

export default function Select({ selectedOption, onChange, options}: any){
  return (
    <ChibiSelectContainer>
    <ChibiSelect value={selectedOption} onChange={onChange}>
      <option value="">Select an option</option>
      {options.map((option:any, index:number) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </ChibiSelect>
  </ChibiSelectContainer>
  )
};