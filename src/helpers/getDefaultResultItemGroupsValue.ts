import { AVAILABLE_GROUPS } from "../config";
import { AvailableGroups } from "../chromeServices/types";

const getDefaultResultItemGroupsValue = () => {
  const groups = {} as { [key in AvailableGroups]: string };

  AVAILABLE_GROUPS.forEach((group) => {
    groups[group.id] = "";
  });

  return groups;
};

export default getDefaultResultItemGroupsValue;
