import { casePageAction } from "@actions/caseActions";
import MUIButton from "@components/MUIButton";
import MUITable, { Column } from "@components/MUITable";
import MUITextField from "@components/MUITextField";
import SearchBox from "@components/SearchBox";
import { Clear } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { tempGetAllCases } from "@temporaryActions/tempCaseActions";
import { CaseStatus } from "@type/Case";
import {
  create_case_route,
  view_case_overview_route,
} from "@utils/context-paths";
import { isBackendConnected } from "@utils/env-config";
import LocalStorageHandler from "@utils/localStorageHandler";
import { SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStatusChip } from "./utils";

const MyCasesLawyer = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [status, setStatus] = useState<CaseStatus | "none">("none");
  const [name, setName] = useState("");

  const { divider } = useTheme().palette;

  const userId = new LocalStorageHandler().profileId;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!userId) return;
    if (isBackendConnected) {
      dispatch(
        casePageAction(
          userId,
          page,
          pageSize,
          status === "none" ? undefined : status,
          name
        )
      );
    }
    else dispatch(tempGetAllCases());
  }, [page, pageSize, status, name]);

  const navigate = useNavigate();

  return (
    <Box py="30px" px="50px">
      <Box border={`1px solid ${divider}`} pt="20px">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          px="20px"
          mb="30px"
        >
          <Typography variant="h2">My Cases</Typography>
          <MUIButton
            sx={{ px: "50px" }}
            onClick={() => navigate(create_case_route)}
          >
            New Case
          </MUIButton>
        </Box>
        <Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            px="20px"
          >
            <SearchBox name={name} setName={setName} />
            <StatusDropdown status={status} setStatus={setStatus} />
          </Box>
          <CaseTable
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        </Box>
      </Box>
    </Box>
  );
};

type StatusDropDownType = {
  status: CaseStatus | "none";
  setStatus: React.Dispatch<SetStateAction<CaseStatus | "none">>;
};

const StatusDropdown = ({ status, setStatus }: StatusDropDownType) => {
  return (
    <MUITextField
      select
      name=""
      placeholder="Status"
      value={status}
      onChange={(e) => setStatus(e.target.value as CaseStatus)}
      variant="outlined"
      sx={{ width: "150px" }}
      InputProps={{
        endAdornment:
          status && status !== "none" ? (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={() => setStatus("none")} // Reset to empty string
              >
                <Clear fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : null,
      }}
    >
      <MenuItem value="none" disabled>
        Status
      </MenuItem>
      {Object.values(CaseStatus).map((value) => (
        <MenuItem value={value} sx={{ textTransform: "capitalize" }}>
          {value}
        </MenuItem>
      ))}
    </MUITextField>
  );
};

const tableColumns: Column[] = [
  { id: "id", label: "Case ID" },
  { id: "caseName", label: "Case Name" },
  { id: "client", label: "Client Name" },
  { id: "caseType", label: "Case Type" },
  { id: "status", label: "Status" },
  { id: "event", label: "Upcoming Event" },
  { id: "deadline", label: "Deadline" },
  { id: "actions", label: "Actions" },
];

type CaseTableProps = {
  page: number;
  setPage: React.Dispatch<SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<SetStateAction<number>>;
};

const CaseTable = ({
  page,
  pageSize,
  setPage,
  setPageSize,
}: CaseTableProps) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { data: casePage } = useAppSelector((state) => state.case.page);

  const data: any[] | undefined = casePage?.data.map((c) => ({
    ...c,
    status: getStatusChip(c.caseStatus, theme),
    event: c.upcomingEvent?.title,
    type: c.caseType,
    client:
      c.client?.basicInfo?.firstName + " " + c.client?.basicInfo?.lastName,
    deadline: c.upcomingEvent?.date,
    actions: (
      <MUIButton
        variant="outlined"
        size="small"
        color="secondary"
        onClick={() => navigate(view_case_overview_route(c.id))}
      >
        View
      </MUIButton>
    ),
  }));

  return (
    <MUITable
      page={page}
      rowsPerPage={pageSize}
      setPage={setPage}
      setRowsPerPage={setPageSize}
      columns={tableColumns}
      data={data || []}
      totalElements={casePage?.totalCount || 0}
    />
  );
};
export default MyCasesLawyer;
