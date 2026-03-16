<!DOCTYPE html>
<html lang="hi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Noto Sans Devanagari', sans-serif; background: #fdfaf5; }
        
        /* गोल्डन टच */
        .gold-border { border: 2px solid #bf953f; }
        .gold-gradient { background: linear-gradient(to right, #bf953f, #aa771c); }
        
        .premium-input {
            @apply w-full p-4 bg-white rounded-2xl outline-none border border-gray-100 shadow-sm transition-all focus:ring-2 focus:ring-[#bf953f];
        }

        /* ड्रॉपडाउन का लुक सुधारने के लिए */
        select {
            appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23bf953f'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 1rem center;
            background-size: 1.5em;
        }
    </style>
</head>
<body class="p-6">

    <div class="max-w-md mx-auto">
        <div class="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-[#bf953f]/20">
            <div class="text-center mb-6">
                <div class="text-3xl mb-2">📍</div>
                <h3 class="text-xl font-bold text-[#4e342e]">अपनी लोकेशन चुनें</h3>
                <p class="text-[10px] text-[#bf953f] font-bold uppercase tracking-widest">Village & Area Selection</p>
            </div>

            <div class="space-y-6">
                <div class="relative">
                    <label class="text-xs font-bold text-gray-400 ml-2 uppercase">पिनकोड (PIN Code)</label>
                    <input 
                        type="number" 
                        id="pincodeInput" 
                        class="premium-input mt-1"
                        placeholder="6 अंकों का कोड डालें" 
                        oninput="loadVillages()" 
                        maxlength="6"
                    >
                </div>

                <div class="relative">
                    <label class="text-xs font-bold text-gray-400 ml-2 uppercase">गाँव / इलाका (Village)</label>
                    <select id="villageSelect" class="premium-input mt-1 text-gray-700">
                        <option value="">पहले PIN Code डालें</option>
                    </select>
                </div>

                <button class="w-full gold-gradient text-white p-4 rounded-2xl font-bold text-lg shadow-lg active:scale-95 transition-all">
                    लोकेशन सेट करें ✨
                </button>
            </div>
        </div>
    </div>

<script>
async function loadVillages() {
    let pin = document.getElementById("pincodeInput").value;
    let villageSelect = document.getElementById("villageSelect");

    // पिनकोड 6 अंक का होते ही लोड करें
    if(pin.length === 6){
        villageSelect.innerHTML = "<option>गाँव लोड हो रहे हैं...</option>";
        
        try {
            const response = await fetch("https://api.postalpincode.in/pincode/" + pin);
            const data = await response.json();

            if(data[0].Status === "Success"){
                let villages = data[0].PostOffice;
                villageSelect.innerHTML = "<option value=''>अपना गाँव चुनें</option>";

                villages.forEach(place => {
                    let option = document.createElement("option");
                    option.value = place.Name;
                    option.text = `${place.Name} (${place.Block})`;
                    villageSelect.appendChild(option);
                });
                
                // फीडबैक के लिए बॉर्डर ग्रीन करना
                document.getElementById("pincodeInput").classList.add("border-green-500");
            } else {
                villageSelect.innerHTML = "<option>पिनकोड नहीं मिला</option>";
                document.getElementById("pincodeInput").classList.add("border-red-500");
            }
        } catch(error) {
            console.log("Error loading villages:", error);
            villageSelect.innerHTML = "<option>सर्वर त्रुटि!</option>";
        }
    } else {
        // अगर 6 अंक नहीं हैं तो रिसेट करें
        villageSelect.innerHTML = "<option value=''>पहले PIN Code डालें</option>";
        document.getElementById("pincodeInput").classList.remove("border-green-500", "border-red-500");
    }
}
</script>

</body>
</html>
              
