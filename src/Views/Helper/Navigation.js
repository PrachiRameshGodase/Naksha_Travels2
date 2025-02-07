import { useState, useEffect } from 'react';

const useNavigation = () => {
    const [canGoBack, setCanGoBack] = useState(false);
    const [canGoForward, setCanGoForward] = useState(false);

    useEffect(() => {
        const checkHistory = () => {
            setCanGoBack(window.history.state !== null && window.history.length > 1);
            setCanGoForward(true); // Simplified check; adjust as needed for your app
        };

        checkHistory();

        const handlePopState = () => {
            checkHistory();
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    const goBack = () => {
        if (canGoBack) {
            window.history.back();
        }
    };

    const goForward = () => {
        if (canGoForward) {
            window.history.forward();
        }
    };

    return { canGoBack, canGoForward, goBack, goForward };
};

export default useNavigation;