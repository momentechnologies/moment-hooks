# moment-hooks

[![npm version](https://badge.fury.io/js/moment-hooks.svg)](https://badge.fury.io/js/moment-hooks)

A module to group all the best hooks togheter.

## useQueryStringState

Works the same as useState just that it stores it's state in the querystring of the url.

### Parameters

1. defaultState: Exactly the same as the default state of useState
2. Object with 2 keys:

#### fromString

A way to serialize the url string to a value in the state

#### toString

A way to stringify the state.

```Javascript
const [reportSettings, setReportSettings] = useQueryStringState(
        {
            from: moment()
                .subtract(1, 'months')
                .toDate(),
            to: moment().toDate(),
        },
        {
            fromString: {
                from: from => moment(from).toDate(),
                to: to => moment(to).toDate(),
            },
            toString: {
                from: from => moment(from).format(),
                to: to => moment(to).format(),
            },
        }
    );
```

## useWhyDidYouUpdate

logs the reason why a component has been updated

### Parameters

1. The name of the component
2. The props

```Javascript
import { useWhyDidYouUpdate } from 'moment-hooks';

useWhyDidYouUpdate('Register', props);
```
