import { useState } from 'react';
import '../styles/PaginationContainer.css';

const PaginationContainer = ({ components, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const perPage = Number(itemsPerPage);
  const totalPages = Math.ceil(components.length / perPage);
  
  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const currentItems = components.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <div className="pagination-grid">
        {currentItems}
      </div>

      {totalPages > 1 && (
        <div className="pagination-controls">
          <button 
            className="pagination-btn" 
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
                className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
              >
                {pageNum}
              </button>
            );
          })}

          <button 
            className="pagination-btn"
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