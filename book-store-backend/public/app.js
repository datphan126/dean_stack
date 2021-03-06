"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var add_book_1 = __importDefault(require("./controllers/add-book"));
var add_birthday_card_1 = __importDefault(require("./controllers/add-birthday-card"));
var fetch_books_1 = __importDefault(require("./controllers/fetch-books"));
var fetch_birthday_cards_1 = __importDefault(require("./controllers/fetch-birthday-cards"));
var fetch_book_1 = __importDefault(require("./controllers/fetch-book"));
var update_book_1 = __importDefault(require("./controllers/update-book"));
var delete_book_1 = __importDefault(require("./controllers/delete-book"));
var fetch_birthday_card_1 = __importDefault(require("./controllers/fetch-birthday-card"));
var update_birthday_card_1 = __importDefault(require("./controllers/update-birthday-card"));
var delete_birthday_card_1 = __importDefault(require("./controllers/delete-birthday-card"));
var book_1 = require("./models/book");
var birthday_card_1 = require("./models/birthday-card");
dotenv_1.default.config();
// Innitialize DynamoDB tables
book_1.createBooksTable();
birthday_card_1.createBDayCardsTable();
var app = express_1.default();
// Set the Access-Control-Allow-Origin to http://localhost:4200 to allow our Angular app call the API
app.use(cors_1.default({ origin: "http://localhost:" + process.env.FRONTEND_PORT }));
// support parsing of application/json type post data
app.use(body_parser_1.default.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Book Routes
app.post('/book', add_book_1.default);
app.get('/books', fetch_books_1.default);
app.get('/book/:id', fetch_book_1.default);
app.put('/book', update_book_1.default);
app.delete('/book/:id', delete_book_1.default);
// Birthday Card Routes
app.post('/birthdayCard', add_birthday_card_1.default);
app.get('/birthdayCards', fetch_birthday_cards_1.default);
app.get('/birthdayCard/:id', fetch_birthday_card_1.default);
app.put('/birthdayCard', update_birthday_card_1.default);
app.delete('/birthdayCard/:id', delete_birthday_card_1.default);
app.listen(process.env.BACKEND_PORT, function () { return console.log("The server is running at http://localhost:" + process.env.BACKEND_PORT); });
//# sourceMappingURL=app.js.map