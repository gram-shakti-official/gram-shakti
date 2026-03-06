// REGISTER USER

function registerUser(){

var name = document.getElementById("name").value;
var mobile = document.getElementById("mobile").value;
var type = document.getElementById("type").value;
var work = document.getElementById("work").value;
var city = document.getElementById("city").value;

if(name=="" || mobile==""){
alert("Please fill all fields");
return;
}

var id = new Date().getTime();

firebase.database().ref("users/"+id).set({

name:name,
mobile:mobile,
type:type,
work:work,
city:city

});

alert("Registration Successful");

window.location="index.html";

}


// LOGIN USER

function loginUser(){

var mobile = document.getElementById("mobile").value;

if(mobile==""){
alert("Enter mobile number");
return;
}

var ref = firebase.database().ref("users");

ref.once("value",function(snapshot){

var data = snapshot.val();

var found = false;

for(var key in data){

if(data[key].mobile == mobile){

found = true;

localStorage.setItem("user", JSON.stringify(data[key]));

break;

}

}

if(found){

alert("Login Successful");

window.location="index.html";

}else{

alert("User not found");

}

});

}
