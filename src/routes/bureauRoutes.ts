import Router from 'koa-router';
import koaBody from 'koa-body';
import path from 'path';
import fs from 'fs';
import { createBureauUsers, 
    getBureauUsers, 
    updateProfile,
     bureauLogin,
      createImages,
      getBureauData } from '../controllers/bureauUserController';

const router = new Router();


router.post('/bureau/register', createBureauUsers);
router.post('/bureau/createImages', createImages);
router.get('/bureau/getUsersById', getBureauUsers);
router.get('/bureau/getBureauById', getBureauData);
router.get('/bureau/updateProfile', updateProfile);
router.get('/bureau/login', bureauLogin);


export default router;
