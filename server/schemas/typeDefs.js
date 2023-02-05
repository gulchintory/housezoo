const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type PetType {
    _id: ID
    name: String
  }

  type Pet {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    petType: PetType
  }

  type Booking {
    _id: ID
    bookingDate: String
    pets: [Pet]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    bookings: [Booking]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    petTypes: [PetType]
    pets(petType: ID, name: String): [Pet]
    pet(_id: ID!): Pet
    user: User
    booking(_id: ID!): Booking
    checkout(pets: [ID]!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addBooking(pets: [ID]!): Booking
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updatePet(_id: ID!, quantity: Int!): Pet
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
