// main.js

let timerInterval = null;

const startBtn = document.getElementById("startBtn");
const getLinkBtn = document.getElementById("getLinkBtn");
const timerWrapper = document.getElementById("timerWrapper");
const timerText = document.getElementById("timerText");
const timerValueSpan = document.getElementById("timerValue");
const timerBarFill = document.getElementById("timerBarFill");
const statusMsg = document.getElementById("statusMsg");
// ====== ADSTERAA / HILLTOP DIRECT LINK CONFIG ======
const USE_DIRECT_LINK = true; // set false if you want to disable
const DIRECT_LINK_URL = "https://www.effectivegatecpm.com/usgsxbu3?key=623f817684031d00f0c5ff857b7bdbe9"; // replace with your real direct link
const DIRECT_LINK_KEY = "dl_shown_session"; // key for sessionStorage
// ===================================================
function triggerDirectLinkOnce() {
  try {
    if (!USE_DIRECT_LINK) return;

    // Check if already triggered this session
    const alreadyShown = sessionStorage.getItem(DIRECT_LINK_KEY);
    if (alreadyShown === "1") return;

    // Mark as shown
    sessionStorage.setItem(DIRECT_LINK_KEY, "1");

    // Open direct link in new tab/window (user click event context)
    if (DIRECT_LINK_URL && DIRECT_LINK_URL.startsWith("http")) {
      window.open(DIRECT_LINK_URL, "_blank");
    }
  } catch (e) {
    console.warn("Direct link error:", e);
  }
}


let remaining = TIMER_SECONDS;
let started = false;

function startDownloadProcess() {
  if (started) return;
  started = true;

  // 🔔 Trigger Adsterra / HilltopAds direct-link or popunder ONCE
  triggerDirectLinkOnce();

  startBtn.disabled = true;
  startBtn.classList.add("disabled");

  timerWrapper.classList.remove("hidden");
  statusMsg.textContent = "Preparing your secure download…";

  remaining = TIMER_SECONDS;
  timerValueSpan.textContent = remaining.toString();
  timerBarFill.style.width = "0%";

  const total = TIMER_SECONDS;

  timerInterval = setInterval(() => {
    remaining--;
    if (remaining < 0) {
      clearInterval(timerInterval);
      finishTimer();
    } else {
      timerValueSpan.textContent = remaining.toString();
      const progress = ((total - remaining) / total) * 100;
      timerBarFill.style.width = progress + "%";
    }
  }, 1000);
}


function finishTimer() {
  timerValueSpan.textContent = "0";
  timerBarFill.style.width = "100%";
  statusMsg.textContent = "Your download is ready.";

  // Enable "Get Download Link" button
  getLinkBtn.disabled = false;
  getLinkBtn.classList.remove("disabled");
}

function goToDownload() {
  if (getLinkBtn.disabled) return;

  statusMsg.textContent = "Starting download…";

  // Direct download:
  window.location.href = DOWNLOAD_URL;

  // OR if you want a final page:
  // window.location.href = "final-download.html?file=em-notes-sem2";
}

if (startBtn) {
  startBtn.addEventListener("click", startDownloadProcess);
}

if (getLinkBtn) {
  getLinkBtn.addEventListener("click", goToDownload);
}
