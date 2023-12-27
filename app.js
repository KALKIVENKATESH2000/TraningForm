const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = 3035;
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

app.use(express.json());
app.use('/api/form', FormController);


app.listen(PORT, "192.168.1.103",() => {
    console.log(`Server listening at http://192.168.1.103:${PORT}`);
})