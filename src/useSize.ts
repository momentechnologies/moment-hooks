import { useLayoutEffect, useState } from 'react';
import { MutableRefObject } from 'react';

export default (ref: MutableRefObject<any>) => {
    const getSize = () => ({
        height: ref.current ? ref.current.offsetHeight : 0,
        width: ref.current ? ref.current.offsetWidth : 0,
    });

    const [size, setSize] = useState(getSize);

    useLayoutEffect(() => {
        if (!ref.current) {
            return;
        }

        const handleResize = () => {
            setSize(getSize());
        };

        if (typeof ResizeObserver === 'function') {
            let resizeObserver = new ResizeObserver(() => {
                handleResize();
            });

            resizeObserver.observe(ref.current);

            return () => {
                resizeObserver.unobserve(ref.current);
                resizeObserver = null;
            };
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [ref.current]);

    return size;
};
