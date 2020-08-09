const express = require('express')
const router = express.Router();

router.get("/",(req,res)=>{
    if(req.session.user)
    {
        res.redirect("/login/");
    }
    else
    {
        res.render("registration",{
            title:"Registration",
        });
    }
    
});

    router.post("/registration",(req,res)=>{
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
        if(req.body.password.length < 6|| req.body.passWord.length > 16)
        {
            errorMessage_password.push('*Password must be betweem 6 to 16 characters long');
        }
        else if(req.body.password.length > 20)
        {
            errorMessage_email.push('*password must not contain more than 20 characters')
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
    const pattern = new RegExp(/^[0-9a-zA-Z]+$/);
    return pattern.test(str);
}
//failed validation
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

  else
  {
    userModel.findOne({ email: req.body.email })
    .then((user)=>{
        if(user==null){
                        const newUser =
                        {
                            Name: req.body.username,
                            email: req.body.email,
                            password: req.body.password
                        }; 
                        const user = new userModel(newUser);
                const sgMail = require('@sendgrid/mail');
                sgMail.setApiKey(process.env.SENDGRID_API_KEY);
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
                user.save()
                .then(() => {
                    sgMail.send(msg)
                    .then(() => {
                        console.log(user);
                        req.session.userInfo = user;

                        res.redirect("/home");
                    })     
                })
                }   
                else{
                    errorMessage_email.push("*Email already registered");
                    res.render("registration", {
                        title: "Registration",
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
            })
        }             
});