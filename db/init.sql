-- List of all users
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE (username)
);

-- List of all restaurants
CREATE TABLE restaurants (
    restaurant_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    cuisine VARCHAR(255),
    UNIQUE (name)
);

-- User visit history
CREATE TABLE user_history (
    user_id INT NOT NULL,
    restaurant_id INT NOT NULL,
    visited_at TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY(user_id, restaurant_id, visited_at),
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Optional: Planned visits
CREATE TABLE user_planned_visits (
    user_id INT NOT NULL,
    restaurant_id INT NOT NULL,
    planned_at TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY(user_id, restaurant_id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id)
);