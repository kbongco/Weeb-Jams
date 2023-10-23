import { useState } from 'react'
import Input from './Components/Input'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
  };

  return (
    <>
      <div>
        <p>Test</p>
        <Input
          label="Test"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
    </>
  )
}

export default App
