const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = 3030;
const { mongo_url } = require('./config/db');
var bcrypt = require("bcryptjs");
// const AdminJS = require('adminjs');
// const AdminJSExpress = require('@adminjs/express')
// const AdminJSMongoose = require('@adminjs/mongoose')
app.use(cors({ origin:'*'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


const FormController = require('./controllers/FormController')

const FormModel = mongoose.model('Form');

// AdminJS.registerAdapter({
//     Resource: AdminJSMongoose.Resource,
//     Database: AdminJSMongoose.Database,
// })

// const adminOptions = {
//     resources: [FormModel],
// }
// const admin = new AdminJS(adminOptions)
// const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
//     admin,
//     {
//         cookieName: "adminjs",
//         cookiePassword: "complicatedsecurepassword",
//         authenticate: async (email, password) => {
//             const user = await AdminModel.findOne({ email });
//             if (user) {
//                 const matched = await bcrypt.compare(password, user.password);
//                 if (matched) {
//                     return true;
//                 }
//             }
//             return false;
//         },
//     },
//     null,
//     {
//         resave: false,
//         saveUninitialized: true,
//     }
// );
// app.use(admin.options.rootPath, adminRouter)



mongoose.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true });
// auth.authenticateToken.unless = unless


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log(`Connected to mongo at ${mongo_url}`));
app.use(express.json());

app.use('/api/form', FormController);


app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
})