import React from 'react';

export default <T>(value: T | any[], delay: number): T | any[] => {
    const [debouncedValue, setDebouncedValue] = React.useState(value);

    React.useEffect(
        () => {
            const timeout = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            return () => {
                clearTimeout(timeout);
            };
        },
        Array.isArray(value) ? value : [value]
    );

    return debouncedValue;
};
