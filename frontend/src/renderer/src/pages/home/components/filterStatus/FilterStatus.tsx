import React from 'react';

interface Props {
    selectedStatus: string[];
    handleStatusChange: (status: string) => void;
}

const FilterStatus: React.FC<Props> = ({ selectedStatus, handleStatusChange }) => {
    return (
        <div className="filterStatusConfig">
            <label>Status Filter:</label>
            <div className="statusFilter">
                {['FINISH', 'PROCESSING', 'PENDING'].map((status) => (
                    <label key={status}>
                        <input
                            type="checkbox"
                            value={status}
                            checked={selectedStatus.includes(status)}
                            onChange={() => handleStatusChange(status)}
                        />
                        {status}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default FilterStatus;
