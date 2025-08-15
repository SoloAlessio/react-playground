import './App.css'
import {Toaster} from 'react-hot-toast'
import Footer from './components/footer'
import Navbar from './components/navBar'
import Home from './components/home'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './redux/store'
import ScrollToTop from './components/scrollToTop'
import Cart from './pages/cart'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Provider store={store}>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
            <Footer />
          </div>
        </Provider>
      </ScrollToTop>
      <Toaster position="bottom-center" />
    </BrowserRouter>
  )
}

export default App
