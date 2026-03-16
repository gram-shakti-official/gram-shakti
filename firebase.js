<!DOCTYPE html>
<html lang="hi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>Registration - Gram Shakti</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Noto Sans Devanagari', sans-serif; background-color: #f8fafc; }
        .input-box { @apply w-full p-4 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all; }
    </style>
</head>
<body class="p-4 pb-10">

    <div class="max-w-md mx-auto">
        <div class="text-center my-6">
            <h1 class="text-3xl font-bold text-blue-700">वर्कर रजिस्ट्रेशन</h1>
            <p class="text-gray-500 text-sm">ग्राम शक्ति से जुड़ें और काम पाएं</p>
        </div>

        <div class="space-y-4">
            <input type="text" id="name" class="input-box" placeholder="आपका पूरा नाम (उदा: विकास कुमार)">
            
            <input type="tel" id="phone" class="input-box" placeholder="मोबाइल नंबर (10 अंक)">

            <select id="category" class="input-box">
                <option value="">अपना काम चुनें</option>
                <option value="Farmer">किसान (Farmer)</option>
                <option value="Mason">मिस्त्री (Mason)</option>
                <option value="Electrician">बिजली वाला (Electrician)</option>
                <option value="Driver">ड्राइवर (Driver)</option>
                <option value="Mechanic">मैकेनिक (Mechanic)</option>
                <option value="Painter">पेंटर (Painter)</option>
            </select>

            <input type="number" id="pin" class="input-box" placeholder="पिन कोड (उदा: 302001)" oninput="checkPin(this.value)">
            
            <div id="locDisplay" class="text-xs text-blue-600 font-bold ml-2 hidden">📍 लोकेशन लोड हो रही है...</div>

            <input type="password" id="pass" class="input-box" placeholder="एक नया पासवर्ड बनाएं">

            <button onclick="saveWorker()" class="w-full bg-blue-600 text-white p-5 rounded-2xl font-bold text-lg shadow-lg active:scale-95 transition-all">
                रजिस्टर करें ✨
            </button>
        </div>
    </div>

<script>
    // आपका दिया हुआ Firebase Configuration
    const firebaseConfig = {
      apiKey: "AIzaSyA0J8TCjU2wxDNmT2O4VMfchY06arTO-O0",
      authDomain: "gram-shakti-app-2367b.firebaseapp.com",
      databaseURL: "https://gram-shakti-app-2367b-default-rtdb.firebaseio.com",
      projectId: "gram-shakti-app-2367b",
      storageBucket: "gram-shakti-app-2367b.appspot.com",
      messagingSenderId: "606732424351",
      appId: "1:606732424351:web:5802ac51402c6921233eaa"
    };
    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();

    // पिन कोड से लोकेशन चेक करना
    async function checkPin(pin) {
        if(pin.length === 6) {
            const display = document.getElementById('locDisplay');
            display.classList.remove('hidden');
            const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
            const data = await res.json();
            if(data[0].Status === "Success") {
                display.innerText = "📍 " + data[0].PostOffice[0].District + ", " + data[0].PostOffice[0].State;
            } else {
                display.innerText = "❌ गलत पिन कोड";
            }
        }
    }

    // वर्कर डेटा सेव करना
    function saveWorker() {
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const category = document.getElementById('category').value;
        const pin = document.getElementById('pin').value;
        const pass = document.getElementById('pass').value;

        if(!name || !phone || !pass || !pin) {
            alert("कृपया सभी जानकारी भरें!");
            return;
        }

        const workerData = {
            name: name,
            phone: phone,
            category: category,
            pin: pin,
            pass: pass,
            registeredOn: Date.now(),
            verified: false // शुरू में अनवेरिफाइड
        };

        // मोबाइल नंबर को 'Key' बनाकर सेव करना ताकि डुप्लीकेट न हो
        database.ref("users/" + phone).set(workerData).then(() => {
            alert("बधाई हो! आप ग्राम शक्ति से जुड़ चुके हैं। ✅");
            window.location.href = "login.html";
        }).catch(err => alert("त्रुटि: " + err.message));
    }
</script>
</body>
</html>
