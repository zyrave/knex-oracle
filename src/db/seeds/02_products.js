const db = require('../../config/db');

const data = [
  {
    name: 'Air Jordan 14 Retro',
    category: 'Shoes',
    price: 299,
    quantity: 5,
    image: 'Air Jordan 14 Retro.webp',
    isActive: 1,
    created_by: 1,
  },
  {
    name: 'Reebok Sweet Road 2',
    category: 'Shoes',
    price: 120,
    quantity: 12,
    image: 'Reebok Sweet Road 2.webp',
    isActive: 1,
    created_by: 2,
  },
];

exports.seed = async () => {
  await db('products').del();
  await db('products').insert(data);
};
