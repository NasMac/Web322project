const express = require("express");
const app = express();

const exphbs= require("express-handlebars");
const multer = require("multer");

const mongoose = require('mongoose');

const path = require("path");

const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));

app.use(express.static("Public"));
app.use(express.static("model"));


const generalController = require("./controllers/general.js");
const registerController = require("./controllers/register.js");
const loginController = require("./controllers/login.js");
app.use("/",generalController); 
app.use("/login", loginController);
app.use("/registration", registerController);

//const { env } = require("process");

require('dotenv').config({path:"./config/sendgrid.env"});

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

app.set("views");
app.engine(".hbs", exphbs({ extname: ".handlebars" }));
app.set("view engine", ".handlebars");


const HTTP_PORT = process.env.PORT || 3000;
app.listen(HTTP_PORT,()=>{
    console.log(`Web Server Started`+HTTP_PORT);
});
//testing
/*
const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/`);
  });
  */