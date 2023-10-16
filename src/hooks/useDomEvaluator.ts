import { useState } from "react";
import { ActionType, MessageTypes } from "../chromeServices/types";

const useDomEvaluator = <T extends ActionType>(type: MessageTypes) => {
  const [result, setResult] = useState<T["response"] | undefined>(undefined);

  const evaluate = (
    payload?: T["payload"],
  ): Promise<T["response"] | undefined> =>
    new Promise((resolve, reject) => {
      if (chrome.tabs) {
        chrome.tabs.query(
          {
            active: true,
            currentWindow: true,
          },
          (tabs) => {
            chrome.tabs.sendMessage(
              tabs[0].id || 0,
              { type, payload },
              (response: ResponseType | T["response"]) => {
                setResult(response);
                resolve(response);
              },
            );
          },
        );
      } else {
        reject();
      }
    });

  return { evaluate, result };
};
export default useDomEvaluator;
