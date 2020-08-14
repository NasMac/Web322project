const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

 const userSchema = new Schema({
    userName:
    {
        type:String,
        required:true
    },
    Eemail:
    {
        type:String,
        required:true
    },
    Ppassword:
    {
        type:String,
        required:true
    },
    isDataClerk:
    {
        type:Boolean,
        default:false
    }
  });
  const userModel = mongoose.model("FDUser", userSchema);
  //encrypts password
  userSchema.pre("save",function(next)
  {
    
      bcrypt.genSalt(10)
      .then((salt)=>{
          
          bcrypt.hash(this.password,salt)
          .then((encryptPassword)=>{
              this.password = encryptPassword;
              next();
          })
          .catch(err=>console.log(`Error when hasing ${err}`));
      })
      .catch(err=>console.log(`Error when salting ${err}`));
  })
  

module.exports = userModel;