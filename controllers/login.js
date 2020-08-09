const express = require('express')
const router = express.Router();


router.use(fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 } //maximum 5 MB
}));

router.get("/login",(req,res)=>{
    res.render('login', {
        layout: false,
        title:"login"
    });

});

router.post("/login",(req,res)=>{

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
if(errorMessage_email2.length > 1 || errorMessage_password2.length > 1)
{
    res.render('login', {
        layout: false,
        title:"login",
        e_Email: errorMessage_email2,
        e_Password: errorMessage_password2
    });
}

});