import Router from 'koa-router';
import userRoutes from './userRoutes';
import distributorRoutes from './distributorRoutes';
import bureauRoutes from './bureauRoutes';

const router = new Router();

// Combine all routes
router.use(userRoutes.routes());
router.use(userRoutes.allowedMethods());

router.use(distributorRoutes.routes());
router.use(distributorRoutes.allowedMethods());

router.use(bureauRoutes.routes());
router.use(bureauRoutes.allowedMethods());

// Define a simple "OK" route
router.get('/', async (ctx) => {
    ctx.body = {
        response: 'OK'
    };
});

export default router;
