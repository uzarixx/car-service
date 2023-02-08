import { getResponses } from 'db/responses';
import { Request, Response } from 'express';


const ResponsesController = {
  getAllResponses: async (req: Request | any, res: Response) => {
    const { id } = req.user;
    const responses = await getResponses(id);
    res.json(responses);
  },
};

export default ResponsesController;