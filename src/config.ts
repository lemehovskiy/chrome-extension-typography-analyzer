import { AvailableGroups, Order } from "./chromeServices/types";

const AVAILABLE_GROUPS: Array<{ label: string; id: AvailableGroups }> = [
  {
    label: "Color",
    id: AvailableGroups.color,
  },
  {
    label: "Font size",
    id: AvailableGroups.fontSize,
  },
  {
    label: "Font family",
    id: AvailableGroups.fontFamily,
  },
  {
    label: "Font Weight",
    id: AvailableGroups.fontWeight,
  },
];

const DEFAULT_GROUP = AVAILABLE_GROUPS[0];

const DEFAULT_SORTING = Order.desc;

export { AVAILABLE_GROUPS, DEFAULT_GROUP, DEFAULT_SORTING };
