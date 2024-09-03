const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hi I am Saad and this is my demo app!'));

app.listen(port, () => console.log(`App running on port ${port}`));