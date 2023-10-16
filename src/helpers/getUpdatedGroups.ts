import sortNodeByGroupName from "./sortNodeByGroupName";
import {
  ParseDomResultType,
  AvailableGroups,
  OrderByType,
  Order,
} from "../chromeServices/types";
import getSortBy from "./getSortBy";

const getUpdatedGroups = (
  orderBy: OrderByType,
  order: Order,
  response: ParseDomResultType | undefined,
  groupId: AvailableGroups,
) => {
  if (!response) return { byId: [], byHash: {} };

  const { byHash, byId } = sortNodeByGroupName(response.nodes, groupId);
  const sortedGroupById = getSortBy(orderBy, order, byHash, byId);
  return { byId: sortedGroupById, byHash };
};

export default getUpdatedGroups;
