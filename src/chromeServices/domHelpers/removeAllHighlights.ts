import { ATTRIBUTE_ID } from "../../const";
import removeHighlight from "./removeHighlight";

export default function removeAllHighlights() {
  document.querySelectorAll<HTMLElement>(`[${ATTRIBUTE_ID}]`).forEach((el) => {
    removeHighlight(el);
  });
}
