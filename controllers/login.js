const express = require('express')
const router = express.Router();
const userModel = require("../model/User");
const bcrypt = require("bcryptjs");
//const path = require("path");
const fileUpload = require('express-fileupload'); 
router.use(fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 } //maximum 5 MB
}));

router.get("/",(req,res)=>{
    if (req.session.user) {
        if (req.session.user.isDataClerk) {
            //render clerk page
            res.redirect("/login/clerk");
        } else {
            //user
            res.redirect("/login/dashboard");
        }
    } else {
        res.render("login", {
            title: "Login",
            layout: false
        });
    }
});

router.post("/",(req,res)=>{

    const errorMessage_email2=[];
    const errorMessage_password2=[];

    if(req.body.password == "")
    {
        errorMessage_password2.push('*Enter password');
    }
    if(req.body.email == "") 
    {
        errorMessage_email2.push('*Enter an email address');
    }
if(errorMessage_email2.length > 0 || errorMessage_password2.length > 0)
{
    res.render('login', {
        layout: false,
        title:"login",
        e_Email: errorMessage_email2,
        e_Password: errorMessage_password2,
        email: req.body.email,
        password: req.body.password
    });
}
else {
    userModel.findOne({ email: req.body.email })
    .then((user) => {
        if (user == null) {
            e_Email.push("Email not found in database");
            res.render("login", {
                title: "Login",
                layout: false,
                e_Email: errorMessage_email2,
                e_Password: errorMessage_password2,
                email: req.body.email,
                password: req.body.password
            });
        }
        else { 
            bcrypt.compare(req.body.password, user.password)
            .then((isMatched) => {
                if (isMatched) {
                    req.session.userInfo = user;
                    res.redirect("/dashboard");
                }
                else {
                   
                    errorPassword.push("Password Incorrect");

                    res.render("login", {
                        title: "Login",
                        layout: false,
                        e_Email: errorMessage_email2,
                        e_Password: errorMessage_password2,
                        email: req.body.email,
                        password: req.body.password
                    });
                }
            })
            .catch(err=>console.log(`Error when comparing email in database ${err}`));
        }
    })
    .catch(err=>console.log(`Error when searching email in database ${err}`));
}
});


router.get("/logout",(req,res)=>{

req.session.destroy();
res.redirect("/user/login")
});

module.exports = router;