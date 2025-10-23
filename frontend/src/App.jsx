import { Outlet } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'

function App() {
  

  return (
    <div className='bg-blue-100 flex flex-col justify-center'>
    <Navbar/>
    <main>
      <Outlet/>
    </main>
    <Footer/>
    </div>
  )
}

export default App
