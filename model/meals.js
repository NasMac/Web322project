const meals=
{
    
    meals:[],
    bestmeals:[],
    packages:[],
    
    init()
    {
        //packages
        this.packages.push({title:'Keto',category:'',Synopsis:`High fat, low carb meals with moderate protein to achieve and sustain ketosis`,NumOfMeals:``, source:'img/Keto.jpg', bestseller: true});
        this.packages.push({title:'Vegan',category:'',Synopsis:'A fully plant-based package featuring vegan meat and no animal products', NumOfMeals:'', source:'img/Vegan.jpg', bestseller: true});
        this.packages.push({title:'Gluten-Free',category:'', Synopsis:'A gluten-free package with the same balanced profile as our other packages', NumOfMeals:'', source:'img/gf.png', bestseller: true});
        this.packages.push({title:'paleo', category:'',Synopsis:'Include meat, fish, eggs, seeds, nuts, fruits and veggies, along with healthy fats and oils.', NumOfMeals:'', source:'img/paleo.webp', bestseller: true});
        //meals
        this.meals.push({title:'Chicken Teriyaki',category:'',description:``,price:`$9.86`, source:'img/TeriyakiChicken.jpg', bestseller: true});
        this.meals.push({title:'Butter Chicken and Rice',category:'',description:'', price:'$10.76', source:'img/ButterChicken.jpg', bestseller: true});
        this.meals.push({title:'Coconut Curry Salmon',category:'', description:'', price:'$8.95', source:'img/CoconutCurrySalmon.jpg', bestseller: true});
        this.meals.push({title:'Garlic Butter Shrimp', category:'',description:'', price:'$11.79', source:'img/GarlicButterShrimp.jpg', bestseller: true});
        this.meals.push({title:'hearty harvest Soup',category:'', description:'', price:'$5.95', source:'img/HeartyHarvestSoup.jpg', bestseller: false});
        this.meals.push({title:'Portbello Steak',category:'', description:'', price:'$12.86', source:'img/PortbelloSteak.jpg', bestseller: false});
        this.meals.push({title:'Penne and Meatballs',category:'', description:'', price:'$7.79', source:'img/PenneAndMeatballs.jpg', bestseller: false});
        this.meals.push({title:'Sweat Potato Chili',category:'', description:'', price:'$6.59', source:'img/SweetPotatoChili.jpg', bestseller: false});
        
        this.meals.forEach(element => {
            if (element.bestseller == true) {
                this.bestmeals.push(element);
            }
        });
        
    },
    getAllPackages()
    {
return this.packages;
    },
    getAllMeals()
    {
        return this.meals;
    },
    getBestMeals()
    {
        return this.bestmeals;
    }
}

meals.init();
module.exports=meals;

