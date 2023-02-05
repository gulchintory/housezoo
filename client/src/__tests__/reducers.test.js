import { reducer } from '../utils/reducers';
import {
  UPDATE_PETS,
  ADD_TO_BOOKED,
  UPDATE_BOOKED_QUANTITY,
  REMOVE_FROM_BOOKED,
  ADD_MULTIPLE_TO_BOOKED,
  UPDATE_PETTYPES,
  UPDATE_CURRENT_PETTYPE,
  CLEAR_BOOKED,
  TOGGLE_BOOKED
} from '../utils/actions';

const initialState = {
  pets: [],
  booked: [
    {
      _id: '1',
      name: 'Soup',
      bookQuantity: 1
    },
    {
      _id: '2',
      name: 'Bread',
      bookQuantity: 2
    }
  ],
  bookedOpen: false,
  petTypes: [{ name: 'Food' }],
  currentPetType: '1',
};

test('UPDATE_PETS', () => {
  let newState = reducer(initialState, {
    type: UPDATE_PETS,
    pets: [{}, {}]
  });

  expect(newState.pets.length).toBe(2);
  expect(initialState.pets.length).toBe(0);
});

test('ADD_TO_BOOKED', () => {
  let newState = reducer(initialState, {
    type: ADD_TO_BOOKED,
    pet: { bookQuantity: 1 }
  });

  expect(newState.booked.length).toBe(3);
  expect(initialState.booked.length).toBe(2);
});

test('UPDATE_BOOKED_QUANTITY', () => {
  let newState = reducer(initialState, {
    type: UPDATE_BOOKED_QUANTITY,
    _id: '1',
    bookQuantity: 3
  });

  expect(newState.bookedOpen).toBe(true);
  expect(newState.booked[0].bookQuantity).toBe(3);
  expect(newState.booked[1].bookQuantity).toBe(2);
  expect(initialState.bookedOpen).toBe(false);
});

test('REMOVE_FROM_BOOKED', () => {
  let newState1 = reducer(initialState, {
    type: REMOVE_FROM_BOOKED,
    _id: '1'
  });

  expect(newState1.bookedOpen).toBe(true);
  expect(newState1.booked.length).toBe(1);
  expect(newState1.booked[0]._id).toBe('2');

  let newState2 = reducer(newState1, {
    type: REMOVE_FROM_BOOKED,
    _id: '2'
  });

  expect(newState2.bookedOpen).toBe(false);
  expect(newState2.booked.length).toBe(0);

  expect(initialState.booked.length).toBe(2);
});

test('ADD_MULTIPLE_TO_BOOKED', () => {
  let newState = reducer(initialState, {
    type: ADD_MULTIPLE_TO_BOOKED,
    pets: [{}, {}]
  });

  expect(newState.booked.length).toBe(4);
  expect(initialState.booked.length).toBe(2);
});

test('UPDATE_PETTYPES', () => {
  let newState = reducer(initialState, {
    type: UPDATE_PETTYPES,
    petTypes: [{}, {}]
  });

  expect(newState.petTypes.length).toBe(2);
  expect(initialState.petTypes.length).toBe(1);
});

test('UPDATE_CURRENT_PETTYPE', () => {
  let newState = reducer(initialState, {
    type: UPDATE_CURRENT_PETTYPE,
    currentPetType: '2'
  });

  expect(newState.currentPetType).toBe('2');
  expect(initialState.currentPetType).toBe('1');
});

test('CLEAR_BOOKED', () => {
  let newState = reducer(initialState, {
    type: CLEAR_BOOKED
  });

  expect(newState.bookedOpen).toBe(false);
  expect(newState.booked.length).toBe(0);
  expect(initialState.booked.length).toBe(2);
});

test('TOGGLE_BOOKED', () => {
  let newState = reducer(initialState, {
    type: TOGGLE_BOOKED
  });

  expect(newState.bookedOpen).toBe(true);
  expect(initialState.bookedOpen).toBe(false);
  
  let newState2 = reducer(newState, {
    type: TOGGLE_BOOKED
  });

  expect(newState2.bookedOpen).toBe(false);
});
