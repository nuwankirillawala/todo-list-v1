//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = ["Buy Foods", "Cook Foods", "Eat Foods"];
let workItems = [];

//ejs
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public")); //to use public files like css


app.get("/", function(req, res){

    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"

    };

    let currentDay = today.toLocaleDateString("en-US", options);

    res.render("list", {listTitle: currentDay, newListItems: items});

});

app.post("/", function(req, res) {
     let item = req.body.newItem; 

     if(req.body.list == "Work"){
        workItems.push(item);
        res.redirect("/work");
     }else{
        items.push(item);
        res.redirect("/");
     }
        
});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItems: workItems})
});

app.get("/about", function(req, res){
    res.render("about");
})


app.listen(3000, function(){
    console.log("Server is start on port 3000");
});