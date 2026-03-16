// ===============================
// REGISTER USER (Premium)
// ===============================
function registerUser() {
    let name = document.getElementById("name").value.trim();
    let mobile = document.getElementById("mobile").value.trim();
    let type = document.getElementById("type").value;
    let work = document.getElementById("work").value.trim();
    let pin = document.getElementById("pincodeInput") ? document.getElementById("pincodeInput").value : "";
    let city = document.getElementById("villageSelect") ? document.getElementById("villageSelect").value : document.getElementById("city").value;

    if (!name || mobile.length < 10 || !type || !city) {
        alert("कृपया सभी जानकारी सही से भरें!");
        return;
    }

    let id = Date.now();
    firebase.database().ref("users/" + mobile).set({
        id: id,
        name: name,
        mobile: mobile,
        type: type,
        work: work,
        city: city,
        pin: pin,
        registeredAt: new Date().toISOString()
    }).then(() => {
        alert("बधाई हो! रजिस्ट्रेशन सफल रहा।");
        window.location.href = "login.html";
    });
}

// ===============================
// LOGIN USER (Fast & Secure)
// ===============================
function loginUser() {
    let mobile = document.getElementById("loginMobile").value.trim();
    let pass = document.getElementById("loginPass") ? document.getElementById("loginPass").value : null;

    firebase.database().ref("users/" + mobile).once("value", (snapshot) => {
        let user = snapshot.val();
        if (user) {
            localStorage.setItem("mobile", mobile);
            localStorage.setItem("user", JSON.stringify(user));
            alert("नमस्ते " + user.name + ", लॉगिन सफल!");
            window.location.href = "index.html";
        } else {
            alert("यह नंबर रजिस्टर नहीं है। कृपया नया अकाउंट बनाएं।");
        }
    });
}

// ===============================
// LOAD WORKERS (Premium Card Design)
// ===============================
function loadWorkers() {
    let workerBox = document.getElementById("workerList");
    if (!workerBox) return;

    firebase.database().ref("users").on("value", (snapshot) => {
        let data = snapshot.val();
        let html = "";
        for (let key in data) {
            let user = data[key];
            if (user.type == "worker") {
                html += `
                <div class="premium-card p-5 bg-white rounded-[2rem] shadow-sm border border-gray-100 mb-4">
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="font-bold text-gray-800 text-lg">${user.name}</h3>
                            <p class="text-xs text-blue-600 font-bold uppercase">${user.work}</p>
                        </div>
                        <a href="tel:${user.mobile}" class="bg-green-500 text-white p-2 px-4 rounded-xl text-xs font-bold">📞 कॉल</a>
                    </div>
                    <p class="text-[11px] text-gray-400 mt-2 font-bold uppercase tracking-tight">📍 ${user.city}</p>
                    <button onclick="hireWorker('${user.mobile}','${user.work}','${user.city}')" 
                            class="w-full mt-4 bg-[#4e342e] text-[#fcf6ba] py-3 rounded-2xl font-bold text-xs shadow-md active:scale-95 transition-all">
                        हायर करें (Hire Now)
                    </button>
                </div>`;
            }
        }
        workerBox.innerHTML = html || "<p class='text-center text-gray-400'>कोई वर्कर नहीं मिला</p>";
    });
}

// ===============================
// HIRE WORKER (Request System)
// ===============================
function hireWorker(workerMobile, work, city) {
    let customerMobile = localStorage.getItem("mobile");
    if (!customerMobile) {
        alert("हायर करने के लिए कृपया पहले लॉगिन करें!");
        window.location.href = "login.html";
        return;
    }

    let id = Date.now();
    firebase.database().ref("hire_requests/" + id).set({
        id: id,
        workerMobile: workerMobile,
        customerMobile: customerMobile,
        work: work,
        city: city,
        status: "pending",
        time: id
    }).then(() => {
        alert("हायर रिक्वेस्ट भेज दी गई है! वर्कर जल्द ही आपसे संपर्क करेगा।");
    });
}

// ===============================
// WORKER DASHBOARD (Accept/Reject)
// ===============================
function loadWorkerRequests() {
    let workerMobile = localStorage.getItem("mobile");
    let requestContainer = document.getElementById("requestList");
    if (!requestContainer) return;

    firebase.database().ref("hire_requests").on("value", (snapshot) => {
        let html = "";
        snapshot.forEach((data) => {
            let req = data.val();
            if (req.workerMobile == workerMobile) {
                let statusColor = req.status == "accepted" ? "text-green-600" : (req.status == "rejected" ? "text-red-600" : "text-amber-600");
                html += `
                <div class="premium-card p-5 bg-white rounded-3xl shadow-sm border-l-8 border-brown-500 mb-4">
                    <p class="text-[10px] font-bold text-gray-400 uppercase">नयी रिक्वेस्ट</p>
                    <h4 class="font-bold text-gray-800">ग्राहक: ${req.customerMobile}</h4>
                    <p class="text-xs text-gray-600">${req.work} - ${req.city}</p>
                    <p class="text-xs font-bold mt-2 ${statusColor}">स्टेटस: ${req.status.toUpperCase()}</p>
                    
                    <div class="flex gap-2 mt-4">
                        <button onclick="updateRequest('${data.key}', 'accepted')" class="flex-1 bg-green-600 text-white py-2 rounded-xl font-bold text-xs">स्वीकार (Accept)</button>
                        <button onclick="updateRequest('${data.key}', 'rejected')" class="flex-1 bg-gray-200 text-gray-600 py-2 rounded-xl font-bold text-xs">मना करें</button>
                    </div>
                </div>`;
            }
        });
        requestContainer.innerHTML = html || "<p class='text-center text-gray-400'>अभी कोई रिक्वेस्ट नहीं है</p>";
    });
}

function updateRequest(id, status) {
    firebase.database().ref("hire_requests/" + id).update({ status: status });
    alert("स्टेटस अपडेट कर दिया गया है।");
}

// ===============================
// ADS & SEARCH (Unified Logic)
// ===============================
function loadAds() {
    let adBox = document.getElementById("adsBox");
    if (!adBox) return;

    firebase.database().ref("advertisements").on("value", (snapshot) => {
        let data = snapshot.val();
        let html = "";
        for (let key in data) {
            let ad = data[key];
            html += `
            <div class="premium-card p-5 bg-white rounded-[2rem] shadow-sm border-l-8 border-[#bf953f] mb-4">
                <p class="text-[9px] font-bold text-[#bf953f] uppercase tracking-widest">Sponsored Ad</p>
                <h3 class="font-bold text-gray-800 text-lg">${ad.title}</h3>
                <p class="text-xs text-gray-500">${ad.businessName} - ${ad.city}</p>
                <p class="text-sm text-gray-700 mt-2 italic">"${ad.description}"</p>
                <a href="tel:${ad.mobile}" class="inline-block mt-3 text-blue-600 font-bold text-xs underline">कॉल करें: ${ad.mobile}</a>
            </div>`;
        }
        adBox.innerHTML = html;
    });
}

// ===============================
// PAGE INIT
// ===============================
window.onload = function() {
    loadWorkers();
    loadAds();
    loadWorkerRequests();
};
  
