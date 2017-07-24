import { Router } from 'express';
import request from 'request';
const router = new Router();

const getPosts = () => {
	return new Promise((resolve, reject) => {
		request('http://localhost:3000/graphql?query={posts{id,title,content,person{firstName,lastName}}}', (err, res, body) => {
			if(!err && res.statusCode == 200) {
				resolve(JSON.parse(body).data.posts);
			} else {
				reject(err);
			}
		});
	});
}

/* GET home page */
router.get('/', function(req, res) {
	getPosts()
		.then(posts => {
			res.render('index', {posts: posts});		
		})
		.catch(err => {
			res.status(400).send({message: 'Bad request'});
		});
});

export default router;