import React from 'react';

// Define the prop types for ProgressBar
interface ProgressBarProps {
  progress: number; // The progress should be a number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div
      className="relative w-full h-8 rounded-lg"
      style={{
        border: '15.57px solid',
        borderImageSource: 'linear-gradient(90deg, #00A6DE 0%, #FFFFFF 100%)',
        borderImageSlice: 1,
      }}
    >
      <div
        className="h-full bg-[#00A6DE] rounded-lg"
        style={{
          width: `${progress}%`, // Control the width based on progress
          transition: 'width 0.3s ease-in-out',
        }}
      />
    </div>
  );
};

export default ProgressBar;
