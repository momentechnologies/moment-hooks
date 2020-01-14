import React from 'react';
import useWindowSize from './useWindowSize';

const sizes = {
    xs: 576,
    sm: 768,
    md: 992,
    lg: 1200,
};

export default (
    minWidth: number | keyof typeof sizes,
    invert: boolean = false
) => {
    const { width } = useWindowSize();

    let actualMinWidth = minWidth;

    if (typeof actualMinWidth === 'string') {
        actualMinWidth = sizes[actualMinWidth];
    }

    if (invert) {
        return actualMinWidth >= width;
    }

    return actualMinWidth < width;
};
