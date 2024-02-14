import React from 'react';

interface Props {
    currentPage: number;
    handlePreviousPage: () => void;
    handleNextPage: () => void;
    role: string;
}

const Pagination: React.FC<Props> = ({ currentPage, handlePreviousPage, handleNextPage, role }) => {
    return (
        <div className="page">
            <button onClick={handlePreviousPage} disabled={currentPage === 0}>
                Back
            </button>
            <span>Página {currentPage + 1}</span>
            <button onClick={handleNextPage}>
                Next
            </button>
        </div>
    );
};

export default Pagination;
