const { Router } = require('express');

module.exports = () => {
    const router = Router();

    router.get('/', (req, res, next) => {
        try {
            res.json({ message: 'Hello World' });
        } catch (error) {
            next(error);
        }
    });

    return router;
};
