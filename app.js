const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = 3030;
const { mongo_url } = require('./config/db');
const FormController = require('./controllers/FormController')


app.use(cors({ origin:'*'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


mongoose.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log(`Connected to mongo at ${mongo_url}`));
// app.use(express.json());

app.use('/api/form', FormController);


app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
})