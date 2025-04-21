import React from "react";

interface FormRadioGroupProps {
    label: string;
    name: string;
    options: { value: string; label: string }[];
    required?: boolean;
    register: any;
    error?: any;
    className?: string;
  }
  
  export const FormRadioGroup = ({
    label,
    name,
    options,
    required = false,
    register,
    error,
    className = "",
  }: FormRadioGroupProps) => {
    return (
      <div className={className}>
        <label className="block text-lg font-semibold text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {options.map((option) => (
          <div key={option.value} className="flex border border-gray-300 px-3 py-4 items-center space-x-3">
            <input
              type="radio"
              value={option.value}
              {...register(name, {
                required: required && `Please select ${label.toLowerCase()} before proceeding.`
              })}
            />
            <span>{option.label}</span>
          </div>
        ))}
        {error && <span className="text-red-500 text-xs block mt-1">{error.message}</span>}
      </div>
    );
  };