const express = require('express')
const app = express()
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
const dbPath = path.join(__dirname, 'cricketMatchDetails.db')
app.use(express.json())
let db = null

const InitializeServerAndDb = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server is running at http://localhost:3000')
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
  }
}

InitializeServerAndDb()

//API-1: Returns a list of all the players in the player table
app.get('/players/', async (request, response) => {
  const getPlayersQuery = `
  SELECT * FROM player_details`
  const players = await db.all(getPlayersQuery)
  const formattedPlayers = players.map(player => ({
    playerId: player.player_id,
    playerName: player.player_name,
  }))
  response.send(formattedPlayers)
})

//API-2: Returns a specific player based on the player ID
app.get('/players/:playerId/', async (request, response) => {
  const {playerId} = request.params
  const getPlayerQuery = `
  SELECT * FROM player_details WHERE player_id = ${playerId}`
  const player = await db.get(getPlayerQuery)
  if (player) {
    const formattedPlayer = {
      playerId: player.player_id,
      playerName: player.player_name,
    }
    response.send(formattedPlayer)
  } else {
    response.status(404).send('Player Not Found')
  }
})

//API-3: Updates the details of a specific player based on the player ID
app.put('/players/:playerId/', async (request, response) => {
  const {playerId} = request.params
  const {playerName} = request.body
  const updatePlayerQuery = `
  UPDATE player_details 
  SET player_name = '${playerName}'
  WHERE player_id = ${playerId}`
  await db.run(updatePlayerQuery)
  response.send('Player Details Updated')
})

//API-4: Returns the match details of a specific match
app.get('/matches/:matchId/', async (request, response) => {
  const {matchId} = request.params
  const getMatchDetailsQuery = `
  SELECT * FROM match_details 
  WHERE match_id = ${matchId}`
  const matchDetails = await db.get(getMatchDetailsQuery)
  if (matchDetails) {
    const formattedMatch = {
      matchId: matchDetails.match_id,
      match: matchDetails.match,
      year: matchDetails.year,
    }
    response.send(formattedMatch)
  } else {
    response.status(404).send('Match Not Found')
  }
})

//API-5: Returns a list of all the matches of a player
app.get('/players/:playerId/matches', async (request, response) => {
  const {playerId} = request.params
  const getMatchesQuery = `
  SELECT 
  match_details.match_id AS matchId,
  match_details.match AS match,
  match_details.year AS year
  FROM 
  player_match_score
  JOIN 
  match_details 
  ON 
  player_match_score.match_id = match_details.match_id
  WHERE 
  player_match_score.player_id = ${playerId};
`
  const playerMatchesDetails = await db.all(getMatchesQuery)
  response.send(playerMatchesDetails)
})

//API-6: Returns a list of players of a specific match
app.get('/matches/:matchId/players', async (request, response) => {
  const {matchId} = request.params
  const getPlayersQuery = `
  SELECT player_details.player_id AS playerId,
  player_details.player_name as playerName 
  FROM 
  player_match_score
  JOIN 
  player_details
  ON
  player_match_score.player_id = player_details.player_id
  WHERE
  player_match_score.match_id = ${matchId}`
  const matchPlayersDetails = await db.all(getPlayersQuery)
  response.send(matchPlayersDetails)
})

//API-7: Returns the statistics of the total score, fours, sixes of a specific player based on the player ID
app.get('/players/:playerId/playerScores', async (request, response) => {
  const {playerId} = request.params
  const getStatsQuery = `
  SELECT 
  player_details.player_id AS playerId,
  player_details.player_name AS playerName,
  IFNULL(SUM(player_match_score.score), 0) AS totalScore,
  IFNULL(SUM(player_match_score.fours), 0) AS totalFours,
  IFNULL(SUM(player_match_score.sixes), 0) AS totalSixes
  FROM player_details
  LEFT JOIN player_match_score 
  player_match_score
  ON 
  player_details.player_id = player_match_score.player_id
  WHERE 
  player_details.player_id = ${playerId}
  GROUP BY player_details.player_id`
  const playerStats = await db.get(getStatsQuery)
  response.send(playerStats)
})

module.exports = app
