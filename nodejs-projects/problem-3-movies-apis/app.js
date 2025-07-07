const express = require('express')
const app = express()
const path = require('path')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const dbPath = path.join(__dirname, 'moviesData.db')
app.use(express.json())
let db = null

//Initialising connection between server and database
const InitialiseServerAndDB = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server is running at https://localhost:3000/')
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}

InitialiseServerAndDB()

//API-1: Returns a list of all movie names in the movie table
app.get('/movies/', async (request, response) => {
  const getMoviesQuery = `
  SELECT * FROM 
  movie`
  const movies = await db.all(getMoviesQuery)
  const movieNameFormatQuery = movies.map(movie => ({
    movieName: movie.movie_name,
  }))

  response.send(movieNameFormatQuery)
})

//API-2: Creates a new movie in the movie table. `movie_id` is auto-incremented
app.post('/movies/', async (request, response) => {
  const movieDetails = request.body
  const {directorId, movieName, leadActor} = movieDetails
  const createMovieInfoQuery = `
  INSERT INTO movie (director_id, movie_name, lead_actor)
  VALUES (${directorId}, '${movieName}', '${leadActor}')`
  await db.run(createMovieInfoQuery)
  response.send('Movie Successfully Added')
})

//API-3: Returns a movie based on the movie ID
app.get('/movies/:movieId/', async (request, response) => {
  const {movieId} = request.params
  const getMovieQuery = `
  SELECT * FROM movie 
  WHERE movie_id = ${movieId}`
  const movie = await db.get(getMovieQuery)
  if (movie) {
    const movieFormatQuery = {
      movieId: movie.movie_id,
      directorId: movie.director_id,
      movieName: movie.movie_name,
      leadActor: movie.lead_actor,
    }
    response.send(movieFormatQuery)
  } else {
    response.status(404).send('Movie Not Found')
  }
})

//API-4: Updates the details of a movie in the movie table based on the movie ID
app.put('/movies/:movieId/', async (request, response) => {
  const {movieId} = request.params
  const movieDetails = request.body
  const {directorId, movieName, leadActor} = movieDetails
  const updateMovieQuery = `
  UPDATE movie
  SET 
  director_id = ${directorId}, 
  movie_name = '${movieName}', 
  lead_actor = '${leadActor}'
  WHERE movie_id = ${movieId}`
  await db.run(updateMovieQuery)
  response.send('Movie Details Updated')
})

//API-5: Deletes a movie from the movie table based on the movie ID
app.delete('/movies/:movieId/', async (request, response) => {
  const {movieId} = request.params
  const deleteMovieQuery = `
  DELETE FROM movie 
  WHERE movie_id = ${movieId}`
  await db.run(deleteMovieQuery)
  response.send('Movie Removed')
})

//API-6: Returns a list of all directors in the director table
app.get('/directors/', async (request, response) => {
  const getDirectorsQuery = `
  SELECT * FROM director`
  const directors = await db.all(getDirectorsQuery)
  const directorsFormatQuery = directors.map(director => ({
    directorId: director.director_id,
    directorName: director.director_name,
  }))
  response.send(directorsFormatQuery)
})

//API-7: Returns a list of all movie names directed by a specific director
app.get('/directors/:directorId/movies/', async (request, response) => {
  const {directorId} = request.params
  const getDirectorMoviesQuery = `
  SELECT * FROM movie 
  WHERE director_id = ${directorId}`
  const directorMovies = await db.all(getDirectorMoviesQuery)
  const directorMoviesFormat = directorMovies.map(eachMovie => ({
    movieName: eachMovie.movie_name,
  }))
  response.send(directorMoviesFormat)
})

module.exports = app
