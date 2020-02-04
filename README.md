[![npm version](https://badge.fury.io/js/moment-hooks.svg)](https://badge.fury.io/js/moment-hooks)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# moment-hooks

A module to group all the best hooks togheter.

## Prerequisites

-   React 16.8 or greater

## Install

```
yarn install moment-hooks
```

# List of hooks

-   [useOutsideClick](#useOutsideClick)
-   [useLockBodyScroll](#useLockBodyScroll)
-   [useArray](#useArray)
-   [useDebounce](#useDebounce)
-   [useWindowSize](#useWindowSize)
-   [useQueryStringState](#useQueryStringState)
-   [useWhyDidYouUpdate](#useWhyDidYouUpdate)

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

## useArray

makes handling of state array easier

### Parameters

1. The initial value of the array

```Javascript
import { useArray } from 'moment-hooks';

const [list, actions] = useArray(["element 1"]);
```

### Return

the hook returns an array with two elements

1. The array stored in state
2. The actions you can do on the array

#### Actions

1. push - Adds the first parameter of the funtion to the end of the array
2. removeIndex - Removes the element at the index provided as the first parameter of the function

## useLockBodyScroll

Disables the scroll on body. Widely used in modals.

###Parameters

1. If it should be hidden. Defaults to true.

```Javascript
import { useLockBodyScroll } from 'moment-hooks';

useLockBodyScroll();
```

or if you have it in a modal

```Javascript
import { useLockBodyScroll } from 'moment-hooks';

const Modal = ({ isOpen }) => {
    useLockBodyScroll(isOpen);

    return <div>Modal</div>;
}
```

## useDebounce

Reduce the amount of time is updated. Useful when dealing with fetch.

### Parameters

1. The value to debounce
2. The debounce delay in milliseconds. This is the time where no update must ocure to inputValue in order for the
   debounced value to be updated

```Javascript
import { useDebounce } from 'moment-hooks';

const [inputValue, setInputValue] = React.useState("A value");
const debouncedInputValue = useDebounce(inputValue, 100);
```

## useWindowSize

returns the size of the window

```Javascript
import { useWindowSize } from 'moment-hooks';

const { width, height } = useWindowSize();
```

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
