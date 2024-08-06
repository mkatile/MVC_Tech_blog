require('dotenv').config();

const express = require('express');
const sequelize = require('./config/connection');
const path = require('path');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require('./utils/helpers');
const morgan = require('morgan'); // For HTTP request logging
const cors = require('cors'); // For CORS support

const app = express();
const PORT = process.env.PORT || 3001;

// Log environment variables for debugging
console.log('PORT:', PORT);
console.log('DB_URL:', process.env.DB_URL);
console.log('SESSION_SECRET:', process.env.SESSION_SECRET);

// Setup session
const sess = {
  secret: process.env.SESSION_SECRET || 'defaultsecret',
  cookie: { maxAge: 180000, secure: process.env.NODE_ENV === 'production' },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// Handlebars initialization
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(morgan('dev')); // Log HTTP requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors()); // Enable CORS if needed
app.use(session(sess));

// Use routes
app.use(routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Internal Server Error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start server after syncing the database
sequelize.authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
    return sequelize.sync({ force: false });
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Now Listening on ${PORT}`));
  })
  .catch(err => {
    console.error('Error setting up the server:', err);
  });
