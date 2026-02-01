import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchOrdersByDate, updateOrderStatus } from '../services/api.js';
import '../styles/Admin.css';

const StatCard = ({ label, value }) => (
  <div className="admin-stat-card">
    <div className="admin-stat-num">{value}</div>
    <div className="admin-stat-label">{label}</div>
  </div>
);

const Order = ({ order, onUpdate }) => (
  <div className={`admin-order-card ${order.status === 'delivered' ? 'is-delivered' : ''}`}>
    <div className="admin-customer-info">
      <h3 className="admin-customer-name">{order.customerName}</h3>
      <p className="admin-items-summary">{order.itemsSummary}</p>
      <span className="admin-price-tag">{order.total} ETB</span>
    </div>
    <button 
      onClick={() => onUpdate(order.id, order.status)}
      className={`admin-status-btn ${order.status === 'delivered' ? 'is-delivered' : ''}`}
    >
      {order.status === 'active' ? 'Mark Delivered' : 'Re-open'}
    </button>
  </div>
);

const OrderList = ({ title, orders, onUpdate, emptyMessage }) => (
  <div>
    <h2 className="admin-column-title">{orders.length} {title}</h2>
    {orders.length > 0 ? (
      orders.map(o => (
        <Order key={o.id} order={o} onUpdate={onUpdate} />
      ))
    ) : (
      <p className="admin-empty-text">{emptyMessage}</p>
    )}
  </div>
);

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);
  const dateInputRef = useRef(null);

  const loadOrders = useCallback(async (showLoading = false) => {
    if (showLoading) setLoading(true);
    const cleanDate = selectedDate.replace(/-/g, '');
    try {
      const data = await fetchOrdersByDate(cleanDate);
      setOrders(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [selectedDate]);

  useEffect(() => {
    loadOrders(true);
  }, [loadOrders]);

  useEffect(() => {
    const interval = setInterval(() => loadOrders(false), 15000);
    return () => clearInterval(interval);
  }, [loadOrders]);

  const handleUpdateStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'delivered' : 'active';
    try {
      await updateOrderStatus(id, newStatus);
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
    } catch (err) {
      alert("Sync failed");
    }
  };

  const activeOrders = orders.filter(o => o.status === 'active');
  const deliveredOrders = orders.filter(o => o.status === 'delivered');
  const revenue = deliveredOrders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div>
          <h1 className="admin-title">Kitchen Command</h1>
          <p className="admin-subtitle">Orders for {selectedDate}</p>
        </div>
        <input 
          ref={dateInputRef}
          type="date" 
          value={selectedDate} 
          onChange={(e) => setSelectedDate(e.target.value)}
          onClick={() => dateInputRef.current?.showPicker()} 
          className="admin-date-input" 
        />
      </header>

      <div className="admin-stats-grid">
        <StatCard label="Daily Revenue" value={`${revenue.toLocaleString()} ETB`} />
        <StatCard label="Orders Done" value={`${deliveredOrders.length} / ${orders.length}`} />
      </div>

      {loading ? (
        <div className="admin-loading-text">Syncing...</div>
      ) : (
        <div className="admin-lists-container">
          <OrderList 
            title="Active Orders" 
            orders={activeOrders} 
            onUpdate={handleUpdateStatus} 
            emptyMessage="No pending orders." 
          />
          <OrderList 
            title="delivered" 
            orders={deliveredOrders} 
            onUpdate={handleUpdateStatus} 
            emptyMessage="Nothing delivered yet." 
          />
        </div>
      )}
    </div>
  );
};

export default Admin;