# 🏏 Cricket Team Management API – Node.js + Express + SQLite

A fully functional RESTful API to manage a cricket team's player records.  
Built using **Node.js**, **Express.js**, and **SQLite**, this project demonstrates efficient **CRUD operations**, **database handling**, and **RESTful design principles**.

> ✅ Designed with real-world backend structure and best practices  
> ✅ Ideal for small-scale apps, prototyping, or learning full-stack development

---

## 🚀 Key Features

- Get full team player list
- Add new players with position and jersey number
- Fetch, update, or delete any player by ID
- Clean response formatting and error handling

---

## 🛠️ Tech Stack

| Technology | Purpose                    |
|------------|-----------------------------|
| Node.js    | JavaScript runtime           |
| Express.js | API framework                |
| SQLite     | Lightweight relational DB    |
| sqlite3    | Node bindings for SQLite     |
| REST API   | CRUD operations              |

---

## 📁 Project Structure

problem-2-cricket_team-apis/
├── app.js # Main server logic and routes
├── cricketTeam.db # SQLite database file
├── package.json # Dependencies and scripts
├── .gitignore # Git tracking rules
└── README.md # You're reading it!


---

## 🔗 API Endpoints

### `GET /players/`
- **Returns**: List of all players
```json
[
  {
    "playerId": 1,
    "playerName": "Virat Kohli",
    "jerseyNumber": 18,
    "role": "Batsman"
  }
]

--> POST /players/
### Request Body:

{
  "playerName": "Rohit Sharma",
  "jerseyNumber": 45,
  "role": "Batsman"
}

Returns: "Player Added to Team"

--> GET /players/:playerId/
Returns: Player details by ID

--> PUT /players/:playerId/
Request Body:
{
  "playerName": "Hardik Pandya",
  "jerseyNumber": 33,
  "role": "All-rounder"
}

Returns: "Player Details Updated"

DELETE /players/:playerId/
Returns: "Player Removed"
