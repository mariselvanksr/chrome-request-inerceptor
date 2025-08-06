// options.js
const ruleForm = document.getElementById("ruleForm");
const ruleList = document.getElementById("ruleList");

function loadRules() {
  chrome.storage.sync.get("rules", (data) => {
    const rules = data.rules || [];
    ruleList.innerHTML = "";
    rules.forEach((rule, index) => {
      const li = document.createElement("li");
      li.textContent = `${rule.match} → ${rule.param} = ${rule.newValue}`;
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "❌";
      removeBtn.onclick = () => removeRule(index);
      li.appendChild(removeBtn);
      ruleList.appendChild(li);
    });
  });
}

function removeRule(index) {
  chrome.storage.sync.get("rules", (data) => {
    const rules = data.rules || [];
    rules.splice(index, 1);
    chrome.storage.sync.set({ rules }, loadRules);
  });
}

ruleForm.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(ruleForm);
  const newRule = {
    match: formData.get("match"),
    param: formData.get("param"),
    newValue: formData.get("newValue")
  };

  chrome.storage.sync.get("rules", (data) => {
    const rules = data.rules || [];
    rules.push(newRule);
    chrome.storage.sync.set({ rules }, () => {
      ruleForm.reset();
      loadRules();
    });
  });
};

loadRules();
