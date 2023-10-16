import { ATTRIBUTE_ID } from "../const";
import getNodes from "./domHelpers/getNodes";
import addHighlight from "./domHelpers/addHighlight";
import removeHighlight from "./domHelpers/removeHighlight";
import { ActionType, Actions, MessageTypes } from "./types";

const messagesFromReactAppListener = (
  action: Actions,
  _sender: chrome.runtime.MessageSender,
  sendResponse: (response: ActionType["response"]) => void,
) => {
  switch (action.type) {
    case MessageTypes.PARSE_DOM: {
      const response = getNodes();
      sendResponse(response);
      break;
    }
    case MessageTypes.HIGHTLIGHT_GROUPS: {
      const nodesState: { [index: string]: boolean } = {};
      Object.values(action.payload.groupsByHash).forEach((groupValue) => {
        groupValue.nodesId.forEach((nodeId) => {
          nodesState[nodeId] = groupValue.highlighted;
        });
      });

      document
        .querySelectorAll<HTMLElement>(`[${ATTRIBUTE_ID}]`)
        .forEach((el) => {
          const nodeId: string = el.getAttribute(ATTRIBUTE_ID) || "0";
          if (nodesState[nodeId]) {
            addHighlight(el);
          } else {
            removeHighlight(el);
          }
        });
      sendResponse(true);
      break;
    }
    case MessageTypes.ON_POPUP_CLOSED: {
      document
        .querySelectorAll<HTMLElement>(`[${ATTRIBUTE_ID}]`)
        .forEach((el) => {
          removeHighlight(el);
        });
      sendResponse(true);
      break;
    }
    default: {
      sendResponse(true);
      break;
    }
  }
};

chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
