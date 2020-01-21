import * as DynamoDBUtil from './dynamodb-utils';
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

DynamoDBUtil.createTable(createTableParams, TABLE_NAME);

let createItemParams = {
    TableName: TABLE_NAME,
    Item: {
        "_id": uuidv1(),
        "year": 2018,
        "title": "Jokers",
        "info": {
            "plot": "Nothing happens at all.",
            "rating": 7.9
        }
    }
};

// console.log("Adding a new item...");
// DynamoDBUtil.createItem(createItemParams);

let readItemParams = {
    TableName: TABLE_NAME,
    Key: {
        "_id": "60983f30-3b34-11ea-9287-85f896cb5351"
    }
};

// console.log("Reading an item...");
// DynamoDBUtil.readItem(readItemParams);

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
// DynamoDBUtil.updateItem(updateItemParams);

let deleteItemParams = {
    TableName: TABLE_NAME,
    Key: {
        "_id": "fe3c1f80-3b35-11ea-99a8-5d0173ed2f18"
    }
};

// console.log("Deleting an item...");
// DynamoDBUtil.deleteItem(deleteItemParams);

let scanParams = {
    TableName: TABLE_NAME
};

console.log("Retrieving all items...");
// DynamoDBUtil.retrieveAllItems(scanParams);
let scanHandler = async () => {
    console.log("I was here");
    const scanResults = await DynamoDBUtil.scanTable(scanParams);
    scanResults.forEach(item => console.log(item));
};

scanHandler();
