const API_URL = 'http://localhost:5000';

const sendRequest = async (url, options = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

export const loginUser = async (email, password) => {
  return sendRequest(`${API_URL}/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

export const registerUser = async (userData) => {
  return sendRequest(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
};

export const checkEmailExists = async (email) => {
  const result = await sendRequest(`${API_URL}/users/${encodeURIComponent(email)}`, {
    method: 'POST'
  });
  return result.exists;
};

export const fetchMenu = () => {
  return sendRequest(`${API_URL}/menu`);
};

export const fetchOrdersByDate = (date) => {
  return sendRequest(`${API_URL}/orders?date=${date}`);
};

export const updateOrderStatus = (id, status) => {
  return sendRequest(`${API_URL}/orders/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
};

export const createOrder = (orderData) => {
  return sendRequest(`${API_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
};