function openOptions() {
  chrome.runtime.openOptionsPage();
}

document.getElementById("openOptionsBtn").addEventListener("click", () => {
  chrome.runtime.openOptionsPage();
});