import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchOrdersByDate, updateOrderStatus } from '../services/api';

const styles = {
  container: { padding: '40px 12%', color: '#fff', background: 'var(--primary-bg)', minHeight: '100vh' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' },
  title: { fontFamily: '"Bebas Neue", cursive', fontSize: '3.5rem', margin: 0, color: 'var(--main-color)' },
  subtitle: { opacity: 0.7 },
  dateInput: { 
    background: 'var(--main-color)', 
    border: 'none', 
    color: '#ffffff', 
    padding: '12px 20px', 
    borderRadius: '6px', 
    outline: 'none', 
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontFamily: '"Bebas Neue", cursive',
    width: '220px',
    colorScheme: 'dark',
    boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
  },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' },
  statCard: { background: 'var(--secondary-bg)', padding: '25px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' },
  statNum: { fontSize: '2.5rem', color: 'var(--main-color)', fontFamily: '"Bebas Neue", cursive' },
  statLabel: { fontSize: '0.8rem', opacity: 0.6, marginTop: '10px', textTransform: 'uppercase' },
  listsContainer: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px', alignItems: 'start' },
  columnTitle: { fontFamily: '"Bebas Neue", cursive', fontSize: '2rem', marginBottom: '20px', color: 'var(--main-color)', borderBottom: '1px solid #333', paddingBottom: '10px' },
  orderCard: (status) => ({ 
    background: 'var(--secondary-bg)', 
    padding: '20px', 
    borderRadius: '10px', 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: '15px', 
    borderLeft: `6px solid ${status === 'delivered' ? '#4caf50' : 'var(--main-color)'}`,
    opacity: status === 'delivered' ? 0.7 : 1 
  }),
  customerInfo: { display: 'flex', flexDirection: 'column', gap: '4px' },
  customerName: { margin: 0 },
  itemsSummary: { margin: 0, fontSize: '0.9rem', color: '#bbb' },
  priceTag: { color: 'var(--main-color)', fontWeight: 'bold' },
  statusBtn: (status) => ({ 
    padding: '12px 24px', 
    borderRadius: '6px', 
    border: 'none', 
    cursor: 'pointer', 
    fontFamily: '"Bebas Neue", cursive', 
    fontSize: '1.1rem', 
    color: '#fff',
    background: status === 'delivered' ? '#333' : 'var(--main-color)'
  }),
  loadingText: { textAlign: 'center', opacity: 0.5 },
  emptyText: { opacity: 0.4, fontStyle: 'italic', fontSize: '0.9rem' }
};

const StatCard = ({ label, value }) => (
  <div style={styles.statCard}>
    <div style={styles.statNum}>{value}</div>
    <div style={styles.statLabel}>{label}</div>
  </div>
);

const Order = ({ order, onUpdate }) => (
  <div style={styles.orderCard(order.status)}>
    <div style={styles.customerInfo}>
      <h3 style={styles.customerName}>{order.customerName}</h3>
      <p style={styles.itemsSummary}>{order.itemsSummary}</p>
      <span style={styles.priceTag}>{order.total} ETB</span>
    </div>
    <button 
      onClick={() => onUpdate(order.id, order.status)}
      style={styles.statusBtn(order.status)}
    >
      {order.status === 'active' ? 'Mark Delivered' : 'Re-open'}
    </button>
  </div>
);

const OrderList = ({ title, orders, onUpdate, emptyMessage }) => (
  <div>
    <h2 style={styles.columnTitle}>{orders.length} {title}</h2>
    {orders.length > 0 ? (
      orders.map(o => (
        <Order key={o.id} order={o} onUpdate={onUpdate} />
      ))
    ) : (
      <p style={styles.emptyText}>{emptyMessage}</p>
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
    <div style={styles.container}>
      <style>
        {`
          input[type="date"]::-webkit-calendar-picker-indicator {
            filter: brightness(0) invert(1);
            cursor: pointer;
            transform: scale(1.2);
          }
        `}
      </style>

      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Kitchen Command</h1>
          <p style={styles.subtitle}>Orders for {selectedDate}</p>
        </div>
        <input 
          ref={dateInputRef}
          type="date" 
          value={selectedDate} 
          onChange={(e) => setSelectedDate(e.target.value)}
          onClick={() => dateInputRef.current?.showPicker()} 
          style={styles.dateInput} 
        />
      </header>

      <div style={styles.statsGrid}>
        <StatCard label="Daily Revenue" value={`${revenue.toLocaleString()} ETB`} />
        <StatCard label="Orders Done" value={`${deliveredOrders.length} / ${orders.length}`} />
      </div>

      {loading ? (
        <div style={styles.loadingText}>Syncing...</div>
      ) : (
        <div style={styles.listsContainer}>
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