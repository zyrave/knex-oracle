const express = require('express');

// use process.env variables to keep private variables
require('dotenv').config();

// Express Middleware
const helmet = require('helmet'); // crates headers that protect from attacks (security)
const cors = require('cors'); // allows/disallows cross-site communication
const morgan = require('morgan'); // logs requests

const PORT = process.env.PORT || 5000;

// App
const app = express();

// App Middleware
const whitelist = ['http://localhost:3000'];
const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined')); // use 'tiny' of 'combined'

// App Routes
app.use('/', [require('./routes/AuthRoutes'), require('./routes/UserRoutes'), require('./routes/ProductRoutes')]);

// App Middleware - Error Handling
app.use(require('./middleware/errorMiddleware').all);

// App Server Connection
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`)).on('error', err => console.error(err));
