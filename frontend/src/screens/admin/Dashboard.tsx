import { lawyerPageAction } from "@actions/userActions";
import MUIButton from "@components/MUIButton";
import MUITable, { Column } from "@components/MUITable";
import ParentCard from "@components/ParentCard";
import SearchBox from "@components/SearchBox";
import { Box, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { getStatusChip } from "@screens/my-cases/utils";
import { tempUserListAction } from "@temporaryActions/tempUserActions";
import { UserType } from "@type/User";
import { profile_about_route } from "@utils/context-paths";
import { isBackendConnected } from "@utils/env-config";
import LocalStorageHandler from "@utils/localStorageHandler";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [searchKey, setSearchKey] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);

  const theme = useTheme()

  const tableColumns: Column[] = [
    { id: "id", label: "Profile ID" },
    { id: "name", label: "Name" },
    { id: "occupation", label: "Occupation" },
    { id: "location", label: "Location" },
    { id: "language", label: "Language" },
    { id: "status", label: "Status" },
    { id: "actions", label: "Actions" },
];
const navigate = useNavigate();
const dispatch = useAppDispatch();
const lawyerPage = useAppSelector((state) => state.user.page.data);
const userList = useAppSelector(state => state.user.list);


if (new LocalStorageHandler().userType !== UserType.ADMIN) return null;

useEffect(() => {
  if (isBackendConnected)
      dispatch(lawyerPageAction(searchKey, page, pageSize));
  else dispatch(tempUserListAction());
}, [searchKey, page, pageSize]);

const lawyerList = isBackendConnected ? lawyerPage?.data : userList.data

const data = lawyerList?.map(lawyer => ({
    id: lawyer.id,
    name: `${lawyer.basicInfo.firstName} ${lawyer.basicInfo.lastName}`,
    occupation: lawyer.basicInfo.occupation,
    location: lawyer.basicInfo.location,
    language: lawyer.basicInfo.language,
    status: lawyer.lawyerStatus && getStatusChip(lawyer.lawyerStatus, theme),
    actions: (
        <MUIButton
          variant="outlined"
          size="small"
          color="secondary"
          onClick={() => navigate(profile_about_route(lawyer.id))}
        >
          View
        </MUIButton>
      )

  }))


  console.log("data", data);


  return (
    <Box p="30px">
      <ParentCard title="Lawyers" parentBoxProps={{px:0, pb:0}} titleProps={{ml:"30px"}}>
        <Box pl="30px">
            <SearchBox name={searchKey} setName={setSearchKey} />
        </Box>
        <MUITable
          page={page}
          rowsPerPage={pageSize}
          setPage={setPage}
          setRowsPerPage={setPageSize}
          columns={tableColumns}
          data={data || []}
          totalElements={lawyerPage?.totalCount || 0}
        />
      </ParentCard>
    </Box>
  );
};
export default AdminDashboard;
