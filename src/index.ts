import Koa from 'koa';
import koaBody from 'koa-body';
import cors from 'koa2-cors';
import path from 'path';
import serve from 'koa-static';
import router from './routes';
import { setupAssociations } from './models/associations';
import sequelize from './config/database';  // Adjust the import path if necessary
import fs from 'fs';

const app = new Koa();

// Create base directories if they don't exist
const baseUploadsDir = path.join(__dirname, '/uploads');
const userUploadsDir = path.join(baseUploadsDir, '/users');
const otherImagesDir = path.join(baseUploadsDir, '/otherimages');

// Ensure the folders exist before use
[baseUploadsDir, userUploadsDir, otherImagesDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

app.use(koaBody({
    multipart: true,  // Important for handling file uploads
    formidable: {
        uploadDir: path.join(__dirname, 'temp_upload'), // Directory for temporary uploads
        keepExtensions: true,  // Keep file extensions
        maxFileSize: 20 * 1024 * 1024,  // Maximum file size (20 MB)
        onFileBegin: (name: string, file: any) => {
            // Here you can log or manage file info if needed
            // console.log(`Uploading file: ${file.name}`);
        },
    },
    jsonLimit: '100mb',  // Increase the JSON body limit to handle large JSON payloads
    formLimit: '100mb',  // Increase the form body limit
    textLimit: '100mb',  // Increase the text body limit if you're sending plain text payloads

}));


// Serve the uploads folder
app.use(serve(baseUploadsDir));

app.use(cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true, // Enable credentials if you're dealing with cookies or authentication headers
}));

app.use(router.routes()).use(router.allowedMethods());

// Setup associations
setupAssociations();

// Test database connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const PORT = process.env.PORT || 3001;

const startServer = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to start the server:', error);
    }
};

startServer();
