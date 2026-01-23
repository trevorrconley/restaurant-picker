# 🍽️ Restaurant Picker

A full-stack application that helps you decide **where to eat** when you can’t make up your mind.  
Restaurants you’ve visited recently are **less likely** to be selected, while ones you haven’t been to in a while become **more likely** — making sure you don’t fall into the same takeout routine.

---

## 🚀 Features

- **Weighted restaurant selection:** Recently visited restaurants have lower weight, so they’re chosen less often.  
- **User visit tracking:** Keeps a history of where and when you’ve eaten.  
- **Dynamic probabilities:** The more you visit a place, the less frequently it appears in future picks.  
- **Future ideas:**  
  - Filter by cuisine type (e.g., sushi, Mexican, pizza)  
  - Choose between sit-down, fast-food, or casual  
  - Support for multiple users and shared preferences  
  - Dockerized deployment  

---

## 🧠 Tech Stack

| Layer | Technology |
|-------|-------------|
| Backend | Node.js, Express |
| Database | PostgreSQL |
| ORM / Query Layer | `pg` (native PostgreSQL driver) |
| Frontend | React-Native (Expo) |
| Dev Environment | Docker (WIP) |

---

## 🧩 Project Structure

```
restaurant-picker/
├── client/              # (frontend - placeholder for now)
├── server/              # Express app and route handlers
│   ├── index.js
│   ├── routes/
│   └── controllers/
├── db/                  # Database schema and seed scripts
│   ├── init.sql
│   └── seed.js
├── docker-compose.yml   # To orchestrate backend and database (WIP)
└── README.md
```

---

## ⚙️ Setup & Running Locally

### Prerequisites
- Node.js (v18+ recommended)
- PostgreSQL (local or remote)
- `npm` or `yarn`

### 1. Clone the repository
```bash
git clone https://github.com/trevorrconley/restaurant-picker.git
cd restaurant-picker
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the project root:
```
DATABASE_URL=postgres://username:password@localhost:5432/restaurant_picker
PORT=4000
```

### 4. Initialize the database
Run the SQL setup script inside `db/`:
```bash
psql -U <username> -d restaurant_picker -f db/init.sql
```

(Optional) Seed sample data:
```bash
node db/seed.js
```

### 5. Start the server
```bash
npm start
```

Server should now be running at **http://localhost:4000**

---

## 🧮 How the Weighting Works

1. Each restaurant is stored with a **visit count** and **last visited date**.  
2. When selecting a restaurant:
   - A **base weight** is calculated for each entry.  
   - The weight decreases the more recently the restaurant was visited.  
   - A random value is then used to select among all restaurants according to those weights.  
3. This makes older, less-visited places more likely to be picked — but every restaurant still has a chance.

---

## 📡 API Endpoints (WIP)

| Method | Endpoint | Description |
|--------|-----------|-------------|
| `GET` | `/restaurants` | Get list of all restaurants |
| `POST` | `/restaurants` | Add a new restaurant |
| `POST` | `/restaurants/select` | Randomly selects a restaurant using weighted logic |
| `POST` | `/restaurants/:id/visit` | Record a visit for a restaurant |

---

## 🧭 Future Improvements

- [ ] Add frontend UI for restaurant selection  
- [ ] Implement filters for cuisine type and restaurant category  
- [ ] Add authentication for multiple users  
- [ ] Improve Docker setup for easier deployment  
- [ ] Integrate visualization for visit history and weighting  

---

## 📖 License

This project is open source and available under the [MIT License](LICENSE).

---

### 👤 Author

**Trevor Conley**  
[GitHub](https://github.com/trevorrconley)
