const Router = require('express').Router;
const auth_controller = require('./auth/controller/auth_controller');
const user_controller = require('./user/controller/user_controller');
const discussion_controller = require('./discussion/controller/discussion_controller');
const comment_controller = require('./discussion/controller/comment_controller');
const errorHandlingMiddleware = require('./utils/errorHandlingMiddleware');
const CustomError = require('./utils/customError');
const authMiddleware = require('./utils/authMiddleware');

const router = Router();
const appRouter = Router();

appRouter.use('/auth', auth_controller());

appRouter.use(authMiddleware);
appRouter.use('/users', user_controller());
appRouter.use('/discussion', discussion_controller());
appRouter.use('/discussion', comment_controller());


router.use('/api/V1', appRouter);
router.use('*', (req, res, next) => {
    next(CustomError('Not Found',400));
});
router.use(errorHandlingMiddleware);

module.exports = router;
