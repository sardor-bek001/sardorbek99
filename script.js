// --- 1. ANALOG SOAT VA RAQAMLARINI YASASH ---
var clockEl = document.getElementById('clock');
var hourHand = document.getElementById('hourHand');
var minHand = document.getElementById('minHand');
var secHand = document.getElementById('secHand');
var clockText = document.getElementById('clockText');

function createClockNumbers() {
  for (var i = 1; i <= 12; i++) {
    var numDiv = document.createElement('div');
    numDiv.className = 'num';
    
    var angle = i * 30;
    numDiv.style.transform = 'rotate(' + angle + 'deg)';
    
    var span = document.createElement('span');
    span.innerText = i;
    span.style.display = 'inline-block';
    span.style.transform = 'rotate(-' + angle + 'deg)';
    span.style.paddingTop = '6px';
    
    numDiv.appendChild(span);
    clockEl.appendChild(numDiv);
  }
}

function updateClock() {
  var now = new Date();
  var h = now.getHours();
  var m = now.getMinutes();
  var s = now.getSeconds();

  var sDeg = s * 6;
  var mDeg = m * 6 + s * 0.1;
  var hDeg = (h % 12) * 30 + m * 0.5;

  secHand.style.transform = 'rotate(' + sDeg + 'deg)';
  minHand.style.transform = 'rotate(' + mDeg + 'deg)';
  hourHand.style.transform = 'rotate(' + hDeg + 'deg)';

  var showH = h < 10 ? '0' + h : h;
  var showM = m < 10 ? '0' + m : m;
  var showS = s < 10 ? '0' + s : s;
  clockText.innerText = showH + ':' + showM + ':' + showS;
}

setInterval(updateClock, 1000);
createClockNumbers();
updateClock();


// --- 2. TAYMER QISMI (Kiritilgan son bilan) ---
var timeLeft = 0;
var timerId = null;

var timerDisplay = document.getElementById('timerDisplay');
var timeInput = document.getElementById('timeInput');
var infoText = document.getElementById('infoText');
var startBtn = document.getElementById('startBtn');
var stopBtn = document.getElementById('stopBtn');
var resetBtn = document.getElementById('resetBtn');

function updateTimerDisplay() {
  var m = Math.floor(timeLeft / 60);
  var s = timeLeft % 60;

  if (m < 10) m = '0' + m;
  if (s < 10) s = '0' + s;

  timerDisplay.innerText = m + ':' + s;
}

// Boshlash tugmasi
startBtn.onclick = function() {
  if (timerId !== null) return; // Taymer allaqachon yoqilgan bo'lsa to'xtatamiz

  // Agar taymer to'xtatilib (pause) qayta bosilmagan bo'lsa, inputdan yangi sonni olamiz
  if (timeLeft === 0) {
    var inputValue = Number(timeInput.value);
    
    if (inputValue <= 0 || isNaN(inputValue)) {
      infoText.innerText = "Iltimos, noldan katta son kiriting!";
      return;
    }
    
    timeLeft = inputValue;
    updateTimerDisplay();
  }

  infoText.innerText = "Taymer ishlayapti...";

  timerId = setInterval(function() {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else {
      clearInterval(timerId);
      timerId = null;
      infoText.innerText = "Vaqt tugadi!";
      
      setTimeout(function() {
        infoText.innerText = "Yangi sekund kiriting va Boshlashni bosing";
      }, 3000);
    }
  }, 1000);
};

// To'xtatish tugmasi
stopBtn.onclick = function() {
  clearInterval(timerId);
  timerId = null;
  infoText.innerText = "Taymer to'xtatildi.";
};

// Qaytarish (Nollash) tugmasi
resetBtn.onclick = function() {
  clearInterval(timerId);
  timerId = null;
  timeLeft = 0;
  timeInput.value = '';
  updateTimerDisplay();
  infoText.innerText = "Taymer nollatildi.";
};