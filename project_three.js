const express = require('express');
const bodyparser = require('body-parser');
const request = require('request');
const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.post("/" , function (req , res){
var first = req.body.first ;
var second = req.body.second ;
var email = req.body.email ;
var data = {
members : [
{email_address : email ,
 status : "subscribed",
 merge_fields : {
 FNAME : first ,
 LNAME : second
} 
}
]
};
var jsondata = JSON.stringify(data) ;
var options = {
url:"https://us5.api.mailshimp.com/3.0/lists/32bad5fb9e" ,
method:"POST",
headers : {
Authorization : "085cce23c2b970f6b080942258fe2397-us5"
},
body : jsondata 
};

request(options , function(err , resp , bod){
if(err){
res.send("please there is an error");
}else {
res.send(resp.statusCode);
}
});
});
app.get("/" , function(req , res){
res.sendFile(__dirname + "/signup.html");
});
app.listen( process.env.PORT || 3000 , function(){
console.log('server has just started at port 3000');
});
