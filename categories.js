<!DOCTYPE html>
<html lang="hi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>Gram Shakti - Home</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body { 
            font-family: 'Noto Sans Devanagari', sans-serif; 
            background-color: #f8fafc;
            -webkit-tap-highlight-color: transparent;
        }
        .category-card:active { transform: scale(0.92); }
        .gradient-bg { background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); }
        /* स्मूथ स्क्रॉलिंग के लिए */
        .no-scrollbar::-webkit-scrollbar { display: none; }
    </style>
</head>
<body class="pb-24">

    <div class="gradient-bg text-white p-6 rounded-b-[2.5rem] shadow-lg sticky top-0 z-50">
        <div class="flex justify-between items-center mb-4">
            <h1 class="text-xl font-bold italic tracking-wider">GRAM SHAKTI</h1>
            <div class="bg-white/20 p-2 rounded-full">🔔</div>
        </div>
        
        <div class="bg-white rounded-2xl p-3 flex items-center shadow-inner">
            <span class="text-blue-600 mr-2 text-xl">📍</span>
            <div class="flex-1">
                <input type="number" id="pinInput" maxlength="6" 
                       class="w-full bg-transparent text-gray-800 font-bold outline-none text-sm" 
                       placeholder="पिन कोड डालें (उदा: 302001)" 
                       oninput="fetchLocation(this.value)">
                <p id="locationText" class="text-[10px] text-gray-400 font-bold uppercase">अपनी लोकेशन सेट करें</p>
            </div>
            <div id="loader" class="hidden animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
        </div>
    </div>

    <div class="px-4 -mt-4">
        <div class="bg-white rounded-xl shadow-md p-2 flex items-center border border-gray-100">
            <span class="mx-2 text-gray-400">🔍</span>
            <input type="text" placeholder="क्या काम करवाना है? (जैसे: मिस्त्री, पेंटर)" 
                   class="w-full p-2 outline-none text-sm text-gray-700">
        </div>
    </div>

    <div class="p-4 mt-4">
        <div class="flex justify-between items-center mb-4 px-2">
            <h2 class="text-gray-800 font-bold text-lg">सभी सेवाएं</h2>
            <span class="text-blue-600 text-xs font-bold">सभी देखें</span>
        </div>
        
        <div id="categoryGrid" class="grid grid-cols-3 gap-3">
            </div>
    </div>

    <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-3 flex justify-around shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
        <div class="flex flex-col items-center text-blue-600">
            <span class="text-xl">🏠</span>
            <span class="text-[10px] font-bold">होम</span>
        </div>
        <div class="flex flex-col items-center text-gray-400">
            <span class="text-xl">📢</span>
            <span class="text-[10px] font-bold">विज्ञापन</span>
        </div>
        <div class="flex flex-col items-center text-gray-400">
            <span class="text-xl">💼</span>
            <span class="text-[10px] font-bold">काम दें</span>
        </div>
        <div class="flex flex-col items-center text-gray-400">
            <span class="text-xl">👤</span>
            <span class="text-[10px] font-bold">प्रोफाइल</span>
        </div>
    </div>

<script>
// कैटेगरीज की लिस्ट
const categories = [
    { name: "किसान", eng: "Farmer", icon: "👨‍🌾", color: "bg-green-50" },
    { name: "ट्रैक्टर", eng: "Tractor", icon: "🚜", color: "bg-blue-50" },
    { name: "दूध/डेयरी", eng: "Dairy", icon: "🥛", color: "bg-indigo-50" },
    { name: "मिस्त्री", eng: "Mason", icon: "🧱", color: "bg-orange-50" },
    { name: "बिजली वाला", eng: "Electrician", icon: "⚡", color: "bg-yellow-50" },
    { name: "ड्राइवर", eng: "Driver", icon: "🚗", color: "bg-gray-100" },
    { name: "सब्जी/फल", eng: "Food", icon: "🍎", color: "bg-red-50" },
    { name: "किराना", eng: "Grocery", icon: "🛒", color: "bg-emerald-50" },
    { name: "मोबाइल", eng: "Mobile", icon: "📱", color: "bg-purple-50" }
];

// कैटेगरीज लोड करना
function init() {
    const grid = document.getElementById('categoryGrid');
    grid.innerHTML = categories.map(cat => `
        <div class="category-card ${cat.color} p-4 rounded-[2rem] flex flex-col items-center justify-center text-center shadow-sm border border-white transition-all active:shadow-inner" 
             onclick="openCategory('${cat.eng}')">
            <span class="text-3xl mb-2">${cat.icon}</span>
            <p class="text-[11px] font-bold text-gray-700 leading-tight">${cat.name}</p>
        </div>
    `).join('');
}

// पिन कोड से लोकेशन फेच करना (Free API)
async function fetchLocation(pin) {
    if(pin.length === 6) {
        const loader = document.getElementById('loader');
        const locText = document.getElementById('locationText');
        loader.classList.remove('hidden');
        
        try {
            const response = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
            const data = await response.json();
            
            if(data[0].Status === "Success") {
                const details = data[0].PostOffice[0];
                locText.innerText = `${details.District}, ${details.State} ✅`;
                locText.classList.replace('text-gray-400', 'text-green-600');
            } else {
                locText.innerText = "गलत पिन कोड!";
                locText.classList.replace('text-gray-400', 'text-red-500');
            }
        } catch (e) {
            locText.innerText = "नेटवर्क की समस्या!";
        }
        loader.classList.add('hidden');
    }
}

function openCategory(name) {
    const pin = document.getElementById('pinInput').value;
    if(!pin || pin.length < 6) {
        alert("पहले अपना सही पिन कोड डालें!");
        return;
    }
    alert(`${name} के वर्कर पिन कोड ${pin} में खोजे जा रहे हैं...`);
}

init();
</script>
</body>
</html>
