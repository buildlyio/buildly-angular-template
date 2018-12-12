#!/usr/bin/env node

const express = require('express');
const app = express();
const port = process.env.APP_PORT || 9000;
const path = require('path');
const config = require('./environment');

app.use(express.static(__dirname + '/dist'));

// Catch all other routes and return the index file
app.get('/environment.js', (req, res) => {
  res.send('window.environment = ' + JSON.stringify(config.environment));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, function(){
    console.log("Server up and running: Listening on port " + port);
});
