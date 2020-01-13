import queryString from 'query-string';
import React from 'react';
import { __RouterContext } from 'react-router-dom';

interface IState {
    [key: string]: any;
}

export default (
    defaultValues = {},
    options: {
        fromString: {
            [key: string]: (data: string) => any;
        };
        toString: {
            [key: string]: (data: any) => string;
        };
    } = {
        fromString: {},
        toString: {},
    }
) => {
    if (!__RouterContext) {
        throw new Error(
            'useQueryString may only be used with react-router@^5.'
        );
    }

    const context = React.useContext(__RouterContext);

    if (!context) {
        throw new Error(
            'useQueryString may only be called within a <Router /> context.'
        );
    }

    const parsedQueryString = queryString.parse(
        context.location.search
    ) as IState;

    const parsedQuery = Object.keys(parsedQueryString).reduce(
        (newParsedQuery, key) => {
            let value = parsedQueryString[key];

            if (options.fromString[key]) {
                value = options.fromString[key](value);
            }

            newParsedQuery[key] = value;

            return newParsedQuery;
        },
        {} as IState
    );

    const [state, setState] = React.useState<IState>({
        ...defaultValues,
        ...parsedQuery,
    });

    React.useEffect(() => {
        context.history.push({
            ...context.location,
            search: queryString.stringify(
                Object.keys(state).reduce((newState, key) => {
                    let value = state[key];
                    if (options.toString[key]) {
                        value = options.toString[key](value);
                    }

                    newState[key] = value;

                    return newState;
                }, {} as IState)
            ),
        });
    }, [state]); // eslint-disable-line

    return [state, (newState: IState) => setState(newState)];
};
