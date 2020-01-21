import * as DynamoDBAPI from './dynamodb.api';
import uuidv1 from 'uuid/v1'; // For generating time-based uuid
import { Json } from 'aws-sdk/clients/marketplacecatalog';

const TABLE_NAME = "Books";

export const createTable = async () => {
    const params = {
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
    await DynamoDBAPI.createTable(params);
}

export const addBook = async (title: string, isbn: string, author: string, picture: string, price: string) => {
    const params = {
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
    await DynamoDBAPI.createItem(params);
}

export const fetchBook = async (id: string, callback: any) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            "_id": id
        }
    };
    await DynamoDBAPI.readItem(params, (response: Json) => {
        callback(response);
    });
}

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

export const fetchBooks = async () => {
    const params = {
        TableName: TABLE_NAME
    };
    return await DynamoDBAPI.scanTable(params);
};
