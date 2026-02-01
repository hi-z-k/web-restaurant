import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { loginUser, registerUser, checkEmailExists } from '../services/api';
import '../styles/Login.css';

const FormField = ({ label, name, type, placeholder, value, onChange }) => (
  <div className="form-field-group">
    <label className="form-field-label">{label}</label>
    <input 
      name={name} 
      type={type} 
      placeholder={placeholder} 
      value={value} 
      onChange={onChange} 
      required 
      className="form-field-input" 
    />
  </div>
);

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: ''
  });

  const fields = isLogin 
    ? [
        { label: 'Email Address', name: 'email', type: 'email', placeholder: 'abebe@example.com' },
        { label: 'Password', name: 'password', type: 'password', placeholder: '••••••••' }
      ]
    : [
        { label: 'First Name', name: 'firstName', type: 'text', placeholder: 'Abebe' },
        { label: 'Last Name', name: 'lastName', type: 'text', placeholder: 'Bekele' },
        { label: 'Email Address', name: 'email', type: 'email', placeholder: 'abebe.b@example.com' },
        { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: '+251 911 00 00 00' },
        { label: 'Password', name: 'password', type: 'password', placeholder: '••••••••' },
        { label: 'Confirm Password', name: 'confirmPassword', type: 'password', placeholder: '••••••••' }
      ];

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const user = await loginUser(formData.email, formData.password);
        if (user) {
          login(user);
          navigate(user.role === 'admin' ? '/admin' : '/');
        } else {
          alert("Invalid email or password");
        }
      } else {
        if (formData.password !== formData.confirmPassword) return alert("Passwords mismatch");

        const exists = await checkEmailExists(formData.email);
        if (exists) return alert("Email already exists");

        const newUser = {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role: 'user'
        };

        const savedUser = await registerUser(newUser);
        login(savedUser);
        navigate('/');
      }
    } catch (err) {
      alert("Network error: Could not connect to authentication server");
    }
  };

  return (
    <div className="auth-container">
      <div className={`auth-form-box ${!isLogin ? 'register-mode' : ''}`}>
        <h2 className="auth-title">{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="auth-grid">
            {fields.map((f) => (
              <FormField key={f.name} {...f} value={formData[f.name]} onChange={handleChange} />
            ))}
          </div>
          <button type="submit" className="auth-btn">
            {isLogin ? 'Enter Account' : 'Create Account'}
          </button>
        </form>
        <div className="auth-toggle-container">
          <span className="auth-toggle-text">{isLogin ? "New here?" : "Joined us before?"}</span>
          <span className="auth-toggle-link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Create an account' : 'Sign in here'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;