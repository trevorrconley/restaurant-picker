const pool = require('./db');

// Fetch restaurants with recency weights
async function getWeightedRestaurants(userId, decayFactor = 0.8) {
  const query = `
    SELECT r.restaurant_id, r.name,
           EXTRACT(EPOCH FROM COALESCE(MAX(h.visited_at), '1970-01-01')) AS last_visit
    FROM restaurants r
    LEFT JOIN user_history h 
      ON r.restaurant_id = h.restaurant_id AND h.user_id = $1
    GROUP BY r.restaurant_id
  `;

  const { rows } = await pool.query(query, [userId]);

  const now = Date.now() / 1000; // seconds
  return rows.map(row => {
    const secondsSinceVisit = now - row.last_visit;
    const weight = Math.pow(decayFactor, secondsSinceVisit / (24 * 3600)); // decay per day
    return { id: row.restaurant_id, name: row.name, weight };
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

module.exports = {
  getWeightedRestaurants,
  selectWeighted,
  markVisited,
  addPlannedVisits
};