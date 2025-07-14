const express = require('express')
const path = require('path')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const bcrypt = require('bcrypt')
const app = express()
app.use(express.json())
const dbPath = path.join(__dirname, 'goodreads.db')

let db = null

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server Running at http://localhost:3000/')
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}
initializeDBAndServer()

//API-1: Get Books API
app.get('/books/', async (request, response) => {
  const getBooksQuery = `
  SELECT
    *
  FROM
    book
  ORDER BY
    book_id;`
  const booksArray = await db.all(getBooksQuery)
  response.send(booksArray)
})

//API-2: Create user API
app.post('/users/', async (request, response) => {
  const {username, name, password, gender, location} = request.body
  const hashedPassword = await bcrypt.hash(password, 10)
  const checkUserQuery = `
  SELECT * FROM user 
  WHERE username = '${username}'`
  const dbUser = await db.get(checkUserQuery)
  if (dbUser === undefined) {
    //Create user in table
    const enterUserQuery = `
    INSERT INTO user (username, name, password, gender, location)
    VALUES 
    (
      '${username}',
      '${name}',
      '${hashedPassword}',
      '${gender}',
      '${location}'
    )`
    await db.run(enterUserQuery)
    response.send('User Created Successfully')
  } else {
    //User already exists
    response.status(400).send('Username already exists')
  }
})

//API-3: Login user API
app.post('/login/', async (request, response) => {
  const {username, password} = request.body
  const getUserQuery = `
  SELECT * FROM user 
  WHERE username = '${username}'`
  const dbUser = await db.get(getUserQuery)
  if (dbUser === undefined) {
    //User not exists
    response.status(400).send('Invalid user')
  } else {
    //Checks password and get user
    const isPasswordMatched = await bcrypt.compare(password, dbUser.password)
    if (isPasswordMatched === true) {
      response.send('Login Success')
    } else {
      response.status(400).send('Invalid Password')
    }
  }
})
