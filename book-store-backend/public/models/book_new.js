"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DynamoDBAPI = __importStar(require("./dynamodb.api"));
var v1_1 = __importDefault(require("uuid/v1")); // For generating time-based uuid
var TABLE_NAME = "Books";
var createTableParams = {
    TableName: TABLE_NAME,
    KeySchema: [
        { AttributeName: "_id", KeyType: "HASH" },
    ],
    AttributeDefinitions: [
        { AttributeName: "_id", AttributeType: "S" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};
exports.createTable = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, DynamoDBAPI.createTable(createTableParams, TABLE_NAME)];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); };
console.log("Adding a new book...");
exports.addBook = function (title, isbn, author, picture, price) { return __awaiter(void 0, void 0, void 0, function () {
    var createItemParams;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                createItemParams = {
                    TableName: TABLE_NAME,
                    Item: {
                        "_id": v1_1.default(),
                        "title": title,
                        "isbn": isbn,
                        "author": author,
                        "picture": picture,
                        "price": price
                    }
                };
                return [4 /*yield*/, DynamoDBAPI.createItem(createItemParams)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var readItemParams = {
    TableName: TABLE_NAME,
    Key: {
        "_id": "60983f30-3b34-11ea-9287-85f896cb5351"
    }
};
// console.log("Reading an item...");
// DynamoDBAPI.readItem(readItemParams);
var updateItemParams = {
    TableName: TABLE_NAME,
    Key: {
        "_id": "fe3c1f80-3b35-11ea-99a8-5d0173ed2f18"
    },
    UpdateExpression: "set info.rating = :r, info.plot=:p, info.actors=:a",
    ExpressionAttributeValues: {
        ":r": 5.5,
        ":p": "Everything happens all at once.",
        ":a": ["Larry", "Moe", "Curly"]
    },
    ReturnValues: "UPDATED_NEW" // instructs DynamoDB to return only the updated attributes
};
// console.log("Updating an item...");
// DynamoDBAPI.updateItem(updateItemParams);
var deleteItemParams = {
    TableName: TABLE_NAME,
    Key: {
        "_id": "fe3c1f80-3b35-11ea-99a8-5d0173ed2f18"
    }
};
// console.log("Deleting an item...");
// DynamoDBAPI.deleteItem(deleteItemParams);
var scanParams = {
    TableName: TABLE_NAME
};
console.log("Retrieving all items...");
// DynamoDBAPI.retrieveAllItems(scanParams);
var scanHandler = function () { return __awaiter(void 0, void 0, void 0, function () {
    var scanResults;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("I was here");
                return [4 /*yield*/, DynamoDBAPI.scanTable(scanParams)];
            case 1:
                scanResults = _a.sent();
                scanResults.forEach(function (item) { return console.log(item); });
                return [2 /*return*/];
        }
    });
}); };
// scanHandler();
//# sourceMappingURL=book_new.js.map