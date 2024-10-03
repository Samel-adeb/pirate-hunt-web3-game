// next.config.js
module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'http', // Your API URL uses HTTP, so this needs to match
                hostname: process.env.IMAGE_HOST || 'wealthvalley.site', // Fallback in case IMAGE_HOST isn't defined
                port: process.env.IMAGE_HOST_PORT || '', // Fallback if port isn't defined
                pathname: '/**', // Matches all paths under this domain
            },
        ],
    },
};
