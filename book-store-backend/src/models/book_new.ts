import * as DynamoDBAPI from './dynamodb.api';
import uuidv1 from 'uuid/v1'; // For generating time-based uuid

const TABLE_NAME = "Books";

let createTableParams = {
    TableName: TABLE_NAME,
    KeySchema: [
        { AttributeName: "_id", KeyType: "HASH" },  //Partition key
    ],
    AttributeDefinitions: [
        { AttributeName: "_id", AttributeType: "S" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

export const createTable = async () => await DynamoDBAPI.createTable(createTableParams, TABLE_NAME);

console.log("Adding a new book...");
export const addBook = async (title: string, isbn: string, author: string, picture: string, price: string) => {
    const createItemParams = {
        TableName: TABLE_NAME,
        Item: {
            "_id": uuidv1(),
            "title": title,
            "isbn": isbn,
            "author": author,
            "picture": picture,
            "price": price
        }
    };
    await DynamoDBAPI.createItem(createItemParams);
}

let readItemParams = {
    TableName: TABLE_NAME,
    Key: {
        "_id": "60983f30-3b34-11ea-9287-85f896cb5351"
    }
};

// console.log("Reading an item...");
// DynamoDBAPI.readItem(readItemParams);

let updateItemParams = {
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

let deleteItemParams = {
    TableName: TABLE_NAME,
    Key: {
        "_id": "fe3c1f80-3b35-11ea-99a8-5d0173ed2f18"
    }
};

// console.log("Deleting an item...");
// DynamoDBAPI.deleteItem(deleteItemParams);

let scanParams = {
    TableName: TABLE_NAME
};

console.log("Retrieving all items...");
// DynamoDBAPI.retrieveAllItems(scanParams);
export const fetchBooks = async () => {
    return await DynamoDBAPI.scanTable(scanParams);
};

// scanHandler();
