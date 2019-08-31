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
                // tslint:disable-next-line:no-console
                console.group(`[wdyu]: ${name}`);
                // tslint:disable-next-line:no-console
                console.log('Before:', before);
                // tslint:disable-next-line:no-console
                console.log('After:', after);
                // tslint:disable-next-line:no-console
                console.groupEnd();
            }
        }

        previousProps.current = props;
    });
};
