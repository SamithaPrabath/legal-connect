import { Payments, Schedule } from "@mui/icons-material";
import FindALawyer from "@screens/find-a-lawyer";
import MyCases from "@screens/my-cases";
import { createBrowserRouter } from "react-router-dom";
import {
  findalawyer_route,
  login_signup_route,
  mycases_route,
  payments_route,
  schedule_route,
} from "@utils/context-paths";
import LoginSignUp from "@screens/login-and-signup";
import Home from "@screens/home";

const router = createBrowserRouter([
  {
    path: login_signup_route,
    element: <LoginSignUp />,
  },
  {
    path: "/",
    element: <Home />,
    children:[
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
      },
      {
        path: schedule_route,
        element: <Schedule />,
      },
    ]
  }
]);

export default router;
