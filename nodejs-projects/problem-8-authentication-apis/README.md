# 🔐 Goodreads User Auth & Books API

This project is a RESTful API built using **Node.js**, **Express**, **SQLite**, and **bcrypt**. It manages user authentication with secure password hashing and allows users to fetch book data. Designed as a foundational backend service for a book-related application.

## 🚀 Features

- 📚 **Books API**: Retrieve a list of books from the database.
- 👤 **User Registration**: Securely register new users with hashed passwords.
- 🔑 **User Login**: Authenticate users by verifying credentials.

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: SQLite
- **Authentication**: bcrypt (for password hashing)
- **Database Driver**: `sqlite3`, `sqlite`

## 📁 Project Structure

project-root/

├── goodreads.db # SQLite database file

├── app.js # Main server file with all API logic

├── package.json # Project metadata and dependencies

├── .gitignore # Files/folders to ignore in Git

└── README.md # Project documentation


## 📦 Installation & Setup

1. Clone the repository:
   
   git clone https://github.com/Prathappve/my-nxtwave-learnings.git

   cd my-nxtwave-learnings/nodejs-projects/problem-8-authentication-apis

2. Install dependencies:
   
   npm install

3. Make sure the goodreads.db file exists with appropriate user and book tables.

4. Start the server:

   node app.js

5. 🟢 Server runs at: http://localhost:3000

📡 API Endpoints

📚 Books

| Method | Endpoint  | Description   |
| ------ | --------- | ------------- |
| GET    | `/books/` | Get all books |

👤 Users

| Method | Endpoint  | Description                     |
| ------ | --------- | ------------------------------- |
| POST   | `/users/` | Register a new user             |
| POST   | `/login/` | Log in with username & password |

🧪 Sample Request

Register User:

POST /users/
Content-Type: application/json

{
  "username": "Prathap",
  "name": "Prathap Palaparthi",
  "password": "prathap@1234",
  "gender": "male",
  "location": "Chilakaluripet"
}

Login User:

POST /login/
Content-Type: application/json

{
  "username": "Prathap",
  "password": "prathap@1234"
}

🔒 Security

1. Passwords are hashed using bcrypt before storing in the database.

2. SQL parameters are interpolated as raw strings for simplicity; prepared statements or parameter binding should be used in production to avoid SQL injection.

🙋‍♂️ About the Developer

Venkata Eswar Prathap Palaparthi - Aspiring MERN Stack Developer | Backend Enthusiast
🎓 Trained by NxtWave

💬 Feedback or Suggestions?

Feel free to star, fork, or raise issues. Collaboration welcome!
