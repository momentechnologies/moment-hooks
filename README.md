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

## useOutsideClick

calls a function when a click occurs on the outside of the ref element

### Parameters

1. The ref of the element
2. The function that is called when a click occurs outside the ref

```Javascript
import { useOutsideClick } from 'moment-hooks';

const ref = React.useRef();
useOutsideClick(ref, () => console.log("On click outside"));
```

## useDebounce

calls a function when a click occurs on the outside of the ref element

### Parameters

1. The value to debounce
2. The debounce delay in milliseconds. This is the time where no update must ocure to inputValue in order for the
   debounced value to be updated

```Javascript
import { useDebounce } from 'moment-hooks';

const [inputValue, setInputValue] = React.useState("A value");
const debouncedInputValue = useDebounce(inputValue, 100);
```
