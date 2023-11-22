import {Router} from 'express';
import notes from './notes.routes';
import user from './user.routes';
const router = Router();

router.use('/notes',notes);
router.use('/user',user);


export default router;
