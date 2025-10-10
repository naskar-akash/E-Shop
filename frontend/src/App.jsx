import { Outlet } from 'react-router-dom'
import Navbar from './Components/Navbar'

function App() {
  

  return (
    <div className='bg-gray-200 h-[100%]'>
    <Navbar/>
    <main>
      <Outlet/>
    </main>
    </div>
  )
}

export default App
