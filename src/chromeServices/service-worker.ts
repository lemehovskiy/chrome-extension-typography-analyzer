import { MessageTypes } from "./types";

chrome.runtime.onConnect.addListener((port) => {
  if (port.name === "popup") {
    port.onDisconnect.addListener(() => {
      if (chrome.tabs) {
        chrome.tabs.query(
          {
            active: true,
            currentWindow: true,
          },
          (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id || 0, {
              type: MessageTypes.ON_POPUP_CLOSED,
            });
          },
        );
      }
    });
  }
});
