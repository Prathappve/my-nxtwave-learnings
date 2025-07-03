const express = require('express')
const app = express()
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
app.use(express.json())
const dbPath = path.join(__dirname, 'goodreads.db')

let db = null

const InitialiseServerAndDB = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server is running at http://localhost/3000/')
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}

InitialiseServerAndDB()

//API-1: To get all books
app.get('/books/', async (request, response) => {
  const getBooksQuery = `SELECT * FROM book ORDER BY book_id`
  const books = await db.all(getBooksQuery)
  response.send(books)
})

//API-2: To get an expected book
app.get('/books/:book_id', async (request, response) => {
  const {book_id} = request.params
  const getBookQuery = `SELECT * FROM book WHERE book_id = ${book_id}`
  const book = await db.get(getBookQuery)
  response.send(book)
})

//API-3: To add a book
app.post('/books/', async (request, response) => {
  const bookDetails = request.body
  const {
    title,
    authorId,
    rating,
    ratingCount,
    reviewCount,
    description,
    pages,
    dateOfPublication,
    editionLanguage,
    price,
    onlineStores,
  } = bookDetails
  const addBookQuery = `
    INSERT INTO
      book (title,author_id,rating,rating_count,review_count,description,pages,date_of_publication,edition_language,price,online_stores)
    VALUES
      (
        '${title}',
         ${authorId},
         ${rating},
         ${ratingCount},
         ${reviewCount},
        '${description}',
         ${pages},
        '${dateOfPublication}',
        '${editionLanguage}',
         ${price},
        '${onlineStores}'
      );`

  const dbResponse = await db.run(addBookQuery)
  const newbookId = dbResponse.lastID
  response.send({book_id: newbookId})
})

//API-4: To update a book
app.put('/books/:bookId', async (request, response) => {
  const {bookId} = request.params
  const bookDetails = request.body
  const {
    title,
    authorId,
    rating,
    ratingCount,
    reviewCount,
    description,
    pages,
    dateOfPublication,
    editionLanguage,
    price,
    onlineStores,
  } = bookDetails
  const updateBookQuery = `
    UPDATE
      book
    SET
      title='${title}',
      author_id=${authorId},
      rating=${rating},
      rating_count=${ratingCount},
      review_count=${reviewCount},
      description='${description}',
      pages=${pages},
      date_of_publication='${dateOfPublication}',
      edition_language='${editionLanguage}',
      price= ${price},
      online_stores='${onlineStores}'
    WHERE
      book_id = ${bookId};`
  await db.run(updateBookQuery)
  response.send('Book updated successfully')
})

//API-5: To delete a book
app.delete('/books/:book_id', async (request, response) => {
  const {book_id} = request.params
  const deleteBookQuery = `DELETE FROM book WHERE book_id = ${book_id}`
  await db.run(deleteBookQuery)
  response.send('Book deleted successfully')
})

//API-6: To get all books authorized by author
app.get('/authors/:authorId/books/', async (request, response) => {
  const {authorId} = request.params
  const getAuthorBooksQuery = `
    SELECT
     *
    FROM
     book
    WHERE
      author_id = ${authorId};`
  const booksArray = await db.all(getAuthorBooksQuery)
  response.send(booksArray)
})
