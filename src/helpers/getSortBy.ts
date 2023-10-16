import getCompareSortFunctions from "./getCompareSortFunction";
import {
  OrderByType,
  Order,
  GroupsByHash,
  GroupsById,
} from "../chromeServices/types";

const getSortBy = (
  orderBy: OrderByType,
  order: Order,
  groupsByHash: GroupsByHash,
  groupsById: GroupsById,
) => {
  const newGroupsById = groupsById.slice();
  const compareSortFunction = getCompareSortFunctions(
    orderBy,
    order,
    groupsByHash,
  );
  newGroupsById.sort(compareSortFunction);

  return newGroupsById;
};

export default getSortBy;
