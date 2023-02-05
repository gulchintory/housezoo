const db = require('./connection');
const { User, Pet, PetType } = require('../models');

db.once('open', async () => {
  await PetType.deleteMany();

  const petTypes = await PetType.insertMany([
    { name: 'Cats' },
    { name: 'Dogs' },
    { name: 'Birds' },
    { name: 'Reptiles' },
    { name: 'Ginepigs' },
    { name: 'Bunnies' },
    { name: 'Others' },
  ]);

  console.log('petTypes are seeded');

  await Pet.deleteMany();

  const pets = await Pet.insertMany([
    {
      name: 'Cats House',
      description:
        'You can pet cats in this house.',
      image: 'cats.png',
      petType: petTypes[0]._id,
      price: 250,
      quantity: 11
    },
    {
      name: 'Dogs House',
      description:
        'You can pet dogs in this house.',
      image: 'dogs.png',
      petType: petTypes[1]._id,
      price: 250,
      quantity: 12
    },
    {
      name: 'Birds House',
      petType: petTypes[2]._id,
      description:
        'You can pet birds in this house.',
      image: 'birds.png',
      price: 200,
      quantity: 18
    },
    {
      name: 'Reptiles House',
      petType: petTypes[3]._id,
      description:
        'You can reptiles dogs in this house.',
      image: 'reptiles.png',
      price: 500,
      quantity: 5
    },
    {
      name: 'Ginepigs House',
      petType: petTypes[4]._id,
      description:
        'You can pet ginepigs in this house.',
      image: 'ginepigs.png',
      price: 120,
      quantity: 1
    },
    {
      name: 'Bunnies House',
      petType: petTypes[5]._id,
      description:
        'You can pet bunnies in this house.',
      image: 'bunnies.png',
      price: 100,
      quantity: 1
    },
    {
      name: 'Others House',
      petType: petTypes[6]._id,
      description:
        'Check for other animaals.',
      image: 'others.png',
      price: 400,
      quantity: 12
    }
  ]);

  console.log('pets are seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Gulcin',
    lastName: 'Koca',
    email: 'gulcin@gmail.com',
    password: 'pass12345678',
    bookings: [
      {
        pets: [pets[0]._id, pets[0]._id, pets[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Masal',
    lastName: 'Koca',
    email: 'masal@gmail.com',
    password: 'pass12345678'
  });

  await User.create({
    firstName: 'Masal2',
    lastName: 'Koca2',
    email: 'masal2@gmail.com',
    password: 'pass12345678'
  });

  console.log('users are seeded');

  process.exit();
});
