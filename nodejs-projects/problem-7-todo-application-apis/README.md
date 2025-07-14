# ✅ Todo Application APIs

This is a simple RESTful API built with **Node.js**, **Express.js**, and **SQLite** that allows users to manage todo items. It supports full CRUD operations with filtering, searching, and conditional updates.

## 🚀 Features

- Get todos with search and filter options (`status`, `priority`, `search_q`)
- Get a todo by ID
- Add a new todo
- Update a specific field (`status`, `priority`, or `todo`) of a todo
- Delete a todo by ID

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: SQLite (using `sqlite3` and `sqlite` packages)

## 📁 Project Structure

project-root/

├── app.js # Main server file with API logic

├── todoApplication.db # SQLite database file

├── package.json # Project configuration and dependencies

├── .gitignore # Files and folders to ignore in Git

├── README.md # Project documentation

1. Clone the repository:
   
   git clone https://github.com/Prathappve/my-nxtwave-learnings/nodejs-projects/problem-7-todo-application-apis.git
   
   cd todo-application-apis
   
2. Install dependencies:

   npm install
   
3. Start the server:

   node app.js

4. 🟢 Server will run at: http://localhost:3000

📡 API Endpoints

| Method | Endpoint          | Description                     |
| ------ | ----------------- | ------------------------------- |
| GET    | `/todos/`         | Get todos with optional filters |
| GET    | `/todos/:todoId/` | Get a specific todo by ID       |
| POST   | `/todos/`         | Add a new todo                  |
| PUT    | `/todos/:todoId/` | Update a field in a todo        |
| DELETE | `/todos/:todoId/` | Delete a todo by ID             |

Example Request:

GET /todos/?status=IN%20PROGRESS&priority=HIGH&search_q=meeting

📌 Notes

1. Data validation is minimal. For production, consider adding Joi or middleware validation.

2. This app uses raw SQL queries with parameters to prevent SQL injection.

🙋‍♂️ About the Developer

Venkata Eswar Prathap Palaparthi - Aspiring MERN Stack Developer | Backend Enthusiast

💬 Feedback or Suggestions?

Feel free to star, fork, or raise issues. Collaboration welcome!
