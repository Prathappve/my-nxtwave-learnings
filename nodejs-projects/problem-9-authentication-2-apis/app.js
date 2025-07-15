const express = require('express')
const app = express()
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
const bcrypt = require('bcrypt')
const dbPath = path.join(__dirname, 'userData.db')
app.use(express.json())
let db = null

const InitialiseDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server is running at http://localhost:3000/')
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}

InitialiseDBAndServer()

//API-1: Create user in user table
//Scenario-1: If the username already exists, Response: User already exists
//Scenario-2: If the registrant provides a password with less than 5 characters, Response: Password is too short
//Scenario-3: Successful registration of the registrant, Response: User created successfully
app.post('/register', async (request, response) => {
  const {username, name, password, gender, location} = request.body
  const hashedPassword = await bcrypt.hash(password, 10)

  const getUserQuery = `
    SELECT * FROM user 
    WHERE username = '${username}'`
  const dbUser = await db.get(getUserQuery)

  if (dbUser === undefined) {
    if (password.length < 5) {
      response.status(400).send('Password is too short')
    } else {
      const userEntryQuery = `
      INSERT INTO user (username, name, password, gender, location)
      VALUES (
        '${username}',
        '${name}',
        '${hashedPassword}',
        '${gender}',
        '${location}'
      )`
      await db.run(userEntryQuery)
      response.send('User created successfully')
    }
  } else {
    response.status(400).send('User already exists')
  }
})

//API-2: Login user API
//Scenario-1: If an unregistered user tries to login, Response: Invalid user
//Scenario-2: If the user provides incorrect password, Response: Invalid password
//Scenario-3: Successful login of the user, Response: Login success!

app.post('/login', async (request, response) => {
  const {username, password} = request.body
  const getUserQuery = `
  SELECT * FROM user WHERE username = '${username}'`
  const dbUser = await db.get(getUserQuery)

  if (dbUser === undefined) {
    response.status(400).send('Invalid user')
  } else {
    const isPasswordMatched = await bcrypt.compare(password, dbUser.password)

    if (isPasswordMatched === true) {
      response.send('Login success!')
    } else {
      response.status(400).send('Invalid password')
    }
  }
})
