require('dotenv').config();
const express = require("express");
const app = express();
const path = require('path');
const fs = require('fs');
const https = require('https');
const session = require("express-session");
const accountRoute = require("./routes/account.r.js");
const authGoogleRoute = require("./routes/auth/auth-google.r.js");
const port = 3000;
const secret = "My secret";
const searchC = require('./controllers/search.c.js')
const categoriesC = require('./controllers/categories.c.js')
const productC = require('./controllers/product.c.js');

const cors =  require('cors');
app.use(cors())

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
//app.use("/auth", authGoogleRoute);

app.use("/api/search",searchC.search);
app.use("/api/categories",categoriesC.getAll);
app.use("/api/product/:proid", productC.getById);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

/* const server = https.createServer({
    key: fs.readFileSync(path.join(__dirname,'cert','key.pem')),
    cert: fs.readFileSync(path.join(__dirname,'cert','cert.pem'))
}, app);

server.listen(port, () => console.log(`Secure server on port ${port}`));
 */