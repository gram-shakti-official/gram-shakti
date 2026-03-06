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

var id = Date.now();

firebase.database().ref("users/"+id).set({

name:name,
mobile:mobile,
type:type,
work:work,
city:city

});

alert("Registration Successful");

window.location.href="login.html";

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
// LOAD WORKERS LIST
// ===============================

function loadWorkers(){

var workerRef = firebase.database().ref("users");

workerRef.on("value", function(snapshot){

var data = snapshot.val();

var html = "";

for(var key in data){

if(data[key].type == "worker"){

html += "<div style='border:1px solid gray;padding:10px;margin:10px;'>";

html += "<b>Name:</b> " + data[key].name + "<br>";
html += "<b>Work:</b> " + data[key].work + "<br>";
html += "<b>Location:</b> " + data[key].city + "<br>";
html += "<b>Mobile:</b> " + data[key].mobile + "<br>";

html += "</div>";

}

}

var workerBox = document.getElementById("workerList");

if(workerBox){

workerBox.innerHTML = html;

}

});

}



// ===============================
// LOAD CUSTOMERS
// ===============================

function loadCustomers(){

var ref = firebase.database().ref("users");

ref.on("value", function(snapshot){

var data = snapshot.val();

var html = "";

for(var key in data){

if(data[key].type == "customer"){

html += "<div style='border:1px solid blue;padding:10px;margin:10px;'>";

html += "<b>Name:</b> " + data[key].name + "<br>";
html += "<b>City:</b> " + data[key].city + "<br>";
html += "<b>Mobile:</b> " + data[key].mobile + "<br>";

html += "</div>";

}

}

var box = document.getElementById("customerList");

if(box){

box.innerHTML = html;

}

});

}



// ===============================
// LOAD COMPANIES
// ===============================

function loadCompanies(){

var ref = firebase.database().ref("users");

ref.on("value", function(snapshot){

var data = snapshot.val();

var html = "";

for(var key in data){

if(data[key].type == "company"){

html += "<div style='border:1px solid orange;padding:10px;margin:10px;'>";

html += "<b>Company:</b> " + data[key].name + "<br>";
html += "<b>City:</b> " + data[key].city + "<br>";
html += "<b>Mobile:</b> " + data[key].mobile + "<br>";

html += "</div>";

}

}

var box = document.getElementById("companyList");

if(box){

box.innerHTML = html;

}

});

}



// ===============================
// POST ADVERTISEMENT
// ===============================

function postAd(){

var businessName = document.getElementById("businessName").value;
var title = document.getElementById("title").value;
var description = document.getElementById("description").value;
var city = document.getElementById("city").value;
var mobile = document.getElementById("mobile").value;

if(businessName=="" || title=="" || city=="" || mobile==""){
alert("Please fill all fields");
return;
}

var id = Date.now();

firebase.database().ref("advertisements/"+id).set({

businessName:businessName,
title:title,
description:description,
city:city,
mobile:mobile

});

alert("Advertisement Posted Successfully");

window.location.href="index.html";

}



// ===============================
// LOAD ADVERTISEMENTS
// ===============================

function loadAds(){

var adRef = firebase.database().ref("advertisements");

adRef.on("value", function(snapshot){

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
// PAGE LOAD SYSTEM
// ===============================

window.onload = function(){

loadWorkers();
loadCustomers();
loadCompanies();
loadAds();

};
