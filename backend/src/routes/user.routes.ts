import {Router} from 'express';
import { validateRequest } from '../middlewares/validateRequest';
import { createUserSchema , loginUserSchema} from '../schema/user.schema';
import { createUser, getUser, logOutUser, loginUser } from '../controllers/user.controller';
import { checkAuth } from '../middlewares/checkUser';

const router = Router();


router.post('/signup',validateRequest(createUserSchema),createUser);
router.post('/signin',validateRequest(loginUserSchema),loginUser);
router.get('/',checkAuth,
// validateRequest(readUserSchema),
getUser);
router.post('/logout',logOutUser);

export default router;