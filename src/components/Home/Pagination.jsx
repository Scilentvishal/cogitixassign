// src/components/Pagination.js

import React from 'react';

const Pagination = ({ page, setPage, totalPages }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const totalPagesToShow = 3;
    let startPage = Math.max(1, page - Math.floor(totalPagesToShow / 2));
    let endPage = Math.min(totalPages, page + Math.floor(totalPagesToShow / 2));

    if (endPage - startPage + 1 < totalPagesToShow) {
      if (startPage > 1) {
        startPage = Math.max(1, endPage - totalPagesToShow + 1);
      } else {
        endPage = Math.min(totalPages, startPage + totalPagesToShow - 1);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="flex items-center justify-center my-4 -space-x-px h-10 text-base">
        <li>
          <button
            onClick={() => setPage(page > 1 ? page - 1 : page)}
            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
          >
            <span className="sr-only">Previous</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
            </svg>
          </button>
        </li>
        {getPageNumbers().map(number => (
          <li key={number}>
            <button
              onClick={() => setPage(number)}
              className={`flex items-center justify-center px-4 h-10 leading-tight border ${number === page ? 'text-blue-600 border-blue-300 bg-blue-50' : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700'}`}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => setPage(page < totalPages ? page + 1 : page)}
            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
          >
            <span className="sr-only">Next</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
