import React from "react";

interface RoomCounterProps {
    title: string;
    subtitle: string;
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
  }
  
  export const RoomCounter = ({
    title,
    subtitle,
    value,
    onChange,
    min = 0,
    max = 99
  }: RoomCounterProps) => {
    const handleIncrement = () => {
      if (value < max) {
        onChange(value + 1);
      }
    };
  
    const handleDecrement = () => {
      if (value > min) {
        onChange(value - 1);
      }
    };
  
    return (
      <div className="border rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-gray-600">{subtitle}</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={handleDecrement}
              disabled={value <= min}
              className={`w-10 h-10 rounded-full border-2 border-[#00798e] flex items-center justify-center
                ${value <= min ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#00798e] hover:text-white'}`}
            >
              <span className="text-2xl">−</span>
            </button>
            <input
              type="text"
              value={value}
              readOnly
              className="w-16 text-center border rounded-md"
            />
            <button
              type="button"
              onClick={handleIncrement}
              disabled={value >= max}
              className={`w-10 h-10 rounded-full border-2 border-[#00798e] flex items-center justify-center
                ${value >= max ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#00798e] hover:text-white'}`}
            >
              <span className="text-2xl">+</span>
            </button>
          </div>
        </div>
      </div>
    );
  };