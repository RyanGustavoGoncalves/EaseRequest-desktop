import React from 'react';

interface ButtonGenerateProps {
    loading: boolean;
    handleGenerateClick: () => void;
    buttonText: string;
}

const ButtonGenerate: React.FC<ButtonGenerateProps> = ({ loading, handleGenerateClick, buttonText }) => (
    <div className="downloadBtn">
        <button onClick={handleGenerateClick} disabled={loading}>
            {loading ? (
                <div className="align-loading">
                    <div className="spinner-btn"></div>
                </div>
            ) : (
                <>{buttonText}</>
            )}
        </button>
    </div>
);

export default ButtonGenerate;
