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

localStorage.setItem("mobile",mobile);
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

html += "<button onclick=\"hireWorker('"+data[key].mobile+"','"+data[key].work+"','"+data[key].city+"')\">Hire Worker</button>";

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
// HIRE WORKER SYSTEM
// ===============================

function hireWorker(workerMobile,work,city){

var customerMobile = localStorage.getItem("mobile");

if(!customerMobile){
alert("Please login first");
return;
}

var id = Date.now();

firebase.database().ref("hire_requests/"+id).set({

workerMobile:workerMobile,
customerMobile:customerMobile,
work:work,
city:city,
status:"pending"

});

alert("Hire Request Sent");

}



// ===============================
// WORKER REQUEST LIST
// ===============================

function loadWorkerRequests(){

var workerMobile = localStorage.getItem("mobile");

var requestContainer = document.getElementById("requestList");

firebase.database().ref("hire_requests").on("value",(snapshot)=>{

var html="";

snapshot.forEach((data)=>{

var req = data.val();

if(req.workerMobile == workerMobile){

html += "<div style='border:1px solid red;padding:10px;margin:10px;'>";

html += "<b>Customer:</b> "+req.customerMobile+"<br>";
html += "<b>Work:</b> "+req.work+"<br>";
html += "<b>City:</b> "+req.city+"<br>";
html += "<b>Status:</b> "+req.status+"<br>";

html += "<button onclick=\"acceptRequest('"+data.key+"')\">Accept</button>";

html += "<button onclick=\"rejectRequest('"+data.key+"')\">Reject</button>";

html += "</div>";

}

});

if(requestContainer){
requestContainer.innerHTML = html;
}

});

}



function acceptRequest(id){

firebase.database().ref("hire_requests/"+id).update({
status:"accepted"
});

alert("Request Accepted");

}



function rejectRequest(id){

firebase.database().ref("hire_requests/"+id).update({
status:"rejected"
});

alert("Request Rejected");

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
loadWorkerRequests();

};



// ===============================
// SEARCH SYSTEM
// ===============================

function searchData(){

var search = document.getElementById("searchInput").value.toLowerCase();

var ref = firebase.database().ref("users");

ref.once("value", function(snapshot){

var data = snapshot.val();

var workerHTML = "";
var companyHTML = "";
var shopHTML = "";

for(var key in data){

var user = data[key];

var name = (user.name || "").toLowerCase();
var work = (user.work || "").toLowerCase();
var city = (user.city || "").toLowerCase();

if(name.includes(search) || work.includes(search) || city.includes(search)){

if(user.type == "worker"){

workerHTML += "<div style='border:1px solid gray;padding:10px;margin:10px;'>";

workerHTML += "<b>Name:</b> "+user.name+"<br>";
workerHTML += "<b>Work:</b> "+user.work+"<br>";
workerHTML += "<b>City:</b> "+user.city+"<br>";
workerHTML += "<b>Mobile:</b> "+user.mobile+"<br>";

workerHTML += "</div>";

}

if(user.type == "company"){

companyHTML += "<div style='border:1px solid blue;padding:10px;margin:10px;'>";

companyHTML += "<b>Company:</b> "+user.name+"<br>";
companyHTML += "<b>City:</b> "+user.city+"<br>";
companyHTML += "<b>Contact:</b> "+user.mobile+"<br>";

companyHTML += "</div>";

}

if(user.type == "shop"){

shopHTML += "<div style='border:1px solid green;padding:10px;margin:10px;'>";

shopHTML += "<b>Shop:</b> "+user.name+"<br>";
shopHTML += "<b>Category:</b> "+user.work+"<br>";
shopHTML += "<b>City:</b> "+user.city+"<br>";
shopHTML += "<b>Mobile:</b> "+user.mobile+"<br>";

shopHTML += "</div>";

}

}

}

document.getElementById("workerList").innerHTML = workerHTML;
document.getElementById("companyList").innerHTML = companyHTML;
document.getElementById("shopList").innerHTML = shopHTML;

});

  }
