const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = []; 

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
};

let day = today.toLocaleDateString("en-US", options);

res.render("list",{ kindOfDay: day, addItems: items});

});


app.post("/", function(req, res){

    if(req.body.button === ""){
        var item = req.body.newItem;
        items.push(item);
        res.redirect("/");
    }else{
        var del = req.body.deleteButton;
        for(i = 0; i<items.length;i++)
        {
            if(del === items[i]){
                items.splice(i,1);
                res.redirect("/");
            }
        }
    }    
});



app.listen(8080, function(){
    console.log("app listening on port 8080!");
});