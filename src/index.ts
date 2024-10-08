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

// app.use(koaBody({
//     multipart: true,  // Important if you're uploading files
//     formidable: {
//         maxFileSize: 20 * 1024 * 1024  // Set max file size (20MB in this example)
//     },
//     jsonLimit: '100mb',  // Increase the JSON body limit to handle large JSON payloads
//     formLimit: '100mb',  // Increase the form body limit
//     textLimit: '100mb',  // Increase the text body limit if you're sending plain text payloads
// }));

app.use(koaBody({
    multipart: true,  // Important for handling file uploads
    formidable: {
        uploadDir: path.join(__dirname, '/uploads'), // Directory where files will be uploaded
        keepExtensions: true,  // Keep file extensions
        maxFileSize: 20 * 1024 * 1024,  // Maximum file size (20 MB)
        onFileBegin: (name: any, file: any) => {
            // Ensure file.name exists before setting path
            if (file && file.name) {
                const filePath = path.join(__dirname, '/uploads', file.name);
                file.path = filePath;  // Setting file path
            } else {
                console.error("File name is undefined");
            }
        }
    }
}));


// Create uploads folder if not exists
const uploadDir = path.join(__dirname, '/uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
app.use(serve(path.join(__dirname, 'uploads')));

app.use(cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true, // Enable credentials if you're dealing with cookies or authentication headers
}));

// app.use(serve(path.join(__dirname, 'uploads')));


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
