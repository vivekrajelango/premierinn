import React from "react";

interface FormSelectProps {
    label: string;
    name: string;
    options: { value: string; label: string }[];
    required?: boolean;
    register: any;
    error?: any;
    className?: string;
  }
  
  export const FormSelect = ({
    label,
    name,
    options,
    required = false,
    register,
    error,
    className = "",
  }: FormSelectProps) => {
    return (
      <div className={className}>
        <label className="block text-md font-semibold text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <select
          {...register(name, { required: required && `${label} is required` })}
          className={`${error ?'!border-red-500 ' : 'border-gray-300'} border w-full rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#4F2D7F] focus:border-transparent`}
        >
          <option value="">Select...</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <span className="text-red-500 text-xs block mt-1">{error.message}</span>}
      </div>
    );
  };