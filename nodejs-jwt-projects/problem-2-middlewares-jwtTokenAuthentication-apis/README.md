# 📚 Goodreads Clone - Authentication-Based Book API

This is a backend project built using **Node.js**, **Express.js**, and **SQLite** that mimics a simplified Goodreads-like application. It includes user authentication using **JWT (JSON Web Tokens)**, user registration, login, and access-controlled routes to fetch book and profile information.

---

## 🚀 Features

- ✅ User Registration & Secure Password Storage (bcrypt)
  
- 🔐 JWT Authentication (Login required for protected routes)
  
- 👤 Authenticated User Profile
  
- 📖 Book Listing & Book Details
  
- 🛡️ Middleware for Access Control

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: SQLite
- **Authentication**: JWT (jsonwebtoken), bcrypt
- **ORM**: SQLite with `sqlite3` and `sqlite` modules

---

## 📁 Project Structure

project-root/

├── goodreads.db # SQLite Database file

├── index.js # Main server file

├── package.json # NPM dependencies

└── README.md # You're here!


---

## 🔧 Installation & Setup

1. **Clone this repo**  
   
   git clone https://github.com/Prathappve/my-nxtwave-learnings.git
   
   cd my-nxtwave-learnings/nodejs-jwt-projects/problem-3-covid19IndiaPortal-apis

2. Install dependencies: npm install

3. Start the server: nodemon index.js

4. Server will run on: http://localhost:3000/

Sample JWT Token for understanding: bczkjgjasgckjascb4v5vsdc.zxcgisugsbciasgcihjacgkjdhf  

🔐 Authentication Workflow:

1. Users must register and then login to receive a JWT token.

2. This token must be included in the Authorization header for protected routes:

   Authorization: Bearer bczkjgjasgckjascb4v5vsdc.zxcgisugsbciasgcihjacgkjdhf

📌 API Endpoints

1. 🔑 Register a New User - POST /users/

   Body:

        {
          "username": "venkat_dev",
          "name": "Venkat",
          "password": "securePass123",
          "gender": "Male",
          "location": "Hyderabad"
        }

2. 🔓 Login - POST /users/

   Body:

        {
          "username": "venkat_dev",
          "password": "securePass123"
        }

   Response:

            {
              "jwtToken": "bczkjgjasgckjascb4v5vsdc.zxcgisugsbciasgcihjacgkjdhf"
            }

3. 👤 Get User Profile (Protected) - GET /profile/

   Headers:
            Authorization: Bearer bczkjgjasgckjascb4v5vsdc.zxcgisugsbciasgcihjacgkjdhf

4. 📚 Get All Books (Protected) - GET /books/

   Headers:
            Authorization: Bearer bczkjgjasgckjascb4v5vsdc.zxcgisugsbciasgcihjacgkjdhf

5. 📘 Get Book by ID (Protected) - GET /books/:bookId/

   Headers:
            Authorization: Bearer bczkjgjasgckjascb4v5vsdc.zxcgisugsbciasgcihjacgkjdhf

⚠️ Security Notes

1. Passwords are stored securely using bcrypt hashing.

2. Routes are protected using JWT middleware.

3. Always handle errors and avoid sending sensitive information in responses.

4. SQL queries use dynamic strings — consider switching to parameterized queries to prevent SQL injection in a production environment.

📞 Contact:

If you'd like to collaborate or need help, feel free to reach out!

Developer: Venkata Eswar Prathap Palaparthi

Email: prathappve.workspace@gmail.com

GitHub: Prathappve

📝 License: This project is open source

💬 Feedback or Suggestions?

Feel free to star, fork, or raise issues. Collaboration welcome!
