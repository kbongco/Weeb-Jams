import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { InputProps } from '../interfaces/component-interface';

const ChibiInputContainer = styled.div`
display: flex;
flex-direction: column;
margin-bottom: 16px
`
const ChibiInputLabel = styled.div`
margin-bottom: 16px;
font-weight: bold;
text-align: left;
`

const ChibiInputField = styled.input`
padding: 16px;
border: 1px solid black;
border-radius: 10px;
`

export default function Input({ label, value, onChange }: InputProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    onChange(newVal);
  }
  return (
    <ChibiInputContainer>
      <ChibiInputLabel>{label}</ChibiInputLabel>
      <ChibiInputField
        type='text'
        value={value}
        onChange={handleInputChange}
      />
    </ChibiInputContainer>
  )
}