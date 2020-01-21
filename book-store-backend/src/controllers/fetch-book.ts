import { Request, Response } from 'express';

import { fetchBook } from '../models/book';
import { Json } from 'aws-sdk/clients/marketplacecatalog';

const handler = async (req: Request, res: Response) => {
    try {
        await fetchBook(req.params.id, (response: Json) => res.json(response));
    } catch (err) {
        console.error(err);
        res.status(500).end();
    }
};

export default handler;