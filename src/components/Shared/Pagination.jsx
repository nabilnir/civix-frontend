// src/components/shared/Pagination.jsx
import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    // Generate page numbers
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex justify-center items-center gap-2 mt-12">
            <button 
                disabled={currentPage === 1} 
                onClick={() => onPageChange(currentPage - 1)} 
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-[#238ae9] transition-colors"
                aria-label="Previous Page"
            >
                <FiChevronLeft size={20}/>
            </button>
            
            <div className="flex gap-1 overflow-x-auto max-w-[200px] md:max-w-none px-2">
                {pages.map(page => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                            currentPage === page 
                            ? 'bg-[#238ae9] text-white shadow-md' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button 
                disabled={currentPage === totalPages} 
                onClick={() => onPageChange(currentPage + 1)} 
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-[#238ae9] transition-colors"
                aria-label="Next Page"
            >
                <FiChevronRight size={20}/>
            </button>
        </div>
    );
};

export default Pagination;