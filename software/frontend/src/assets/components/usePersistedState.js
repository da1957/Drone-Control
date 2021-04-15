import React from 'react';
import ls from 'local-Storage';

export default function usePersistedState(key, defaultValue) {
  const [state, setState] = React.useState(() => {
    const persistedState = ls.getItem(key);
    return persistedState ? JSON.parse(persistedState) : defaultValue;
  });
  React.useEffect(() => {
    window.ls.setItem(key, JSON.stringify(state));
  }, [state, key]);
  return [state, setState];
}
