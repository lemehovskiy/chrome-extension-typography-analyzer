import {
  AvailableGroups,
  GroupsByHash,
  Order,
  OrderByType,
  SpecialOrderType,
} from "../chromeServices/types";

const getCompareSortFunctions = (
  orderBy: OrderByType,
  order: Order,
  groupsByHash: GroupsByHash,
) => {
  switch (orderBy) {
    case AvailableGroups.fontWeight:
    case AvailableGroups.fontSize:
      return (a: string, b: string) => {
        const aNumber = Number.parseInt(a, 10);
        const bNumber = Number.parseInt(b, 10);

        return order === Order.asc ? aNumber - bNumber : bNumber - aNumber;
      };
    case SpecialOrderType.rating:
      return (a: string, b: string) => {
        const percentA = groupsByHash[a].percent;
        const percentB = groupsByHash[b].percent;

        return order === Order.asc ? percentA - percentB : percentB - percentA;
      };
    default:
      return (a: string, b: string) =>
        order === Order.asc ? b.localeCompare(a) : a.localeCompare(b);
  }
};

export default getCompareSortFunctions;
