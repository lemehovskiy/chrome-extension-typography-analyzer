import { visuallyHidden } from "@mui/utils";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Switch,
  TableSortLabel,
} from "@mui/material";
import {
  AvailableGroups,
  GroupsByHash,
  GroupsById,
  NestedGroupSort,
  Order,
  OrderByType,
  SpecialOrderType,
} from "../chromeServices/types";
import { AVAILABLE_GROUPS, DEFAULT_SORTING } from "../config";

function CustomTableSortLabel({
  tableCellId,
  orderBy,
  order,
  onClickSort,
  children,
}: {
  tableCellId: OrderByType;
  orderBy: OrderByType;
  order: Order;
  onClickSort: (property: OrderByType) => void;
  children: React.ReactNode;
}) {
  const createSortHandler = (property: OrderByType) => () => {
    onClickSort(property);
  };

  return (
    <TableSortLabel
      active={orderBy === tableCellId}
      direction={orderBy === tableCellId ? order : DEFAULT_SORTING}
      onClick={createSortHandler(tableCellId)}
    >
      {children}
      {orderBy === tableCellId ? (
        <Box component="span" sx={visuallyHidden}>
          {order === "desc" ? "sorted descending" : "sorted ascending"}
        </Box>
      ) : null}
    </TableSortLabel>
  );
}

function ResultTable({
  groupsById,
  groupsByHash,
  currentGroupId,
  handleHightlightGroup,
  orderBy,
  order,
  onClickSort,
  nestedTableProps,
}: {
  groupsById: GroupsById;
  groupsByHash: GroupsByHash;
  currentGroupId: AvailableGroups;
  handleHightlightGroup?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: OrderByType;
  onClickSort: (orderBy: OrderByType) => void;
  nestedTableProps?: {
    onClickSort: (orderBy: OrderByType, parentId: string) => void;
    nestedGroupId: "" | AvailableGroups;
    nestedTableSort: NestedGroupSort;
  };
}) {
  const isNestedTable = !nestedTableProps;

  return (
    <Table sx={{ minWidth: 650 }} size="small">
      <TableHead>
        <TableRow>
          <TableCell>
            <CustomTableSortLabel
              orderBy={orderBy}
              order={order}
              tableCellId={currentGroupId}
              onClickSort={onClickSort}
            >
              {AVAILABLE_GROUPS.map(
                (item) => item.id === currentGroupId && item.label,
              )}
            </CustomTableSortLabel>
          </TableCell>
          <TableCell colSpan={isNestedTable ? 2 : 1}>
            <CustomTableSortLabel
              orderBy={orderBy}
              order={order}
              tableCellId={SpecialOrderType.rating}
              onClickSort={onClickSort}
            >
              Usage rate
            </CustomTableSortLabel>
          </TableCell>
          {!isNestedTable && <TableCell align="right">Highlight</TableCell>}
        </TableRow>
      </TableHead>
      <TableBody>
        {groupsById.map((id) => {
          const { percent, highlighted, nestedGroups } = groupsByHash[id];
          return (
            <>
              <TableRow
                key={id}
                sx={(theme) => ({
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:nth-of-type(odd)": {
                    backgroundColor: theme.palette.action.hover,
                  },
                })}
              >
                <TableCell component="th" scope="row">
                  <Box
                    sx={() => ({
                      width: 200,
                      display: "flex",
                      justifyContent: "space-between",
                    })}
                  >
                    <Box>{id}</Box>
                  </Box>
                </TableCell>
                <TableCell colSpan={isNestedTable ? 2 : 1}>
                  {percent}%
                </TableCell>

                {handleHightlightGroup && (
                  <TableCell align="right">
                    <Switch
                      checked={highlighted}
                      onChange={handleHightlightGroup}
                      name={id}
                      size="small"
                    />
                  </TableCell>
                )}
              </TableRow>
              {nestedGroups.byId.length > 0 &&
                nestedTableProps?.nestedGroupId && (
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={3}
                    >
                      <Box sx={{ margin: "1rem 0 1rem 3rem" }}>
                        <ResultTable
                          groupsByHash={nestedGroups.byHash}
                          groupsById={nestedGroups.byId}
                          currentGroupId={nestedTableProps.nestedGroupId}
                          onClickSort={(newOrderBy) =>
                            nestedTableProps.onClickSort(newOrderBy, id)
                          }
                          {...nestedTableProps?.nestedTableSort[id]}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
            </>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default ResultTable;
