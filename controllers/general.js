const express = require('express')
const router = express.Router();
const mealModel = require("../model/meals");

router.get("/",(req, res)=>{

    res.render('home',{
        layout: 'main',
        title:"Home", 
        meals :mealModel.getBestMeals()
    });
});
module.exports=router;