const STOCK_SYMBOL = "005930.KS";

// 1. 초기화 및 서비스 워커 등록
window.addEventListener('DOMContentLoaded', () => {
    loadSettingsFromStorage();
    fetchStockData();
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').then(() => console.log("SW Registered"));
    }
});

// 2. LocalStorage 연동 함수
function loadSettingsFromStorage() {
    document.getElementById('gemini-key').value = localStorage.getItem('gemini_api_key') || '';
    document.getElementById('stock-api-key').value = localStorage.getItem('stock_api_key') || '';
    document.getElementById('target-price').value = localStorage.getItem('target_price') || '';
}

function saveSettingsToStorage() {
    localStorage.setItem('gemini_api_key', document.getElementById('gemini-key').value);
    localStorage.setItem('stock_api_key', document.getElementById('stock-api-key').value);
    localStorage.setItem('target_price', document.getElementById('target-price').value);
    alert("설정이 저장되었습니다.");
    toggleSettings();
    fetchStockData();
}

function clearSettings() {
    if(confirm("모든 설정을 초기화할까요?")) {
        localStorage.clear();
        location.reload();
    }
}

// 3. 주가 데이터 가져오기 (Finnhub)
async function fetchStockData() {
    const apiKey = localStorage.getItem('stock_api_key');
    if(!apiKey) return;

    try {
        const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${STOCK_SYMBOL}&token=${apiKey}`);
        const data = await response.json();
        
        document.getElementById('price').innerText = data.c.toLocaleString();
        const diff = data.c - data.pc;
        const percent = (diff / data.pc * 100).toFixed(2);
        const changeEl = document.getElementById('change');
        changeEl.innerText = `${diff > 0 ? '+' : ''}${diff.toLocaleString()} (${percent}%)`;
        changeEl.style.color = diff >= 0 ? '#e53e3e' : '#3182ce';
        document.getElementById('current-time').innerText = new Date().toLocaleTimeString() + " 기준";
        
        checkPriceAlert(data.c);
        drawChart();
    } catch (e) { console.error("Data Fetch Error:", e); }
}

// 4. Gemini AI 분석 실행
async function runAIAnalysis() {
    const geminiKey = localStorage.getItem('gemini_api_key');
    const reportBox = document.getElementById('report-content');
    if(!geminiKey) return alert("설정에서 Gemini API Key를 먼저 입력해 주세요.");
    
    reportBox.innerHTML = "🧠 AI 전문가가 데이터를 분석 중입니다...";
    
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `삼성전자 현재가 정보를 바탕으로 투자 전문가로서의 짧은 분석과 대응 전략을 Markdown 없이 줄바꿈만 사용하여 5줄 내외로 작성해줘.` }] }]
            })
        });
        const result = await response.json();
        reportBox.innerHTML = result.candidates[0].content.parts[0].text.replace(/\n/g, '<br>');
    } catch (e) { reportBox.innerText = "분석 중 오류가 발생했습니다."; }
}

// 5. 알림 및 차트 보조 함수
async function requestNotificationPermission() {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') alert("알림이 활성화되었습니다.");
}

function checkPriceAlert(price) {
    const target = localStorage.getItem('target_price');
    if (target && price >= target && Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(reg => {
            reg.showNotification("🚀 목표가 도달!", { body: `삼성전자 현재가 ${price.toLocaleString()}원!` });
        });
    }
}

function drawChart() {
    const data = [{
        x: ['09:00', '10:00', '11:00', '13:00', '15:00'],
        y: [73500, 74200, 73900, 74500, 74500],
        type: 'scatter', mode: 'lines+markers', line: {color: '#3182ce', width: 3}
    }];
    const layout = { margin: { t: 10, b: 30, l: 40, r: 10 }, height: 250, paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)' };
    Plotly.newPlot('main-chart', data, layout, {displayModeBar: false});
}

function toggleSettings() {
    const m = document.getElementById('settings-modal');
    m.style.display = m.style.display === 'flex' ? 'none' : 'flex';
}

document.getElementById('analyze-btn').addEventListener('click', runAIAnalysis);
