import './App.css'
import { Navbar } from './components/Navbar'
import { CartPage } from './components/CartPage'
import { Footer } from './components/Footer'
import { MenuSection } from './components/Menu-section'
import { CheckoutPage } from './components/CheckoutPage'
import { OrderHistoryPage } from './components/OrderHistoryPage'
import { Toaster } from './components/ui/toast'
import { Route, Routes } from 'react-router-dom'

function App() {
  // No authentication required for any routes

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path='/menu' element={<MenuSection />} />
          <Route path='/' element={<MenuSection />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/history' element={<OrderHistoryPage />} />
        </Routes>
      </main>
      <Footer />
      <Toaster />
    </>
  )
}

export default App
