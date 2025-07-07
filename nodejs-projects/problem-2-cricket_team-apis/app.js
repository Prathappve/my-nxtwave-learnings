const express = require('express')
const app = express()
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
app.use(express.json())
const dbPath = path.join(__dirname, 'cricketTeam.db')
let db = null

//Initialising connection between server and database
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

//API-1: Returns a list of all players in the team
app.get('/players/', async (request, response) => {
  const getPlayersQuery = `
  SELECT * 
  FROM cricket_team 
  ORDER BY player_id`
  const players = await db.all(getPlayersQuery)

  // Formatting the response to match the required format
  const requiredPlayerFormat = players.map(player => ({
    playerId: player.player_id,
    playerName: player.player_name,
    jerseyNumber: player.jersey_number,
    role: player.role,
  }))
  response.send(requiredPlayerFormat)
})

//API-2: Creates a new player in the team (database)
app.post('/players/', async (request, response) => {
  const playerDetails = request.body
  const {playerName, jerseyNumber, role} = playerDetails
  const createPlayerQuery = `
  INSERT INTO cricket_team (player_name, jersey_number, role) 
  VALUES ("${playerName}", ${jerseyNumber}, "${role}")`
  await db.run(createPlayerQuery)
  response.send('Player Added to Team')
})

//API-3: Returns a player based on a player ID
app.get('/players/:playerId/', async (request, response) => {
  const {playerId} = request.params
  const desiredPlayerQuery = `
  SELECT * FROM cricket_team 
  WHERE player_id = ${playerId}`
  const player = await db.get(desiredPlayerQuery)

  //Formatting returned player details into expected format
  if (player) {
    const expectedFormatOfPlayer = {
      playerId: player.player_id,
      playerName: player.player_name,
      jerseyNumber: player.jersey_number,
      role: player.role,
    }
    response.send(expectedFormatOfPlayer)
  } else {
    response.status(404).send('Player not found')
  }
})

//API-4: Updates the details of a player in the team (database) based on the player ID
app.put('/players/:playerId/', async (request, response) => {
  const {playerId} = request.params
  const playerDetails = request.body
  const {playerName, jerseyNumber, role} = playerDetails
  const updatePlayerQuery = `
  UPDATE cricket_team 
  SET player_name = "${playerName}", jersey_number = ${jerseyNumber}, role = "${role}" 
  WHERE player_id = ${playerId}`
  await db.run(updatePlayerQuery)
  response.send('Player Details Updated')
})

//API-5: Deletes a player from the team (database) based on the player ID
app.delete('/players/:playerId/', async (request, response) => {
  const {playerId} = request.params
  const deletePlayerQuery = `
  DELETE FROM cricket_team
  WHERE player_id = ${playerId}`
  await db.run(deletePlayerQuery)
  response.send('Player Removed')
})

module.exports = app
