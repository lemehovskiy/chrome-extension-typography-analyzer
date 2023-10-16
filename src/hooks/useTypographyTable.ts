import { useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import {
  AvailableGroups,
  GroupsByHash,
  GroupsById,
  HightlightGroups,
  MessageTypes,
  NestedGroupSort,
  Order,
  OrderByType,
  ParseDom,
  ParseDomResultType,
  SpecialOrderType,
} from "../chromeServices/types";
import useDomEvaluator from "./useDomEvaluator";
import useStorageState from "./useStorageState";
import { DEFAULT_GROUP, DEFAULT_SORTING } from "../config";
import getUpdatedGroups from "../helpers/getUpdatedGroups";
import getSortBy from "../helpers/getSortBy";
import getNestedSortedGroups from "../helpers/getNestedSortedGroups";

export default function useTypographyTable() {
  const { evaluate: parseDom, result: dom } = useDomEvaluator<ParseDom>(
    MessageTypes.PARSE_DOM,
  );

  const [groupsById, setGroupsById] = useState<GroupsById>([]);
  const [groupsByHash, setGroupsByHash] = useState<GroupsByHash>(
    {} as GroupsByHash,
  );
  const [order, setOrder] = useStorageState<Order>(Order.desc, "order");
  const [orderBy, setOrderBy] = useStorageState<OrderByType>(
    SpecialOrderType.rating,
    "orderBy",
  );
  const [nestedTableSort, setNestedTableSort] =
    useStorageState<NestedGroupSort>({}, "nestedTableSort");

  const [currentGroupId, setCurrentGroupId] = useStorageState(
    DEFAULT_GROUP.id,
    "currentGroup",
  );
  const [nestedGroupId, setNestedGroupId, nestedGroupIdInited] =
    useStorageState<AvailableGroups | "">("", "nestedGroup");

  const { evaluate: highlightGroup } = useDomEvaluator<HightlightGroups>(
    MessageTypes.HIGHTLIGHT_GROUPS,
  );

  const isActiveAllGroups = Object.values(groupsByHash).every(
    (value) => value.highlighted,
  );

  const handleSort = (property: OrderByType) => {
    const isCurrentOrder = orderBy === property && order === DEFAULT_SORTING;
    setOrder(isCurrentOrder ? Order.asc : Order.desc);
    setOrderBy(property);
  };

  useEffect(() => {
    const sortedGroupById = getSortBy(orderBy, order, groupsByHash, groupsById);
    setGroupsById(sortedGroupById);

    // groupsById is missing in the dependencies since it can provoke an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, orderBy, groupsByHash]);

  const handleSortNestedTable = (property: OrderByType, parentId: string) => {
    const newNestedTableSort = { ...nestedTableSort };
    const { order: nestedTableOrder, orderBy: nestedTableOrderBy } =
      nestedTableSort[parentId];
    const isCurrentOrder =
      nestedTableOrderBy === property && nestedTableOrder === DEFAULT_SORTING;

    const newOrder = isCurrentOrder ? Order.asc : Order.desc;
    const newOrderBy = property;

    newNestedTableSort[parentId].order = newOrder;
    newNestedTableSort[parentId].orderBy = newOrderBy;

    setNestedTableSort(newNestedTableSort);

    const sortedGroupById = getSortBy(
      newOrderBy,
      newOrder,
      groupsByHash[parentId].nestedGroups?.byHash || {},
      groupsByHash[parentId].nestedGroups?.byId || [],
    );

    const newGroupsByHash = { ...groupsByHash };

    newGroupsByHash[parentId].nestedGroups.byId = sortedGroupById;
  };

  const handleHightlightGroup = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const groupId = event.target.name;
    const newGroupsByHash = { ...groupsByHash };
    newGroupsByHash[groupId].highlighted = !groupsByHash[groupId].highlighted;

    setGroupsByHash(newGroupsByHash);
    highlightGroup({ groupsByHash: newGroupsByHash });
  };

  const handleHightlightAllGroups = () => {
    const newGroupsByHash = { ...groupsByHash };
    let newState = true;
    if (isActiveAllGroups) {
      newState = false;
    }

    Object.entries(groupsByHash).forEach(([groupId]) => {
      newGroupsByHash[groupId].highlighted = newState;
    });

    setGroupsByHash(newGroupsByHash);
    highlightGroup({ groupsByHash: newGroupsByHash });
  };

  const handleGroupsChanged = (
    newOrderBy: OrderByType,
    newOrder: Order,
    response: ParseDomResultType | undefined,
    groupId: AvailableGroups,
  ) => {
    const { byId, byHash } = getUpdatedGroups(
      newOrderBy,
      newOrder,
      response,
      groupId,
    );
    setGroupsById(byId);
    setGroupsByHash(byHash);
  };

  const applyNestedFilter = (
    gById: GroupsById,
    gByHash: GroupsByHash,
    groupId: AvailableGroups,
  ) => {
    const {
      nestedTableSort: newNestedTableSort,
      groupsByHash: newGroupsByHash,
    } = getNestedSortedGroups(gById, gByHash, groupId, nestedTableSort);
    setNestedTableSort(newNestedTableSort);
    setGroupsByHash(newGroupsByHash);
    setNestedGroupId(groupId);
  };

  const handleChangeFilter = (event: SelectChangeEvent) => {
    const newGroupId = event.target.value as AvailableGroups;
    setCurrentGroupId(newGroupId);
    handleGroupsChanged(orderBy, order, dom, newGroupId);
    setNestedGroupId("");
  };

  const handleChangeNestedFilter = (event: SelectChangeEvent) => {
    const newGroupId = event.target.value as AvailableGroups;
    applyNestedFilter(groupsById, groupsByHash, newGroupId);
  };

  const init = async () => {
    const result = await parseDom();

    const { byId, byHash } = getUpdatedGroups(
      orderBy,
      order,
      result,
      currentGroupId,
    );
    setGroupsById(byId);
    setGroupsByHash(byHash);

    if (nestedGroupId) {
      applyNestedFilter(byId, byHash, nestedGroupId);
    }
  };

  useEffect(() => {
    if (!nestedGroupIdInited) return;
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nestedGroupIdInited]);

  return {
    groupsById,
    groupsByHash,
    currentGroupId,
    orderBy,
    order,
    nestedGroupId,
    nestedTableSort,
    handleSortNestedTable,
    handleSort,
    handleHightlightGroup,
    handleChangeFilter,
    handleChangeNestedFilter,
    handleHightlightAllGroups,
  };
}
