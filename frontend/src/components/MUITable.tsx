import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    useTheme,
} from "@mui/material";
import { useState } from "react";

export type Column = {
  id: string;
  label: string;
};

type PropTypes = {
  columns: Column[];
  data: any[];
};

const MUITable = ({ columns, data }: PropTypes) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => setPage(newPage);
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { divider } = useTheme().palette;

  const tableCellProps = {
    sx: { borderBottom: `1px solid ${divider}` }, // Ensures row borders
  };
  return (
    <TableContainer
      component={Paper}
      sx={{ boxShadow: "none", borderRadius: 2 }}
    >
      <Table>
        <TableHead sx={{ backgroundColor: "#f1f5f9" }}>
          <TableRow sx={{ borderTop: tableCellProps.sx.borderBottom }}>
            {columns.map((column) => (
              <TableCell {...tableCellProps}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((c, index) => (
            <TableRow key={c.id}>
              {columns.map((column) => {
                const isLastElement = index === data.length - 1;
                return (
                  <TableCell {...(!isLastElement && tableCellProps)}>
                    {c[column.id]}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[3, 5, 10]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default MUITable;
