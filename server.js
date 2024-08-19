require('dotenv').config();

const express = require('express');
const sequelize = require('./config/connection');
const path = require('path');
const routes = require('./controllers');
const postRoutes = require('./controllers/api/post-routes'); // Import postRoutes
const dashboardRoutes = require('./controllers/dashboard-routes');

const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require('./utils/helpers');
const morgan = require('morgan'); // For HTTP request logging

const app = express();
const PORT = process.env.PORT || 3000;

// Log environment variables for debugging
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

// Configure session store
const sessionStore = new SequelizeStore({
  db: sequelize,
});

const sess = {
  secret: process.env.SESSION_SECRET || 'defaultsecret',
  cookie: { 
    maxAge: 1800000, // 30 minutes
    secure: process.env.NODE_ENV === 'production' // Use secure cookies in production
  },
  resave: false,
  saveUninitialized: true,
  store: sessionStore
};

// Use session middleware
app.use(session(sess));

// Sync session store with database
sessionStore.sync()
  .then(() => {
    console.log('Session table has been created or verified');
  })
  .catch((err) => {
    console.error('Error creating session table:', err);
  });

// Handlebars initialization
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(morgan('dev')); // Log HTTP requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
// Handle favicon requests
app.get('/favicon.ico', (req, res) => res.status(204)); // No Content

// Use routes
app.use(routes);
// Use the post routes
app.use('/api', postRoutes); // Now postRoutes is defined
app.use('/dashboard', dashboardRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Internal Server Error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// 404 Not Found handling
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server after syncing the database
sequelize.authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
    return sequelize.sync({ force: false }); // Use migrations to handle schema changes
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Now Listening on ${PORT}`));
  })
  .catch(err => {
    console.error('Error setting up the server:', err);
  });

app.get('/health', (req, res) => {
  res.send('Server is running');
});
