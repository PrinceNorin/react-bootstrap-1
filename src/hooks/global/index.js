import { useContext } from 'react';
import GlobalContext from './GlobalContext';

export { GlobalContext };
export { default as useGlobal } from './useGlobal';

export const useGlobalContext = () => {
  return useContext(GlobalContext);
}
