import {
  ResultItem,
  AvailableGroups,
  GroupsByHash,
  GroupsById,
} from "../chromeServices/types";

const sortNodeByGroupName = (
  nodes: Array<ResultItem>,
  groupName: AvailableGroups,
): { byHash: GroupsByHash; byId: GroupsById } => {
  const groupsByHash = {} as GroupsByHash;
  const groupsById: GroupsById = [];
  let totalTextsLengthInCurrentChunk = 0;

  nodes.forEach((node) => {
    const groupId = node.groups[groupName];
    // eslint-disable-next-line no-prototype-builtins
    if (!groupsByHash.hasOwnProperty(node.groups[groupName])) {
      groupsByHash[groupId] = {
        nodesId: [],
        nodes: [],
        totalTextsLength: 0,
        percent: 0,
        highlighted: false,
        nestedGroups: { byHash: {}, byId: [] },
      };
    }
    totalTextsLengthInCurrentChunk += node.totalTextsLength;
    groupsByHash[groupId].nodesId.push(node.id);
    groupsByHash[groupId].nodes.push(node);
    groupsByHash[groupId].totalTextsLength += node.totalTextsLength;
  });

  // eslint-disable-next-line no-restricted-syntax
  for (const [id, value] of Object.entries(groupsByHash)) {
    const groupId = id;
    groupsById.push(groupId);
    groupsByHash[groupId].percent =
      Math.round(
        (value.totalTextsLength / (totalTextsLengthInCurrentChunk / 100)) * 100,
      ) / 100;
  }

  return { byId: groupsById, byHash: groupsByHash };
};

export default sortNodeByGroupName;
