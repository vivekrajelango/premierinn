import React from 'react';
interface FormDateProps {
    label: string;
    name: string;
    required?: boolean;
    register: any;
    error?: any;
    className?: string;
    minDate?: string;
    maxDate?: string;
    disabled?: boolean;
  }
  
  export const FormDate = ({
    label,
    name,
    required = false,
    register,
    error,
    className = "",
    minDate,
    maxDate,
    disabled = false,
  }: FormDateProps) => {
    return (
      <div className={className}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
          type="date"
          {...register(name, { 
            required: required && `${label} is required`,
            min: {
              value: minDate,
              message: `Date must be after ${minDate}`
            },
            max: {
              value: maxDate,
              message: `Date must be before ${maxDate}`
            }
          })}
          min={minDate}
          max={maxDate}
          disabled={disabled}
          className={`
            w-full 
            border 
            ${error ? 'border-red-500' : 'border-gray-300'} 
            rounded-md 
            px-3 
            py-2 
            focus:outline-none 
            focus:ring-2 
            focus:ring-[#4F2D7F] 
            focus:border-transparent
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
          `}
        />
        {error && <span className="text-red-500 text-xs block mt-1">{error.message}</span>}
      </div>
    );
  };