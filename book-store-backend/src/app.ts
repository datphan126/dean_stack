import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

import addBookController from './controllers/add-book';
import addBirthdayCard from './controllers/add-birthday-card';
import fetchBooks from './controllers/fetch-books';
import fetchBirthdayCards from './controllers/fetch-birthday-cards';
import fetchBook from './controllers/fetch-book';
import updateBookController from './controllers/update-book';
import deleteBookController from './controllers/delete-book';
import fetchBirthdayCard from './controllers/fetch-birthday-card';
import updateBirthdayCardController from './controllers/update-birthday-card';
import deleteBirthdayCardController from './controllers/delete-birthday-card';

import { createBooksTable } from './models/book';
import { createBDayCardsTable } from './models/birthday-card';

dotenv.config();

// Innitialize DynamoDB tables
createBooksTable();
createBDayCardsTable();

const app = express();

// Set the Access-Control-Allow-Origin to http://localhost:4200 to allow our Angular app call the API
app.use(cors({ origin: `http://localhost:${process.env.FRONTEND_PORT}` }));

// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// Book Routes
app.post('/book', addBookController);

app.get('/books', fetchBooks);

app.get('/book/:id', fetchBook);

app.put('/book', updateBookController);

app.delete('/book/:id', deleteBookController);

// Birthday Card Routes
app.post('/birthdayCard', addBirthdayCard);

app.get('/birthdayCards', fetchBirthdayCards);

app.get('/birthdayCard/:id', fetchBirthdayCard);

app.put('/birthdayCard', updateBirthdayCardController);

app.delete('/birthdayCard/:id', deleteBirthdayCardController);

app.listen(process.env.BACKEND_PORT, () => console.log(`The server is running at http://localhost:${process.env.BACKEND_PORT}`));