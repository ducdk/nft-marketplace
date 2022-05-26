import { useState } from 'react';

export function useStates<T extends object>(initialState: T): [T, (state: Partial<T>) => void] {
  const [state, setState] = useState(initialState);
  const setMergedState = (newState: Partial<T>) => setState(prevState => Object.assign({}, prevState, newState));
  return [state, setMergedState];
}

export function changeDataToHash(data: object): string {
  return btoa(JSON.stringify(data));
}

// Action: send token to Unity
export function unityCall(data: string) {
  var str = `unity:${data}`;
  window.location.href = str;
}
