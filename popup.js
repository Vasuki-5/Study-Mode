// DOM elements
const toggleStudy = document.getElementById('toggleStudy');
const statusLabel = document.getElementById('statusLabel');
const minutesInput = document.getElementById('minutesInput');
const startBtn = document.getElementById('startBtn');
const activeTimerDiv = document.getElementById('activeTimer');
const countdownText = document.getElementById('countdownText');
const restartBtn = document.getElementById('restartBtn');
const extendBtn = document.getElementById('extendBtn');
const exitBtn = document.getElementById('exitBtn');

// Load initial state
chrome.storage.sync.get(['studyActive', 'endTime'], data => {
  toggleStudy.checked = data.studyActive || false;
  statusLabel.textContent = data.studyActive ? "ON" : "OFF";

  if (data.endTime) {
    startCountdown(data.endTime);
  }
});

// Toggle switch
toggleStudy.addEventListener('change', () => {
  chrome.storage.sync.set({ studyActive: toggleStudy.checked });
  statusLabel.textContent = toggleStudy.checked ? "ON" : "OFF";
});

// Start timer
startBtn.addEventListener('click', () => {
  const minutes = parseInt(minutesInput.value) || 30;
  const endTime = Date.now() + minutes * 60 * 1000;
  chrome.storage.sync.set({ studyActive: true, endTime });

  toggleStudy.checked = true;
  statusLabel.textContent = "ON";
  startCountdown(endTime);
  alert("Study Mode started for " + minutes + " minutes!");
});

// Countdown function
let countdownInterval;

function startCountdown(endTime) {
  activeTimerDiv.style.display = "block";

  function updateTimer() {
    const remaining = endTime - Date.now();
    if (remaining <= 0) {
      clearInterval(countdownInterval);
      alert("Time's up! Take a break?");
      chrome.storage.sync.remove('endTime');
      countdownText.textContent = "00:00";
      return;
    }

    // 5-minute warning
    if (remaining <= 5 * 60 * 1000 && remaining > 4.9 * 60 * 1000) {
      alert("⚠️ 5 minutes left!");
    }

    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    countdownText.textContent =
      String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0');
  }

  updateTimer();
  countdownInterval = setInterval(updateTimer, 1000);
}

// Buttons
restartBtn.addEventListener('click', () => {
  chrome.storage.sync.remove('endTime');
  const defaultMin = parseInt(minutesInput.value) || 30;
  const endTime = Date.now() + defaultMin * 60 * 1000;
  chrome.storage.sync.set({ studyActive: true, endTime });
  startCountdown(endTime);
  alert("Timer restarted!");
});

extendBtn.addEventListener('click', () => {
  const addTime = 10 * 60 * 1000; // 10 minutes
  chrome.storage.sync.get('endTime', data => {
    const newEnd = (data.endTime || Date.now()) + addTime;
    chrome.storage.sync.set({ endTime: newEnd });
    startCountdown(newEnd);
    alert("Extended by 10 minutes!");
  });
});

exitBtn.addEventListener('click', () => {
  chrome.storage.sync.set({ studyActive: false });
  chrome.storage.sync.remove('endTime');
  toggleStudy.checked = false;
  statusLabel.textContent = "OFF";
  activeTimerDiv.style.display = "none";
  alert("Study Mode turned OFF");
});
