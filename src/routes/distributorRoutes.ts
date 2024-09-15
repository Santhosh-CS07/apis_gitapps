import Router from 'koa-router';
import path from 'path';
import fs from 'fs';
import { createDistributor, distributorLogin, getUserDetailsById, updateProfile } from '../controllers/distributorController';
import koaBody from 'koa-body';

const router = new Router();

// Function to create directory if it doesn't exist
function ensureDirSync(dir: any) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

// Directory path
const uploadDir = path.join(__dirname, '../uploads/distributorImages');

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

// Define routes
router.post('/distributor/register', bodyParser, createDistributor);
router.get('/distributor/login', distributorLogin);
router.get('/distributor/getUserById', getUserDetailsById);
router.put('/distributor/updateProfile', updateProfile);

export default router;
