import { Payments, Schedule } from "@mui/icons-material";
import FindALawyer from "@screens/find-a-lawyer";
import MyCases from "@screens/my-cases";
import { createBrowserRouter } from "react-router-dom";
import {
  create_account_route,
  create_case_route,
  findalawyer_route,
  login_signup_route,
  mycases_route,
  payments_route,
  schedule_route,
} from "@utils/context-paths";
import LoginSignUp from "@screens/login-and-signup";
import Home from "@screens/home";
import CreateAccount from "@screens/create-account";
import CreateCase from "@screens/my-cases/CreateCase";

const router = createBrowserRouter([
  {
    path: login_signup_route,
    element: <LoginSignUp />,
  },
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: create_account_route,
        element: <CreateAccount />,
      },
      {
        path: findalawyer_route,
        element: <FindALawyer />,
      },
      {
        path: payments_route,
        element: <Payments />,
      },
      {
        path: mycases_route,
        element: <MyCases />,
        children: [
          { path: create_case_route, element: <CreateCase /> },
        ],
      },
      {
        path: schedule_route,
        element: <Schedule />,
      },
    ],
  },
]);

export default router;
