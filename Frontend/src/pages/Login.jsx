import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { loginUser, registerUser, checkEmailExists } from '../services/api';

const FormField = ({ label, name, type, placeholder, value, onChange, error }) => {
  const fieldStyles = {
    group: { marginBottom: '15px' },
    label: { display: 'block', marginBottom: '8px', color: error ? '#ff4d4d' : '#ccc', fontSize: '0.85rem' },
    input: {
      width: '100%', padding: '12px 15px', background: '#0a0a1a', 
      border: error ? '2px solid #ff4d4d' : '1px solid #333',
      borderRadius: '6px', color: '#fff', fontSize: '1rem', outline: 'none',
      transition: 'border-color 0.3s'
    },
    errorText: { color: '#ff4d4d', fontSize: '0.75rem', marginTop: '5px', fontWeight: '500' }
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
      {error && <span style={fieldStyles.errorText}>{error}</span>}
    </div>
  );
};

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: ''
  });

  const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh', padding: '40px 20px' },
    formBox: {
      background: 'var(--secondary-bg)', padding: '40px', borderRadius: '12px', width: '100%',
      maxWidth: isLogin ? '450px' : '650px', border: '1px solid rgba(255,255,255,0.05)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)', transition: 'max-width 0.4s ease'
    },
    title: { fontFamily: '"Bebas Neue", cursive', fontSize: '2.5rem', color: 'var(--main-color)', textAlign: 'center', marginBottom: '30px' },
    gridContainer: { display: 'grid', gap: '10px 20px', gridTemplateColumns: isLogin ? '1fr' : '1fr 1fr' },
    btn: {
      width: '100%', padding: '15px', background: 'var(--main-color)', color: '#fff',
      border: 'none', borderRadius: '6px', fontSize: '1.2rem', fontFamily: '"Bebas Neue", cursive',
      cursor: 'pointer', marginTop: '20px'
    },
    toggleContainer: { marginTop: '20px', textAlign: 'center', fontSize: '0.9rem' },
    toggleLink: { color: 'var(--main-color)', cursor: 'pointer', marginLeft: '5px', fontWeight: 'bold' },
    toggleText: { color: '#aaa' }
  };

  const fields = isLogin 
    ? [
        { label: 'Email Address', name: 'email', type: 'email', placeholder: 'abebe@example.com' },
        { label: 'Password', name: 'password', type: 'password', placeholder: '••••••••' }
      ]
    : [
        { label: 'First Name', name: 'firstName', type: 'text', placeholder: 'Abebe' },
        { label: 'Last Name', name: 'lastName', type: 'text', placeholder: 'Bekele' },
        { label: 'Email Address', name: 'email', type: 'email', placeholder: 'abebe.b@example.com' },
        { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: '0911000000' },
        { label: 'Password', name: 'password', type: 'password', placeholder: '••••••••' },
        { label: 'Confirm Password', name: 'confirmPassword', type: 'password', placeholder: '••••••••' }
      ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors(prev => {
        const newErrs = { ...prev };
        delete newErrs[e.target.name];
        return newErrs;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const newErrors = {};

    if (!isLogin) {
      if (formData.phone.length < 10) {
        newErrors.phone = "Enter a valid 10-digit phone number";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
    }

    try {
      const emailExists = await checkEmailExists(formData.email);

      if (isLogin) {
        if (!emailExists) {
          return setErrors({ email: 'No account found with this email' });
        }
        
        const user = await loginUser(formData.email, formData.password);
        if (user) {
          login(user);
          navigate(user.role === 'admin' ? '/admin' : '/');
        } else {
          setErrors({ password: 'Incorrect password' });
        }
      } else {
        if (emailExists) {
          return setErrors({ email: 'This email is already registered' });
        }

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
      if (err.message?.includes('401')) {
        setErrors({ password: 'Incorrect password' });
      } else {
        alert("Connection error. Please check your server.");
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h2 style={styles.title}>{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.gridContainer}>
            {fields.map((f) => (
              <FormField 
                key={f.name} 
                {...f} 
                value={formData[f.name]} 
                onChange={handleChange} 
                error={errors[f.name]}
              />
            ))}
          </div>
          <button type="submit" style={styles.btn}>
            {isLogin ? 'Enter Account' : 'Create Account'}
          </button>
        </form>
        <div style={styles.toggleContainer}>
          <span style={styles.toggleText}>{isLogin ? "New here?" : "Joined us before?"}</span>
          <span style={styles.toggleLink} onClick={() => { setIsLogin(!isLogin); setErrors({}); }}>
            {isLogin ? 'Create an account' : 'Sign in here'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;