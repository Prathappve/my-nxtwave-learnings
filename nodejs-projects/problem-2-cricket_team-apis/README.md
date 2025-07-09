# 🏏 Cricket Team Management API – Node.js + Express + SQLite

A fully functional RESTful API to manage a cricket team's player records.  
Built using **Node.js**, **Express.js**, and **SQLite**, this project demonstrates efficient **CRUD operations**, **database handling**, and **RESTful design principles**.

> Designed with real-world backend structure and best practices  
> Ideal for small-scale apps, prototyping, or learning full-stack development

---

## Key Features

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

API-1: Returns a list of all players in the team ==> GET /players/

Response:

        [
          {
            "playerId": 1,
            "playerName": "Virat Kohli",
            "jerseyNumber": 18,
            "role": "Batsman"
          }
        ]

API-2: Creates a new player in the team (database). player_id is auto-incremented ==> POST /players/

Request Body:

            {
              "playerName": "Rohit Sharma",
              "jerseyNumber": 45,
              "role": "Batsman"
            }

Response: Player Added to Team

API-3: Returns a player based on a player ID ==> GET /players/:playerId/

Response: Player details by ID

API-4: Updates the details of a player in the team (database) based on the player ID ==> PUT /players/:playerId/

Request Body:
            {
              "playerName": "Hardik Pandya",
              "jerseyNumber": 33,
              "role": "All-rounder"
            }

Response: Player Details Updated

API-5: Deletes a player from the team (database) based on the player ID ==> DELETE /players/:playerId/

Response: Player Removed


🧑‍💻 Developer Notes

Here’s a quick walkthrough of how this project works behind the scenes:

1.This is a simple Node.js + Express backend that manages a cricket team using a local SQLite database (cricketTeam.db).

2.The server starts only after a successful connection to the database, thanks to the async InitialiseDBAndServer()         function. No DB? No server!

3.I’ve used express.json() middleware to handle incoming JSON data, which makes working with request bodies super smooth.

4.You’ll find 5 well-structured REST APIs here, handling full CRUD operations:

      1.GET /players/ → Fetch all players

      2.POST /players/ → Add a new player

      3.GET /players/:playerId/ → Get player details by ID

      4.PUT /players/:playerId/ → Update a player's info

      5.DELETE /players/:playerId/ → Remove a player

All responses are carefully formatted in camelCase to keep things frontend-friendly.

The code is clean, beginner-friendly, and easy to extend — whether you're adding new fields, features, or even scaling it up.


🧑‍💻 Author

Venkata Eswar Prathap Palaparthi

Aspiring Full-Stack Developer | Passionate about clean code and scalable apps.


💬 Feedback or Suggestions?

Feel free to star, fork, or raise issues. Collaboration welcome!
