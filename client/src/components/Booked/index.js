import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import BookedItem from '../BookedItem';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_BOOKED, ADD_MULTIPLE_TO_BOOKED } from '../../utils/actions';
import './style.css';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Booked = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getBooked() {
      const booked = await idbPromise('booked', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_BOOKED, pets: [...booked] });
    }

    if (!state.booked.length) {
      getBooked();
    }
  }, [state.booked.length, dispatch]);

  function toggleBooked() {
    dispatch({ type: TOGGLE_BOOKED });
  }

  function calculateTotal() {
    let sum = 0;
    state.booked.forEach((item) => {
      sum += item.price * item.bookQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const petIds = [];

    state.booked.forEach((item) => {
      for (let i = 0; i < item.bookQuantity; i++) {
        petIds.push(item._id);
      }
    });

    console.log({petIds})

    getCheckout({
      variables: { pets: petIds },
    });
  }

  if (!state.bookedOpen) {
    return (
      <div className="booked-closed" onClick={toggleBooked}>
        <span role="img" aria-label="trash">
          🐕
        </span>
      </div>
    );
  }

  return (
    <div className="booked">
      <div className="close" onClick={toggleBooked}>
        [close]
      </div>
      <h2>Bookings</h2>
      {state.booked.length ? (
        <div>
          {state.booked.map((item) => (
            <BookedItem key={item._id} item={item} />
          ))}

          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>

            {Auth.loggedIn() ? (
              <button onClick={submitCheckout}>Checkout</button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </div>
        </div>
      ) : (
        <h3>
          
          You haven't booked anything yet!
        </h3>
      )}
    </div>
  );
};

export default Booked;
