import React, { createContext, useContext } from "react";
import { usePetReducer } from './reducers'

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = usePetReducer({
    pets: [],
    booked: [],
    bookedOpen: false,
    petTypes: [],
    currentPetType: '',
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
