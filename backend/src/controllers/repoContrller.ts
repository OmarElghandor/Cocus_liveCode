import { type Request, type Response, type NextFunction, response } from 'express';
import { RepoService } from '../services/repoService';


// create get all repositories
export const getRepositories = async (req: Request, res: Response, next: NextFunction) => {


  const repoService = new RepoService();
  const username = req.params.username as string;
  if (!username) {
    return res.status(400).json({ status: 400, message: 'Username is required' });
  }

  // request type should be application/json
  if (req.headers['content-type'] !== 'application/json') {
    return res.status(406).json({ status: 406, message: 'Not acceptable header' });
  }

  try {
    const data = await repoService.getRepositories({ username: username });

    //resolve all promises
    const resolvedData = await Promise.all(data);
    
    return res.status(200).json(resolvedData);
  } catch (error: any) {
    return res.status(500).json({ status: 500, error: error.message });
  }
};



