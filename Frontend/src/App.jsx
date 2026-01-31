import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Checkout from './pages/Checkout';
import About from './components/About';
import Login from './pages/Login';
import Admin from './pages/Admin';

const AdminRoute = ({ children }) => {
  const { isAdmin, isLoggedIn } = useContext(AuthContext);
  return isLoggedIn && isAdmin ? children : <Navigate to="/" replace />;
};

function App() {
  const styles = {
    appContainer: { display: 'flex', flexDirection: 'column', minHeight: '100vh' },
    mainContent: { flex: 1, marginTop: '80px' }
  };

  return (
    <div className="App" style={styles.appContainer}>
      <Header />
      <main style={styles.mainContent}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;