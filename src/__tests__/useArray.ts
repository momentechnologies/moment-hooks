import { renderHook, act } from '@testing-library/react-hooks';
import useArray from '../useArray';

describe('useArray', () => {
    test('Expect value to be initial data', () => {
        const initialValue = ['string'];

        const { result } = renderHook(() => useArray(initialValue));

        expect(result.current[0]).toBe(initialValue);
    });
    test('Expect array to have new item after push action called', () => {
        const initialValue = ['1'];

        const { result } = renderHook(() => useArray(initialValue));
        act(() => {
            result.current[1].push('2');
        });

        expect(result.current[0]).toEqual(['1', '2']);
    });
    test('Expect remove index to remove item from value', () => {
        const initialValue = ['1', '2'];

        const { result } = renderHook(() => useArray(initialValue));

        act(() => {
            result.current[1].removeIndex(1);
        });

        expect(result.current[0]).toEqual(['1']);
    });
    test('Expect set value to override value', () => {
        const initialValue = ['1'];

        const { result } = renderHook(() => useArray(initialValue));

        act(() => {
            result.current[1].setValue(['2']);
        });

        expect(result.current[0]).toEqual(['2']);
    });
});
