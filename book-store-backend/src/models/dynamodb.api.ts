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

export let createTable = async (params: any, tableName: string) => {
    let tableNameParams = {
        TableName: tableName
    };
    await dynamodb.describeTable(tableNameParams, function (err, data) {
        // If table does not exist, create a new table
        if (err) {
            dynamodb.createTable(params, function (err, data) {
                if (err) {
                    console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
                }
            });
        }
    });
}

export let createItem = (params: any) => {
    docClient.put(params, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}

export let readItem = (params: any) => {
    docClient.get(params, function (err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
        }
    });
}

export let updateItem = (params: any) => {
    docClient.update(params, function (err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
        }
    });
}

export let deleteItem = (params: any) => {
    docClient.delete(params, function (err, data) {
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