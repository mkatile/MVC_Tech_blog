const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const dashboardRoutes = require('./dashboard-routes');

// Use the routes
router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);

// Handle 404 errors (should be placed after all other routes)
router.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Handle 500 errors (should be placed after all other middleware)
router.use((err, req, res, next) => {
  console.error('Internal Server Error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

router.get('/test', (req, res) => {
  res.send('Server is working');
});

module.exports = router;


