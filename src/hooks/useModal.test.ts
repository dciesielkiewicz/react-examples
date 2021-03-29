import { act, renderHook } from '@testing-library/react-hooks';
import { useModal } from './useModal';

describe('useModal', () => {
  test('Hook should work properly', () => {
    const { result } = renderHook(() => useModal());
    expect(result.current.isOpened).toBeFalsy();

    act(() => {
      result.current.openModal();
    });
    expect(result.current.isOpened).toBeTruthy();

    act(() => {
      result.current.closeModal();
    });
    expect(result.current.isOpened).toBeFalsy();
  });
});