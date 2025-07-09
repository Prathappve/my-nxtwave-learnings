const express = require('express')
const app = express()
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
app.use(express.json())
const dbPath = path.join(__dirname, 'covid19India.db')
let db = null

//Initializing connection between data base and server
const InitializeDbAndServer = async () => {
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
    process.exit(1)
  }
}

InitializeDbAndServer()

//API-1: Returns a list of all states in the state table
app.get('/states/', async (request, response) => {
  const getStatesQuery = `
  SELECT * FROM state`
  const states = await db.all(getStatesQuery)
  const statesFormat = states.map(state => ({
    stateId: state.state_id,
    stateName: state.state_name,
    population: state.population,
  }))
  response.send(statesFormat)
})

//API-2: Returns a state based on the state ID
app.get('/states/:stateId/', async (request, response) => {
  const {stateId} = request.params
  const getStateQuery = `
  SELECT * FROM state WHERE state_id = ${stateId}`
  const state = await db.get(getStateQuery)
  if (state) {
    const stateFormat = {
      stateId: state.state_id,
      stateName: state.state_name,
      population: state.population,
    }
    response.send(stateFormat)
  } else {
    response.status(404).send('State Not Found')
  }
})

//API-3: Create a district in the district table
app.post('/districts/', async (request, response) => {
  const districtDetails = request.body
  const {districtName, stateId, cases, cured, active, deaths} = districtDetails
  const createDistrictQuery = `
  INSERT INTO district (district_name, state_id, cases, cured, active, deaths)
  VALUES ('${districtName}', ${stateId}, ${cases}, ${cured}, ${active}, ${deaths})`
  await db.run(createDistrictQuery)
  response.send('District Successfully Added')
})

// API 4: Get district by ID
app.get('/districts/:districtId/', async (request, response) => {
  const {districtId} = request.params

  const getDistrictQuery = `SELECT * FROM district WHERE district_id = ?;`
  const district = await db.get(getDistrictQuery, [districtId])

  if (district) {
    response.send({
      districtId: district.district_id,
      districtName: district.district_name,
      stateId: district.state_id,
      cases: district.cases,
      cured: district.cured,
      active: district.active,
      deaths: district.deaths,
    })
  } else {
    response.status(404).send('District Not Found')
  }
})

// API 5: Delete district by ID
app.delete('/districts/:districtId/', async (request, response) => {
  const {districtId} = request.params

  const deleteDistrictQuery = `DELETE FROM district WHERE district_id = ?;`
  const result = await db.run(deleteDistrictQuery, [districtId])

  if (result.changes > 0) {
    response.send('District Removed')
  } else {
    response.status(404).send('District Not Found')
  }
})

// API 6: Update district details by ID
app.put('/districts/:districtId/', async (request, response) => {
  const {districtId} = request.params
  const {districtName, stateId, cases, cured, active, deaths} = request.body

  const updateDistrictQuery = `
    UPDATE district
    SET district_name = ?, state_id = ?, cases = ?, cured = ?, active = ?, deaths = ?
    WHERE district_id = ?;
  `
  const result = await db.run(updateDistrictQuery, [
    districtName,
    stateId,
    cases,
    cured,
    active,
    deaths,
    districtId,
  ])

  if (result.changes > 0) {
    response.send('District Details Updated')
  } else {
    response.status(404).send('District Not Found')
  }
})

// API 7: Get statistics for a state (total cases, cured, active, deaths)
app.get('/states/:stateId/stats/', async (request, response) => {
  const {stateId} = request.params

  const getStatsQuery = `
    SELECT 
      SUM(cases) AS totalCases, 
      SUM(cured) AS totalCured, 
      SUM(active) AS totalActive, 
      SUM(deaths) AS totalDeaths
    FROM district 
    WHERE state_id = ?;
  `
  const stats = await db.get(getStatsQuery, [stateId])

  if (stats) {
    response.send({
      totalCases: stats.totalCases,
      totalCured: stats.totalCured,
      totalActive: stats.totalActive,
      totalDeaths: stats.totalDeaths,
    })
  } else {
    response.status(404).send('State Not Found or No Districts Found')
  }
})

//API-8: Returns an object containing the state name of a district based on the district ID
app.get('/districts/:districtId/details/', async (request, response) => {
  const {districtId} = request.params
  const getStateQuery = `
  SELECT * FROM district 
  JOIN state ON district.state_id = state.state_id 
  WHERE district_id = ${districtId}`
  const state = await db.get(getStateQuery)
  if (state) {
    response.send({stateName: state.state_name})
  } else {
    response.status(404).send('District Not Found')
  }
})

module.exports = app
