🔐 User Authentication API

This project provides a basic user registration and login system with secure password hashing using bcrypt, built with Node.js, Express.js, and SQLite.

📁 Tech Stack

1. Node.js & Express – Backend server and routing

2. SQLite – Lightweight relational database

3. bcrypt – Secure password hashing

📦 API Endpoints

1. 🚀 Register User:
   
    Method: POST
    
    Endpoint: /register
    
    Request Body:
    
                {
                  "username": "john_doe",
                  "name": "John Doe",
                  "password": "secure123",
                  "gender": "male",
                  "location": "Hyderabad"
                }
    Register API Scenarios:
    
    1. ✅ Success: "User created successfully"
    
    2. ❌ Username exists: "User already exists"
    
    3. ❌ Password too short (<5): "Password is too short"



2. 🔑 Login User
   
    Method: POST
    
    Endpoint: /login
    
    Request Body:
  
                {
                "username": "john_doe",
                "password": "secure123"
                }
  
    Scenarios:
  
    1. ✅ Success: "Login success!"
    
    2. ❌ User not found: "Invalid user"
    
    3. ❌ Wrong password: "Invalid password"

🔐 Security Notes: 

1. Passwords are hashed with bcrypt before storing in the database.

🛠️ To Run the Project

1. Install dependencies:

   npm install

2. Ensure the database userData.db exists with a user table:

   CREATE TABLE user (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   username TEXT UNIQUE,
   name TEXT,
   password TEXT,
   gender TEXT,
   location TEXT
   );

3. Start the server:

   node app.js

4. Server runs on: http://localhost:3000

🙋‍♂️ About the Developer

Venkata Eswar Prathap Palaparthi

Aspiring MERN Stack Developer | Backend Enthusiast

🎓 Trained by NxtWave

💬 Feedback or Suggestions?

Feel free to star, fork, or raise issues. Collaboration welcome!
