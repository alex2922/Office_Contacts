import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Paper, TextField } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const TableData = ({ columns, data }) => {
  const [search, setSearch] = useState("");
  const [paginationModel, setPaginationModel] = useState({ pageSize: 5, page: 0 });

  const filteredRows = data.filter(row =>
    columns.some(column =>
      row[column.field]?.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Paper style={{ width: "100%",padding: 10 }}>
        <TextField
          variant="outlined"
          fullWidth
          label="Search anything from the table..."
          onChange={e => setSearch(e.target.value)}
          style={{ marginBottom: 10, backgroundColor: "#333", color: "white" }}
        />
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSizeOptions={[5, 10, 20]} // Dropdown to change rows per page
          paginationModel={paginationModel} // Controlled pagination state
          onPaginationModelChange={setPaginationModel} // Updates state when navigating pages
          autoHeight
        />
      </Paper>
    </ThemeProvider>
  );
};

export default TableData;
