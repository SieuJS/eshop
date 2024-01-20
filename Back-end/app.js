require('dotenv').config();
const express = require("express");
const app = express();
const path = require('path');
const fs = require('fs');
const cors = require('cors')
const https = require('https');
const bodyParser = require('body-parser');
const session = require("express-session");
const accountRoute = require("./routes/account.r.js");
const authGoogleRoute = require("./routes/auth/auth-google.r.js");
const categoryRoute = require("./routes/category.r")
const productRoute = require("./routes/product.r")
const port = process.env.PORT || 3000;
const secret = "My secret";
const searchC = require('./controllers/search.c.js')

app.use(cors())

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));
require('./config/passport-setup.js')(app);
require("./config/passport-login.js")(app);

app.use("/api/account", accountRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/product", productRoute);
//app.use("/auth", authGoogleRoute);

app.use("/api/search",searchC.search);
app.use((error, req, res, next) => {
    // Check that Have the res been sent ?
    if (req.headerSent) {
        return next(error);
    }
    // Check the status and set it 
    res.status(error.code || 500);
    // Leave the message 
    res.json({ message: error.message || "There some errors occured " });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

// const server = https.createServer({
//     key: fs.readFileSync(path.join(__dirname,'cert','key.pem')),
//     cert: fs.readFileSync(path.join(__dirname,'cert','cert.pem'))
// }, app);

// server.listen(port, () => console.log(`Secure server on port ${port}`));