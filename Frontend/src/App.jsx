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

function App() {
  const { user, isLoggedIn } = useContext(AuthContext);
  const isAdmin = isLoggedIn && user?.role === 'admin';

  const styles = {
    appContainer: { display: 'flex', flexDirection: 'column', minHeight: '100vh' },
    mainContent: { flex: 1, marginTop: '80px' }
  };

  return (
    <div className="App" style={styles.appContainer}>
      <Header />
      <main style={styles.mainContent}>
        <Routes>
          {isAdmin ? (
            <>
              <Route path="/admin" element={<Admin />} />
              <Route path="/" element={<Navigate to="/admin" replace />} />
              <Route path="/menu" element={<Navigate to="/admin" replace />} />
              <Route path="/checkout" element={<Navigate to="/admin" replace />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/checkout" element={isLoggedIn ? <Checkout /> : <Navigate to="/login" replace />} />              <Route path="/admin" element={<Navigate to="/login" replace />} />
              <Route path="/admin/menu" element={<Navigate to="/login" replace />} />
            </>
          )}

          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to={isAdmin ? "/admin" : "/"} replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;