import * as DynamoDBAPI from './dynamodb.api';
import uuidv1 from 'uuid/v1'; // For generating time-based uuid
import { Json } from 'aws-sdk/clients/marketplacecatalog';

const TABLE_NAME = "BDayCards";

export const createBDayCardsTable = async () => {
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

export const addBirthdayCard = async (title: string, material: string, picture: string, price: string) => {
    const params = {
        TableName: TABLE_NAME,
        Item: {
            "_id": uuidv1(),
            "title": title,
            "material": material,
            "picture": picture,
            "price": price
        }
    };
    await DynamoDBAPI.createItem(params);
}

export const fetchBirthdayCard = async (_id: string) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            "_id": _id
        }
    };
    return await DynamoDBAPI.readItem(params);
}

export const updateBirthdayCard = async (_id: string, title: string, material: string, picture: string, price: string) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            "_id": _id
        },
        UpdateExpression: "set title=:title, material=:material, picture=:picture, price=:price",
        ExpressionAttributeValues: {
            ":title": title,
            ":material": material,
            ":picture": picture,
            ":price": price,
        },
        ReturnValues: "UPDATED_NEW" // instructs DynamoDB to return only the updated attributes
    };
    await DynamoDBAPI.updateItem(params);
}

export const deleteBirthdayCard = async (_id: string) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            "_id": _id
        }
    };
    DynamoDBAPI.deleteItem(params);
}

export const fetchBirthdayCards = async () => {
    const params = {
        TableName: TABLE_NAME
    };
    return await DynamoDBAPI.scanTable(params);
};
