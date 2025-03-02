import { casePageAction } from "@actions/caseActions";
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
import { useAppDispatch } from "@redux/hooks";
import { tempGetAllCases } from "@temporaryActions/tempCaseActions";
import { isBackendConnected } from "@utils/env-config";
import LocalStorageHandler from "@utils/localStorageHandler";
import { useEffect, useState } from "react";

export type Column = {
  id: string;
  label: string;
};

type PropTypes = {
  columns: Column[];
  data: any[];
  totalElements: number;
  accessType: "lawyerCase" | "adminLawyer";
};

const MUITable = ({ columns, data, totalElements, accessType }: PropTypes) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useAppDispatch();

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

  useEffect(() => {
    const userId = new LocalStorageHandler().profileId;
    if (!userId) return;

    if (accessType === "lawyerCase"){
      if (isBackendConnected)
        dispatch(casePageAction(userId, page, rowsPerPage));
      else dispatch(tempGetAllCases())
    }
  }, [page, rowsPerPage]);

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
        rowsPerPageOptions={[5, 10, 50]}
        component="div"
        count={totalElements}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default MUITable;
