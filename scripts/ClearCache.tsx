import Cookies from 'js-cookie';

export const clearCache = (key:string, value = '') => {
    // Check if the key exists in localStorage
    const keyExists = localStorage.getItem(key);

    if (!keyExists) {
        // Clear localStorage
        localStorage.clear();

        // Clear all cookies
        const allCookies = Cookies.get();
        Object.keys(allCookies).forEach(cookieName => Cookies.remove(cookieName));

        // Add the specified key to localStorage with an optional value
        localStorage.setItem(key, value);
    }
};
