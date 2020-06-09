const genres = require('./routes/genres');
const customers = require('./routes/customers');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('config');
app.use(express.json());
// create connection
mongoose.connect(config.get('db'), {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('CONNECTION ESTABLISHED....'))
    .catch((error) => console.log('CONNECTION FAILED....'))

app.use('/api/genres', genres);
app.use('/api/customers', customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));