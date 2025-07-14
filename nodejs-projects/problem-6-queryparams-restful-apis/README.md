# 📚 Working with Query parameters, Path parameters and Goodreads Books APIs

This project is a RESTful API server built using **Node.js**, **Express.js**, and **SQLite**. It provides complete CRUD operations to manage a collection of books and their associated authors. The API supports features like pagination, search, filtering, and sorting.

## 🚀 Features

- Get a list of books with:
  - Pagination (`limit`, `offset`)
  - Search (`search_q`)
  - Sorting (`order_by`, `order`)
- Get a single book by ID
- Add a new book to the database
- Update an existing book by ID
- Delete a book by ID
- Get all books by a specific author

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
  
- **Database**: SQLite
  
- **Dependencies**: sqlite3, path, express


## 📁 Project Structure

project-root/

├── goodreads.db # SQLite database file

├── goodreads.http # http request queries

├── index.js # Main server file with all routes and logic

├── .gitignore # Excludes files from version control

├── package.json # Node.js project configuration file

├── pnpm-lock.yaml # Locks exact package versions

├── queries.txt # Stores SQL query statements

└── README.md # Project documentation


## 📦 Installation & Setup

1. Clone the repository:
   
   git clone https://github.com/Prathappve/my-nxtwave-learnings/nodejs-projects/problem-6-queryparams-restful-apis.git

   cd problem-6-queryparams-restful-apis

2. Install dependencies:

   npm install   

3. Ensure the goodreads.db SQLite file is in the root directory with the required book table schema.

4. Start the server:

   node index.js

5. 🟢 Server runs at: http://localhost:3000

| Method | Endpoint                    | Description                      |
| ------ | --------------------------- | -------------------------------- |
| GET    | `/books/`                   | List books with optional filters |
| GET    | `/books/:bookId/`           | Get a specific book by ID        |
| POST   | `/books/`                   | Add a new book                   |
| PUT    | `/books/:bookId/`           | Update a book by ID              |
| DELETE | `/books/:bookId/`           | Delete a book by ID              |
| GET    | `/authors/:authorId/books/` | List books by a specific author  |

Example Request: GET /books/?limit=5&offset=0&search_q=history&order_by=rating&order=DESC

📌 Note

1. Make sure to handle SQL injection and data validation in production.

2. The current implementation uses raw SQL queries—ORMs like Sequelize or Prisma can be added later for scalability.

🙋‍♂️ About the Developer

Venkata Eswar Prathap Palaparthi - Aspiring MERN Stack Developer | Backend Enthusiast

📬 License

This project is licensed for learning and educational purposes. 

💬 Feedback or Suggestions?

Feel free to star, fork, or raise issues. Collaboration welcome!
