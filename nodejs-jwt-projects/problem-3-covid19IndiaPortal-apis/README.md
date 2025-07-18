# 🦠 COVID-19 India Portal API

This is a secure RESTful API built using **Node.js**, **Express**, and **SQLite** to manage COVID-19 data across Indian states and districts. It features **JWT-based user authentication**, role-protected endpoints, and full CRUD operations for districts and stats.

---

## 🚀 Features

- 🔐 Secure Login with JWT Authentication
  
- 📊 Fetch & Manage State and District Data
  
- ✅ Middleware Protection for Sensitive Routes
  
- 📈 Aggregated COVID-19 Statistics by State
  
- 🔁 Full CRUD Operations for Districts

---

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: SQLite
- **Auth**: JWT (jsonwebtoken), bcrypt
- **Driver**: `sqlite3`, `sqlite` package

---

## 📁 Project Structure

covid19-india-portal/

├── covid19IndiaPortal.db # SQLite DB file

├── app.js # Main Express server

├── package.json # Project dependencies

└── README.md # Project overview


---

## 🔧 Installation

1. **Clone the repository**  
   
   git clone https://github.com/Prathappve/my-nxtwave-learnings.git
   
   cd my-nxtwave-learnings/nodejs-jwt-projects/problem-3-covid19IndiaPortal-apis

2. Install dependencies - npm install

3. Start the server - nodemon app.js

4. Server will run at: http://localhost:3000/

🔐 Authentication

This project uses JWT (JSON Web Token) to protect sensitive routes.

**State Table**

| Columns    | Type    |
| ---------- | ------- |
| state_id   | INTEGER |
| state_name | TEXT    |
| population | INTEGER |

**District Table**

| Columns       | Type    |
| ------------- | ------- |
| district_id   | INTEGER |
| district_name | TEXT    |
| state_id      | INTEGER |
| cases         | INTEGER |
| cured         | INTEGER |
| active        | INTEGER |
| deaths        | INTEGER |

#### Sample Valid User Credentials

```
{
  "username": "christopher_phillips",
  "password": "christy@123"
}
```

📌 API Endpoints

### API 1

#### Path: `/login/`

#### Method: `POST`

**Request**

```
{
  "username": "christopher_phillips",
  "password": "christy@123"
}
```

- **Scenario 1**

  - **Description**:

    If an unregistered user tries to login

  - **Response**
    - **Status code**
      ```
      400
      ```
    - **Body**
      ```
      Invalid user
      ```

- **Scenario 2**

  - **Description**:

    If the user provides an incorrect password

  - **Response**
    - **Status code**
      ```
      400
      ```
    - **Body**
      ```
      Invalid password
      ```

- **Scenario 3**

  - **Description**:

    Successful login of the user

  - **Response**

    Return the JWT Token

    ```
    {
      "jwtToken": "ak2284ns8Di32......"
    }
    ```

### Authentication with Token

- **Scenario 1**

  - **Description**:

    If the token is not provided by the user or an invalid token

  - **Response**
    - **Status code**
      ```
      401
      ```
    - **Body**
      ```
      Invalid JWT Token
      ```

- **Scenario 2**
  After successful verification of token proceed to next middleware or handler

### API 2

#### Path: `/states/`

#### Method: `GET`

#### Description:

Returns a list of all states in the state table

#### Response

```
[
  {
    "stateId": 1,
    "stateName": "Andaman and Nicobar Islands",
    "population": 380581
  },

  ...
]
```

### API 3

#### Path: `/states/:stateId/`

#### Method: `GET`

#### Description:

Returns a state based on the state ID

#### Response

```
{
  "stateId": 8,
  "stateName": "Delhi",
  "population": 16787941
}
```

### API 4

#### Path: `/districts/`

#### Method: `POST`

#### Description:

Create a district in the district table, `district_id` is auto-incremented

#### Request

```
{
  "districtName": "Bagalkot",
  "stateId": 3,
  "cases": 2323,
  "cured": 2000,
  "active": 315,
  "deaths": 8
}
```

#### Response

```
District Successfully Added
```

### API 5

#### Path: `/districts/:districtId/`

#### Method: `GET`

#### Description:

Returns a district based on the district ID

#### Response

```
{
  "districtId": 322,
  "districtName": "Palakkad",
  "stateId": 17,
  "cases": 61558,
  "cured": 59276,
  "active": 2095,
  "deaths": 177
}
```

### API 6

#### Path: `/districts/:districtId/`

#### Method: `DELETE`

#### Description:

Deletes a district from the district table based on the district ID

#### Response

```
District Removed

```

### API 7

#### Path: `/districts/:districtId/`

#### Method: `PUT`

#### Description:

Updates the details of a specific district based on the district ID

#### Request

```
{
  "districtName": "Nadia",
  "stateId": 3,
  "cases": 9628,
  "cured": 6524,
  "active": 3000,
  "deaths": 104
}
```

#### Response

```

District Details Updated

```

### API 8

#### Path: `/states/:stateId/stats/`

#### Method: `GET`

#### Description:

Returns the statistics of total cases, cured, active, deaths of a specific state based on state ID

#### Response

```
{
  "totalCases": 724355,
  "totalCured": 615324,
  "totalActive": 99254,
  "totalDeaths": 9777
}

```

<br/>

🔒 Error Handling:

1. Invalid Token → 401: Invalid JWT Token

2. Invalid User/Password → 400: Invalid user or Invalid password

3. Missing Data → 400: No State/District Found

🙋‍♂️ About the Developer

Venkata Eswar Prathap Palaparthi

Aspiring MERN Stack Developer | Backend Enthusiast

🎓 Trained by NxtWave


💬 Feedback or Suggestions?

Feel free to star, fork, or raise issues. Collaboration welcome!
