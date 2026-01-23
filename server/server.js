const express = require('express');
const {
  getWeightedRestaurants,
  selectWeighted,
  markVisited,
  addPlannedVisits,
  getAllRestaurants,
  getAllVisits,
} = require('./restaurantSelector');
const {
  createUser,
  addRestaurant,
  getRestaurantByName,
} = require('./user.js');

const cors = require('cors');

const app = express();
app.use(cors()); // ✅ enable CORS for all routes
app.use(express.json());

// Suggest a restaurant
app.get('/restaurants/suggest/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId);
  const cuisine = req.body.cuisine;
  const byCuisine = req.body.byCuisine;
  try {
    const weightedRestaurants = await getWeightedRestaurants(userId, cuisine, byCuisine);
    const selected = selectWeighted(weightedRestaurants);
    if (byCuisine) {
      res.json({ cuisine: selected.cuisine });
    } else {
      if (selected === undefined) {
        res.json({ cuisine: `No planned visits matching ${cuisine}` });
      } else {
      res.json({ restaurantId: selected.id, name: selected.name });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Record a visit with specific date
app.post('/restaurants/:restaurantId/visit', async (req, res) => {
  const userId = parseInt(req.body.userId);
  const restaurantId = parseInt(req.params.restaurantId);
  const { visitedAt } = req.body;

  // if (!visitedAt) return res.status(400).send('visitedAt date is required');

  try {
    await markVisited(userId, restaurantId, visitedAt);
    res.json({ success: true, restaurantId, visitedAt });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Add planned visits
app.post('/restaurants/planned', async (req, res) => {
  const { userId, restaurantIds, restaurantName } = req.body;

  if (!userId || !Array.isArray(restaurantIds)) {
    return res.status(400).send('Invalid request');
  }

  try {
    if (restaurantIds.length == 0) {
      // check for restaurant name. if not presented, return error
      if (restaurantName == null) { 
        res.json({ success: false})
      } else {
        // look up restaurant by name to retrieve the id
        const restaurant = await getRestaurantByName(restaurantName);
      }
    }
    await addPlannedVisits(userId, restaurantIds);
    res.json({ success: true, planned: restaurantIds });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Create user
app.post('/user', async (req, res) => {
  const { username, firstName, lastName } = req.body;

  if (!username || !firstName || !lastName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newUserId = await createUser(username, firstName, lastName);
    res.json({ success: true, id: newUserId });
  } catch (err) {
    if (err.message === 'Username already exists') {
      return res.status(400).json({ error: err.message });
    }

    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Add restaurant
app.post('/restaurant', async (req, res) => {
  const { name, cuisine } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newRestaurantId = await addRestaurant(name, cuisine);
    res.json({ success: true, id: newRestaurantId });
  } catch (err) {
    console.error('Error creating restaurant:', err);
    res.status(500).json({ error: 'Error creating restaurant' });
  }
});

// Get all restaurants
app.get('/restaurants', async (req, res) => {
  try {
    const restaurants = await getAllRestaurants();
    console.log(restaurants);
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch restaurants' });
  }
});

// Get all visits
app.get('/visits', async (req, res) => {
  try {
    const restaurants = await getAllVisits();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch visits' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
