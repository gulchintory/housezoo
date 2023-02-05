import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_BOOKED, UPDATE_BOOKED_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

function PetItem(item) {
  const [state, dispatch] = useStoreContext();

  const {
    image,
    name,
    _id,
    price,
    quantity
  } = item;

  const { booked } = state

  const addToBooked = () => {
    const itemInBooked = booked.find((bookedItem) => bookedItem._id === _id)
    if (itemInBooked) {
      dispatch({
        type: UPDATE_BOOKED_QUANTITY,
        _id: _id,
        bookQuantity: parseInt(itemInBooked.bookQuantity) + 1
      });
      idbPromise('booked', 'put', {
        ...itemInBooked,
        bookQuantity: parseInt(itemInBooked.bookQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_BOOKED,
        pet: { ...item, bookQuantity: 1 }
      });
      idbPromise('booked', 'put', { ...item, bookQuantity: 1 });
    }
  }

  return (
    <div className="card px-1 py-1">
      <Link to={`/pets/${_id}`}>
        <img
          alt={name}
          src={`/images/${image}`}
        />
        <p>{name}</p>
      </Link>
      <div>
        <div>{quantity} {pluralize("house", quantity)} available</div>
        <span>${price}</span>
      </div>
      <button onClick={addToBooked}>🐕  Get a ticket</button>
    </div>
  );
}

export default PetItem;
