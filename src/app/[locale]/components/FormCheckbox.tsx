import React from "react";


interface FormCheckboxProps {
    label: string;
    name: string;
    register: any;
    className?: string;
  }
  
  export const FormCheckbox = ({
    label,
    name,
    register,
    className = "",
  }: FormCheckboxProps) => {
    return (
      <div className={className}>
        <label className="flex flex-row items-start space-x-2 text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            {...register(name)}
            className="rounded border-gray-300 mt-1 text-[#4F2D7F] focus:ring-[#4F2D7F]"
          />
          <span>{label}</span>
        </label>
      </div>
    );
  };