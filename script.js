// REGISTER USER

function registerUser(){

var name = document.getElementById("name").value;
var mobile = document.getElementById("mobile").value;
var type = document.getElementById("type").value;
var work = document.getElementById("work").value;
var city = document.getElementById("city").value;

if(name=="" || mobile=="" || type=="" || city==""){
alert("Please fill all details");
return;
}

var id = Date.now();

firebase.database().ref("users/"+id).set({

name:name,
mobile:mobile,
type:type,
work:work,
city:city

});

alert("Registration Successful");

window.location.href="index.html";

}



// LOGIN USER

function loginUser(){

var mobile = document.getElementById("loginMobile").value;

firebase.database().ref("users").once("value",function(snapshot){

var data = snapshot.val();

var found = false;

for(var key in data){

if(data[key].mobile == mobile){

found = true;

localStorage.setItem("user",JSON.stringify(data[key]));

alert("Login Successful");

window.location.href="index.html";

}

}

if(found == false){

alert("User Not Found");

}

});

}
