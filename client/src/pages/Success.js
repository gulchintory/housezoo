import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Jumbotron from '../components/Jumbotron';
import { ADD_BOOKING } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';

function Success() {
  const [addBooking] = useMutation(ADD_BOOKING);

  console.log('gulcins successs page')

  useEffect(() => {
    async function saveBooking() {
      const booked = await idbPromise('booked', 'get');
      console.log(booked)
      const pets = booked.map((item) => item._id);

      if (pets.length) {
        const { data } = await addBooking({ variables: { pets } });
        const petData = data.addBooking.pets;

        petData.forEach((item) => {
          idbPromise('booked', 'delete', item);
        });
      }

      setTimeout(() => {
        window.location.assign('/');
      }, 3000);
    }

    saveBooking();
  }, [addBooking]);

  return (
    <div>
      <Jumbotron>
        <h1>Success!</h1>
        <h2>Thank you for your purchase!</h2>
        <h2>You will now be redirected to the home page</h2>
      </Jumbotron>
    </div>
  );
}

export default Success;
