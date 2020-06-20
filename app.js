const express = require("express");
const app = express();

let exphbs= require("express-handlebars");
const multer = require("multer");

const path = require("path");

let bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));

app.use(express.static("Public"));
app.use(express.static("model"));

const mealModel = require("./model/meals");

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

app.get("/",(req,res)=>{

    res.render('home',{
        layout: 'main',
        title:"Home", 
        meals :mealModel.getBestMeals()
    });

});

app.get("/registration",(req,res)=>{

    res.render('registration', {
     layout: false,
     title:"Registration"

    });
    
    //Validation


});

app.get("/login",(req,res)=>{
    res.render('login', {
        layout: false,
        title:"login"
    });

});

app.get("/mealPackage",(req,res)=>{

    res.render('mealPackage',{
        layout: 'main',
        title:"MealPackages", 
        packages: mealModel.getAllPackages()
    });

});


const HTTP_PORT = process.env.PORT || 3000;
app.listen(HTTP_PORT,()=>{
    console.log(`Web Server Started`+HTTP_PORT);
});