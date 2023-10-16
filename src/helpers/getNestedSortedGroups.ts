import sortNodeByGroupName from "./sortNodeByGroupName";
import {
  GroupsById,
  GroupsByHash,
  AvailableGroups,
  SpecialOrderType,
  NestedGroupSort,
} from "../chromeServices/types";
import { DEFAULT_SORTING } from "../config";
import getSortBy from "./getSortBy";

const getNestedSortedGroups = (
  groupsById: GroupsById,
  groupsByHash: GroupsByHash,
  groupId: AvailableGroups,
  nestedTableSort: NestedGroupSort,
) => {
  const newGroupsByHash = { ...groupsByHash };
  const newNestedTableSort = { ...nestedTableSort };

  groupsById.forEach((parentGroupId) => {
    const { byHash, byId } = sortNodeByGroupName(
      groupsByHash[parentGroupId].nodes,
      groupId,
    );
    const sortedGroupById = getSortBy(
      SpecialOrderType.rating,
      DEFAULT_SORTING,
      byHash,
      byId,
    );

    newGroupsByHash[parentGroupId].nestedGroups = {
      byHash,
      byId: sortedGroupById,
    };
    newNestedTableSort[parentGroupId] = {
      order: DEFAULT_SORTING,
      orderBy: SpecialOrderType.rating,
    };
  });

  return {
    nestedTableSort: newNestedTableSort,
    groupsByHash: newGroupsByHash,
    nestedGroupId: groupId,
  };
};

export default getNestedSortedGroups;
