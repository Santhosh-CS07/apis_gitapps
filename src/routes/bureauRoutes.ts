import Router from 'koa-router';
import koaBody from 'koa-body';
import path from 'path';
import fs from 'fs';
import { createBureauUsers, getBureauUsers, updateProfile, bureauLogin, createImages } from '../controllers/bureauUserController';

const router = new Router();

// Function to create directory if it doesn't exist
function ensureDirSync(dir: any) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

// Directory path
const uploadDir = path.join(__dirname, '../uploads/bureauImages');

// Ensure the directory exists
ensureDirSync(uploadDir);

// koaBody configuration
const bodyParser = koaBody({
    multipart: true,
    formidable: {
        uploadDir: uploadDir,
        keepExtensions: true, // Keep the file extension
    }
});

router.post('/bureau/register', createBureauUsers);
router.post('/bureau/createImages', createImages);
router.get('/bureau/getUsersById', getBureauUsers);
router.get('/bureau/updateProfile', updateProfile);
router.get('/bureau/login', bureauLogin);


export default router;
