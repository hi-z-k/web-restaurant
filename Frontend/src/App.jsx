import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Checkout from './pages/Checkout';
import About from './components/About';

function App() {
  return (
    <div className="App">
      <Header />
      
      <main style={{ marginTop: '80px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;