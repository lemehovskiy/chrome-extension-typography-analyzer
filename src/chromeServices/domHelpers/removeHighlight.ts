import {
  ORIGINAL_BACKGROUND_COLOR_ATTRIBUTE,
  ORIGINAL_COLOR_ATTRIBUTE,
} from "../../const";

export default function removeHighlight(el: HTMLElement) {
  const newEl = el;
  newEl.style.color = el.getAttribute(ORIGINAL_COLOR_ATTRIBUTE) || "";
  newEl.style.backgroundColor =
    el.getAttribute(ORIGINAL_BACKGROUND_COLOR_ATTRIBUTE) || "";
}
