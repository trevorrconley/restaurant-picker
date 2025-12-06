const pool = require('./db');

// Fetch restaurants with recency weights
async function getWeightedRestaurants(userId, cuisine, byCuisine, decayFactor = 0.8) {
    const query = `
      SELECT
        r.name,
        r.restaurant_id,
        r.cuisine,
      EXTRACT(EPOCH FROM MAX(h.visited_at)) AS last_visit
      FROM restaurants r
      INNER JOIN user_planned_visits upv
        ON upv.restaurant_id = r.restaurant_id
        AND upv.user_id = $1
      LEFT JOIN user_history h
        ON h.restaurant_id = r.restaurant_id
        AND h.user_id = $1
      WHERE ($2::text IS NULL OR r.cuisine ILIKE $2::text)
      GROUP BY r.restaurant_id
      ORDER BY r.name ASC;
    `;

  const params = [userId, cuisine];

  const { rows } = await pool.query(query, params);
  const now = Date.now() / 1000; // seconds
  return rows.map(row => {
    const secondsSinceVisit = now - row.last_visit;
    const weight = Math.pow(decayFactor, secondsSinceVisit / (24 * 3600)); // decay per day
    return { id: row.restaurant_id, name: row.name, cuisine: row.cuisine, weight };
  });
}

// Weighted random selection
function selectWeighted(weightedList) {
    console.log(weightedList);
  const maxWeight = Math.max(...weightedList.map(r => r.weight));

  const inverted = weightedList.map(r => ({
    ...r,
    effectiveWeight: (maxWeight + 1) - r.weight
  }));

  const totalWeight = inverted.reduce((sum, r) => sum + r.effectiveWeight, 0);
  let r = Math.random() * totalWeight;

  for (const restaurant of inverted) {
    r -= restaurant.effectiveWeight;
    if (r <= 0) return restaurant;
  }

  console.log(inverted);

  return inverted[0];
}

// Record a visit with a specific date
async function markVisited(userId, restaurantId, visitedAt) {
//   if (!visitedAt) throw new Error('visitedAt date is required');

    if (visitedAt) {
    await pool.query(
        `INSERT INTO user_history (user_id, restaurant_id, visited_at)
        VALUES ($1, $2, $3)`,
        [userId, restaurantId, visitedAt]
    );
    } else {
    await pool.query(
        `INSERT INTO user_history (user_id, restaurant_id)
        VALUES ($1, $2)`,
        [userId, restaurantId]
    );
    }
}

// Optional: Record planned visits
async function addPlannedVisits(userId, restaurantIds) {
  if (!Array.isArray(restaurantIds)) throw new Error('restaurantIds must be an array');

  const queries = restaurantIds.map(id =>
    pool.query(
      `INSERT INTO user_planned_visits(user_id, restaurant_id, planned_at)
       VALUES($1, $2, NOW())
       ON CONFLICT(user_id, restaurant_id) DO NOTHING`,
      [userId, id]
    )
  );

  await Promise.all(queries);
}

async function getAllRestaurants() {
  const query = `
    SELECT r.name, r.cuisine
    FROM restaurants r
    ORDER BY r.name ASC
  `;

  try {
    const result = await pool.query(query);
    return result.rows; // returns an array of restaurants
  } catch (err) {
    console.error('Error fetching restaurants from db:', err);
    throw err;
  }
}

async function getAllVisits() {
  const query = `
    SELECT r.name, r.cuisine, h.visited_at
    FROM restaurants r
    JOIN user_history h on r.restaurant_id = h.restaurant_id
    ORDER BY h.visited_at ASC
  `;

  try {
    const result = await pool.query(query);
    return result.rows; // returns an array of restaurants
  } catch (err) {
    console.error('Error fetching restaurants from db:', err);
    throw err;
  }
}

module.exports = {
  getWeightedRestaurants,
  selectWeighted,
  markVisited,
  addPlannedVisits,
  getAllRestaurants,
  getAllVisits,
};