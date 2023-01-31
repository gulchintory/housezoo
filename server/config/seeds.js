const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Cats' },
    { name: 'Dogs' },
    { name: 'Birds' },
    { name: 'Reptiles' },
    { name: 'Ginepigs' },
    { name: 'Bunnies' },
    { name: 'Others' },
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Cats House',
      description:
        'You can pet cats in this house.',
      image: 'cats.png',
      category: categories[0]._id,
      price: 250,
      quantity: 11
    },
    {
      name: 'Dogs House',
      description:
        'You can pet dogs in this house.',
      image: 'dogs.png',
      category: categories[1]._id,
      price: 250,
      quantity: 12
    },
    {
      name: 'Birds House',
      category: categories[2]._id,
      description:
        'You can pet birds in this house.',
      image: 'birds.png',
      price: 200,
      quantity: 18
    },
    {
      name: 'Reptiles House',
      category: categories[3]._id,
      description:
        'You can reptiles dogs in this house.',
      image: 'reptiles.png',
      price: 500,
      quantity: 5
    },
    {
      name: 'Ginepigs House',
      category: categories[4]._id,
      description:
        'You can pet ginepigs in this house.',
      image: 'ginepigs.png',
      price: 120,
      quantity: 1
    },
    {
      name: 'Bunnies House',
      category: categories[5]._id,
      description:
        'You can pet bunnies in this house.',
      image: 'bunnies.png',
      price: 100,
      quantity: 1
    },
    {
      name: 'Others House',
      category: categories[6]._id,
      description:
        'Check for other animaals.',
      image: 'others.png',
      price: 400,
      quantity: 12
    }
  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Gulcin',
    lastName: 'Koca',
    email: 'gulcin@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Masal',
    lastName: 'Koca',
    email: 'masal@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
