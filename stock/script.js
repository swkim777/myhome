const STOCK_SYMBOL = "005930.KS";

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(() => console.log("SW Registered"));
}

async function requestNotificationPermission() {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
        alert("알림이 허용되었습니다.");
        document.getElementById('noti-btn').innerText = "🔔 알림 활성화됨";
    }
}

async function fetchStockData() {
    const apiKey = document.getElementById('stock-api-key').value || 'YOUR_FINNHUB_KEY';
    try {
        const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${STOCK_SYMBOL}&token=${apiKey}`);
        const data = await response.json();
        
        document.getElementById('price').innerText = data.c.toLocaleString();
        const diff = data.c - data.pc;
        const percent = (diff / data.pc * 100).toFixed(2);
        const changeEl = document.getElementById('change');
        changeEl.innerText = `${diff > 0 ? '+' : ''}${diff.toLocaleString()} (${percent}%)`;
        changeEl.style.color = diff >= 0 ? '#e53e3e' : '#3182ce';
        
        checkPriceAlert(data.c);
        drawChart();
        return data;
    } catch (e) { console.error(e); }
}

function checkPriceAlert(price) {
    const target = document.getElementById('target-price').value;
    if (target && price >= target && Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(reg => {
            reg.showNotification("🚀 삼성전자 목표가 도달!", {
                body: `현재가 ${price.toLocaleString()}원입니다.`,
                icon: "https://cdn-icons-png.flaticon.com/512/2534/2534414.png"
            });
        });
    }
}

async function runAIAnalysis() {
    const geminiKey = document.getElementById('gemini-key').value;
    const reportBox = document.getElementById('report-content');
    if(!geminiKey) return alert("Gemini API Key가 필요합니다.");
    
    reportBox.innerHTML = "💡 AI 분석 중...";
    const stock = await fetchStockData();
    
    try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `삼성전자 현재가 ${stock.c}원 분석 및 대응 전략을 전문가처럼 5줄 요약해줘.` }] }]
            })
        });
        const json = await res.json();
        reportBox.innerHTML = json.candidates[0].content.parts[0].text.replace(/\n/g, '<br>');
    } catch (e) { reportBox.innerText = "분석 실패"; }
}

function drawChart() {
    const data = [{
        x: ['09:00', '10:00', '11:00', '13:00', '15:00'],
        y: [73500, 74000, 73800, 74200, 74500],
        type: 'scatter', mode: 'lines+markers', line: {color: '#3182ce'}
    }];
    Plotly.newPlot('main-chart', data, { margin: { t: 20, b: 30, l: 40, r: 20 }, height: 250 });
}

function toggleSettings() {
    const m = document.getElementById('settings-modal');
    m.style.display = m.style.display === 'flex' ? 'none' : 'flex';
}

document.getElementById('analyze-btn').addEventListener('click', runAIAnalysis);
setInterval(fetchStockData, 60000);
fetchStockData();
