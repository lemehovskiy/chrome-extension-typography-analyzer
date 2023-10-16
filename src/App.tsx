import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";
import { useEffect } from "react";
import useTypographyTable from "./hooks/useTypographyTable";
import ResultTable from "./components/ResultTable";
import { AVAILABLE_GROUPS } from "./config";

function App() {
  const {
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
  } = useTypographyTable();

  useEffect(() => {
    chrome.runtime.connect({ name: "popup" });
  }, []);

  const isActiveAllGroups = Object.values(groupsByHash).every(
    (value) => value.highlighted,
  );

  return (
    <Box
      sx={{
        minWidth: "600px",
        padding: "1rem",
        maxHeight: "400px",
        overflow: "auto",
      }}
    >
      <FormGroup>
        <FormControl>
          <InputLabel>Filter By</InputLabel>
          <Select
            value={currentGroupId}
            onChange={handleChangeFilter}
            label="Filter By"
          >
            {AVAILABLE_GROUPS.map((option) => (
              <MenuItem value={option.id}>{option.label}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>Nested Filter By</InputLabel>
          <Select
            value={nestedGroupId}
            onChange={handleChangeNestedFilter}
            label="Nested Filter By"
          >
            {AVAILABLE_GROUPS.map((option) => {
              if (option.id === currentGroupId) {
                return null;
              }
              return <MenuItem value={option.id}>{option.label}</MenuItem>;
            })}
          </Select>
        </FormControl>

        <FormControl>
          <FormControlLabel
            control={
              <Switch
                checked={isActiveAllGroups}
                onChange={handleHightlightAllGroups}
              />
            }
            label="Hightlight all"
          />
        </FormControl>
      </FormGroup>
      <ResultTable
        groupsById={groupsById}
        groupsByHash={groupsByHash}
        currentGroupId={currentGroupId}
        handleHightlightGroup={handleHightlightGroup}
        orderBy={orderBy}
        order={order}
        onClickSort={handleSort}
        nestedTableProps={{
          onClickSort: handleSortNestedTable,
          nestedGroupId,
          nestedTableSort,
        }}
      />
    </Box>
  );
}

export default App;
