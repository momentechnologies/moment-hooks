import { renderHook, act } from '@testing-library/react';
import useArray from '../useArrayV2';

describe('useArray', () => {
    test('Expect value to be initial data', () => {
        const initialValue = ['string'];

        const { result } = renderHook(() => useArray(initialValue));

        expect(result.current.value).toBe(initialValue);
    });
    test('Expect array to have new item after push action called', () => {
        const initialValue = ['1'];

        const { result } = renderHook(() => useArray(initialValue));
        act(() => {
            result.current.push('2');
        });

        expect(result.current.value).toEqual(['1', '2']);
    });
    test('Expect remove index to remove item from value', () => {
        const initialValue = ['1', '2'];

        const { result } = renderHook(() => useArray(initialValue));

        act(() => {
            result.current.removeIndex(1);
        });

        expect(result.current.value).toEqual(['1']);
    });
    test('Expect set value to override value', () => {
        const initialValue = ['1'];

        const { result } = renderHook(() => useArray(initialValue));

        act(() => {
            result.current.setValue(['2']);
        });

        expect(result.current.value).toEqual(['2']);
    });
    test('Expect toggle to remove existing value', () => {
        const initialValue = ['1'];

        const { result } = renderHook(() => useArray(initialValue));

        act(() => {
            result.current.toggle('1');
        });

        expect(result.current.value).toEqual([]);
    });
    test('Expect toggle to add non-existing value', () => {
        const initialValue = [] as string[];

        const { result } = renderHook(() => useArray(initialValue));

        act(() => {
            result.current.toggle('1');
        });

        expect(result.current.value).toEqual(["1"]);
    });
});
