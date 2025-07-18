const express = require('express')
const app = express()
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
app.use(express.json())

const dbPath = path.join(__dirname, 'covid19IndiaPortal.db')
let db = null

const InitializeDBAndServer = async () => {
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

InitializeDBAndServer()

//Authentication with Token
//Scenario-1: If the token is not provided by the user or an invalid token, Response: Invalid JWT Token
//Scenario-2: After successful verification of token proceed to next middleware or handler

const jwtTokenAuthentication = async (request, response, next) => {
  let jwtToken
  const authHeader = request.headers['authorization']

  if (authHeader !== undefined) {
    jwtToken = authHeader.split(' ')[1]

    if (jwtToken === undefined) {
      response.status(401).send('Invalid JWT Token')
    } else {
      jwt.verify(jwtToken, 'MY_SECRET_KEY', (error, payload) => {
        if (error) {
          response.status(401).send('Invalid JWT Token')
        } else {
          next()
        }
      })
    }
  } else {
    response.status(401).send('Invalid JWT Token')
  }
}

//API-1: Login user API
//Scenario-1: If an unregistered user tries to login, Response: Invalid user
//Scenario-2: If the user provides an incorrect password, Response: Invalid password
//Scenario-3: Successful login of the user, Response: Return the JWT Token

app.post('/login', async (request, response) => {
  const {username, password} = request.body
  const getUserQuery = `
  SELECT * FROM user
  WHERE username = '${username}'`
  const dbUser = await db.get(getUserQuery)

  if (dbUser !== undefined) {
    const isPasswordMatched = await bcrypt.compare(password, dbUser.password)
    if (isPasswordMatched === true) {
      const payload = {username: username}
      const jwtToken = jwt.sign(payload, 'MY_SECRET_KEY')
      response.send({jwtToken})
    } else {
      response.status(400).send('Invalid password')
    }
  } else {
    response.status(400).send('Invalid user')
  }
})

//API-2: Returns a list of all states in the state table
app.get('/states/', jwtTokenAuthentication, async (request, response) => {
  const getStatesQuery = `
  SELECT * FROM state`
  const states = await db.all(getStatesQuery)
  const formattedStates = states.map(eachState => ({
    stateId: eachState.state_id,
    stateName: eachState.state_name,
    population: eachState.population,
  }))
  response.send(formattedStates)
})

//API-3: Returns a state based on the state ID
app.get(
  '/states/:stateId/',
  jwtTokenAuthentication,
  async (request, response) => {
    const {stateId} = request.params
    const getStateQuery = `
  SELECT * FROM state
  WHERE state_id = ${stateId}`
    const state = await db.get(getStateQuery)

    if (state) {
      const formattedState = {
        stateId: state.state_id,
        stateName: state.state_name,
        population: state.population,
      }
      response.send(formattedState)
    } else {
      response.status(400).send('No State Found')
    }
  },
)

//API-4: Create a district in the district table
app.post('/districts/', jwtTokenAuthentication, async (request, response) => {
  const {districtName, stateId, cases, cured, active, deaths} = request.body
  const enterDistrictDetails = `
  INSERT INTO district (
    district_name,
    state_id,
    cases,
    cured,
    active,
    deaths
  )
  VALUES (
    '${districtName}',
    ${stateId},
    ${cases},
    ${cured},
    ${active},
    ${deaths}
  )`
  await db.run(enterDistrictDetails)
  response.send('District Successfully Added')
})

//API-5: Returns a district based on the district ID
app.get(
  '/districts/:districtId/',
  jwtTokenAuthentication,
  async (request, response) => {
    const {districtId} = request.params
    const getDistrictQuery = `
  SELECT * FROM district
  WHERE district_id = ${districtId}`
    const district = await db.get(getDistrictQuery)
    if (district) {
      const formattedDistricts = {
        districtId: district.district_id,
        districtName: district.district_name,
        stateId: district.state_id,
        cases: district.cases,
        cured: district.cured,
        active: district.active,
        deaths: district.deaths,
      }
      response.send(formattedDistricts)
    } else {
      response.status(400).send('No District Found')
    }
  },
)

//API-6: Deletes a district from the district table based on the district ID
app.delete(
  '/districts/:districtId/',
  jwtTokenAuthentication,
  async (request, response) => {
    const {districtId} = request.params
    const deleteQuery = `
  DELETE FROM district
  WHERE district_id = ${districtId}`
    await db.run(deleteQuery)
    response.send('District Removed')
  },
)

//API-7: Updates the details of a specific district based on the district ID
app.put(
  '/districts/:districtId/',
  jwtTokenAuthentication,
  async (request, response) => {
    const {districtId} = request.params
    const {districtName, stateId, cases, cured, active, deaths} = request.body
    const updateQuery = `
    UPDATE district
      SET
        district_name = '${districtName}',
        state_id = ${stateId},
        cases = ${cases},
        cured = ${cured},
        active = ${active},
        deaths = ${deaths}
      WHERE district_id = ${districtId}
    `
    await db.run(updateQuery)
    response.send('District Details Updated')
  },
)

//API-8: Returns the statistics of total cases, cured, active, deaths of a specific state based on state ID
app.get(
  '/states/:stateId/stats/',
  jwtTokenAuthentication,
  async (request, response) => {
    const {stateId} = request.params
    const statsQuery = `
    SELECT SUM(cases) AS totalCases,
    SUM(cured) AS totalCured,
    SUM(active) AS totalActive,
    SUM(deaths) AS totalDeaths FROM district
    WHERE state_id = ${stateId}`
    const stats = await db.get(statsQuery)
    response.send(stats)
  },
)

module.exports = app
