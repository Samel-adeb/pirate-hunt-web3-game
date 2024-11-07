// next.config.js
module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'https', // Your API URL uses HTTP, so this needs to match
                hostname: process.env.NEXT_PUBLIC_IMAGE_HOST, //'127.0.0.1',// Fallback in case IMAGE_HOST isn't defined
                port: process.env.NEXT_PUBLIC_IMAGE_HOST_PORT, // 8000Fallback if port isn't defined
                pathname: '/**', // Matches all paths under this domain
            },
        ],
    },
};
