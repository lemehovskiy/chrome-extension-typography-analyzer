export enum AvailableGroups {
  color = "color",
  fontSize = "fontSize",
  fontFamily = "fontFamily",
  fontWeight = "fontWeight",
}

export enum Order {
  asc = "asc",
  desc = "desc",
}

export type GroupsByHash = {
  [index: string]: {
    nodesId: Array<number>;
    nodes: Array<ResultItem>;
    totalTextsLength: number;
    percent: number;
    highlighted: boolean;
    nestedGroups: { byId: GroupsById; byHash: GroupsByHash };
  };
};

export type GroupsById = Array<string>;

export enum SpecialOrderType {
  rating = "rating",
}
export type OrderByType = SpecialOrderType | AvailableGroups;

export type NestedGroupSort = {
  [index: string]: { order: Order; orderBy: OrderByType };
};

export type ResultItem = {
  id: number;
  texts: Array<string>;
  totalTextsLength: number;
  nodeName: string;
  groups: { [key in AvailableGroups]: string };
};

export type ParseDomResultType = {
  nodes: Array<ResultItem>;
  totalTextsLengthForAllNodes: number;
};

export enum MessageTypes {
  PARSE_DOM = "parse_dom",
  HIGHTLIGHT_GROUPS = "hightlight_groups",
  ON_POPUP_CLOSED = "on_popup_closed",
}

export interface ActionType {
  type: MessageTypes;
  payload?: { [index: string]: any };
  response?: any;
}

export interface ParseDom extends ActionType {
  type: MessageTypes.PARSE_DOM;
  response: ParseDomResultType;
}

export interface HightlightGroups extends ActionType {
  type: MessageTypes.HIGHTLIGHT_GROUPS;
  payload: { groupsByHash: GroupsByHash };
}

export interface OnPopupClosed extends ActionType {
  type: MessageTypes.ON_POPUP_CLOSED;
}

export type Actions = ParseDom | HightlightGroups | OnPopupClosed;
