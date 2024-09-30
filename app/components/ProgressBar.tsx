import React from 'react';

// Define the prop types for ProgressBar
interface ProgressBarProps {
  progress: number; // The progress should be a number
 
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div
    className="relative w-full h-8 rounded-full overflow-hidden" // Set height for a better pill shape
    style={{
      border: '15.57px solid transparent', // Set a transparent border for the gradient
      borderRadius: '50%', // Ensure a rounded shape
      background: 'linear-gradient(90deg, #00A6DE 0%, #FFFFFF 100%)', // Gradient for the border
      borderImage: 'linear-gradient(90deg, #00A6DE 0%, #FFFFFF 100%)', // Set the border image
      borderImageSlice: 1, // Ensure the image fills the border
    }}
    >
      <div
        className="h-[0.38px] bg-[#00A6DE] rounded-full"
        style={{
          width: `${progress}%`, // Control the width based on progress
          transition: 'width 0.3s ease-in-out',
        }}
      />
    </div>
  );
};

export default ProgressBar;
