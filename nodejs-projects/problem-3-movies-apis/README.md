# 🎬 Movies APIs – Node.js + Express + SQLite Project

A powerful backend API built with **Node.js**, **Express**, and **SQLite** to manage a movies database with support for **directors** and **movie listings**.

This project demonstrates RESTful API design, relational database handling, CRUD operations, and clean response formatting — all in a modular Node.js environment.

> 📌 Project developed as part of the NxtWave Full Stack Career Track

---

## 🛠️ Tech Stack

| Tech        | Purpose                        |
|-------------|---------------------------------|
| Node.js     | JavaScript runtime              |
| Express.js  | Web framework                   |
| SQLite      | Lightweight embedded database   |
| sqlite3     | Node driver for SQLite          |
| REST APIs   | Resource-based architecture     |

---

## 📁 Folder Structure

problem-3-movies-apis/
├── app.js # Server logic and API routes
├── moviesData.db # SQLite database
├── moviesData.http # HTTP testing file (optional)
├── package.json # Dependencies
├── .gitignore # Git ignore config
├── pnpm-lock.yaml # pnpm lock file
└── README.md # Project documentation


---

## 🔗 API Endpoints

### GET `/movies/`
Returns all movie names.

```json
[
  { "movieName": "Pushpa" },
  { "movieName": "RRR" }
]

➕ POST /movies/
Creates a new movie entry.

Request Body:
{
  "directorId": 3,
  "movieName": "Salaar",
  "leadActor": "Prabhas"
}
✅ Response: "Movie Successfully Added"

🔍 GET /movies/:movieId/
Fetches details of a movie by ID.

{
  "movieId": 5,
  "directorId": 2,
  "movieName": "Eega",
  "leadActor": "Nani"
}

✏️ PUT /movies/:movieId/
Updates movie details by ID.

Request Body:
{
  "directorId": 2,
  "movieName": "Bahubali",
  "leadActor": "Prabhas"
}
✅ Response: "Movie Details Updated"

❌ DELETE /movies/:movieId/
Deletes a movie by ID.
✅ Response: "Movie Removed"

🎬 GET /directors/
Returns a list of all directors.

[
  { "directorId": 1, "directorName": "S. S. Rajamouli" },
  { "directorId": 2, "directorName": "Sukumar" }
]

🎥 GET /directors/:directorId/movies/
Fetches all movie names directed by a specific director.

[
  { "movieName": "Pushpa" },
  { "movieName": "Arya" }
]

⚙️ How to Run This Locally
1. Clone the repository

git clone https://github.com/Prathappve/my-nxtwave-learnings.git
cd my-nxtwave-learnings/nodejs-projects/problem-3-movies-apis

2. Install dependencies

npm install

3. Start the server

node app.js
🟢 Server running at: http://localhost:3000

📌 Developer Notes:
1. Ensure moviesData.db exists in the same folder as app.js
2. movie and director are two tables with relational data
3. Input validation can be enhanced with Joi or express-validator
4. Great base for expanding to token-based auth or frontend integration

🙋‍♂️ About the Developer:
Venkata Eswar Prathap Palaparthi
Aspiring MERN Stack Developer | Backend Enthusiast
🎓 Trained by NxtWave

💬 Feedback or Suggestions?
Feel free to star, fork, or raise issues. Collaboration welcome!
