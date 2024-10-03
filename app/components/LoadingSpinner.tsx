// components/LoadingSpinner.js
const LoadingSpinner = () => {
    return (
        <div className="spinner">
            {/* You can use CSS to style this or use an SVG */}
            <style jsx>{`
                .spinner {
                    border: 4px solid rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    border-top: 4px solid #3498db; /* Color of the spinner */
                    width: 40px;
                    height: 40px;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default LoadingSpinner;
