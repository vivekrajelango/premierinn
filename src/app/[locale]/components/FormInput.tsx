import React from "react";

interface FormInputProps {
    label: string;
    name: string;
    type?: string;
    required?: boolean;
    placeholder?: string;
    register: any;
    error?: any;
    className?: string;
    maxLength?:number;
    minLength?:number;
    pattern?: {
        value: RegExp;
        message: string;
      };
}

export const FormInput = ({
    label,
    name,
    type = "text",
    required = false,
    placeholder = "",
    register,
    error,
    className = "",
    minLength,
    maxLength,
    pattern
}: FormInputProps) => {
    return (
        <div className={className}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                {...register(name, 
                    { required: required && `${label} is required`, pattern: pattern && pattern }
                )}
                minLength={minLength}
                maxLength={maxLength}
                placeholder={placeholder}
                className={`${error ? 'border-red-500 ' : 'border-gray-300'} w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4F2D7F] focus:border-transparent`}
            />
            {error && <span className="text-red-500 text-xs block mt-1">{error.message}</span>}
        </div>
    );
};