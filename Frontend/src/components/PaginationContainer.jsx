import { useState } from 'react';

const PaginationContainer = ({ components, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const perPage = Number(itemsPerPage);
  const totalPages = Math.ceil(components.length / perPage);
  
  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const currentItems = components.slice(indexOfFirstItem, indexOfLastItem);

  const styles = {
    grid: {
      display: 'grid',
      gridTemplateColumns: `repeat(3, 1fr)`,
      gap: '30px',
      minHeight: '450px',
      alignItems: 'start'
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '40px',
      gap: '10px'
    },
    btn: {
      padding: '8px 16px',
      background: 'var(--secondary-bg)',
      color: '#fff',
      border: '1px solid var(--main-color)',
      cursor: 'pointer'
    },
    active: {
      background: 'var(--main-color)',
      color: '#fff',
      padding: '8px 16px',
      border: '1px solid var(--main-color)',
      fontWeight: 'bold',
      cursor: 'default'
    },
    disabled: {
      opacity: 0.5,
      cursor: 'not-allowed'
    }
  };

  return (
    <div>
      <div style={styles.grid}>
        {currentItems}
      </div>

      {totalPages > 1 && (
        <div style={styles.pagination}>
          <button 
            style={{...styles.btn, ...(currentPage === 1 ? styles.disabled : {})}} 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => {
            const pageNum = i + 1;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                style={currentPage === pageNum ? styles.active : styles.btn}
              >
                {pageNum}
              </button>
            );
          })}

          <button 
            style={{...styles.btn, ...(currentPage === totalPages ? styles.disabled : {})}} 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev - 1 + 2)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PaginationContainer;