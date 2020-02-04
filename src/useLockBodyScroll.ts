import React from 'react';

export default () => {
    React.useLayoutEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';
        return () => (document.body.style.overflow = originalStyle);
    }, []);
};
