import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const FormField = ({ label, name, type, placeholder, value, onChange, gridArea }) => {
  const fieldStyles = {
    group: { 
      marginBottom: '15px',
      gridArea: gridArea 
    },
    label: { 
      display: 'block', 
      marginBottom: '8px', 
      color: '#ccc', 
      fontSize: '0.85rem' 
    },
    input: {
      width: '100%',
      padding: '12px 15px',
      background: '#0a0a1a',
      border: '1px solid #333',
      borderRadius: '6px',
      color: '#fff',
      fontSize: '1rem',
      outline: 'none'
    }
  };

  return (
    <div style={fieldStyles.group}>
      <label style={fieldStyles.label}>{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        style={fieldStyles.input}
      />
    </div>
  );
};

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  
  const [formData, setFormData] = useState({
    firstName: '', 
    lastName: '', 
    email: '', 
    phone: '', 
    password: '',
    confirmPassword: ''
  });

  const styles = {
    container: { 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '90vh', 
      padding: '40px 20px' 
    },
    formBox: {
      background: 'var(--secondary-bg)',
      padding: '40px',
      borderRadius: '12px',
      width: '100%',
      maxWidth: isLogin ? '450px' : '650px',
      border: '1px solid rgba(255,255,255,0.05)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      transition: 'max-width 0.4s ease'
    },
    title: { 
      fontFamily: '"Bebas Neue", cursive', 
      fontSize: '2.5rem', 
      color: 'var(--main-color)', 
      textAlign: 'center', 
      marginBottom: '30px' 
    },
    gridContainer: {
      display: 'grid',
      gap: '10px 20px',
      gridTemplateColumns: isLogin ? '1fr' : '1fr 1fr'
    },
    btn: {
      width: '100%',
      padding: '15px',
      background: 'var(--main-color)',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      fontSize: '1.2rem',
      fontFamily: '"Bebas Neue", cursive',
      cursor: 'pointer',
      marginTop: '20px'
    },
    toggleContainer: { 
      marginTop: '20px', 
      textAlign: 'center', 
      fontSize: '0.9rem' 
    },
    toggleLink: { 
      color: 'var(--main-color)', 
      cursor: 'pointer', 
      marginLeft: '5px', 
      fontWeight: 'bold' 
    },
    toggleText: {
      color: '#aaa'
    }
  };

  const loginFields = [
    { label: 'Email Address', name: 'email', type: 'email', placeholder: 'abebe@example.com', gridArea: 'auto' },
    { label: 'Password', name: 'password', type: 'password', placeholder: '••••••••', gridArea: 'auto' }
  ];

  const registerFields = [
    { label: 'First Name', name: 'firstName', type: 'text', placeholder: 'Abebe' },
    { label: 'Last Name', name: 'lastName', type: 'text', placeholder: 'Bekele' },
    { label: 'Email Address', name: 'email', type: 'email', placeholder: 'abebe.b@example.com' },
    { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: '+251 911 00 00 00' },
    { label: 'Password', name: 'password', type: 'password', placeholder: '••••••••' },
    { label: 'Confirm Password', name: 'confirmPassword', type: 'password', placeholder: '••••••••' }
  ];

  const fields = isLogin ? loginFields : registerFields;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userData = {
      name: isLogin ? 'User' : `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone
    };
    
    login(userData);
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h2 style={styles.title}>{isLogin ? 'Login' : 'Register'}</h2>

        <form onSubmit={handleSubmit}>
          <div style={styles.gridContainer}>
            {fields.map((field) => (
              <FormField
                key={field.name}
                {...field}
                value={formData[field.name]}
                onChange={handleChange}
              />
            ))}
          </div>

          <button type="submit" style={styles.btn}>
            {isLogin ? 'Enter Account' : 'Create Account'}
          </button>
        </form>

        <div style={styles.toggleContainer}>
          <span style={styles.toggleText}>
            {isLogin ? "New here?" : "Joined us before?"}
          </span>
          <span style={styles.toggleLink} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Create an account' : 'Sign in here'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;