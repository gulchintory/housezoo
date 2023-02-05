import { gql } from '@apollo/client';

export const QUERY_PETS = gql`
  query getPets($petType: ID) {
    pets(petType: $petType) {
      _id
      name
      description
      price
      quantity
      image
      petType {
        _id
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($pets: [ID]!) {
    checkout(pets: $pets) {
      session
    }
  }
`;

export const QUERY_ALL_PETS = gql`
  {
    pets {
      _id
      name
      description
      price
      quantity
      petType {
        name
      }
    }
  }
`;

export const QUERY_PETTYPES = gql`
  {
    petTypes {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      bookings {
        _id
        bookingDate
        pets {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;
