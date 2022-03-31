import {Router, json} from 'express';

const { ENV } = process.env;
const router = Router();
router.use(json());

router.route('/')
.get((req, res) => {
    const reqData = {
        env: ENV,
        method: req.method,
        params: req.params,
        query: req.query
    };
    res.status(200).send(reqData);
}).post((req, res) => {
    res.sendStatus(200);
});

export default router;
