import React from 'react';

const defaultFinder = <T>(list: T[], item: T) =>
    list.findIndex((listItem) => listItem === item);

const useArrayV2 = <T = any>(
    defaultValue: T[] = [],
    finder = defaultFinder
) => {
    const [value, setValue] = React.useState(defaultValue);

    const has = React.useCallback(
        (hasValue: T) => finder(value, hasValue) !== -1,
        [value, finder]
    );

    const push = React.useCallback(
        (addedValue: T) => setValue([...value, addedValue]),
        [value, setValue]
    );

    const removeIndex = React.useCallback(
        (index: number) => setValue([...value].filter((x, i) => i !== index)),
        [value, setValue]
    );

    const toggle = React.useCallback(
        (valueToToggle: T) => {
            let newValue = [...value];

            const index = finder(newValue, valueToToggle);
            if (index !== -1) {
                newValue = newValue.filter(
                    (_, itemIndex) => itemIndex !== index
                );
            } else {
                newValue.push(valueToToggle);
            }

            setValue(newValue);
        },
        [value, finder]
    );

    return React.useMemo(
        () => ({
            setValue,
            toggle,
            has,
            push,
            removeIndex,
            value,
        }),
        [has, toggle, push, removeIndex, value]
    );
};

export default useArrayV2;
