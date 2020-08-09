const express = require('express')
const router = express.Router();
const mealModel = require("./model/meals");

router.get("/mealPackage",(req,res)=>{

    res.render('mealPackage',{
        layout: 'main',
        title:"MealPackages", 
        packages: mealModel.getAllPackages()
    });

});