import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

interface TableProps {
  rows: GridRowsProp[];
  columns: GridColDef[];
}

const Table: React.FC<TableProps> = ({ rows, columns }) => {
  return <DataGrid rows={rows} columns={columns} />;
};

export default Table;
