const { AuthenticationError } = require('apollo-server-express');
const { User, Pet, PetType, Booking } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    petTypes: async () => {
      return await PetType.find();
    },
    pets: async (parent, { petType, name }) => {
      const params = {};

      if (petType) {
        params.petType = petType;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }

      return await Pet.find(params).populate('petType');
    },
    pet: async (parent, { _id }) => {
      return await Pet.findById(_id).populate('petType');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'bookings.pets',
          populate: 'petType'
        });

        user.bookings.sort((a, b) => b.bookingDate - a.bookingDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    booking: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'bookings.pets',
          populate: 'petType'
        });

        return user.bookings.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const booking = new Booking({ pets: args.pets });
      const line_items = [];

      const { pets } = await booking.populate('pets');

      console.log(pets)

      for (let i = 0; i < pets.length; i++) {
        const pet = await stripe.products.create({
          name: pets[i].name,
          description: pets[i].description,
          images: [`${url}/images/${pets[i].image}`]
        });

        const price = await stripe.prices.create({
          product: pet.id,
          unit_amount: pets[i].price * 100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addBooking: async (parent, { pets }, context) => {
      if (context.user) {
        const booking = new Booking({ pets });

        await User.findByIdAndUpdate(context.user._id, { $push: { bookings: booking } });

        return booking;
      }

      throw new AuthenticationError('Not logged in');
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    updatePet: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Pet.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
