import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Booked from '../components/Booked';
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_BOOKED,
  UPDATE_BOOKED_QUANTITY,
  ADD_TO_BOOKED,
  UPDATE_PETS,
} from '../utils/actions';
import { QUERY_PETS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentPet, setCurrentPet] = useState({});

  const { loading, data } = useQuery(QUERY_PETS);

  const { pets, booked } = state;

  useEffect(() => {
    // already in global store
    if (pets.length) {
      setCurrentPet(pets.find((pet) => pet._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PETS,
        pets: data.pets,
      });

      data.pets.forEach((pet) => {
        idbPromise('pets', 'put', pet);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('pets', 'get').then((indexedPets) => {
        dispatch({
          type: UPDATE_PETS,
          pets: indexedPets,
        });
      });
    }
  }, [pets, data, loading, dispatch, id]);

  const addToBooked = () => {
    const itemInBooked = booked.find((bookedItem) => bookedItem._id === id);
    if (itemInBooked) {
      dispatch({
        type: UPDATE_BOOKED_QUANTITY,
        _id: id,
        bookQuantity: parseInt(itemInBooked.bookQuantity) + 1,
      });
      idbPromise('booked', 'put', {
        ...itemInBooked,
        bookQuantity: parseInt(itemInBooked.bookQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_BOOKED,
        pet: { ...currentPet, bookQuantity: 1 },
      });
      idbPromise('booked', 'put', { ...currentPet, bookQuantity: 1 });
    }
  };

  const removeFromBooked = () => {
    dispatch({
      type: REMOVE_FROM_BOOKED,
      _id: currentPet._id,
    });

    idbPromise('booked', 'delete', { ...currentPet });
  };

  return (
    <>
      {currentPet && booked ? (
        <div className="container my-1">
          <Link to="/">← Back to Pets</Link>

          <h2>{currentPet.name}</h2>

          <p>{currentPet.description}</p>

          <p>
            <strong>Price:</strong>${currentPet.price}{' '}
            <button onClick={addToBooked}>🐕  Get a ticket</button>
            <button
              disabled={!booked.find((p) => p._id === currentPet._id)}
              onClick={removeFromBooked}
            >
              Remove from Booked
            </button>
          </p>

          <img
            src={`/images/${currentPet.image}`}
            alt={currentPet.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Booked />
    </>
  );
}

export default Detail;
