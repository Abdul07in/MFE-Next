import { useCallback, useState } from 'react';

/**
 * Provides typed boolean state helpers for UI flows.
 * @param initialValue Optional initial boolean value.
 * @returns Boolean state with on/off/toggle helpers.
 */
export function useBoolean(initialValue = false): {
  value: boolean;
  setOn: () => void;
  setOff: () => void;
  toggle: () => void;
} {
  const [value, setValue] = useState(initialValue);

  const setOn = useCallback(() => setValue(true), []);
  const setOff = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((current) => !current), []);

  return { value, setOn, setOff, toggle };
}
