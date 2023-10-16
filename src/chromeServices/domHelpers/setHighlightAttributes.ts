import {
  ATTRIBUTE_ID,
  ORIGINAL_BACKGROUND_COLOR_ATTRIBUTE,
  ORIGINAL_COLOR_ATTRIBUTE,
} from "../../const";

const setHighlightAttributes = (el: HTMLElement) => {
  if (!el.getAttribute(ATTRIBUTE_ID)) {
    if (el.getAttribute(ORIGINAL_BACKGROUND_COLOR_ATTRIBUTE) === null) {
      el.setAttribute(
        ORIGINAL_BACKGROUND_COLOR_ATTRIBUTE,
        el.style.backgroundColor,
      );
    }
    if (el.getAttribute(ORIGINAL_COLOR_ATTRIBUTE) === null) {
      el.setAttribute(ORIGINAL_COLOR_ATTRIBUTE, el.style.color);
    }
  }
};

export default setHighlightAttributes;
