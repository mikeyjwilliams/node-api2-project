const express = require('express');
const server = express();
const postsRouter = require('./routes/posts');

server.use(express.json());

server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
	res.send('posts is up');
});

module.exports = server;
