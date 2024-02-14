import React from 'react';

interface Option {
    value: string;
    label: string;
}

interface Props {
    id: string;
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    type?: 'text' | 'select';
    required?: boolean;
    options?: Option[];
}

const InputField: React.FC<Props> = ({ id, label, value, onChange, onMouseEnter, onMouseLeave, type = 'text', required = false, options }) => {
    return (
        <div className="authField">
            <label id={`${id}Label`} className={value ? 'active' : ''} htmlFor={id}>
                {label}
            </label>
            {type === 'select' ? (
                <select className="selectHome" id={id} value={value} onChange={onChange} required={required}>
                    {options?.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    required={required}
                />
            )}
        </div>
    );
};

export default InputField;
