import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Motion from './componenets/Motion/Motion'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Motion></Motion>
    </>
  )
}

export default App
