const express = require("express");
const app = express();

const exphbs= require("express-handlebars");
const multer = require("multer");

const path = require("path");

const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));

app.use(express.static("Public"));
app.use(express.static("model"));

const mealModel = require("./model/meals");

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
});

    app.post("/registration",(req,res)=>{
    //Validation
    const errorMessage_name=[];
    const errorMessage_email=[];
    const errorMessage_password=[];
    const errorMessage_password2=[];
   
    if(req.body.username == "") {
         errorMessage_name.push('*Enter name');
    }
    if(req.body.password == ""){
        errorMessage_password.push('*Enter password');
    }
    if(req.body.email == "") {
        errorMessage_email.push('*Enter an email address');
    }
    else
    {
        if(req.body.password.length < 6){
            errorMessage_password.push('*Password must be at least 6 charactets long');
        }
        else if(req.body.password.length > 20){
            errorMessage_email.push('*password must not contain more than 20 characters')
        }
        else if(password_Validate(req.body.password)==false){
            errorMessage_password.push('*Password should must have letters and numbers only!');
        }
        
    }
    if(req.body.password2 == ""){
        errorMessage_password2.push('*Re-enter password!');
    }
    if(req.body.password2 != req.body.password){
        errorMessage_password2.push('*Passwords do not match');
    }   

//password regex
function password_Validate(str) {
    const pattern = new RegExp(/^[0-9a-zA-Z]+$/);
    return pattern.test(str);
}
//failed validation
   if (errorMessage_email.length > 1 || errorMessage_name.length > 1 || errorMessage_password.length > 1 || errorMessage_password2.length >1){
        res.render('registration', {
            layout: false,
            title:"Registration failed",
            e_Name: errorMessage_name,
            e_Email: errorMessage_email,
            e_Password: errorMessage_password,
            e_Password2: errorMessage_password2,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            password2: req.body.password2
        });
}

 else if(errorMessage_name.length == 0 && errorMessage_email.length == 0 && errorMessage_password.length == 0 && errorMessage_password2.length == 0)
            {
                        const newUser =
                        {
                            Name: req.body.username,
                            email: req.body.email,
                            password: req.body.password
                        };
                const sgMail = require('@sendgrid/mail');
                sgMail.setApiKey(process.env.SG.SEND_GRID_KEY);
                const msg = {
                    to: `test@example.com`,
                    from: `test@example.com`,
                    subject: `Welcome to FoodNow!`,
                    html:
                       `<strong>${newUser.username} <br>
                    Vistor's Email Address ${newUser.email} <br>
                    Welcome to FoodNow. Your have successfully signed up!<br></strong>
                   `,
                };
                    sgMail.send(msg)
                    .then(() => {
                        res.redirect("home");
                    })
                    .catch(err => {
                        console.log(`Error ${err}`);
                    });        
                    }
                                      
});


app.get("/login",(req,res)=>{
    res.render('login', {
        layout: false,
        title:"login"
    });

});
app.post("/login",(req,res)=>{

    const errorMessage_email=[];
    const errorMessage_password=[];

    if(req.body.password == ""){
        errorMessage_password.push('*Enter password');
    }
    if(req.body.email == "") {
        errorMessage_email.push('*Enter an email address');
    }
if(errorMessage_email.length > 1 || errorMessage_password.length > 1)
{
    res.render('login', {
        layout: false,
        title:"login",
        e_Email: errorMessage_email,
        e_Password: errorMessage_password
    });
}

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
//testing
/*
const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/`);
  });
  */