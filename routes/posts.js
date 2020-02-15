const express = require('express');
const server = express.Router();
const db = require('../data/db');

server.post('/', (req, res) => {
	const { title, contents } = req.params;

	if (!title) {
		return res
			.status(400)
			.json({ errorMessage: 'Please provide title for the post' });
	}
	if (!contents) {
		return res
			.status(400)
			.json({ errorMessage: 'Please provide contents for the post.' });
	}
	const data = {
		title: title,
		contents: contents
	};
	db.insert(data)
		.then((post) => {
			res.status(201).json(post);
		})
		.catch((error) => {
			console.log(error);
			res
				.status(500)
				.json({
					error: 'There was an error while saving the post to the database'
				});
		});
});

module.exports = server;
