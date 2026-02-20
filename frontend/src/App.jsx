import { useState } from 'react'
import './index.css'
import Login from './pages/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div >
        <Login></Login>
    </div>
  )
}

export default App
