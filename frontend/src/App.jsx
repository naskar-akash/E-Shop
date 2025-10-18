import { Outlet } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'

function App() {
  

  return (
    <div className='bg-gray-200 h-[100vh] flex flex-col'>
    <Navbar/>
    <main>
      <Outlet/>
    </main>
    <Footer/>
    </div>
  )
}

export default App
