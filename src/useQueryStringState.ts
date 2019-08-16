import React from "react";
import queryString from "query-string";
import { __RouterContext } from "react-router-dom";

type StateType = {
  [key: string]: any;
};

export default (
  defaultValues = {},
  options: {
    toString: {
      [key: string]: (data: any) => string;
    };
    fromString: {
      [key: string]: (data: string) => any;
    };
  } = {
    toString: {},
    fromString: {}
  }
) => {
  if (!__RouterContext) {
    throw new Error("useQueryString may only be used with react-router@^5.");
  }

  const context = React.useContext(__RouterContext);

  if (!context) {
    throw new Error(
      "useQueryString may only be called within a <Router /> context."
    );
  }

  const parsedQueryString = queryString.parse(
    context.location.search
  ) as StateType;

  const parsedQuery = JSON.parse(
    JSON.stringify(
      Object.keys(parsedQueryString).reduce(
        (parsedQuery, key) => {
          let value = parsedQueryString[key];

          if (options.fromString[key]) {
            value = options.fromString[key](value);
          }

          parsedQuery[key] = value;

          return parsedQuery;
        },
        {} as StateType
      )
    )
  );

  const [state, setState] = React.useState<StateType>({
    ...defaultValues,
    ...parsedQuery
  });

  React.useEffect(() => {
    context.history.push({
      ...context.location,
      search: queryString.stringify(
        Object.keys(state).reduce(
          (newState, key) => {
            let value = state[key];
            if (options.toString[key]) {
              value = options.toString[key](value);
            }

            newState[key] = value;

            return newState;
          },
          {} as StateType
        )
      )
    });
  }, [state]); // eslint-disable-line

  return [state, (state: StateType) => setState(state)];
};
