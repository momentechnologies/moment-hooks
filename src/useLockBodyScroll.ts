import React from 'react';

export default (hide: boolean = true) => {
    React.useLayoutEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = hide === true ? 'hidden' : originalStyle;

        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, [hide]);
};
