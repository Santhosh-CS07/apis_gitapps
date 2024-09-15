import Koa from 'koa';
import koaBody from 'koa-body';
import cors from 'koa2-cors';
import path from 'path';
import serve from 'koa-static';
import router from './routes';
import { setupAssociations } from './models/associations';
import sequelize from './config/database';  // Adjust the import path if necessary

const app = new Koa();

app.use(koaBody());
app.use(serve(path.join(__dirname, 'uploads')));

app.use(cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
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
