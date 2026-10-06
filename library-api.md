# Library API Design: Books Resource

Base path: `/api/books`. All requests and responses use JSON.

## Endpoints

### List all books
- **Method:** GET
- **Path:** `/api/books`
- **Description:** Returns every book in the library.
- **Request body:** none
- **Success status:** 200 OK

### Get one book
- **Method:** GET
- **Path:** `/api/books/{id}`
- **Description:** Returns the book with the given id.
- **Request body:** none
- **Success status:** 200 OK

### Create a book
- **Method:** POST
- **Path:** `/api/books`
- **Description:** Adds a new book to the library.
- **Request body:**
  ```json
  { "title": "Things Fall Apart", "author": "Chinua Achebe", "isbn": "9780385474542", "year": 1958 }
  ```
- **Success status:** 201 Created

### Update a book
- **Method:** PUT
- **Path:** `/api/books/{id}`
- **Description:** Replaces the details of an existing book.
- **Request body:**
  ```json
  { "title": "Things Fall Apart", "author": "Chinua Achebe", "isbn": "9780385474542", "year": 1959 }
  ```
- **Success status:** 200 OK

### Delete a book
- **Method:** DELETE
- **Path:** `/api/books/{id}`
- **Description:** Removes a book from the library.
- **Request body:** none
- **Success status:** 204 No Content

### List books by an author
- **Method:** GET
- **Path:** `/api/books?author=Chinua%20Achebe`
- **Description:** Returns only the books written by the author given in the `author` query parameter.
- **Request body:** none
- **Success status:** 200 OK

## Error codes

### 400 Bad Request
- The request is invalid and the server cannot process it.
- Example: `POST /api/books` with a body that has no `title`, or `year` sent as the text "abc".

### 404 Not Found
- The requested resource does not exist.
- Example: `GET /api/books/9999` when no book has id 9999.
