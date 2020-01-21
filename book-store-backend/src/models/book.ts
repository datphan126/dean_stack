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

export const fetchBook = async (_id: string, callback: any) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            "_id": _id
        }
    };
    await DynamoDBAPI.readItem(params, (response: Json) => {
        callback(response);
    });
}

export const updateBook = async (_id: string, title: string, isbn: string, author: string, picture: string, price: string) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            "_id": _id
        },
        UpdateExpression: "set title=:title, isbn=:isbn, author=:author,picture=:picture,price=:price",
        ExpressionAttributeValues: {
            ":title": title,
            ":isbn": isbn,
            ":author": author,
            ":picture": picture,
            ":price": price,
        },
        ReturnValues: "UPDATED_NEW" // instructs DynamoDB to return only the updated attributes
    };
    await DynamoDBAPI.updateItem(params);
}

export const deleteBook = async (_id: string) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            "_id": _id
        }
    };
    DynamoDBAPI.deleteItem(params);
}

export const fetchBooks = async () => {
    const params = {
        TableName: TABLE_NAME
    };
    return await DynamoDBAPI.scanTable(params);
};
