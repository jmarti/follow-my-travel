'use strict';

import { Router } from 'express';
import request from 'request';
const router = new Router();


const retrievePost = (postId) => {
	return new Promise((resolve, reject) => {
		request('http://localhost:3000/graphql?query={posts(id:'+postId+'){title,content,person{firstName,lastName}}}', (err, res, body) => {
			if(!err && res.statusCode == 200) {
				resolve(JSON.parse(body).data.posts[0]);
			} else {
				reject(err);
			}
		});
	})
};

/* GET home page */
router.get('/:postId', function(req, res) {
	retrievePost(req.params.postId)
		.then(post => {
			res.render('post', {post: post});		
		})
		.catch(err => {
			res.status(400).send({message: 'Bad request'});
		});
});

module.exports = router;