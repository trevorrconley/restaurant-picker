const pool = require('./db');

// Create a user
async function createUser(username, firstName, lastName) {

    try {
        const result = await pool.query(
            `INSERT INTO users (username, first_name, last_name)
            VALUES ($1, $2, $3)
            RETURNING user_id`,
            [username, firstName, lastName]
        );
        return result.rows[0].user_id; // return userIdf
    } catch (err) {
        if (err.code === '23505') {
            // 23505 = unique_violation
            throw new Error('Username already exists');
        }
    throw err; // rethrow other errors
    }
}

// Add a restaurant
async function addRestaurant(name, cuisine) {

    try {
        const result = await pool.query(
            `INSERT INTO restaurants(name, cuisine)
            VALUES($1, $2)
            ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
            RETURNING restaurant_id`,
            [name, cuisine]
        );

        return result.rows[0].restaurant_id; // return restaurant_id
    } catch (err) {
        if (err.code === '23505') {
            // 23505 = unique_violation
            throw new Error('Restaurant with this name already exists');
        }
    throw err; // rethrow other errors
    }
}

module.exports = {
  createUser,
  addRestaurant,
};