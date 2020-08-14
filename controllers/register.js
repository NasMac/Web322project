const express = require('express')
const router = express.Router();
const userModel = require("../model/User");
const bcrypt = require("bcryptjs");

router.get("/",(req,res)=>{
    if(req.session.user)
    {
        res.redirect("/login/");
    }
    else
    {
        res.render("registration",{
            title:"Registration",
            layout: false
        });
    }
    
});

    router.post("/",(req,res)=>{
    //Validation
    const errorMessage_name=[];
    const errorMessage_email=[];
    const errorMessage_password=[];
    const errorMessage_password2=[];
   
    if(req.body.username == "") 
    {
         errorMessage_name.push('*Enter name');
    }
    if(req.body.email == "") 
     {
        errorMessage_email.push('*Enter an email address');
    }
     if(req.body.password == "")
     {
        errorMessage_password.push('*Enter password');
    }
    
    else
    {
        if(req.body.password.length < 6 || req.body.password.length > 20)
        {
            errorMessage_password.push('*Password must be betweem 6 to 20 characters long');
        }
        else if(password_Validate(req.body.password)==false)
        {
            errorMessage_password.push('*Password should must have letters and numbers only!');
        } 
    }
    

    if(req.body.password2 == "")
    {
        errorMessage_password2.push('*Re-enter password!');
    }
    if(req.body.password2 != req.body.password)
    {
        errorMessage_password2.push('*Passwords do not match');
    }   

//password regex
function password_Validate(str) {
    const pattern = new RegExp(/^[0-9a-zA-Z]{6,20}$/);
    return pattern.test(str);
}
//failed validation
userModel.findOne({ Eemail: req.body.email })
    .then((user)=>{
        if(user!=null){
            errorMessage_email.push("*Email already registered");
            res.render("registration", {
                title: "Registration",
                layout: false,
                e_Name: errorMessage_name,
                e_Email: errorMessage_email,
                e_Password: errorMessage_password,
                e_Password2: errorMessage_password2,
                username: req.body.username,
                email: req.body.email
            });  
        }
        else{
  if (errorMessage_email.length > 0 || errorMessage_name.length > 0 || errorMessage_password.length > 0 || errorMessage_password2.length >0)
  {
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
else{       
    const newUser =
    {
        userName: req.body.username,
        Eemail: req.body.email,
        Ppassword: req.body.password
    }
    const user = new userModel(newUser);
    console.log(newUser.email);  
    user.save()  
    .then(()=>{        
                const sgMail = require('@sendgrid/mail');
                sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                const msg = {
                    to: `${newUser.email}`,
                    from: `naseemmachado@gmail.com`,
                    subject: `Welcome to FoodNow!`,
                    html:
                       `<strong>Wekcome ${newUser.username}! <br>
                    Welcome to FoodNow. Your have successfully signed up!<br></strong>`,
                };
                    sgMail.send(msg)
                    .then(() => {
                        console.log(user);
                        req.session.user = user;
                    }) 
                    .catch(err => {
                        console.log(`Error ${err}`);
                    }); 
                        if(req.session.user.isDataClerk){
                            res.render('clerkDashboard',{
                                title:"clerkdashboard",
                                packages: mealModel.getAllPackages(),
                                meals :mealModel.getBestMeals()
                            });
                        }
                        else{
                            res.render('dashboard',{
                                title:"dashboard"
                            });
                        }              
                    })
            .catch(err=>console.log(`Error checking for email in database ${err}`));
     }  
    } 
    })

});

module.exports = router;