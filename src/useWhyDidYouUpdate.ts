import React from 'react';

interface IProps {
    [key: string]: any;
}

export default (name: string, props: IProps) => {
    const previousProps = React.useRef<IProps>();

    React.useEffect(() => {
        if (previousProps.current) {
            const allKeys = Object.keys({ ...previousProps.current, ...props });
            const before: IProps = {};
            const after: IProps = {};

            allKeys.forEach(key => {
                if (
                    previousProps.current &&
                    previousProps.current[key] !== props[key]
                ) {
                    before[key] = previousProps.current[key];
                    after[key] = props[key];
                }
            });

            if (Object.keys(after).length) {
                console.group(`[wdyu]: ${name}`);
                console.log('Before:', before);
                console.log('After:', after);
                console.groupEnd();
            }
        }

        previousProps.current = props;
    });
};
