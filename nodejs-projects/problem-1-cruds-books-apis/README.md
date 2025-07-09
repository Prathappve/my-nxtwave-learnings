📚 Goodreads Books API

Welcome to the Goodreads Books API, a lightweight backend service built using Node.js, Express, and SQLite. This API helps manage a digital library of books, allowing operations like viewing, adding, updating, and deleting book records, as well as filtering them by author.

🚀 Project Overview

This project simulates core functionalities of a simplified Goodreads system, handling book data through RESTful APIs. Whether you want to build a frontend app, connect a mobile interface, or just practice backend development—this project gives you a solid base.

🛠️ Tech Stack:

1.Backend Framework: Express.js

2.Database: SQLite

3.ORM: SQLite with sqlite and sqlite3 libraries

4.Language: JavaScript (ES6+)

📂 Project Structure

project-root/

├── goodreads.db           # SQLite database

├── .gitignore

├── goodreads.http         # For testing

├── pnpm-lock.yaml         # Locks exact package versions

├── queries.txt            # preloaded queries

├── index.js               # Main server file

├── package.json           # Dependencies and scripts

└── README.md              # Project documentation

📌 Setup Instructions:

1. Clone the Repository
   
      git clone https://github.com/<your-username>/goodreads-books-api.git

      cd goodreads-books-api

2. Install Dependencies

      npm install

3. Start the Server
   
      node index.js

Server runs at: 🟢 http://localhost:3000/

Make sure the goodreads.db file exists in the root folder with the required schema.

📖 API Endpoints

API-1: Get All Books ==> GET /books/

Response:

        [
            {
                "book_id": 2,
                "title": "Harry Potter and the Deathly Hallows",
                "author_id": 1,
                "rating": 4.62,
                "rating_count": 2944470,
                "review_count": 68081,
                "description": "Harry Potter is leaving Privet Drive for the last time.",
                "pages": 759,
                "date_of_publication": "July 21st 2007",
                "edition_language": "English",
                "price": 800,
                "online_stores": "Amazon, Audible,Google play, Indigo,Abebooks"
            },
            ...
        ]    

API-2: Fetches details of a specific book based on its ID ==> GET /books/:book_id

Response:

        {
            "book_id": 6,
            "title": "A Study in Scarlet",
            "author_id": 2,
            "rating": 4.15,
            "rating_count": 345591,
            "review_count": 11684,
            "description": "A Study in Scarlet is the first published story of one of the most famous literary detectives of all time, Sherlock Holmes.",
            "pages": 123,
            "date_of_publication": "January 1st 2005",
            "edition_language": "English",
            "price": 850,
            "online_stores": "Amazon, Apple Books,Google play, Indigo,Abebooks,Walmart eBooks"
        }

API-3: Returns the newly created book ID ==> POST /books/

Request-body:

            {
              "title": "Harry Potter and the Order of the Phoenix",
              "authorId": 1,
              "rating": 4.62,
              "ratingCount": 126559,
              "reviewCount": 611,
              "description": "There is a door at the end of a silent corridor.",
              "pages": 352,
              "dateOfPublication": "May 1st 2003",
              "editionLanguage": "English",
              "price": 850,
              "onlineStores": "Amazon,Audible,Indigo,Apple Books,Google Play,IndieBound"
            }

Response:

        {
            "book_id": 42
        }

API-4: Updates details of a specific book by ID ==> PUT /books/:bookId

Request-body:

            {
              "title": "Harry Potter and the Order of the Phoenix",
              "authorId": 1,
              "rating": 5,
              "ratingCount": 1000000,
              "reviewCount": 711,
              "description": "There is a door at the end of a silent corridor.",
              "pages": 352,
              "dateOfPublication": "May 1st 2003",
              "editionLanguage": "English",
              "price": 850,
              "onlineStores": "Amazon,Audible,Indigo,Apple Books,Google Play,IndieBound"
            }

Response: Book updated successfully

API-5: Removes a book record from the database by its ID ==> DELETE /books/:book_id

Response: Book deleted successfully

API-6: Returns a list of books written by a specific author ==> GET /authors/:authorId/books/

Response:

        [
            {
                "book_id": 25,
                "title": "Twilight",
                "author_id": 6,
                "rating": 3.61,
                "rating_count": 5185243,
                "review_count": 106918,
                "description": "About three things I was absolutely positive.",
                "pages": 501,
                "date_of_publication": "September 6th 2016",
                "edition_language": "English",
                "price": 1400,
                "online_stores": "Amazon, Apple Books,Google play, Indigo,Abebooks,Walmart eBooks,Audible"
            },
            ...
        ]    

📌 Developer Notes:

1.The server will only start if the database connection is successfully established.

2.All book records are stored in a book table in the goodreads.db SQLite database.

3.Responses are returned in JSON format and follow consistent naming conventions.

4.No frontend is included—this is purely a backend API project ready for integration.

🙋‍♂️ About the Developer

Venkata Eswar Prathap Palaparthi

Aspiring MERN Stack Developer | Backend Enthusiast

💬 Feedback or Suggestions?

Feel free to star, fork, or raise issues. Collaboration welcome!
