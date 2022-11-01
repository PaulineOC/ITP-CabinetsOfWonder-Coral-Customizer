require('dotenv').config();

const express = require("express");
const app = express();
const path = require('path');

var publicPath = path.join(__dirname, 'public')

// Serve P5 files
app.use(express.static(path.join(__dirname, 'public')));


const server = app.listen(3002, () => {
	console.log("listening on port 3002!");
});



