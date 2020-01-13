import React from 'react';

export default (): {
    height: number;
    width: number;
} => {
    const isClient = typeof window === 'object';

    const getSize = () => ({
        height: isClient ? window.innerHeight : 0,
        width: isClient ? window.innerWidth : 0,
    });

    const [windowSize, setWindowSize] = React.useState(getSize);

    React.useEffect(() => {
        if (!isClient) {
            return;
        }

        function handleResize() {
            setWindowSize(getSize());
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
};
