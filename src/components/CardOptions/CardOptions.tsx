import React from 'react';

interface CardOption {
  icon: string;
  label: string;
  onClick?: () => void;
  customComponent?: React.ReactNode;
}

interface CardOptionsProps {
  options: CardOption[];
  onClose: () => void;
}

export const CardOptions: React.FC<CardOptionsProps> = ({ options, onClose }) => {
  return (
    <div className="absolute right-0 top-10 bg-white shadow-md rounded-md z-10 w-48">
      {options.map((option, index) => (
        <div
          key={index}
          className="p-4 border-b hover:bg-gray-100 cursor-pointer flex justify-between items-center"
          onClick={() => {
            if (option.onClick) option.onClick();
            onClose();
          }}
        >
          <p className="flex items-center">
            <span className="mr-2">{option.icon}</span> {option.label}
          </p>
          {option.customComponent && (
            <div onClick={(e) => e.stopPropagation()}>{option.customComponent}</div>
          )}
        </div>
      ))}
    </div>
  );
};
