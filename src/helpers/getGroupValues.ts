import { AVAILABLE_GROUPS } from "../config";
import { AvailableGroups } from "../chromeServices/types";

const getGroupsValues = (computedStyles: CSSStyleDeclaration) => {
  const groups = {} as { [key in AvailableGroups]: string };

  AVAILABLE_GROUPS.forEach((group) => {
    groups[group.id] = computedStyles[group.id];
  });

  return groups;
};

export default getGroupsValues;
