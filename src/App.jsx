import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BTForm } from './BTForm/BTForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="description" tabIndex="1">
      <BTForm/>
    </div>
  )
}

export default App
