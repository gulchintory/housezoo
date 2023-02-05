import { useReducer } from 'react';
import {
  UPDATE_PETS,
  ADD_TO_BOOKED,
  UPDATE_BOOKED_QUANTITY,
  REMOVE_FROM_BOOKED,
  ADD_MULTIPLE_TO_BOOKED,
  UPDATE_PETTYPES,
  UPDATE_CURRENT_PETTYPE,
  CLEAR_BOOKED,
  TOGGLE_BOOKED,
} from './actions';

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_PETS:
      return {
        ...state,
        pets: [...action.pets],
      };

    case ADD_TO_BOOKED:
      return {
        ...state,
        bookedOpen: true,
        booked: [...state.booked, action.pet],
      };

    case ADD_MULTIPLE_TO_BOOKED:
      return {
        ...state,
        booked: [...state.booked, ...action.pets],
      };
    case UPDATE_BOOKED_QUANTITY:
      return {
        ...state,
        bookedOpen: true,
        booked: state.booked.map((pet) => {
          if (action._id === pet._id) {
            pet.bookQuantity = action.bookQuantity;
          }
          return pet;
        }),
      };
    case REMOVE_FROM_BOOKED:
      let newState = state.booked.filter((pet) => {
        return pet._id !== action._id;
      });

      return {
        ...state,
        bookedOpen: newState.length > 0,
        booked: newState,
      };

    case CLEAR_BOOKED:
      return {
        ...state,
        bookedOpen: false,
        booked: [],
      };

    case TOGGLE_BOOKED:
      return {
        ...state,
        bookedOpen: !state.bookedOpen,
      };

    case UPDATE_PETTYPES:
      return {
        ...state,
        petTypes: [...action.petTypes],
      };

    case UPDATE_CURRENT_PETTYPE:
      return {
        ...state,
        currentPetType: action.currentPetType,
      };
    default:
      return state;
  }
};

export function usePetReducer(initialState) {
  return useReducer(reducer, initialState);
}
