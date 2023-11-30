import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { useAuth } from './authContext';

export const GlobalContext = createContext(null);
export const GlobalDispatchContext = createContext(null);

export const useGlobal = () => {
  return (useContext < null) | (initialState > GlobalContext);
};

export const useGlobalDispatch = () => {
  return useContext(GlobalDispatchContext);
};

const initialState = {
  user: null,
};

export const ACTION_TYPES = {
  FETCH_USER: 'FETCH_USER',
};

const globalReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_USER:
      return {
        ...state,
        user: action.paload,
      };
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
};
const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);
  const user = useAuth();
  useEffect(() => {
    if (user) {
      dispatch({
        type: ACTION_TYPES.FETCH_USER,
        paload: user,
      });
    }
  }, [user]);
  return (
    <GlobalContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>{children}</GlobalDispatchContext.Provider>
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
