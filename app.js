const express = require("express");
const app = express();
const exphbs= require("express-handlebars");
const multer = require("multer");
const mongoose = require('mongoose');
const path = require("path");
const session = require('express-session')

const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static("Public"));
app.use(express.static("model"));
//require('dotenv').config({path:"./config/keys.env"});
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
//app.set("views");
app.engine(".hbs", exphbs({ extname: ".handlebars" }));
app.set("view engine", ".handlebars");


//Creates a 'NavLink' function that makes it easier to creates hyperlink anchors for navigation lists(see main.handlebars for implementation)
//app.engine(".handlebars",exphbs());
app.engine('.handlebars', exphbs({
    extname: '.handlebars',

    helpers : {
    navLink: function(url, options){
       return '<li' + 
           ((url == app.locals.activeRoute) ? ' class="active" ' : '') + 
           '><a href="' + url + '">' + options.fn(this) + '</a></li>';
   } 

    }
}));

const generalController = require("./controllers/general");
const registerController = require("./controllers/register");
const loginController = require("./controllers/login");
const productController = require("./controllers/products");

app.use(session({
    cookieName: "session",
    secret: `session_user`,
    resave: false,
    saveUninitialized: true,
    duration: 15 * 60 * 1000, 
    activeDuration: 1000 * 60
}));

app.use((req, res, next) => {
    res.locals.user = req.session.user;
    res.locals.session = req.session;
    next();
});


app.use("/", generalController); 
app.use("/login", loginController);
app.use("/registration", registerController);
app.use("/mealPackage", productController);
//app.use("/cart",cartController);
app.use("/", (req, res) => {
    res.render("error");
});

mongoose.connect(MONGODB_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log(`Connected to MongoDB Database`);
})
.catch(err=>console.log(`Error occured when connecting to database ${err}`));

const HTTP_PORT = process.env.PORT || 3000;
app.listen(HTTP_PORT,()=>{
    console.log(`Web Server Started`+HTTP_PORT);
});
