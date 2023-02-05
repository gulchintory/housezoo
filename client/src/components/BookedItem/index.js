import React from 'react';
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_BOOKED, UPDATE_BOOKED_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

const BookedItem = ({ item }) => {

  const [, dispatch] = useStoreContext();

  const removeFromBooked = item => {
    dispatch({
      type: REMOVE_FROM_BOOKED,
      _id: item._id
    });
    idbPromise('booked', 'delete', { ...item });

  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_BOOKED,
        _id: item._id
      });
      idbPromise('booked', 'delete', { ...item });

    } else {
      dispatch({
        type: UPDATE_BOOKED_QUANTITY,
        _id: item._id,
        bookQuantity: parseInt(value)
      });
      idbPromise('booked', 'put', { ...item, bookQuantity: parseInt(value) });

    }
  }

  return (
    <div className="flex-row">
      <div>
        <img
          src={`/images/${item.image}`}
          alt=""
        />
      </div>
      <div>
        <div>{item.name}, ${item.price}</div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.bookQuantity}
            onChange={onChange}
          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromBooked(item)}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
}

export default BookedItem;
