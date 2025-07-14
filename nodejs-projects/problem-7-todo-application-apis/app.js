const express = require('express')
const sqlite3 = require('sqlite3')
const {open} = require('sqlite')
const path = require('path')

const app = express()
app.use(express.json())

const dbPath = path.join(__dirname, 'todoApplication.db')
let db = null

// Initialize DB and server
const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })

    // Create table if it doesn't exist
    await db.run(`
      CREATE TABLE IF NOT EXISTS todo (
        id INTEGER PRIMARY KEY,
        todo TEXT,
        priority TEXT,
        status TEXT
      )
    `)

    app.listen(3000, () => {
      console.log('Server is running at http://localhost:3000/')
    })
  } catch (error) {
    console.error(`DB Error: ${error.message}`)
    process.exit(1)
  }
}

initializeDbAndServer()

// API 1 - Get Todos with Filters
app.get('/todos/', async (request, response) => {
  const {status, priority, search_q = ''} = request.query

  let query = `
    SELECT * FROM todo
    WHERE todo LIKE '%${search_q}%'
  `

  if (status && priority) {
    query += ` AND status = '${status}' AND priority = '${priority}'`
  } else if (status) {
    query += ` AND status = '${status}'`
  } else if (priority) {
    query += ` AND priority = '${priority}'`
  }

  const todos = await db.all(query)
  response.send(todos)
})

// API 2 - Get Todo by ID
app.get('/todos/:todoId/', async (request, response) => {
  const {todoId} = request.params
  const todo = await db.get('SELECT * FROM todo WHERE id = ?', [todoId])
  response.send(todo)
})

// API 3 - Add Todo
app.post('/todos/', async (request, response) => {
  const {id, todo, priority, status} = request.body
  const query = `
    INSERT INTO todo (id, todo, priority, status)
    VALUES (?, ?, ?, ?)
  `
  await db.run(query, [id, todo, priority, status])
  response.send('Todo Successfully Added')
})

// API 4 - Update Todo
app.put('/todos/:todoId/', async (request, response) => {
  const {todoId} = request.params
  const requestBody = request.body

  let updateColumn = ''
  let query = ''

  if (requestBody.status) {
    updateColumn = 'Status Updated'
    query = `UPDATE todo SET status = ? WHERE id = ?`
    await db.run(query, [requestBody.status, todoId])
  } else if (requestBody.priority) {
    updateColumn = 'Priority Updated' // <-- Corrected here
    query = `UPDATE todo SET priority = ? WHERE id = ?`
    await db.run(query, [requestBody.priority, todoId])
  } else if (requestBody.todo) {
    updateColumn = 'Todo Updated'
    query = `UPDATE todo SET todo = ? WHERE id = ?`
    await db.run(query, [requestBody.todo, todoId])
  }

  response.send(updateColumn)
})

// API 5 - Delete Todo
app.delete('/todos/:todoId/', async (request, response) => {
  const {todoId} = request.params
  await db.run('DELETE FROM todo WHERE id = ?', [todoId])
  response.send('Todo Deleted')
})

module.exports = app
