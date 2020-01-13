import { useEffect } from 'react';
import { MutableRefObject } from 'react';

export default (ref: MutableRefObject<any>, callback: () => void) => {
    const handleClick = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback();
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    });
};
