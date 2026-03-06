// ===============================
// REGISTER USER
// ===============================

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

// DUPLICATE MOBILE CHECK

firebase.database().ref("users").once("value",function(snapshot){

var data = snapshot.val();
var duplicate = false;

for(var key in data){

if(data[key].mobile == mobile){
duplicate = true;
}

}

if(duplicate){

alert("Mobile already registered");
return;

}

// SAVE NEW USER

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

});

}



// ===============================
// LOGIN USER
// ===============================

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



// ===============================
// LOAD USERS (WORKER / SHOP / COMPANY)
// ===============================

function loadUsers(){

var ref = firebase.database().ref("users");

ref.on("value", function(snapshot){

var data = snapshot.val();

var html = "";

for(var key in data){

html += "<div style='border:1px solid gray;padding:10px;margin:10px;'>";

html += "<b>Name:</b> " + data[key].name + "<br>";

html += "<b>Type:</b> " + data[key].type + "<br>";

html += "<b>Work:</b> " + data[key].work + "<br>";

html += "<b>Location:</b> " + data[key].city + "<br>";

html += "<b>Mobile:</b> " + data[key].mobile + "<br>";

html += "</div>";

}

var box = document.getElementById("workerList");

if(box){
box.innerHTML = html;
}

});

}



// ===============================
// LOAD ADVERTISEMENTS
// ===============================

function loadAds(){

var ref = firebase.database().ref("advertisements");

ref.on("value", function(snapshot){

var data = snapshot.val();

var html = "";

for(var key in data){

html += "<div style='border:1px solid green;padding:10px;margin:10px;background:#f5fff5;'>";

html += "<b>Advertisement</b><br>";

html += "<b>Business:</b> " + data[key].businessName + "<br>";

html += "<b>Title:</b> " + data[key].title + "<br>";

html += "<b>Description:</b> " + data[key].description + "<br>";

html += "<b>Location:</b> " + data[key].city + "<br>";

html += "<b>Mobile:</b> " + data[key].mobile + "<br>";

html += "</div>";

}

var adBox = document.getElementById("adsBox");

if(adBox){
adBox.innerHTML = html;
}

});

}



// ===============================
// PAGE LOAD
// ===============================

window.onload = function(){

loadUsers();
loadAds();

};l
