# COVID19 India Backend APIs

A backend application built using **Node.js**, **Express.js**, and **SQLite** that simulates COVID19 statistics for Indian states and districts. It provides RESTful APIs for managing states and districts, including tracking cases, recoveries, active counts, and deaths.

---

## 📂 Project Structure

covid19India/

├── .gitignore

├── app.js

├── covid19India.db

├── covid19India.http

├── package.json

├── pnpm-lock.yaml

└── README.md

---

## ⚙️ Tech Stack

- **Node.js**
- **Express.js**
- **SQLite**
- **sqlite3** & **sqlite** (driver & promise wrapper)
- **RESTful APIs**

---

## 📦 Installation

1. Clone the respository
   
   git clone https://github.com/Prathappve/my-nxtwave-learnings.git

   cd my-nxtwave-learnings/nodejs-projects/problem-4-covid19India-apis

3. Install dependencies

   npm install

4. Start the server

   node app.js
   
The server will run at: 🟢 Server running at: http://localhost:3000

🗃️ Database Tables

🟦 state Table
| Column      | Type    |
| ----------- | ------- |
| state\_id   | INTEGER |
| state\_name | TEXT    |
| population  | INTEGER |

🟨 district Table
| Column         | Type    |
| -------------- | ------- |
| district\_id   | INTEGER |
| district\_name | TEXT    |
| state\_id      | INTEGER |
| cases          | INTEGER |
| cured          | INTEGER |
| active         | INTEGER |
| deaths         | INTEGER |

🧪 API Endpoints
📍 API 1: Get all states ==> GET /states/

Response:
        
        [
          {
            "stateId": 1,
            "stateName": "Andhra Pradesh",
            "population": 49586757
          },
          ...
        ]

📍 API 2: Get state by ID ==> GET /states/:stateId/

 Response:
         
         {
          "stateId": 2,
          "stateName": "Karnataka",
          "population": 61095297
        }
📍 API 3: Add a new district ==> POST /districts/

Request Body:
            
            {
              "districtName": "Bagalkot",
              "stateId": 3,
              "cases": 2323,
              "cured": 2000,
              "active": 315,
              "deaths": 8
            }

Response: District Successfully Added

📍 API 4: Get district by ID ==> GET /districts/:districtId/

Response:
        
        {
          "districtId": 3,
          "districtName": "Tumkur",
          "stateId": 2,
          "cases": 1987,
          "cured": 1789,
          "active": 180,
          "deaths": 18
        }

📍 API 5: Delete district by ID ==> DELETE /districts/:districtId/

Response: District Removed

📍 API 6: Update district by ID ==> PUT /districts/:districtId/

Request Body:
            
            {
              "districtName": "Updated Name",
              "stateId": 1,
              "cases": 3000,
              "cured": 2500,
              "active": 400,
              "deaths": 100
            }

Response: District Details Updated

📍 API 7: Get state statistics ==> GET /states/:stateId/stats/

Response:
        
        {
          "totalCases": 724355,
          "totalCured": 615324,
          "totalActive": 99254,
          "totalDeaths": 9777
        }

📍 API 8: Get state name for a given district ==> GET /districts/:districtId/details/

Response:
        
        {
          "stateName": "Kerala"
        }

💡 Developer Notes:

1.All APIs follow clean REST conventions.

2.Uses parameterized queries (where applicable) to prevent SQL injection.

3.Project is great for practicing API development, database integration, and Express.js patterns.

🧑‍💻 Author

Venkata Eswar Prathap Palaparthi

Aspiring Full-Stack Developer | Passionate about clean code and scalable apps.

💬 Feedback or Suggestions?

Feel free to star, fork, or raise issues. Collaboration welcome!
