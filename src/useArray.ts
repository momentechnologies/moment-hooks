import React from 'react';

export default <T = any>(initialArray: T[]) => {
    const [value, setValue] = React.useState(initialArray);
    const push = React.useCallback((a: T) => {
        setValue((v) => [...v, ...(Array.isArray(a) ? a : [a])]);
    }, []);

    const removeIndex = React.useCallback(
        (index: number) =>
            setValue((v) => {
                const copy = v.slice();
                copy.splice(index, 1);
                return copy;
            }),
        []
    );

    const actions = React.useMemo(
        () => ({
            setValue,
            push,
            removeIndex,
        }),
        [push, removeIndex]
    );

    return [value, actions] as [T[], typeof actions];
};
