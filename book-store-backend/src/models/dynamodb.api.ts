import AWS from 'aws-sdk';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';
import dotenv from 'dotenv';

dotenv.config();

const REGION = `${process.env.DYNAMODB_REGION}`;
const ENDPOINT = `${process.env.DYNAMODB_ENDPOINT}`;

let serviceConfigOptions: ServiceConfigurationOptions = {
    region: REGION,
    endpoint: ENDPOINT
};

let dynamodb = new AWS.DynamoDB(serviceConfigOptions);

let docClient = new AWS.DynamoDB.DocumentClient({
    region: REGION,
    endpoint: ENDPOINT,
    convertEmptyValues: true
});

export const createTable = async (params: any) => {
    const checkTableParams = {
        TableName: params.TableName
    };
    await dynamodb.describeTable(checkTableParams, async function (err, data) {
        // If table does not exist, create a new table
        if (err) {
            await dynamodb.createTable(params, function (err, data) {
                if (err) {
                    console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
                }
            });
        }
    });
}

export const createItem = async (params: any) => {
    await docClient.put(params, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}

export const readItem = async (params: any) => {
    let item = await docClient.get(params).promise();
    return item.Item;
}

export const updateItem = async (params: any) => {
    await docClient.update(params, function (err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
        }
    });
}

export const deleteItem = async (params: any) => {
    await docClient.delete(params, function (err, data) {
        if (err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
        }
    });
}

export const scanTable = async (params: any) => {
    let scanResults: any[] = [];
    let items;
    do {
        items = await docClient.scan(params).promise();
        items.Items!.forEach((item) => scanResults.push(item));
        params.ExclusiveStartKey = items.LastEvaluatedKey;
    } while (typeof items.LastEvaluatedKey != "undefined");
    return scanResults;
};