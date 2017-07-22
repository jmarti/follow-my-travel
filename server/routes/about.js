import { Router } from 'express';
const router = new Router();

/* GET about page */
router.get('/', function(req, res) {
	res.send('About');
});

export default router;