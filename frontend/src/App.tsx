import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navbar } from './components/Navbar'
import { CartPage } from './components/CartPage'
import { Footer } from './components/Footer'
import { MenuSection } from './components/Menu-section'
import { Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
    <Navbar></Navbar>
    <Routes>
      <Route path='/menu' element={<MenuSection></MenuSection>}></Route>
      <Route path='/history' element={<CartPage></CartPage>}></Route>

    </Routes>
    
    
    <Footer></Footer>
    </>
  )
}

export default App
