import { mycases_route } from "@utils/context-paths";
import { Outlet, useLocation } from "react-router-dom";
import MyCasesLawyer from "./LawyerCases";
import { Box } from "@mui/material";
import MyCasesClient from "./ClientCases";
import LocalStorageHandler from "@utils/localStorageHandler";
import { UserType } from "@type/User";

const MyCases = () => {
  const location = useLocation();
  const userType = new LocalStorageHandler().userType;

  return (
    <Box height="100%">
      {location.pathname === mycases_route &&
        (userType === UserType.CLIENT ? (
          <MyCasesClient />
        ) : (
          userType === UserType.LAWYER && <MyCasesLawyer />
        ))}
      <Outlet />
    </Box>
  );
};

export default MyCases;
