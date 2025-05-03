import ScheduleAppointment from "@components/schedule/ScheduleAppointment";
import AdminDashboard from "@screens/admin/Dashboard";
import CreateAccount from "@screens/create-account";
import FAQ from "@screens/faq";
import FindALawyer from "@screens/find-a-lawyer";
import Home from "@screens/home";
import LoginSignUp from "@screens/login-and-signup";
import Messages from "@screens/messages";
import MessageBox from "@screens/messages/MessageBox";
import MyCases from "@screens/my-cases";
import CreateCase from "@screens/my-cases/CreateCase";
import CaseViewer from "@screens/my-cases/case-viewer";
import CaseDocuments from "@screens/my-cases/case-viewer/Documents";
import CaseEvents from "@screens/my-cases/case-viewer/Events";
import CaseNotes from "@screens/my-cases/case-viewer/Notes";
import CaseOverview from "@screens/my-cases/case-viewer/Overview";
import Payments from "@screens/payments";
import PaymentHistory from "@screens/payments/PaymentHistory";
import PaymentRequests from "@screens/payments/PaymentRequests";
import Profile from "@screens/profile";
import LawyerProfileAbout from "@screens/profile/LawyerProfileAbout";
import LawyerProfileReviews from "@screens/profile/LawyerProfileReviews";
import Schedule from "@screens/schedule";
import {
  admin_dashboard_route,
  update_account_route,
  create_case_route,
  findalawyer_route,
  login_signup_route,
  message_route,
  message_with_user_rotue,
  mycases_route,
  payment_history_route,
  payment_request_route,
  payments_route,
  profile_about_route,
  profile_reviews_route,
  profile_route,
  schedule_appointment_route,
  schedule_route,
  view_case_documents_route,
  view_case_events_route,
  view_case_notes_route,
  view_case_overview_route,
  view_case_route,
  create_account_route,
  faq_route,
} from "@utils/context-paths";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: login_signup_route,
    element: <LoginSignUp />,
  },
  {
    path: "/",
    element: <Home />,
    children: [
      { path: admin_dashboard_route, element:<AdminDashboard />},
      { path: message_route, element: <Messages />, children: [{path: message_with_user_rotue(null), element: <MessageBox />}] },
      {
        path: update_account_route(null),
        element: <CreateAccount />,
      },
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
        children: [
          { path: payment_request_route, element: <PaymentRequests /> },
          { path: payment_history_route, element: <PaymentHistory /> },
        ],
      },
      {
        path: mycases_route,
        element: <MyCases />,
        children: [
          { path: create_case_route, element: <CreateCase /> },
          {
            path: view_case_route(null),
            element: <CaseViewer />,
            children: [
              {
                path: view_case_overview_route(null),
                element: <CaseOverview />,
              },
              { path: view_case_events_route(null), element: <CaseEvents /> },
              {
                path: view_case_documents_route(null),
                element: <CaseDocuments />,
              },
              { path: view_case_notes_route(null), element: <CaseNotes /> },
            ],
          },
        ],
      },
      {
        path: schedule_route,
        element: <Schedule />,
      },
      {
        path: schedule_appointment_route(null),
        element: <ScheduleAppointment />
      },
      {
        path: faq_route,
        element: <FAQ />
      },
      {
        path: profile_route(null),
        element: <Profile />,
        children: [
          { path: profile_about_route(null), element: <LawyerProfileAbout /> },
          {
            path: profile_reviews_route(null),
            element: <LawyerProfileReviews />,
          },
        ],
      },
    ],
  },
]);

export default router;
