import { Router } from 'express';
import { getRepositories} from './controllers/repoContrller';

const router = Router();


router.get('/:username/repositories', getRepositories);

// add health check route
router.get('/health', (req, res) => {
  res.status(200).json({ message: 'OK' });
});

export default router;
