chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get("rules", (data) => {
    if (data.rules) {
      applyDynamicRules(data.rules);
    }
  });
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.rules) {
    applyDynamicRules(changes.rules.newValue);
  }
});

function applyDynamicRules(rules) {
  chrome.declarativeNetRequest.getDynamicRules((existingRules) => {
    const existingIds = existingRules.map(r => r.id);

    // const newRules = rules.map((rule, index) => {
    //   const newRule = {
    //     id: index + 1,
    //     priority: 1,
    //     action: {
    //       type: "redirect",
    //       redirect: {
    //         transform: {
    //           queryTransform: {
    //             removeParams: [rule.param],
    //             addOrReplaceParams: [
    //               { key: rule.param, value: rule.newValue }
    //             ]
    //           }
    //         }
    //       }
    //     },
    //     condition: {
    //       urlFilter: rule.match,
    //       resourceTypes: ["xmlhttprequest"]
    //     }
    //   };
    //   console.log('✅ Applying rule:', newRule);
    //   return newRule;
    // });

    const newRules = [{
      id: 1,
      priority: 1,
      action: {
        type: "redirect",
        redirect: {
          url: ""
        }
      },
      condition: {
        urlFilter: "",
        resourceTypes: ["main_frame"]
      }
    },
    {
      "id": 2,
      "priority": 1,
      "action": {
        "type": "redirect",
        "redirect": {
          "regexSubstitution": ""
        }
      },
      "condition": {
        "regexFilter": "",
        "resourceTypes": ["main_frame"]
      }
    }
  ];


    console.log('existingIds', existingIds, newRules)

    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: existingIds,
      addRules: newRules
    }, () => {
      if (chrome.runtime.lastError) {
        console.error("❌ Failed to update rules:", chrome.runtime.lastError);
      } else {
        console.log("🚀 Rules updated successfully");
      }
    });
  });
}


applyDynamicRules()