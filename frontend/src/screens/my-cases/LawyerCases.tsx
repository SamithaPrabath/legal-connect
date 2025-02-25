import FormField from "@components/FormField";
import MUIButton from "@components/MUIButton";
import MUITable, { Column } from "@components/MUITable";
import MUITextField from "@components/MUITextField";
import { Clear, Search } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  MenuItem,
  Typography,
  useTheme
} from "@mui/material";
import { CaseStatus } from "@type/Case";
import {
  create_case_route,
  view_case_overview_route,
} from "@utils/context-paths";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStatusChip } from "./utils";

const MyCasesLawyer = () => {
  const { divider } = useTheme().palette;

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
            <SearchBox />
            <StatusDropdown />
          </Box>
          <CaseTable />
        </Box>
      </Box>
    </Box>
  );
};

const SearchBox = () => {
  return (
    <FormField
      label=""
      name=""
      variant="outlined"
      placeholder="Search Box"
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton>
              <Search fontSize="small" sx={{ cursor: "pointer" }} />
            </IconButton>
          </InputAdornment>
        ),
        style: { fontSize: 14 }, // Adjust text size if needed
      }}
      sx={{
        width: 300, // Adjust width
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px", // Rounded corners
        },
      }}
    />
  );
};

const StatusDropdown = () => {
  const [status, setStatus] = useState<string>("none");

  return (
    <MUITextField
      select
      name=""
      placeholder="Status"
      value={status}
      onChange={(e) => setStatus(e.target.value)}
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
      <MenuItem value="active">Active</MenuItem>
      <MenuItem value="inactive">Inactive</MenuItem>
      <MenuItem value="pending">Pending</MenuItem>
    </MUITextField>
  );
};

const cases = [
  {
    id: "CASE-10001",
    name: "Johnson vs. Apex Corp.",
    client: "Emily Johnson",
    type: "Corporate Dispute",
    status: CaseStatus.IN_PROGRESS,
    event: "Hearing",
    deadline: "Feb 15, 2025",
  },
  {
    id: "CASE-10002",
    name: "Smith Property Agreement",
    client: "Robert Smith",
    type: "Real Estate",
    status: CaseStatus.ON_HOLD,
    event: "Appointment",
    deadline: "Feb 10, 2025",
  },
  {
    id: "CASE-10003",
    name: "Doe Contract Review",
    client: "Jane Doe",
    type: "Contract Review",
    status: CaseStatus.CLOSED,
    event: "N/A",
    deadline: "N/A",
  },
  {
    id: "CASE-10004",
    name: "Startup Trademark Filing",
    client: "Tech Innovations",
    type: "Intellectual Property",
    status: CaseStatus.IN_PROGRESS,
    event: "Filing Deadline",
    deadline: "Mar 1, 2025",
  },
  {
    id: "CASE-10005",
    name: "Wilson Partnership Dispute",
    client: "John Wilson",
    type: "Partnership Dispute",
    status: CaseStatus.AWAIT_HEARING,
    event: "Mediation Session",
    deadline: "Jan 30, 2025",
  },
];

const tableColumns: Column[] = [
  { id: "id", label: "Case ID" },
  { id: "name", label: "Case Name" },
  { id: "client", label: "Client Name" },
  { id: "type", label: "Case Type" },
  { id: "status", label: "Status" },
  { id: "event", label: "Upcoming Event" },
  { id: "deadline", label: "Deadline" },
  { id: "actions", label: "Actions" },
];

const CaseTable = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const data: any[] = cases.map((c) => ({
    ...c,
    status: getStatusChip(c.status, theme),
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

  return <MUITable columns={tableColumns} data={data} />
};
export default MyCasesLawyer;
