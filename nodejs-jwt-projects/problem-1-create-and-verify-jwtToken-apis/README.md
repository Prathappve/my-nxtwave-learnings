# 📚 Goodreads Authentication API

This is a secure backend API for a Goodreads-style application built with **Node.js**, **Express**, **SQLite**, **JWT (JSON Web Token)**, and **bcrypt**. The API supports user registration, login, and protected access to a list of books.

---

## 🚀 Features

- ✅ User Registration with hashed password
  
- 🔐 User Login with JWT token generation
  
- 🔒 Protected route for accessing books (JWT required)
  
- 💾 SQLite database integration
  
- 🧠 Clean and understandable code structure

---

## 🛠️ Tech Stack

- **Node.js** (Runtime environment)
  
- **Express.js** (Web framework
  
- **SQLite** with `sqlite3` and `sqlite` libraries
  
- **bcrypt** for password hashing
  
- **jsonwebtoken** for secure authentication

## 📁 Project Structure

├── goodreads.db # SQLite database file

├── index.js # Main server file

├── package.json # Dependencies and scripts

└── README.md # Project documentation

## 📦 Installation

1. **Clone the repository**
  
   git clone https://github.com/Prathappve/my-nxtwave-learnings.git
   
   cd my-nxtwave-learnings/nodejs-jwt-projects/problem-1-create-and-verify-jwtToken-apis

2. Install dependencies

   npm install

3. Run the server

   node index.js

4. Server will start at: http://localhost:3000/

⚠️ Make sure the SQLite database (goodreads.db) is set up with the required tables (user, book).

🔑 API Endpoints

1. User Registration: POST /users/
      
   Body:
   
           {
             "username": "johndoe",
             "name": "John Doe",
             "password": "mypassword",
             "gender": "male",
             "location": "Hyderabad"
           }

   Response:
   
            200 OK: User created successfully
               
            400 Bad Request: User already exists

2. User Login: POST /login/

   Body:

        {
          "username": "johndoe",
          "password": "mypassword"
        }

   Response:

           {
             "jwtToken": "your-jwt-token"
           }

   Errors:
   
          400 Invalid User
          
          400 Invalid Password

3. Get Books (Protected Route): GET /books/

   Headers: Authorization: Bearer <jwt_token>

   Response:

            [
              {
                "book_id": 1,
                "title": "Atomic Habits",
                "author": "James Clear",
                "rating": 4.8
              },
              ...
            ]

   Errors:

          401 Invalid JWT Token
          
          401 Missing JWT Token

🔐 Security Details

1. Passwords are hashed using bcrypt before storing in the database.

2. JWTs are signed with a secret key and can be configured to expire (recommended for production).

🧪 Testing the API:

1. Use Postman, Thunder Client, or curl:

   1. Register a user

   2. Log in to receive a JWT token

   3. Access the /books/ route using:

      Authorization: Bearer <token>

🙋‍♂️ About the Developer

Venkata Eswar Prathap Palaparthi

Aspiring MERN Stack Developer | Backend Enthusiast

🎓 Trained by NxtWave

💬 Feedback or Suggestions?

Feel free to star, fork, or raise issues. Collaboration welcome!
