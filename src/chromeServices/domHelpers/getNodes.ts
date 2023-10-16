import { SKIP_NODE_NAMES, ATTRIBUTE_ID } from "../../const";
import { ParseDomResultType, ResultItem } from "../types";
import getDefaultResultItemGroupsValue from "../../helpers/getDefaultResultItemGroupsValue";
import getGroupsValues from "../../helpers/getGroupValues";
import setHighlightAttributes from "./setHighlightAttributes";

export default function getNodes() {
  const result: ParseDomResultType = {
    nodes: [],
    totalTextsLengthForAllNodes: 0,
  };

  const walk = (node: any) => {
    const childrens = node.childNodes;
    if (childrens.length === 0) return;

    const resultItem: ResultItem = {
      texts: [],
      totalTextsLength: 0,
      nodeName: "",
      groups: getDefaultResultItemGroupsValue(),
      id: 0,
    };

    const { parentElement } = childrens[0];
    const computedStyles = window.getComputedStyle(parentElement);

    for (let i = 0; i < childrens.length; i += 1) {
      const children = childrens[i];

      if (!SKIP_NODE_NAMES.includes(children.nodeName)) {
        if (children.nodeType === 3) {
          if (!/^\n\s*$|^\s*$/.test(children.textContent)) {
            resultItem.texts.push(children.textContent);
            resultItem.totalTextsLength += children.textContent.length;
            resultItem.nodeName = children.parentNode.nodeName;
            resultItem.groups = getGroupsValues(computedStyles);
          }
        }
        if (children.childNodes.length > 0) {
          walk(children);
        }
      }
    }
    if (resultItem.totalTextsLength > 0) {
      setHighlightAttributes(parentElement);

      const nodeId = result.nodes.length;
      parentElement.setAttribute(ATTRIBUTE_ID, nodeId);
      resultItem.id = nodeId;

      result.nodes.push(resultItem);
    }
  };
  walk(document.body);

  return result;
}
