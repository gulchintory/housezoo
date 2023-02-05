import React, { useEffect } from 'react';
import PetItem from '../PetItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PETS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PETS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function PetList() {
  const [state, dispatch] = useStoreContext();

  const { currentPetType } = state;

  const { loading, data } = useQuery(QUERY_PETS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PETS,
        pets: data.pets,
      });
      data.pets.forEach((pet) => {
        idbPromise('pets', 'put', pet);
      });
    } else if (!loading) {
      idbPromise('pets', 'get').then((pets) => {
        dispatch({
          type: UPDATE_PETS,
          pets: pets,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterPets() {
    if (!currentPetType) {
      return state.pets;
    }

    return state.pets.filter(
      (pet) => pet.petType._id === currentPetType
    );
  }

  return (
    <div className="my-2">
      <h2>Available Houses</h2>
      {state.pets.length ? (
        <div className="flex-row">
          {filterPets().map((pet) => (
            <PetItem
              key={pet._id}
              _id={pet._id}
              image={pet.image}
              name={pet.name}
              price={pet.price}
              quantity={pet.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any pets yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default PetList;
