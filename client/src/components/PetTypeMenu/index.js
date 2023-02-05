import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import {
  UPDATE_PETTYPES,
  UPDATE_CURRENT_PETTYPE,
} from '../../utils/actions';
import { QUERY_PETTYPES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function PetTypeMenu() {
  const [state, dispatch] = useStoreContext();

  const { petTypes } = state;

  const { loading, data: petTypeData } = useQuery(QUERY_PETTYPES);

  useEffect(() => {
    if (petTypeData) {
      dispatch({
        type: UPDATE_PETTYPES,
        petTypes: petTypeData.petTypes,
      });
      petTypeData.petTypes.forEach((petType) => {
        idbPromise('petTypes', 'put', petType);
      });
    } else if (!loading) {
      idbPromise('petTypes', 'get').then((petTypes) => {
        dispatch({
          type: UPDATE_PETTYPES,
          petTypes: petTypes,
        });
      });
    }
  }, [petTypeData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_PETTYPE,
      currentPetType: id,
    });
  };

  const showAll = () => {
    dispatch({
      type: UPDATE_CURRENT_PETTYPE,
      currentPetType: '',
    });
  }

  return (
    <div>
      <h2>Find By Pet Type</h2>
      <button
        className='petType-button'
          key={'btnAllPetTypes'}
          onClick={() => {
            showAll();
          }}
        >
          All
        </button>
      {petTypes.map((item) => (
        <button
        className='petType-button'
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
      
    </div>
  );
}

export default PetTypeMenu;
