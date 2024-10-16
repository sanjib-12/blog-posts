const express = require('express');

const app = express();

app.get('/posts', (req, res) => {

});

app.post('/posts', (req, res) => {

});

const port = 4000;

app.listen(port, () => {
   console.log(`Listening on port ${ port }`);
});
